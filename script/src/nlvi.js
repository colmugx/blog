'use strict';

~function (window) {
  "use strict";

  function nlvi(config) {
    function boot() {
      var tasks = [function smoothScroll() {
        $('.toc-link').click(function () {
          $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 200
          });
        });
      }, function picPos() {
        $('.post-content').each(function () {
          $(this).find('img').each(function () {
            $(this).parent('p').css('text-align', 'center');
            $(this).replaceWith("<a href='" + this.src + "' data-title='" + this.alt + "' data-lightbox='group'><img src='" + this.src + "' alt='" + this.alt + "'></a>");
          });
        });
      }, function showComments() {
        $('#com-switch').click(function () {
          if ($('#post-comments').css('display') == 'none') {
            $('#post-comments').css('display', 'block').addClass('syuanpi fallIn-light');
            $(this).removeClass('syuanpi').css('transform', 'rotate(180deg)');
          } else {
            $(this).addClass('syuanpi').css('transform', '');
            $('#post-comments').removeClass('fallIn-light').addClass('riseOut-light').one('webkitAnimationEnd AnimationEnd', function () {
              $(this).removeClass('syuanpi riseOut-light').css('display', 'none');
            });
          }
        });
      }];
      tasks.forEach(function (fn) {
        return fn();
      });
    }
    this.config = config;
    return boot.call(this);
  }

  nlvi.prototype.base = function (config) {
    var base = {
      isBanderole: function() {
        return config.scheme === 'banderole';
      },
      isBalance: function() {
        return config.scheme === 'balance';
      },
      closeAnimate: function() {
        return tools.opreateClass('.syuanpi', 'syuanpi', 'remove');
      }
    };
    return base;
  };

  nlvi.prototype.tools = function (tool) {
    var tools = {
      opreateClass: function(ele, cls, opt) {
        return opt === 'remove' ? $(ele).removeClass(cls) : $(ele).addClass(cls);
      },

      existClass: function(ele, cls) {
        return $(ele).hasClass(cls);
      },

      scroll: function(win) {
        return function (fn) {
          $(win).scroll(function () {
            var sct = $(win).scrollTop();
            fn.call(this, sct);
          });
        };
      }
    };
    return tools[tool];
  };

  nlvi.prototype.utils = function () {
    var that = this
    var utils = {
      mobileHeader: function() {
        function resetMobileMenu() {
          $('.mobile-header').css({
            top: $('.mobile-header-nav').height() - $('.mobile-header').height()
          });
        }
        function closeMobileMenu() {
          that.tools('opreateClass')('#mobile-left', 'item-clicked', 'remove');
          resetMobileMenu();
        }
        function openMobileMenu() {
          that.tools('opreateClass')('#mobile-left', 'item-clicked');
          $('.mobile-header').css('top', '0');
        }
        resetMobileMenu();
        $('#mobile-left').on('click', function () {
          that.tools('opreateClass')(this, 'item-clicked') ? closeMobileMenu() : openMobileMenu();
        });
      },

      tagcloud: function() {
        $('#tags').on('click', function () {
          that.tools('opreateClass')('#tagcloud', 'show', 'add');
          that.tools('opreateClass')('.tagcloud-mask', 'show', 'add');
          that.tools('opreateClass')('.header', 'show', 'add');
        });
        $('.tagcloud-mask').on('click', function () {
          that.tools('opreateClass')('#tagcloud', 'show', 'remove');
          that.tools('opreateClass')('.tagcloud-mask', 'show', 'remove');
          that.tools('opreateClass')('.header', 'show', 'remove');
        });
        $('#mobile-tags').click(function () {
          $('.inner-cloud').css('transform', 'translateX(-96%)');
        });
      },

      showToc: function() {
        var $toclink = $('.toc-link');
        var $headerlink = $('.headerlink');
        var scrollTop = that.tools('scroll')(window);
        scrollTop(function (sct) {
          var headerlinkTop = $.map($headerlink, function (link) {
            return $(link).offset().top;
          });
          $('.title-link a').each(function () {
            if (sct >= 0 && sct < 230) {
              that.tools('opreateClass')(this, 'active', 'add');
            } else {
              that.tools('opreateClass')(this, 'active', 'remove');
            }
          });

          for (var i = 0; i < $toclink.length; i++) {
            var isLastOne = i + 1 === $toclink.length,
                currentTop = headerlinkTop[i],
                nextTop = isLastOne ? Infinity : headerlinkTop[i + 1];

            if (currentTop < sct + 200 && sct + 200 <= nextTop) {
              that.tools('opreateClass')($toclink[i], 'active', 'add');
            } else {
              that.tools('opreateClass')($toclink[i], 'active', 'remove');
            }
          }
        });
      },

      titleStatus: function() {
        var title = document.title;
        var tme;
        document.addEventListener('visibilitychange', function () {
          var sct = Math.floor($(window).scrollTop() / ($(document).height() - $(window).height()) * 100);
          if ($(document).height() - $(window).height() === 0) sct = 100;
          if (document.hidden) {
            clearTimeout(tme);
            document.title = 'Read ' + sct + '% · ' + title;
          } else {
            document.title = 'Welcome Back · ' + title;
            tme = setTimeout(function () {
              document.title = title;
            }, 3000);
          }
        });
      },

      search: function() {
        var $search = $('#search');
        var $mask = $('#mask');
        var $header = $('#search-header');
        var $input = $('#local-search-input');
        var $result = $('#local-search-result');

        $search.click(function () {
          $('.search').show();
          if ($('.search-wrapper').hasClass('syuanpi')) {
            $('.search-wrapper').addClass('bloom');
          }
        });
        $mask.click(function () {
          if ($('.search-wrapper').hasClass('syuanpi')) {
            $('.search-wrapper').removeClass('bloom').addClass('dead').one('webkitAnimationEnd AnimationEnd', function () {
              $(this).removeClass('dead');
              $('.search').hide();
            });
          } else $('.search').hide();
        });
        $header.click(function () {
          if ($('.search-wrapper').hasClass('syuanpi')) {
            $('.search-wrapper').removeClass('bloom').addClass('dead').one('webkitAnimationEnd AnimationEnd', function () {
              $(this).removeClass('dead');
              $('.search').hide();
            });
          } else $('.search').hide();
        });

        $.ajax({
          url: that.config.baseUrl + 'search.xml',
          dataType: 'xml',
          success: function success(xmlResponse) {
            var searchData = $('entry', xmlResponse).map(function () {
              return {
                title: $('title', this).text(),
                content: $('content', this).text(),
                url: $('url', this).text()
              };
            }).get();

            $input.on('input', function (e) {
              if (e.target.value.length = 0 || e.target.value == '') {
                $header.removeClass('slide');
                $input.removeClass('slide');
                $result.removeClass('slide');
                $header.removeClass('fadeOut').addClass('fadeIn');
                $result.html('');
              } else {
                $header.addClass('slide');
                $input.addClass('slide');
                $result.addClass('slide');
                $header.removeClass('fadeIn').addClass('fadeOut');
                $result.show();
                var str = '<ul class=\"search-result-list syuanpi back-1 riseIn-light\">';
                var keywords = this.value.trim().toLowerCase().split(/[\s\-]+/);
                $result.html('');
                if (this.value.trim().length <= 0) {
                  return;
                }
                searchData.forEach(function (data) {
                  var isMatch = true;
                  var data_title = data.title.trim().toLowerCase();
                  var data_content = data.content.trim().replace(/<[^>]+>/g, "").toLowerCase();
                  var data_url = data.url;
                  var index_title = -1;
                  var index_content = -1;
                  var first_occur = -1;
                  // only match artiles with not empty titles and contents
                  if (data_title != '' && data_content != '') {
                    keywords.forEach(function (keyword, i) {
                      index_title = data_title.indexOf(keyword);
                      index_content = data_content.indexOf(keyword);
                      if (index_title < 0 && index_content < 0) {
                        isMatch = false;
                      } else {
                        if (index_content < 0) {
                          index_content = 0;
                        }
                        if (i == 0) {
                          first_occur = index_content;
                        }
                      }
                    });
                  }
                  // show search results
                  if (isMatch) {
                    str += "<li class='search-result-item'><a href='" + data_url + "' class='search-result-title'>" + data_title + "</a>";
                    var content = data.content.trim().replace(/<[^>]+>/g, "");
                    if (first_occur >= 0) {
                      // cut out 100 characters
                      var start = first_occur - 20;
                      var end = first_occur + 80;
                      if (start < 0) {
                        start = 0;
                      }
                      if (start == 0) {
                        end = 100;
                      }
                      if (end > content.length) {
                        end = content.length;
                      }
                      var match_content = content.substr(start, end);
                      // highlight all keywords
                      keywords.forEach(function (keyword) {
                        var regS = new RegExp(keyword, "gi");
                        match_content = match_content.replace(regS, "<span class=\"search-keyword\">" + keyword + "</span>");
                      });

                      str += "<p class=\"search-result\">" + match_content + "...</p>";
                    }
                    str += "</li>";
                  }
                });
                str += "</ul>";
                str += "<hr class='end-line'>";
                $result.html(str);
              }
            });
          }
        });
      },

      back2top: function() {
        var scrollTop = that.tools('scroll')(window);
        scrollTop(function (sct) {
          if (sct > 110) {
            that.tools('opreateClass')('#backtop', 'bloom', 'add');
            that.tools('opreateClass')('#backtop', 'dead', 'remove');
          } else {
            that.tools('opreateClass')('#backtop', 'dead', 'add');
            that.tools('opreateClass')('#backtop', 'bloom', 'remove');
          }
          var scrollPercentRounded = Math.floor(sct / ($(document).height() - $(this).height()) * 100);
          $('#scrollpercent').html(scrollPercentRounded);
        });
        $('.toTop').on('click', function () {
          $('html, body').animate({
            scrollTop: 0
          });
        });
      },

      switchToc: function() {
        function tocHide() {
          $('.toc-inner').addClass('riseOut-light').one('webkitAnimationEnd AnimationEnd', function () {
            $(this).hide();
          });
        }
        $('.toc-inner').one('webkitAnimationEnd AnimationEnd', function () {
          that.tools('opreateClass')('.toc-inner', 'fallIn-light', 'remove');
          that.tools('opreateClass')('#toc-switch', 'not-toc');
        });
        tocHide();
        $('#toc-switch').on('click', function () {
          if (that.tools('existClass')(this, 'not-toc')) {
            that.tools('opreateClass')(this, 'not-toc', 'remove');
            that.tools('opreateClass')('.toc-inner', 'riseOut-light', 'remove');
            that.tools('opreateClass')('.toc-inner', 'fallIn-light');
            $('.toc-inner').show();
            that.tools('opreateClass')('.container-inner', 'has_toc');
          } else {
            tocHide();
            that.tools('opreateClass')(this, 'not-toc');
            that.tools('opreateClass')('.container-inner', 'has_toc', 'remove');
          }
        });
      }
    };
    var theme = this.config.theme;
    if (this.base(theme).isBalance()) {
      utils.back2top = function () {
        that.tools('opreateClass')('#backtop', 'dead', 'remove');
        var scrollTop = that.tools('scroll')(window);
        scrollTop(function (sct) {
          var scrollPercentRounded = Math.floor(sct / ($(document).height() - $(this).height()) * 100);
          $('#scrollpercent').html(scrollPercentRounded);
        });
        $('.toTop').on('click', function () {
          $('html, body').animate({
            scrollTop: 0
          });
        });
      };
      utils.switchToc = function () {
        function tocHide() {
          $('.toc-inner').addClass('riseOut-light').one('webkitAnimationEnd AnimationEnd', function () {
            $(this).hide();
          });
        }
        $('.toc-inner').one('webkitAnimationEnd AnimationEnd', function () {
          that.tools('opreateClass')('.toc-inner', 'fallIn-light', 'remove');
          that.tools('opreateClass')('#toc-switch', 'not-toc');
        });
        tocHide();
        $('#toc-switch').on('click', function () {
          if (that.tools('existClass')(this, 'not-toc')) {
            that.tools('opreateClass')(this, 'not-toc', 'remove');
            that.tools('opreateClass')('.toc-inner', 'riseOut-light', 'remove');
            that.tools('opreateClass')('.toc-inner', 'fallIn-light');
            $('.toc-inner').show();
            that.tools('opreateClass')('.menu-item', 'has_toc');
            that.tools('opreateClass')('.main-nav', 'has_toc');
          } else {
            tocHide();
            that.tools('opreateClass')(this, 'not-toc');
            that.tools('opreateClass')('.menu-item', 'has_toc', 'remove');
            that.tools('opreateClass')('.main-nav', 'has_toc', 'remove');
          }
        });
      };
      utils.tagcloud = function () {
        function tagHide() {
          $('#tagcloud').addClass('dead').one('webkitAnimationEnd AnimationEnd', function () {
            $(this).hide();
            that.tools('opreateClass')('#tagcloud', 'show syuanpi bloom dead', 'remove');
            that.tools('opreateClass')('.menu-item', 'has_tag', 'remove');
            that.tools('opreateClass')('.main-nav', 'has_tag', 'remove');
          });
        }
        $('#tags').on('click', function () {
          if (that.tools('existClass')('#tagcloud', 'show')) {
            tagHide();
          } else {
            $('#tagcloud').show();
            that.tools('opreateClass')('#tagcloud', 'show syuanpi bloom');
            that.tools('opreateClass')('.menu-item', 'has_tag');
            that.tools('opreateClass')('.main-nav', 'has_tag');
          }
        });
      };
    }
    return utils;
  };

  nlvi.prototype.pjax = function () {
    var that = this;
    $(document).pjax('a', '.container-inner', { fragment: '.container-inner' });
    $(document).on('pjax:start', function () {
      that.tools('opreateClass')('.container-inner', 'fadeOut');
      that.tools('opreateClass')('.container-inner', 'fadeIn', 'remove');
    });
    $(document).on('pjax:end', function () {
      that.tools('opreateClass')('.container-inner', 'fadeIn');
      that.tools('opreateClass')('.container-inner', 'fadeOut', 'remove');
      that.bootstrap();
    });
  };

  nlvi.prototype.bootstrap = function () {
    var theme = this.config.theme;
    var utils = this.utils();

    theme.pjax && this.pjax();
    utils.titleStatus();
    utils.mobileHeader();
    utils.back2top();
    // utils.tagcloud();
    utils.showToc();
    // utils.switchToc();
    theme.search && utils.search();
  };

  var app = new nlvi(window.NlviConfig);
  app.bootstrap();
  app.utils().tagcloud();
  app.utils().switchToc();
  window.nlvi = app;
}(window);