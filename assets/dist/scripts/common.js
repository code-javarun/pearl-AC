AOS.init();
/* page loader */
$(window).on('load', function () {
  var urlhash = window.location.hash;
  setTimeout(function () {
    $('.page-loader').fadeOut('slow');
    if (urlhash.length > 0) {
      $('.anchor-tabs a[href="' + urlhash + '"]').click();
      //console.log(urlhash);
    }
  }, 500);

  /* on tab click open particular tab on other page */

  if (urlhash.length > 0 && $('.rounded-tabs').length > 0) {
    setTimeout(function () {
      $('.rounded-tabs [data-bs-target="' + urlhash + '"]').click();
    }, 500);
    //console.log(urlhash);
    //$("html, body").animate({scrollTop: 0}, 0);

    //// uncomment below code if want to scroll to the tabs section
    var scrollDivPos = $('.rounded-tabs [data-bs-target="' + urlhash + '"]').offset().top;
    $('body,html').animate({
      scrollTop: scrollDivPos - ($('header').height() + 100)
    }, 1000);
    $(".has-subnav .subnav li a").each(function () {
      //console.log(href);
      $(this).on('click', function () {
        var href = $(this).attr('href');
        var hashindex = href.split('#')[1];
        $('.rounded-tabs [data-bs-target="#' + hashindex + '"]').trigger('click');
      });
    });
  }
  /* @end on tab click open particular tab on other page */

  if ($('.pageActive').length > 0) {
    console.log('pageactive');
    $(window).on('scroll', function () {
      var navHeight = $(window).height() - ($('header').height() + 180);
      if ($(window).scrollTop() > navHeight - $('header').height()) {
        $('.pageActive').closest('.section-pb').addClass('fixed').css({
          top: $('header').height()
        });
      } else {
        $('.pageActive').closest('.section-pb').removeClass('fixed');
      }
    });
    setTimeout(function () {
      var actTab = $(".rounded-tabs a.active");
      var ActscrollArea = actTab.closest('.rounded-tabs');
      var leftOffsetTab = actTab.offset().left - ActscrollArea.offset().left + ActscrollArea.scrollLeft() - 40;
      ActscrollArea.animate({
        scrollLeft: leftOffsetTab
      });
    }, 1000);
  }
});
/* @end page loader */

function setHeight() {
  const header_elmnt = document.querySelector("header");
  let header_height = +header_elmnt.offsetHeight + "px";
  console.log(header_height);
  document.querySelector("body").style.paddingTop = header_height;
}

/* fixed-bottom mobile */
function setBtmBarHeight() {
  const btm_elmnt = document.querySelector(".fixed-bottom");
  if (btm_elmnt) {
    let btm_height = +btm_elmnt.offsetHeight + "px";
    document.querySelector("body").style.paddingBottom = btm_height;
  }
}
/* @end fixed-bottom mobile */

setHeight();
setBtmBarHeight();
$(window).resize(function () {
  setHeight();
  setBtmBarHeight();
});
$(function () {
  setHeight();
  tab_slide_line();
  // datepicker
  if ($('#datepicker').length > 0) {
    var date = new Date();
    date.setDate(date.getDate());
    $('#datepicker').datepicker({
      format: 'dd M yyyy',
      uiLibrary: 'bootstrap5',
      autoclose: true,
      todayHighlight: true,
      startDate: date
    });
    $('#datepicker').datepicker('setDate', today);
  }
  /* footer accordion */
  $(document).on("click", ".accordian-item h2", function () {
    if ($(window).width() <= 1024) {
      if ($(this).hasClass('active')) {
        //console.log('active')
        $(this).removeClass('active');
        $(this).next('.accordian_content').slideUp();
      } else {
        //console.log('inactive');
        $(this).parents('.accordian-item').find('h2').removeClass('active');
        $(this).parents('.accordian-item').find('.accordian_content').slideUp();
        $(this).addClass('active').parents('.accordian-item').siblings().find('h2').removeClass('active');
        $(this).next('.accordian_content').slideDown().parents('.accordian-item').siblings().find('.accordian_content').slideUp();
      }
    }
  });
  /* @end footer accordion */

  if ($('.hero_image_slider').length > 0) {
    $('.hero_image_slider').slick({
      dots: true,
      arrows: false,
      speed: 1000,
      autoplay: true,
      autoplaySpeed: 10000,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerPadding: '0px',
      pauseOnHover: false
    });
    var heroslider_length = $('.hero_image_slider .slick-slide').length;
    if (heroslider_length <= 1) {
      console.log('less than 2');
      $('.hero_image_slider').addClass('no-slider');
    }
  }
});

