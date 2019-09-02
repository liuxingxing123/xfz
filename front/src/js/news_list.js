function CMSNewsList(){

}

CMSNewsList.prototype.run = function(){
    this.initDatePicker()
    this.listenDeleteEvent()
}
CMSNewsList.prototype.initDatePicker = function(){
    var startPicker = $("#start-picker");
    var endPicker = $("#end-picker");
    var todayDate = new Date();
    var todayStr = todayDate.getFullYear() + '/' + (todayDate.getMonth()+1) + '/' + todayDate.getDate();
    var options = {
        //是否需要展示按钮的盘 （今日,清除）
        'showButtonPanel': true,
        //日期格式
        'format': 'yyyy/mm/dd',
        //开始日期
        'startDate': '2019/8/1',
        //结束日期
        'endDate': todayStr,
        //语言   默认是英文
        'language': 'zh-CN',
        //今日的按钮
        'todayBtn': 'linked',
        //是否今天的日期需要高亮
        'todayHighlight': true,
        //清除的按钮
        'clearBtn': true,
        //选中日期之后自动消失  为false则必须点击日期框外面才能消失
        'autoclose': true
    };
    startPicker.datepicker(options);
    endPicker.datepicker(options);
}

CMSNewsList.prototype.listenDeleteEvent = function () {
    var deleteBtns = $(".delete-btn");
    deleteBtns.click(function () {
        var btn = $(this);
        var news_id = btn.attr("data-news-id");
        xfzalert.alertConfirm({
            'text': '您是否要删除这篇新闻吗？',
            'confirmCallback': function () {
                xfzajax.post({
                    'url': '/cms/delete_news/',
                    'data': {
                        'news_id': news_id
                    },
                    'success': function (result) {
                        if(result['code'] === 200){
                            window.location = window.location.href;
                            // window.location.reload()
                        }
                    }
                });
            }
        });
    })
}
$(function () {
    var newsList = new CMSNewsList();
    newsList.run();
})