function News() {
    this.progressGroup = $("#progress-group");
}

News.prototype.run = function () {
    // this.listenUploadFileEvent()
    this.initUEditor();
    this.listenQIniuUploadFileEvent();
    this.listenSubmitEvent();
}

News.prototype.listenUploadFileEvent = function () {
    var uploadBtn = $("#thumbnail-btn");
    uploadBtn.change(function () {
        var file = uploadBtn[0].files[0];
        var formData = new FormData();
        formData.append("file", file);
        xfzajax.post({
            'url': "/cms/upload_file/",
            'data': formData,
            'processData': false,//告诉jQuery我这个文件不需要再去处理了
            'contentType': false,//不需要再去添加contentType了
            'success': function (result) {
                if (result['code'] === 200) {
                    var url = result['data']['url'];
                    var thumbnailInput = $("#thumbnail-form");
                    thumbnailInput.val(url);
                }
            }
        })
    })
}

News.prototype.listenQIniuUploadFileEvent = function () {
    var self = this;
    var uploadBtn = $("#thumbnail-btn");
    uploadBtn.change(function () {
        var file = this.files[0];

        xfzajax.get({
            'url': "/cms/qntoken/",
            'success': function (result) {
                if (result['code'] === 200) {
                    var progressBar = $(".progress-bar");
                    progressBar.css({"width": '0%'});
                    progressBar.text('0%');
                    var token = result['data']['token'];
                    // a.b.jpg = ['a','b','jpg']
                    // 198888888 + . + jpg = 1988888.jpg
                    var key = (new Date()).getTime() + '.' + file.name.split('.')[file.name.split('.').length - 1];
                    var putExtra = {
                        fname: key,//文件原文件名
                        params: {},//用来放置自定义变量
                        mimeType: ['image/png', 'image/jpeg', 'image/gif', 'video/x-ms-wmv']//mimeType: null || array，用来限制上传文件类型，为 null 时表示不对文件类型限制；限制类型放到数组里：
                    };
                    var config = {
                        useCdnDomain: true,//表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
                        retryCount: 6,//传自动重试次数（整体重试次数，而不是某个分片的重试次数）；默认 3 次（即上传失败后最多重试两次）；目前仅在上传过程中产生 599 内部错误时生效，但是未来很可能会扩展为支持更多的情况。
                        region: qiniu.region.z2
                        /* qiniu.region.z0: 代表华东区域
                           qiniu.region.z1: 代表华北区域
                           qiniu.region.z2: 代表华南区域
                           qiniu.region.na0: 代表北美区域
                           qiniu.region.as0: 代表东南亚区域
                           */
                    };
                    var observable = qiniu.upload(file, key, token, putExtra, config);
                    //observer 为一个 object，用来设置上传过程的监听函数，有三个属性 next、error、complete:
                    observable.subscribe({
                        'next': self.handleFileUploadProgress,
                        'error': self.handleFileUploadError,
                        'complete': self.handleFileUploadComplete
                    });

                }
            }
        })
    })
}

News.prototype.handleFileUploadProgress = function (response) {
    var total = response.total;
    var percent = total.percent;
    var percentText = percent.toFixed(0) + '%';
    var processGroup = News.progressGroup;
    processGroup.show();
    var progressBar = $(".progress-bar");
    progressBar.css({"width": percentText});
    progressBar.text(percentText);
}
News.prototype.handleFileUploadError = function (error) {
    window.messageBox.showError(error.message);
    var progressGroup = $("#progress-group");
    progressGroup.hide();
    console.log(error.message);
}
News.prototype.handleFileUploadComplete = function (response) {
    var processGroup = $("#progress-group");
    processGroup.hide();

    var domain = 'http://pwlbcmhg8.bkt.clouddn.com/';
    var filename = response.key;
    var url = domain + filename;
    var thumbnailInput = $("input[name='thumbnail']");
    thumbnailInput.val(url);
}

News.prototype.initUEditor = function () {
    window.ue = UE.getEditor('editor', {
        'initialFrameHeight': 400,
        'serverUrl': '/ueditor/upload/'
    });

}

News.prototype.listenSubmitEvent = function () {
    var submitBtn = $("#submit-btn");
    submitBtn.click(function (event) {
        event.preventDefault();
        var title = $("input[name='title']").val();
        var category = $("select[name='category']").val();
        var desc = $("input[name='desc']").val();
        var thumbnail = $("input[name='thumbnail']").val();
        var content = window.ue.getContent();

        var pk = submitBtn.attr("data-news-id");
        var url = '';
        if (pk) {
            url = '/cms/edit_news/';
        } else {
            url = '/cms/write_news/';
        }
        xfzajax.post({
            'url': url,
            'data': {
                'title': title,
                'category': category,
                'desc': desc,
                'thumbnail': thumbnail,
                'content': content,
                'pk': pk
            },
            'success': function (result) {
                if (result['code'] === 200) {
                    xfzalert.alertSuccess(pk ? "恭喜！新闻编辑成功！" : "恭喜！新闻发布成功！", function () {
                        window.location.reload();
                    })
                }
            }
        })
    })
}
$(function () {
    var news = new News();
    news.run();

    News.progressGroup = $('#progress-group');
})