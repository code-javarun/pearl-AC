$(function () {
  // Only for alpha 

  $(document).on('keypress keyup', ".alfaOnlyInput", function (e) {
    var thisVal = $(this).val();
    var regOne = new RegExp("^[a-zA-Z]+$");
    var regex = new RegExp("^[a-zA-Z]+$");
    var kCd = e.keyCode || e.which;
    if ($(window).width() < 1280) {
      if (kCd == 0 || kCd == 229) {
        kCd = getKeyCode($(this).val());
        if (thisVal.length == 1) {
          if (!regOne.test(kCd)) {
            $(this).val('');
            return false;
          }
        }
        if (!regex.test(kCd)) {
          $(this).val($(this).val().substr(0, $(this).val().length - 1));
          return false;
        }
      }
    }
    var key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (thisVal.length == 0) {
      if (!regOne.test(key)) {
        return false;
      }
    }
    if (kCd != 13) {
      if (!(regex.test(key) || e.charCode == 0)) {
        return false;
      }
    }
  });
  $(document).on('keypress keyup', ".alfaOnlyInputwithspace", function (e) {
    var thisVal = $(this).val();
    var regOne = new RegExp("^[a-zA-Z ]+$");
    var regex = new RegExp("^[a-zA-Z ]+$");
    var kCd = e.keyCode || e.which;
    if ($(window).width() < 1280) {
      if (kCd == 0 || kCd == 229) {
        kCd = getKeyCode($(this).val());
        if (thisVal.length == 1) {
          if (!regOne.test(kCd)) {
            $(this).val('');
            return false;
          }
        }
        if (!regex.test(kCd)) {
          $(this).val($(this).val().substr(0, $(this).val().length - 1));
          return false;
        }
      }
    }
    var key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (thisVal.length == 0) {
      if (!regOne.test(key)) {
        return false;
      }
    }
    if (kCd != 13) {
      if (!(regex.test(key) || e.charCode == 0)) {
        return false;
      }
    }
  });

  ////end alpha

  // Only for Numbers
  $(document).on('keydown', ".noOnlyInput", function (e) {
    // Allow: backspace, delete, tab, escape, enter and .

    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
    // Allow: Ctrl+A, Command+A
    e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true) ||
    // Allow: home, end, left, right, down, up
    e.keyCode >= 35 && e.keyCode <= 40) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  });
  if ($('html').hasClass('device')) {
    $('input[type="text"].noOnlyInput').attr('type', 'number');
  }
  ////end Numbers

  $('.username').each(function () {
    $(this).on('blur', function () {
      if ($(this).val() === "") {
        $(this).parents('.form-group').find('.errorMsg').text('Please Enter Your Full Name').show();
      } else {
        $(this).parents('.form-group').find('.errorMsg').hide();
      }
    });
  });
  $('#flexCheckDefault').each(function () {
    $(this).on('blur', function () {
      ///////////////////
      if ($('#flexCheckDefault').prop('checked') === false) {
        //do something
        $('#flexCheckDefault').parents('.form-check').next('.errorMsg').html('Please check terms & conditions').show();
      } else {
        $('#flexCheckDefault').parents('.form-check').next('.errorMsg').hide();
      }
      /////////////////////////////////////
    });
  });

  $('.first_name').each(function () {
    $(this).on('blur', function () {
      if ($(this).val() === "") {
        $(this).parents('.form-group').find('.errorMsg').text('Please Enter First Name').show();
      } else {
        $(this).parents('.form-group').find('.errorMsg').hide();
      }
    });
  });
  $('.last_name').each(function () {
    $(this).on('blur', function () {
      if ($(this).val() === "") {
        $(this).parents('.form-group').find('.errorMsg').text('Please Enter Last Name').show();
      } else {
        $(this).parents('.form-group').find('.errorMsg').hide();
      }
    });
  });
  $('.txtarea').each(function () {
    $(this).on('blur', function () {
      if ($(this).val() == "") {
        $(this).next('.errorMsg').text('Please Enter Message').show();
      } else {
        $(this).next('.errorMsg').hide();
      }
    });
  });
  $('.campuse').each(function () {
    $(this).on('blur', function () {
      if ($(this).val() == "") {
        $(this).parents('.form-group').find('.errorMsg').text('Please Select Campus City').show();
      } else {
        $(this).parents('.form-group').find('.errorMsg').hide();
      }
    });
  });
  $('.program').each(function () {
    $(this).on('blur', function () {
      if ($(this).val() == "") {
        $(this).parents('.form-group').find('.errorMsg').text('Please Select Program').show();
      } else {
        $(this).parents('.form-group').find('.errorMsg').hide();
      }
    });
  });
  $('.statename').each(function () {
    $(this).on('blur', function () {
      if ($(this).val() == "") {
        $(this).parents('.form-group').find('.errorMsg').text('Please Select State').show();
      } else {
        $(this).parents('.form-group').find('.errorMsg').hide();
      }
    });
  });
  $('.visitDate').each(function () {
    $(this).on('blur', function () {
      if ($(this).val() == "") {
        $(this).parents('.form-group').find('.errorMsg').text('Please Select Date').show();
      } else {
        $(this).parents('.form-group').find('.errorMsg').hide();
      }
    });
  });
  $('.email').each(function () {
    $(this).on('blur', function () {
      var sEmail = $(this).val();
      if ($(this).val() === "") {
        //   $(this).next('.errorMsg').text('Please enter E-mail ID').show()
        $(this).parents('.form-group').find('.errorMsg').text('Please Enter E-mail ID').show();
      } else if (!validateEmail(sEmail)) {
        //    $(this).next('.errorMsg').show().text('Please enter valid E-mail ID').show()
        $(this).parents('.form-group').find('.errorMsg').text('Please Enter Valid E-mail ID').show();
      } else {
        //  $(this).next('.errorMsg').hide();
        $(this).parents('.form-group').find('.errorMsg').hide();
      }
    });
  });

  // mobile number Validation
  $('.mobileno').each(function () {
    $(this).on('blur', function () {
      var mobileno = /^[6-9][0-9]{9}$/;
      //$(this).on('blur', function() {
      if ($(this).val() == "") {
        $(this).parents('.form-group').find('.errorMsg').text('Please Enter Mobile Number').show();
      } else if (!$(this).val().length === 10 || !mobileno.test($(this).val())) {
        $(this).parents('.form-group').find('.errorMsg').show().text('Please Enter Valid Mobile Number').show();
      } else {
        $(this).parents('.form-group').find('.errorMsg').hide();
      }
    });
  });
  var loginflag = false;
  //contact us
  $('.btn.btn-primary.formSubmit').on('click', function () {
    let username = $(".username");
    let email = $('#p_email');
    let mobileno = $('#p_mobile');
    let txtarea = $('.txtarea');
    let campuse = $('.campuse');
    if (username.val() == "") {
      $(username).parents('.form-group').find('.errorMsg').html('Please Enter Your Full Name').show();
      loginflag = false;
    }
    if (campuse.val() == "") {
      $(campuse).parents('.form-group').find('.errorMsg').html('Please Select Campus City').show();
      loginflag = false;
    }
    if (txtarea.val() == "") {
      $(txtarea).parents('.form-group').find('.errorMsg').html('Please Enter Message').show();
      loginflag = false;
    }
    if (email.val() == "") {
      $(email).parents('.form-group').find('.errorMsg').html('Please Enter E-mail ID').show();
      loginflag = false;
    }
    if (mobileno.val() == "") {
      $(mobileno).parents('.form-group').find('.errorMsg').html('Please Enter Mobile Number').show();
      loginflag = false;
    } else {
      //  $(location).attr('href','thanks-send.html');
      loginflag = true;
    }
  });

  //event form
  $('.btn.btn-primary.eventSubmit').on('click', function () {
    let username = $(".username");
    // let email = $('.email');
    // let mobileno = $('.mobileno');
    let email = $('#p_email');
    let mobileno = $('#p_mobile');
    let campuse = $('.campuse');
    if (username.val() == "") {
      $(username).parents('.form-group').find('.errorMsg').html('Please Enter Your Full Name').show();
      loginflag = false;
    }
    if (campuse.val() == "") {
      $(campuse).parents('.form-group').find('.errorMsg').html('Please Select Campus City').show();
      loginflag = false;
    }
    if (email.val() == "") {
      $(email).parents('.form-group').find('.errorMsg').html('Please Enter E-mail ID').show();
      loginflag = false;
    }
    if (mobileno.val() == "") {
      $(mobileno).parents('.form-group').find('.errorMsg').html('Please Enter Mobile Number').show();
      loginflag = false;
    } else {
      //  $(location).attr('href','thanks-send.html');
      loginflag = true;
    }
  });
  //plan your visit  form
  $('.btn.btn-primary.visitSubmit').on('click', function () {
    let username = $(".username");
    let email = $('#p_email');
    let mobileno = $('#p_mobile');
    let visitDate = $('.visitDate');
    if (username.val() == "") {
      $(username).parents('.form-group').find('.errorMsg').html('Please Enter Your Full Name').show();
      loginflag = false;
    }
    if (visitDate.val() == "") {
      $(visitDate).parents('.form-group').find('.errorMsg').html('Please Select Date').show();
      loginflag = false;
    }
    if (email.val() == "") {
      $(email).parents('.form-group').find('.errorMsg').html('Please Enter Your E-mail ID').show();
      loginflag = false;
    }
    if (mobileno.val() == "") {
      $(mobileno).parents('.form-group').find('.errorMsg').html('Please Enter Your Mobile Number').show();
      loginflag = false;
    } else {
      //  $(location).attr('href','thanks-send.html');
      loginflag = true;
    }
  });

  //plan your enquiry form
  $('.btn.btn-primary.enquirySubmit').on('click', function () {
    let firstName = $(".first_name");
    let lastName = $(".last_name");
    let email = $('.email');
    let mobileno = $('.mobileno');
    if (firstName.val() == "") {
      $(firstName).parents('.form-group').find('.errorMsg').html('Please Enter First Name').show();
      loginflag = false;
    }
    if (lastName.val() == "") {
      $(lastName).parents('.form-group').find('.errorMsg').html('Please Enter Last Name').show();
      loginflag = false;
    }
    if (email.val() == "") {
      $(email).parents('.form-group').find('.errorMsg').html('Please Enterr E-mail ID').show();
      loginflag = false;
    }
    if (mobileno.val() == "") {
      $(mobileno).parents('.form-group').find('.errorMsg').html('Please Enter Mobile Number').show();
      loginflag = false;
    } else {
      //  $(location).attr('href','thanks-send.html');
      loginflag = true;
    }
  });
  //plan your landing page form
  $('.btn.btn-primary.landingPageSubmit').on('click', function () {
    let full_name = $(".username");
    // let lastName = $(".last_name");
    let email = $('.email');
    let mobileno = $('.mobileno');
    let program = $('.program');
    let campuse = $('.campuse');
    let statename = $('.statename');
    if (full_name.val() == "") {
      $(full_name).parents('.form-group').find('.errorMsg').html('Please Enter Your Full Name').show();
      loginflag = false;
    }
    if (email.val() == "") {
      $(email).parents('.form-group').find('.errorMsg').html('Please Enter E-mail ID').show();
      loginflag = false;
    }
    if (campuse.val() == "") {
      $(campuse).parents('.form-group').find('.errorMsg').html('Please Select Campus City').show();
      loginflag = false;
    }
    if (statename.val() == "") {
      $(statename).parents('.form-group').find('.errorMsg').html('Please Select State').show();
      loginflag = false;
    }
    if (program.val() == "") {
      $(program).parents('.form-group').find('.errorMsg').html('Please Select Program').show();
      loginflag = false;
    }
    if (mobileno.val() == "") {
      $(mobileno).parents('.form-group').find('.errorMsg').html('Please Enter Mobile Number').show();
      loginflag = false;
    }
    if ($('#flexCheckDefault').prop('checked') === false) {
      //do something
      $('#flexCheckDefault').parents('.form-check').next('.errorMsg').html('Please check terms & conditions').show();
      loginflag = false;
      // return false;
    } else {
      //  $(location).attr('href','thanks-send.html');
      loginflag = true;
    }
  });

  // global sticky call me form
  // $('#callSubmit').on('click', function(){
  //     let call_firstName = $("#m_first_name");
  //     let call_lastName = $("#m_last_name");
  //     let call_email = $('#m_email');
  //     let call_mobileno = $('#m_mobile');
  //     $('#callBackForm .form-control').each(function(){
  //         if ($(this).val() != "") {
  //             $('.errorMsg').hide();
  //         }
  //     })

  //     if (call_firstName.val() == "") {
  //         $(call_firstName).parents('.form-group').find('.errorMsg').html('Please Enter First Name').show();
  //         loginflag = false;
  //     }
  //     if (call_lastName.val() == "") {
  //         $(call_lastName).parents('.form-group').find('.errorMsg').html('Please Enter Last Name').show();
  //         loginflag = false;
  //     }
  //         if (call_email.val() == "") {
  //         $(call_email).parents('.form-group').find('.errorMsg').html('Please Enterr E-mail ID').show()
  //         loginflag = false;
  //     }

  //     if (call_mobileno.val() == "") {
  //         $(call_mobileno).parents('.form-group').find('.errorMsg').html('Please Enter Mobile Number').show()
  //         loginflag = false;
  //     }
  //     else {

  //       loginflag=true;
  //     }
  // });
});

function email() {
  $('.email').each(function () {
    var sEmail = $(this).val();
    if ($(this).val() == "") {
      $(this).next('.errorMsg').text('Please enter E-mail ID').show();
    } else if (!validateEmail(sEmail)) {
      $(this).next('.errorMsg').show().text('Please enter valid E-mail ID').show();
    } else {
      $(this).next('.errorMsg').hide();
    }
  });
}
function validateEmail(sEmail) {
  var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  if (filter.test(sEmail)) {
    return true;
  } else {
    return false;
  }
}
function checkDevice() {
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? $("html").removeClass("desktop").addClass("device") : $("html").removeClass("device").addClass("desktop");
}