/* main nav */
function open_menu() {
  //$('.top-nav, .main-nav').show();
}
function close_menu() {
  //$('.top-nav, .main-nav').hide();
}
$('.navbar-toggler').on('click', function () {
  if ($(this).hasClass('active')) {
    console.log('');
    $(this).removeClass('active');
    $('body, html').removeClass('nav-open');
    close_menu();
  } else {
    $(this).addClass('active');
    $('body, html').addClass('nav-open');
    open_menu();
  }
});
if ($(window).width() > 992) {
  $('.main-nav .nav .nav-item.has-subnav').on('mouseenter', function () {
    $(this).addClass('menu-active');
  }).on('mouseleave', function () {
    $(this).removeClass('menu-active');
  });
}
if ($(window).width() <= 992) {
  $('.has-subnav > .level1').on('click', function () {
    $('.subnav').slideUp();
    if ($(this).parent().find('.subnav').is(':visible')) {
      $(this).parent().find('.subnav').slideUp();
    } else {
      $(this).parent().find('.subnav').slideDown();
    }
  });
}
if ($(window).width() <= 992) {
  $('.has-megamenu .level2').on('click', function () {
    //console.log('clicked');
    $('.menu-content ul').slideUp();
    $('.has-megamenu .level2').removeClass('sub-active');
    if ($(this).closest('.menu-content').find('ul').is(':visible')) {
      $('.menu-content ul').slideUp();
      $('.has-megamenu .level2').removeClass('sub-active');
      //$(this).closest('.menu-content').find('ul').slideToggle();
    } else {
      $(this).closest('.menu-content').find('ul').slideDown();
      $(this).addClass('sub-active');
    }
  });
}
$('.menu-list').each(function () {
  if ($(this).find('img').length) {
    $(this).removeClass('no-submenu');
  } else {
    $(this).addClass('no-submenu');
  }
});
$('.main-nav .nav .nav-item.has-subnav .subnav li a').on('click', function () {
  //e.preventDefault();
  var hashval = $(this).attr('href');
  console.log(hashval);
  if (this.href.indexOf('#') != -1) {
    $('.main-nav .nav .nav-item.has-subnav').removeClass('menu-active');
    if ($(window).width() <= 992) {
      $('.navbar-toggler').trigger('click');
    }
  }
});

/* main nav */

/* header on scroll */
scrollheader();
$(window).resize(function () {
  scrollheader();
});
function scrollheader() {
  var width = $(window).width();
  console.log(width);
  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      // if( $(window).width() > 991){
      //   $('.top-nav').slideUp();
      // }
      $('header').addClass('headerNew');
    } else {
      // if( $(window).width() > 991){
      //   $('.top-nav').slideDown(100);
      // }
      $('header').removeClass('headerNew');
    }
  });
}
/* @end header on scroll */

/* tabs click function to slide left */
$('.nav-tabs [data-bs-toggle="tab"]').on('click', function (e) {
  var self = $(this);
  var scrollArea = self.closest('.nav-tabs');
  var leftOffset = self.offset().left - scrollArea.offset().left + scrollArea.scrollLeft() - 40;
  scrollArea.animate({
    scrollLeft: leftOffset
  });
});

/* tabs click function */

