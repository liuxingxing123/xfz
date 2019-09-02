function FrontBase() {

}

FrontBase.prototype.run = function () {
    this.listenAuthHover();
}
FrontBase.prototype.listenAuthHover = function () {
    var authBox = $(".auth-box");
    var userMoreBox = $(".user-more-box");
    authBox.hover(function () {
        userMoreBox.show();
    }, function () {
        userMoreBox.hide();
    })
}


function Auth() {
    var self = this;
    self.maskWrapper = $(".mask-wrapper");
    self.scrollWrapper = $(".scroll-wrapper");
    self.smsCaptcha = $(".sms-captcha-btn");
}

Auth.prototype.run = function () {
    this.listenShowHideEvent()
    this.listenSwitchEvent()
    this.listenSigninEvent()
    this.listenSignupEvent()
    this.listenImageCaptchaEvent()
    this.listentSmsCaptchaEvent()
}
Auth.prototype.showEvent = function () {
    var self = this;
    self.maskWrapper.show();
}
Auth.prototype.hideEvent = function () {
    var self = this;
    self.maskWrapper.hide();
}
Auth.prototype.listenShowHideEvent = function () {
    var self = this;
    var signinBtn = $(".signin-btn");
    var signupBtn = $(".signup-btn");
    var closeBtn = $(".close-btn");
    signinBtn.click(function () {
        self.showEvent()
        self.scrollWrapper.css({"left": 0})
    })

    signupBtn.click(function () {
        self.showEvent()
        self.scrollWrapper.css({"left": -400})
    })

    closeBtn.click(function () {
        self.hideEvent()
    })
}
// Auth.prototype.listenSwitchEvent = function () {
//     var self = this;
//     var switcher = $(".switch");
//     switcher.click(function () {
//         var currentLeft = self.scrollWrapper.css("left");
//         currentLeft = parseInt(currentLeft);
//         if(currentLeft < 0){
//             self.scrollWrapper.animate({"left":'0'});
//         }else{
//             self.scrollWrapper.animate({"left":"-400px"});
//         }
//     });
// };
Auth.prototype.listenSwitchEvent = function () {
    var self = this;
    var switcher = $(".switch");
    switcher.click(function () {
        var scrollWrapperWidth = self.scrollWrapper.width();
        var halfWidth = parseFloat(scrollWrapperWidth) / 2;
        var currentLeft = self.scrollWrapper.css("left");
        currentLeft = parseFloat(currentLeft);
        if (currentLeft < 0) {
            self.scrollWrapper.animate({
                "left": 0
            }, 500)
        } else {
            self.scrollWrapper.animate({
                "left": -halfWidth
            }, 500)
        }
    })
}
Auth.prototype.listenImageCaptchaEvent = function () {
    var imgCaptcha = $(".img-captcha");
    imgCaptcha.click(function () {
        imgCaptcha.attr("src", "/account/img_captcha/?random=" + Math.random());
    })
}
Auth.prototype.smsSuccessEvent = function () {
    var self = this;
    messageBox.showSuccess("短信验证码发送成功！")
    self.smsCaptcha.addClass('disabled');
    var count = 60;
    self.smsCaptcha.unbind();
    var timer = setInterval(function () {
        self.smsCaptcha.text(count + 's');
        count--;
        if (count <= 0) {
            clearInterval(timer);
            self.smsCaptcha.removeClass('disabled');
            self.smsCaptcha.text("发送验证码");
            self.listentSmsCaptchaEvent()
        }
    }, 1000)
}
Auth.prototype.listentSmsCaptchaEvent = function () {
    var self = this;
    var telephoneInput = $(".signup-group input[name='telephone']")
    self.smsCaptcha.click(function () {
        var telephone = telephoneInput.val()
        if (!telephone) {
            messageBox.showInfo("请输入手机号码")
        }
        xfzajax.get({
            'url': "/account/sms_captcha/",
            'data': {
                "telephone": telephone
            },
            'success': function (result) {
                if (result['code'] === 200) {
                    self.smsSuccessEvent()
                }
            },
            'fail': function (error) {
                console.log(error)
            }
        })
    })
}
Auth.prototype.listenSigninEvent = function () {
    var self = this;
    var signinGroup = $(".signin-group");
    var telephoneInput = signinGroup.find("input[name='telephone']");
    var passwordInput = signinGroup.find("input[name='password']");
    var rememberInput = signinGroup.find("input[name='remember']");

    var submitBtn = signinGroup.find(".submit-btn");
    submitBtn.click(function () {
        var telephone = telephoneInput.val();
        var password = passwordInput.val();
        var remember = rememberInput.prop("checked");

        xfzajax.post({
            'url': "/account/login/",
            'data': {
                'telephone': telephone,
                'password': password,
                'remember': remember ? 1 : 0
            },
            'success': function (result) {
                self.hideEvent();
                window.location.reload()
            },
            'fail': function (error) {
                console.log(error)
            }
        })
    })

}

Auth.prototype.listenSignupEvent = function () {
    var signupGroup = $(".signup-group");
    var telephoneInput = signupGroup.find("input[name='telephone']");
    var usernameInput = signupGroup.find("input[name='username']");
    var imgCaptchaInput = signupGroup.find("input[name='img_captcha']");
    var password1Input = signupGroup.find("input[name='password1']");
    var password2Input = signupGroup.find("input[name='password2']");
    var smsCaptchaInput = signupGroup.find("input[name='sms_captcha']");
    var submitBtn = signupGroup.find(".submit-btn");
    submitBtn.click(function (event) {
        event.preventDefault();
        var telephone = telephoneInput.val();
        var username = usernameInput.val();
        var img_captcha = imgCaptchaInput.val();
        var password1 = password1Input.val();
        var password2 = password2Input.val();
        var sms_captcha = smsCaptchaInput.val();

        xfzajax.post({
            'url': '/account/register/',
            'data': {
                'telephone': telephone,
                'username': username,
                'img_captcha': img_captcha,
                'password1': password1,
                'password2': password2,
                'sms_captcha': sms_captcha
            },
            'success': function (result) {
                if (result['code'] === 200) {
                    window.location.reload();
                }

            },
            'fail': function (error) {
                console.log(error)
            }
        });

    })
}
$(function () {
    var auth = new Auth();
    auth.run();
})

$(function () {
    var frontBase = new FrontBase()
    frontBase.run();
})

$(function () {
    if (window.template) {
        template.defaults.imports.timeSince = function (dateValue) {
            var date = new Date(dateValue);
            var datets = date.getTime();
            var nowts = (new Date().getTime());
            var timestamp = (nowts - datets) / 1000;
            if (timestamp < 60) {
                return '刚刚'
            } else if (timestamp >= 60 && timestamp < 60 * 60) {
                minutes = parseInt(timestamp / 60)
                return minutes + '分钟前';
            } else if (timestamp >= 60 * 60 && timestamp < 60 * 60 * 24) {
                hours = parseInt(timestamp / 60 / 60)
                return hours + '小时前';
            } else if (timestamp >= 60 * 60 * 24 && timestamp < 60 * 60 * 24 * 30) {
                days = parseInt(timestamp / 60 / 60 / 24)
                return days + '天前';
            } else {
                var year = date.getFullYear();
                var month = date.getMonth();
                var day = date.getDay();
                var hour = date.getHours();
                var minute = date.getMinutes();
                return year + '/' + (month + 1) + '/' + day + '/' + " " + hour + ":" + minute;
            }
        }

    }
})