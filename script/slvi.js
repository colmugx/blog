(function() {
    "use strict";
    var Slvi = {
        tagcloud() {
            $('#tags').click(function() {
                $('.body').each(function() {
                    if ($(this).hasClass('show-tag')) {
                        $(this).removeClass('show-tag')
                    } else {
                        $(this).addClass('show-tag')
                    }
                })
            })
        },

        offAnimate() {
            $('.syuanpi').removeClass('syuanpi');
        },
        
        onPicBox () {
            $('.post-content').each(function() {
                $(this).find('img').each(function() {
                    $(this).replaceWith("<a href='" + this.src + "' data-title='" + this.alt + "' data-lightbox='group'><img src='" + this.src + "' alt='" + this.alt + "'></a>")
                })
            })
        },

        back2top() {
            $(window).each(function() {
                $(this).scroll(function() {
                    if($(this).scrollTop() > 110) {
                        $('#backtop').addClass('bloom').removeClass('dead')
                    } else {
                        $('#backtop').addClass('dead').removeClass('bloom')
                    }
                });
            });

            $('#backtop').click(function() {
                $('body').animate({ scrollTop: 0 });
            })
        },

        showPost() {
            $('.post').each(function() {
                if($(this).offset().top <= $(window).scrollTop()+($(window).height()/1.5) && ($(this).hasClass('hide'))) {
                    $(this).addClass('show').removeClass('hide')
                }
            });
        }
    }

    this.Slvi = Slvi
}.call(this))