/* anchor scrolling  */
var sections = $('section[id]'),
  nav = $('.anchor-tabs'),
  nav_height = nav.outerHeight(),
  headerHeight = $('header').height();
if ($('.anchor-tabs').length > 0) {
  $('.anchor-tabs').parent().addClass('mb-0');
  $(document).on('click', '.anchor-tabs a[href^="#"]', function (event) {
    event.preventDefault();
    nav_height = nav.outerHeight(), headerHeight = $('header').height();
    var scrollPos = $($.attr(this, 'href')).offset().top;
    if ($("section").hasClass("fixed")) {
      $('body,html').animate({
        scrollTop: scrollPos - (headerHeight + nav_height + 40)
      }, 500);
    } else {
      if ($(window).width() < 1024) {
        $('body,html').animate({
          scrollTop: scrollPos - (headerHeight + nav_height + headerHeight + 30)
        }, 500);
      } else {
        $('body,html').animate({
          scrollTop: scrollPos - (headerHeight + nav_height + headerHeight + 25)
        }, 500);
      }
    }
    var self = $(this);
    var scrollArea = self.closest('.nav-tabs');
    var leftOffset = self.offset().left - scrollArea.offset().left + scrollArea.scrollLeft() - 30;
    scrollArea.animate({
      scrollLeft: leftOffset
    });
  });
  $(window).on('scroll', function () {
    var navHeight = $(window).height() - ($('header').height() + 180);
    if ($(window).scrollTop() > navHeight - $('header').height()) {
      $('.anchor-tabs').closest('.section-pb').addClass('fixed').css({
        top: $('header').height()
      });
    } else {
      $('.anchor-tabs').closest('.section-pb').removeClass('fixed');
    }
    nav_height = nav.outerHeight(), headerHeight = $('header').height();
    var cur_pos = $(this).scrollTop();
    sections.each(function () {
      var top,
        bottom = top + $(this).outerHeight();
      if ($("section").hasClass("fixed")) {
        top = $(this).offset().top - (headerHeight + nav_height + 50);
      } else {
        top = $(this).offset().top - (headerHeight + nav_height + headerHeight + 50);
      }
      var top = $(this).offset().top - (headerHeight + nav_height + 50),
        bottom = top + $(this).outerHeight();
      if (cur_pos >= top && cur_pos <= bottom) {
        nav.find('a').removeClass('active');
        sections.removeClass('active');
        $(this).addClass('active');
        nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
        // var scrollArea = $('.anchor-tabs');
        // var leftOffset = nav.find('a[href="#'+$(this).attr('id')+'"]').offset().left - //scrollArea.offset().left + scrollArea.scrollLeft();
        // //scrollArea.animate({ scrollLeft: 120 });
        // scrollArea.css({ "transform": "translate3d(-" + leftOffset + "px, 0px, 0px)" });
      }
    });
  });
}
/* @nd  anchor scrolling  */

/* numbers section */
if ($('.numbers-section').length > 0) {
  var counted = 0;
  $(window).scroll(function () {
    var oTop = $('.numbers-section').offset().top - window.innerHeight;
    if (counted == 0 && $(window).scrollTop() > oTop) {
      $('.count').each(function () {
        var $this = $(this),
          countTo = $this.attr('data-count');
        $({
          countNum: $this.text()
        }).animate({
          countNum: countTo
        }, {
          duration: 2000,
          easing: 'swing',
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum);
            //alert('finished');
          }
        });
      });

      counted = 1;
    }
  });
}
/* @end numbers section */

