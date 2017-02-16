window.onload = function () {
    // document.body.addEventListener('touchstart', function () {});
    $("#loader").addClass('hideIn');
    setTimeout(function () {
        $("#loader").hide();
        $("#container").show();
    }, 300);
};
$(function () {
    var open = false;
    $('#title').click(function () {
        if (open) {
            $('.squa-list').hide();
            open = false;
        } else {
            $('.squa-list').show();
            open = true;
        }
    });
});
$(function () {
    $('#menu-item').click(function () {
        var $hide = $(".mobile-nav-list").css('display');
        if ($hide == 'block') {
            $('.mobile-nav-list').hide();
            $('.main').removeClass('filter');
            $('.about').removeClass('filter');
        } else {
            $('.mobile-nav-list').show();
            $('.main').addClass('filter');
            $('.about').addClass('filter');
        }
    });
});
$(function () {
    var open = true;
    $('#about').click(function () {
        if (!open) {
            setTimeout(function () {
                $('.main').show();
                $('.main').addClass('showIn');
                $('.main').removeClass('hideIn');
            }, 350);
            $('.about').addClass('hideIn');
            console.log('open');
            open = true;
        } else {
            console.log('close');
            $('.main').addClass('hideIn');
            $('.main').removeClass('showIn');
            setTimeout(function () {
                $('.main').hide();
            }, 340);
            setTimeout(function () {
                $('.about').addClass('showIn');
                $('.about').removeClass('hideIn');
            }, 350);
            open = false;
        }
    });
});
$(function () {
    var open = false
    $('#mobile-about').click(function () {
        if (open) {
            setTimeout(function () {
                $('.main').show();
                $('.main').addClass('showIn');
                $('.main').removeClass('hideIn');
            }, 350);
            $('.about').addClass('hideIn');
            $('.about').removeClass('showIn');
            $('.mobile-nav-list').hide();
            $('.main').removeClass('filter');
            open = false;
        } else {
            $('.main').addClass('hideIn');
            $('.main').removeClass('showIn');
            setTimeout(function () {
                $('.main').hide();
            }, 340);
            setTimeout(function () {
                $('.about').addClass('showIn');
                $('.about').removeClass('hideIn');
            }, 350);
            $('.mobile-nav-list').hide();
            $('.about').removeClass('filter');
            open = true;
        }
    });
});
$(function () {
    var smoothScroll = function (el, to, duration) {
        if (duration < 0) {
            return;
        }
        var difference = to - $(window).scrollTop();
        var perTick = difference / duration * 10;
        this.scrollToTimerCache = setTimeout(function () {
            if (!isNaN(parseInt(perTick, 10))) {
                window.scrollTo(0, $(window).scrollTop() + perTick);
                smoothScroll(el, to, duration - 10);
            }
        }.bind(this), 10);
    }
    $('#goTop').click(function () {
        smoothScroll($(window), 0, 200);
    });
});

(function () {
    $(window).scroll(function () {
        var $pageHeight = $(document).height();
        var $scr = $(window).scrollTop();
        if ($scr > ($pageHeight - 750)) {
            $('#menu-item').css('bottom','-5px').css('right', '10px');
        } else {
            $('#menu-item').css('bottom', '40px').css('right', '25px');
        }
    });
})()
