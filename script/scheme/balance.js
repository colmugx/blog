if (nCONFIG.theme == 'balance') {
  Nlvi.utils.back2top = function() {
    Nlvi.tools.opreateClass('#backtop', 'dead', 'remove');
    var scrollTop = Nlvi.tools.scroll(window);
    scrollTop(function(sct) {
      var scrollPercentRounded = Math.floor(
        sct 
        / ($(document).height() - $(this).height())
        * 100
      );
      $('#scrollpercent').html(scrollPercentRounded);
    })
    $('.toTop').on('click', function () {
      $('html, body').animate({
        scrollTop: 0
      });
    });
  }
}