/* common slick carousels */
if ($('.pearl-slider').length > 0) {
  $('.pearl-slider').slick({
    dots: false,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: '60px',
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: true,
        arrows: false
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: true,
        arrows: false
      }
    }, {
      breakpoint: 480,
      settings: {
        slidesToShow: 1.07,
        slidesToScroll: 1,
        dots: true,
        arrows: false
      }
    }]
  });
}
if ($('.single_image_slider').length > 0) {
  $('.single_image_slider').slick({
    dots: false,
    arrows: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    infinite: true,
    pauseOnHover: false,
    pauseOnFocus: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: '0px',
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        centerPadding: '40px'
      }
    }, {
      breakpoint: 480,
      settings: {
        slidesToShow: 1.07,
        slidesToScroll: 1,
        dots: true,
        arrows: false
      }
    }]
  });
}
$('.slick-slider').each(function () {
  var slider_length = $(this).find('.slick-slide').length;
  console.log(slider_length);
  if (slider_length <= 1) {
    console.log('less than 2');
    $(this).addClass('no-slider');
  }
});
/* @end common slick carousel of 3 crads */

/* image gallery lightbox */
if ($('[data-fancybox]').length > 0) {
  Fancybox.bind('[data-fancybox="gallery"]', {
    Thumbs: false,
    protect: true,
    animationDuration: 600,
    Toolbar: {
      display: {
        left: [],
        middle: [],
        right: ["close"]
      }
    }
  });
}
if ($('.show_on_mobile [data-fancybox]').length > 0) {
  Fancybox.bind('[data-fancybox="mob_gallery"]', {
    Thumbs: false,
    Toolbar: {
      display: {
        left: [],
        middle: [],
        right: ["close"]
      }
    }
  });
}

/* @end image gallery lightbox */

/* if slider within tabs */
$('[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
  console.log('tab changed');
  if ($('.slick-slider').length > 0) {
    $('.slick-slider').slick('setPosition');
  }
});
/* @end if slider within tabs */

/* video modal */
$(function () {
  var $videoSrc;
  $('.vid_link').click(function () {
    $videoSrc = $(this).data("src");
  });
  //console.log($videoSrc);	
  $('#videoModal').on('shown.bs.modal', function (e) {
    $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0?&rel=0");
  });
  $('#videoModal').on('hide.bs.modal', function (e) {
    $("#video").attr('src', $videoSrc);
  });
});

/* video modal */

/* read more less js */
function read_more() {
  var showChar = 180;
  var ellipsestext = "...";
  var moretext = "Read more";
  var lesstext = " Read less";

  //Cut content based on showChar length
  if ($(".readmore-toggle-text").length) {
    $(".readmore-toggle-text").each(function () {
      var content = $(this).find('p').html();
      //console.log(content);
      console.log(content.length);
      if (content.length > showChar) {
        var contentExcert = content.substr(0, showChar);
        var contentRest = content.substr(showChar, content.length - showChar);
        var html = contentExcert + '<span class="toggle-text-ellipses">' + ellipsestext + ' </span> <span class="toggle-text-content"><span>' + contentRest + '</span><a href="javascript:;" class="toggle-text-link">' + moretext + '</a></span>';
        $(this).html(html);
      }
    });
  }
  $(".toggle-text-link").click(function () {
    if ($(this).hasClass("less")) {
      $(this).removeClass("less");
      $(this).html(moretext);
    } else {
      $(this).addClass("less");
      $(this).html(lesstext);
    }
    $(this).parent().prev().toggle();
    $(this).prev().toggle();
    return false;
  });
}
if (window.matchMedia("(max-width: 768px)").matches) {
  read_more();
} else {}
window.addEventListener('resize', function (event) {
  if (window.matchMedia("(max-width: 768px)").matches) {
    read_more();
  }
});
if ($('.moreless-button').length > 0) {
  $('.moreless-button').click(function () {
    $(this).parent().find('.moretext').slideToggle();
    if ($(this).text() == "Read more") {
      $(this).text(" Read less");
    } else {
      $(this).text("Read more");
      $('body,html').animate({
        scrollTop: $(this).parent().offset().top - 120
      }, 500);
    }
  });
}

/* @end read more less js */

