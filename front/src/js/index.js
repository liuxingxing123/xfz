function Banner() {
    this.bannergroup = $("#banner-group");
    this.timer = null;
    this.index = 1;
    this.leftArrow = $('.left-arrow');
    this.rightArrow = $('.right-arrow');
    this.bannerUl = $("#banner-ul");
    this.liList = this.bannerUl.children("li");
    this.bannerCount = this.liList.length;
    this.bannerWidth = 798;
    this.pageControl = $(".page-control");
}

Banner.prototype.initBanner = function () {
    var firstBanner = this.liList.eq(0).clone(true);
    var lastBanner = this.liList.eq(this.bannerCount - 1).clone(true);
    this.bannerUl.append(firstBanner);
    this.bannerUl.prepend(lastBanner);
    this.bannerUl.css({
        "width": this.bannerWidth * (this.bannerCount + 2),
        "left": -this.bannerWidth
    })

}

Banner.prototype.initControl = function () {
    for (var i = 0; i < this.bannerCount; i++) {
        var circle = $("<li></li>");
        this.pageControl.append(circle);
        if (i === 0) {
            circle.addClass('active');
        }
    }
    this.pageControl.css({
        "width": this.bannerCount * 12 + 8 * 2 + 16 * (this.bannerCount - 1)
    })
}

Banner.prototype.toggleArrow = function () {
    this.leftArrow.toggle();
    this.rightArrow.toggle();
}

Banner.prototype.run = function () {
    this.loop();
    this.listenArrowClick();
    this.initControl();
    this.initBanner();
    this.listenPageControl();
    this.listenBannerHover();
}

Banner.prototype.loop = function () {
    var self = this;
    this.timer = setInterval(function () {
        if (self.index >= self.bannerCount + 1) {
            self.bannerUl.css({"left": -self.bannerWidth})
            self.index = 2;
        } else {
            self.index++;
        }
        self.animate();
    }, 2000);
}

Banner.prototype.listenPageControl = function () {
    var self = this;
    this.pageControl.children('li').each(function (index, obj) {
        $(obj).click(function () {
            self.index = index+1;
            self.animate();
        })
    })
}

Banner.prototype.animate = function () {
    this.bannerUl.stop().animate({"left": -798 * this.index}, 500)
    var index = this.index;
    if (index === 0) {
        index = this.bannerCount - 1;
    } else if (index === this.bannerCount + 1) {
        index = 0;
    } else {
        index = this.index - 1;
    }
    this.pageControl.children('li').eq(index).addClass('active').siblings().removeClass("active")
}

Banner.prototype.listenArrowClick = function () {
    var self = this;
    this.leftArrow.click(function () {
        if (self.index === 0) {
            self.bannerUl.css({"left": -self.bannerCount * self.bannerWidth})
            self.index = self.bannerCount - 1;
        } else {
            self.index--;
        }
        self.animate();
    })
    this.rightArrow.click(function () {
        if (self.index === self.bannerCount + 1) {
            self.bannerUl.css({"left": -self.bannerWidth})
            self.index = 2;
        } else {
            self.index++;
        }
        self.animate();
    })
}

Banner.prototype.listenBannerHover = function () {
    var self = this;
    this.bannergroup.hover(function () {
        clearInterval(self.timer);
        self.toggleArrow();
    }, function () {
        self.loop();
        self.toggleArrow();
    })
}

function Index() {
    this.page = 2;
    this.category_id = 0;
    this.loadMoreBtn = $("#load-more-btn");

}

Index.prototype.run = function () {
    this.listenLoadMoreEvent()
    this.listenCategorySwitchEvent()
}

Index.prototype.listenLoadMoreEvent = function () {
    var self = this;
    this.loadMoreBtn.click(function () {
        var page = 2;
        xfzajax.get({
            'url': '/news/list/',
            'data': {
                'p': self.page,
                'category_id':self.category_id
            },
            'success': function (result) {
                if (result['code'] === 200) {
                    var newses = result['data'];
                    if (newses.length > 0) {
                        var tpl = template("news-item", {'newses': newses})
                        var ul = $(".list-inner-group");
                        ul.append(tpl)
                        self.page += 1;
                    } else {
                        self.loadMoreBtn.hide();
                    }

                }
            }
        })
    })
}

Index.prototype.listenCategorySwitchEvent = function(){
    var self = this;
    var tabGroup = $(".list-tab");
    tabGroup.on('click','li',function () {
        var li = $(this);
        var category_id = li.attr("data-category");
        var page = 1;
        xfzajax.get({
            'url':"/news/list/",
            'data':{
                'category_id':category_id,
                'p':page
            },
            'success':function (result) {
                if(result['code']===200){
                    var newses = result['data'];
                    var tpl = template("news-item", {'newses': newses})
                    // empty：可以将这个标签下的所有子元素都删掉
                    var newsListGroup = $(".list-inner-group");
                    newsListGroup.empty();
                    newsListGroup.append(tpl);
                    self.page = 2;
                    self.category_id = category_id;
                    li.addClass('active').siblings().removeClass('active');
                    self.loadMoreBtn.show();
                }
            }
        })
    })
}
$(function () {
    var banner = new Banner();
    banner.run();

    var index = new Index();
    index.run();
})
