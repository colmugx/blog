document.addEventListener('DOMContentLoaded', function() {
  document.body.addEventListener('touchstart', function () {});
  var app = new Nlvi(nlviconfig);
  app.showToc();
  app.back2top();
  app.switchToc();
  app.titleStatus();
  app.init();
  app.pushHeader();
});
$(document).ready(function() {
  $('.container').show();
});