/* load more */
if ($('.load_more_row .col-md-6').length > 0) {
  $(".load_more_row").each(function () {
    $(this).find(".col-md-6").slice(0, 4).show();
  });
  $(".load_more_btn").on("click", function (e) {
    e.preventDefault();
    if ($('.tab-content').length > 0) {
      $(this).closest('.tab-pane').find(".load_more_row .col-md-6:hidden").slice(0, 2).slideDown();
      if ($(this).closest('.tab-pane').find(".load_more_row .col-md-6:hidden").length === 0) {
        $(this).text("No more content").addClass("noContent");
      }
    } else {
      $(this).closest('.load_more_container').find(".load_more_row [class^='col-']:hidden").slice(0, 2).slideDown();
      if ($(this).closest('.load_more_container').find(".load_more_row [class^='col-']:hidden").length == 0) {
        $(this).text("No more content").addClass("noContent");
      }
    }
  });
}
if ($('.load_more_row .col-md-4').length > 0) {
  $(".load_more_row").each(function () {
    $(this).find(".col-md-4").slice(0, 9).show();
    if ($(this).find(".col-md-4").length <= 9) {
      $(this).next(".load_more_btn_wrap").find('.load_more_btn').hide();
    } else {
      $(this).next(".load_more_btn_wrap").find('.load_more_btn').show();
    }
  });
  $(".load_more_btn").on("click", function (e) {
    e.preventDefault();
    if ($(this).closest('section').find('.tab-content').length > 0) {
      //alert('check section');
      $(this).closest('.tab-pane').find(".load_more_row .col-md-4:hidden").slice(0, 9).slideDown();
      if ($(this).closest('.tab-pane').find(".load_more_row .col-md-4:hidden").length === 0) {
        //  $(this).text("No ").addClass("noContent");
        $(this).hide();
      } else {
        $(this).show();
      }
    } else {
      $(this).closest('.load_more_container').find(".load_more_row [class^='col-']:hidden").slice(0, 3).slideDown();
      if ($(this).closest('.load_more_container').find(".load_more_row [class^='col-']:hidden").length == 0) {
        $(this).hide();
      } else {
        $(this).show();
      }
    }
  });
}
if ($('.logo_with_load_more').length > 0) {
  $(".logo_with_load_more").each(function () {
    $(this).find(".top-partnership .col-md-3").slice(0, 4).show();
    var logolength = $(this).find('.top-partnership .col-md-3').length;
    if (logolength > 4) {
      $(this).find('.load_more_btn_wrap').show();
    }
  });
  $(".logo_with_load_more .btn").on("click", function (e) {
    e.preventDefault();
    $(this).closest('.logo_with_load_more').find(".top-partnership [class^='col-']:hidden").slice(0, 4).slideDown();
    if ($(this).closest('.logo_with_load_more').find(".top-partnership [class^='col-']:hidden").length == 0) {
      $(this).parent().hide();
    }
  });
}
/* @end load more */

/* top search */
$('body').on('click', function () {
  $('.header_search_container').slideUp('slow');
});
$('.header_search_container').css({
  'top': $('header').height()
});
$('.search-btn').on('click', function (e) {
  $('.header_search_container').slideDown('slow');
  e.stopPropagation();
});
$('.header_search_container .close').on('click', function (e) {
  $('.header_search_container').slideUp('slow');
  e.stopPropagation();
});
$('.header_search_container').on('click', function (e) {
  e.stopPropagation();
});

/* @end top search */

