$('.form_rounded_box .form_title h2').on('click', function () {
  var ths = $(this);
  var THIS = $(this).parents('.form_rounded_box');
  var winW = $(window).width();
  if (THIS.hasClass('activeBox')) {
    THIS.removeClass('activeBox');
    THIS.siblings().removeClass('activeBox');
    THIS.siblings().find('.innerDetails').slideUp();
    THIS.find('.innerDetails').slideUp();
  } else {
    THIS.siblings().removeClass('activeBox');
    THIS.addClass('activeBox');
    THIS.siblings().find('.innerDetails').slideUp();
    THIS.find('.innerDetails').slideDown();
    if (winW < 992) {
      setTimeout(function () {
        var scrollPos = ths.parents('.form_rounded_box.activeBox').offset().top - 20;
        $('body,html').animate({
          scrollTop: scrollPos - $('header').outerHeight()
        }, 500);
      }, 500);
    } else {
      setTimeout(function () {
        var scrollPos = ths.parents('.form_rounded_box.activeBox').offset().top - 20;
        $('body,html').animate({
          scrollTop: scrollPos - $('header').outerHeight()
        }, 500);
      }, 500);
    }
  }
});