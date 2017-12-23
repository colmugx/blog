if (nCONFIG.theme == 'banderole') {
  Nlvi.utils.back2top = function() {
    var scrollTop = Nlvi.tools.scroll(window);
    scrollTop(function(sct) {
      if (sct > 110) {
        Nlvi.tools.opreateClass('#backtop', 'bloom', 'add');
        Nlvi.tools.opreateClass('#backtop', 'dead', 'remove');
      } else {
        Nlvi.tools.opreateClass('#backtop', 'dead', 'add');
        Nlvi.tools.opreateClass('#backtop', 'bloom', 'remove');
      }
      var scrollPercentRounded = Math.floor(
        sct 
        / ($(document).height() - $(this).height())
        * 100
      );
      $('#scrollpercent').html(scrollPercentRounded);
    });
    $('.toTop').on('click', function () {
      $('html, body').animate({
        scrollTop: 0
      });
    });
  }

  Nlvi.utils.switchToc = function() {
    function tocHide() {
      $('.toc-inner').addClass('riseOut-light').one('webkitAnimationEnd AnimationEnd', function() {
        $(this).hide();
      });
    }
    $('.toc-inner').one('webkitAnimationEnd AnimationEnd', function() {
      Nlvi.tools.opreateClass('.toc-inner', 'fallIn-light', 'remove');
      Nlvi.tools.opreateClass('#toc-switch', 'not-toc');
    });
    tocHide();
    $('#toc-switch').on('click', function() {
      if (Nlvi.tools.existClass(this, 'not-toc')) {
        Nlvi.tools.opreateClass(this, 'not-toc', 'remove');
        Nlvi.tools.opreateClass('.toc-inner', 'riseOut-light', 'remove');
        Nlvi.tools.opreateClass('.toc-inner', 'fallIn-light');
        $('.toc-inner').show();
        Nlvi.tools.opreateClass('.container-inner', 'has_toc');
      } else {
        tocHide();
        Nlvi.tools.opreateClass(this, 'not-toc');
        Nlvi.tools.opreateClass('.container-inner', 'has_toc', 'remove');
      }
    })
  }


  Nlvi.utils.refreshSearch = function($header) {
    var nowDate = new Date();
    var hour = nowDate.getHours();
    if (hour >= 8 && hour < 11) {
      $header.html(GREETING.morning);
    } else if (hour >= 11 && hour < 13) {
      $header.html(GREETING.noon);
    } else if (hour >= 13 && hour < 18) {
      $header.html(GREETING.after);
    } else if (hour >= 18 && hour < 23) {
      $header.html(GREETING.night);
    } else if (hour >= 23 && hour < 1) {
      $header.html(GREETING.midnight);
    } else if (hour >= 1 && hour < 8) {
      $header.html(GREETING.midnight);
    }
  }

}