if ($('.filter-button').length > 0) {
  $('.filter-button').on('click', function () {
    //var selected_programs = $('.selected_programs').html();
    // /$('.filter_toggle_content .filter_content .inner_content').append(selected_programs);
    $('.filter_toggle_content .filter_content').slideDown();
  });
  $('.filter_toggle_content .filter_content .close-btn, .filter_toggle_content .apply_filter .btn').on('click', function () {
    $('.filter_toggle_content .filter_content').slideUp();
  });
}
if ($('.accordion').length > 0) {
  $(document).on('click', '.accordion-button', function () {
    var $acordionBtn = $(this);
    console.log($acordionBtn.text());
    setTimeout(function () {
      $('html, body').animate({
        scrollTop: $acordionBtn.offset().top - ($('header').height() + 80)
      }, 10);
    }, 500);
  });
}
$(document).on('click', '.read_more_content .cta_with_arrow', function () {
  $(this).parents('.read_more_content').find('.more_content').addClass('open');
  $(this).parents('.read_more_content').find('.inner_footer').fadeIn();
  $(this).parents('.read_more_content').find('.common-card-body').addClass('addOpacity');
});
$(document).on('click', '.back_btn', function (e) {
  $(this).parent('.inner_footer').fadeOut();
  $(this).closest('.read_more_content').find('.more_content').removeClass('open');
  $(this).parents('.read_more_content').find('.common-card-body').removeClass('addOpacity');
});
function tab_slide_line() {
  if ($(".common-tabs").length > 0) {
    $(".common-tabs").each(function () {
      var $nav = $(this),
        $slideLine = $nav.parent().find('.slide-line'),
        $currentItem = $nav.find('li:first-child');
      $(function () {
        if ($currentItem[0]) {
          $slideLine.css({
            //"width": $currentItem.width(),
            //"left": $currentItem.position().left
          });
        }
        $nav.find("li").hover(function () {
          $slideLine.css({
            "width": $(this).width(),
            "left": $(this).position().left
          });
        },
        // Hover out
        function () {
          if ($currentItem[0]) {
            $slideLine.width(0);
          } else {
            // Disapear
            $slideLine.width(0);
          }
        });
      });
    });
  }
}

/* timeline js */
if ($('.process-main').length > 0 && $('.process-nav').length > 0) {
  $('.process-main').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    draggable: false,
    swipe: false,
    touchMove: false,
    infinite: false,
    asNavFor: '.process-nav',
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  });
  $('.process-nav').slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    asNavFor: '.process-main',
    dots: true,
    arrows: true,
    //centerMode: true,
    focusOnSelect: true,
    infinite: false,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: true,
        arrows: false
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: true,
        arrows: false
      }
    }, {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: true,
        arrows: false
      }
    }]
  });
}
if ($('.timelineList').length > 0) {
  (function () {
    const timeline = document.querySelector(".timeline ol"),
      elH = document.querySelectorAll(".timeline li > div"),
      arrows = document.querySelectorAll(".timeline .arrows .arrow"),
      arrowPrev = document.querySelector(".timeline .arrows .arrow__prev"),
      arrowNext = document.querySelector(".timeline .arrows .arrow__next"),
      firstItem = document.querySelector(".timeline li:first-child"),
      lastItem = document.querySelector(".timeline li:last-child"),
      disabledClass = "disabled";
    var xScrolling = 450;
    if ($(window).width() < 1920) {
      xScrolling = 450;
    }
    if ($(window).width() < 992) {
      xScrolling = 250;
    }
    window.addEventListener("load", init);
    function init() {
      setEqualHeights(elH);
      animateTl(xScrolling, arrows, timeline);
      setSwipeFn(timeline, arrowPrev, arrowNext);
      setKeyboardFn(arrowPrev, arrowNext);
    }
    function setEqualHeights(el) {
      let counter = 0;
      for (let i = 0; i < el.length; i++) {
        const singleHeight = el[i].offsetHeight;
        if (counter < singleHeight) {
          counter = singleHeight;
        }
      }
      for (let i = 0; i < el.length; i++) {
        el[i].style.height = `${counter}px`;
      }
    }
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
    }
    function setBtnState(el, flag = true) {
      if (flag) {
        el.classList.add(disabledClass);
      } else {
        if (el.classList.contains(disabledClass)) {
          el.classList.remove(disabledClass);
        }
        el.disabled = false;
      }
    }
    function animateTl(scrolling, el, tl) {
      let counter = 0;
      for (let i = 0; i < el.length; i++) {
        el[i].addEventListener("click", function () {
          if (!arrowPrev.disabled) {
            arrowPrev.disabled = true;
          }
          if (!arrowNext.disabled) {
            arrowNext.disabled = true;
          }
          const sign = this.classList.contains("arrow__prev") ? "" : "-";
          if (counter === 0) {
            tl.style.transform = `translateX(-${scrolling}px)`;
          } else {
            const tlStyle = getComputedStyle(tl);
            const tlTransform = tlStyle.getPropertyValue("-webkit-transform") || tlStyle.getPropertyValue("transform");
            const values = parseInt(tlTransform.split(",")[4]) + parseInt(`${sign}${scrolling}`);
            tl.style.transform = `translateX(${values}px)`;
          }
          setTimeout(() => {
            isElementInViewport(firstItem) ? setBtnState(arrowPrev) : setBtnState(arrowPrev, false);
            isElementInViewport(lastItem) ? setBtnState(arrowNext) : setBtnState(arrowNext, false);
          }, 500);
          counter++;
        });
      }
    }
    function setSwipeFn(tl, prev, next) {
      const hammer = new Hammer(tl);
      hammer.on("swipeleft", () => next.click());
      hammer.on("swiperight", () => prev.click());
    }
    function setKeyboardFn(prev, next) {
      document.addEventListener("keydown", e => {
        if (e.which === 37 || e.which === 39) {
          const timelineOfTop = timeline.offsetTop;
          const y = window.pageYOffset;
          if (timelineOfTop !== y) {
            window.scrollTo(0, timelineOfTop);
          }
          if (e.which === 37) {
            prev.click();
          } else if (e.which === 39) {
            next.click();
          }
        }
      });
    }
  })();
}

