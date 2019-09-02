function NewsList() {

}

NewsList.prototype.run = function () {
    this.listenSubmitEvent();
    this.listenCommentLengthEvent();
}

NewsList.prototype.listenCommentLengthEvent = function(){
    var commentLength = $("#comment-length");
     var commentListGroup = $(".comment-list li");
     var len = commentListGroup.length;
     commentLength.html(len);
}

NewsList.prototype.listenSubmitEvent = function () {
    var self = this;
    var submitBtn = $(".submit-btn");
    var textAreaInput = $("textarea[name='comment']")
    submitBtn.click(function () {
        var content = textAreaInput.val();
        var news_id = submitBtn.attr("data-news-id");
        xfzajax.post({
            'url': "/news/public_comment/",
            'data': {
                'content': content,
                'news_id': news_id,
            },
            'success': function (result) {
                if (result['code'] === 200) {
                    var comment = result['data'];
                    var tpl = template("comment-item", {"comment":comment});
                    var commentListGroup = $(".comment-list");
                    commentListGroup.prepend(tpl);
                    window.messageBox.showSuccess("评论发表成功!")
                    textAreaInput.val('');
                    self.listenCommentLengthEvent();
                }else{
                    window.messageBox.showError(result['message']);
                }
            }
        })

    })
}


$(function () {
    var newsList = new NewsList();
    newsList.run();
})