/* @end timelines js */

if ($('.game-theme').length > 0) {
  var myModalEl = document.getElementById('formModal');
  myModalEl.addEventListener('shown.bs.modal', function (event) {
    $('main').removeClass('game-theme');
  });
  myModalEl.addEventListener('hidden.bs.modal', function (event) {
    $('main').addClass('game-theme');
  });
}
function triggerScroll(targetObj) {
  let targetName = targetObj.attr("id"); //for console.log
  let targetFlag = false;
  let scrollTop = $(window).scrollTop();
  let scrollBottom = scrollTop + $(window).height();
  let targetTop = targetObj.offset().top;
  let targetBottom = targetTop + targetObj.height();
  // while loading
  if (scrollBottom > targetTop && scrollTop < targetBottom) {
    if (!targetFlag) {
      console.log(targetName + ' is in sight'); //for console.log
      targetObj.slick('slickPlay');
      targetFlag = true;
    }
  } else {
    console.log(targetName + ' is not in sight'); //for console.log
    targetObj.slick('slickPause');
    targetFlag = false;
  }
  $(window).on('scroll', function () {
    scrollTop = $(window).scrollTop();
    scrollBottom = scrollTop + $(window).height();
    targetTop = targetObj.offset().top;
    targetBottom = targetTop + targetObj.height();
    if (scrollBottom > targetTop && scrollTop < targetBottom) {
      // Start autoplay when entering the viewport
      if (!targetFlag) {
        console.log(targetName + ' is in sight');
        targetObj.slick('slickPlay');
        targetFlag = true;
      }
    } else {
      // Stop autoplay when you get out of the viewport
      if (targetFlag) {
        console.log(targetName + ' is not in sight'); //for console.log
        targetObj.slick('slickPause');
        targetFlag = false;
      }
    }
  });
}

// Execute function
if ($('#studentwork').length > 0) {
  triggerScroll($('#studentwork'));
}
$(".close-icon").click(function () {
  $(this).parents(".apply-now-b").fadeOut();
});

//right side widget call button hover on interval
// var box = document.getElementById('callmeBtn');
// setInterval(function() {
//   box.classList.add('open');
// }, 30000); 
// box.addEventListener('mouseover', function() {
//   box.classList.add('open');
// });
// box.addEventListener('mouseout', function() {
//   box.classList.remove('open');
// });