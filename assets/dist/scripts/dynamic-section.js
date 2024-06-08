let stateAPI = "https://geodata.phplift.net/api/index.php?type=getStates&countryId=101";
let cityAPI = "https://geodata.phplift.net/api/index.php?type=getCities&countryId=&stateId=";
var page_no = 0;
$(window).on("load", function () {
  if ($('#facultySitemapData').length) {
    getFacultySitemapData();
  }

  //achieveSlider();
  if ($(".pageActive").length > 0) {
    var path = window.location.pathname;
    $('.pageActive li').each(function () {
      var Pname = $(this).find('a').attr('href');
      if (Pname === path) {
        $(this).find('a').addClass('active');
      }
    });
  }
  if ($("#programCat").length > 0) {
    let firstTabText = $("#programCat li").eq(0).find("button").text();
    getProgramData(firstTabText);
    if ($("#advisoryTabContent").length > 0) {
      getfacultyData(firstTabText);
    }
  }
  $("#academic-leadership").length > 0 && getCommonComponent(`leadership?category=`, 0);
  $("#globalDurationSec").length && getGlobalContent("duration");
  $("#awardsHonorsList").length && getCommonComponent("awards", 0);
  $("#notableAlumniContent").length && getAlumniDataNoTable(0, 'notable');
  $("#starAlumniContent").length && getAlumniStar(0, 'star_alumni');
  $("#connectWithAlumni").length && getAlumniData("connect_with_alumni", 0);
  $("#studentWorkList").length && getStudentResult("", 0);
  $("#DownloadWorkList").length && getDownloadResult("62", 0);
  $("#FAQWorkList").length && getFAQResult("", 0);
  $("#popular-search-terms").length && getPopularSearchTermList();
  $("#popular-search-list").length && getPopularSearchList();
  $("#our-past-winner").length && getPastWinner("past-winners", 0);
  $("#eventList").length && getEventData("upcoming", page_no);
  $("#contactUsLable").length && getContactUsLable('', 0);
  $("#locationAPI").length && getLocationList('', 0);
  $("#advisoryContent").length && getadvisoryData("all", 0);
  $("#advisoryContentSlider").length && getadvisoryDataSlider('');
  $('#contactus-campus').length && getCampuses('campuses', 0);
  $('#contact-us-form').length && getContactUsLable('', 0);
  $('#courseList').length && getCourseList(0);
  $('#categoryList').length && getCategoryList(0);
  $("#locationAPIFee").length && getLocationList('feeStructure', 0);
  $("#tablistcourse").length && getTabListCourse("48", "", "68", 0);
  // $("#feeStrucure-tabs").length && getFeeStructure(0,"404");
  $("#webinarLable").length && getContactUsLable('', 0);
  // $("#ourFaculty").length && getOurFaculty('', 0);
  $("#similarFaculty").length && getSimilerFaculty(0);
  $("#ourFacultyContent").length && getOurFaculty(0);
  $("#globalContent").length && getGlobalContentNextStep();
  $("#bottomNavigation").length && getFooterData("bottom_navigation");
  $("#FooterLeftData").length && getFooterData("left_site_text");
  $("#mobileFooterMenu").length && getFooterData("footer_menu_mobile");
  $("#facultyTabs-content-fashion").length && getfacultyDataFashion("58");
  $("#facultyTabs-content-design").length && getfacultyDataDesign("59");
  $("#facultyTabs-content-film").length && getfacultyDataFilm("87");
  $("#facultyTabs-content-interiors").length && getfacultyDataInteriors("162");
  $("#facultyTabs-content-gaming").length && getfacultyDataGaming("163");
  $("#facultyTabs-content-business").length && getfacultyDataBusiness("164");
  $("#facultyTabs-content-product").length && getfacultyDataProduct("169");
  $("#programTabs-content-fashion").length && getprogramDataFashion("58", "48"); //Fashion
  if ($("#allOurProgramsTabsContent").length && $("#programCat").length) {
    let termId = $("#programCat li").eq(0).find('button').attr("data-termId");
    $("#allOurProgramsTabsContent").length && getAllprogramsData(termId); //All Programs - For Landing page
  }

  $("#programTabs-content-design").length && getprogramDataDesign("59", "48"); // Design
  $("#programTabs-content-film").length && getprogramDataFilm("87", "50"); //Film
  $("#programTabs-content-interiors").length && getprogramDataInteriors("162", "48"); //Interiors
  $("#programTabs-content-gaming").length && getprogramDataGaming("163", "50"); //Gaming
  $("#programTabs-content-business").length && getprogramDataBusiness("164", "48"); //Business
  $("#programTabs-content-product").length && getprogramDataProduct("169", "48"); //Product

  $('#header-search-input').keyup(function (event) {
    if (event.keyCode === 13) {
      searchKeyword('#header-search-input');
    }
  });
  $('#search-input').keyup(function (event) {
    if (event.keyCode === 13) {
      searchKeyword('#search-input');
    }
  });
  $('.error-search').css({
    "display": "none"
  });
  $('#loadMoreDataAPI').click(function () {
    //$('#loadMoreDataAPI').text('Loading...')
    page_no++;
  });

  //   if($('#m_dateOfVisit').length>0){
  // var now = new Date();
  // var day = ("0" + now.getDate()).slice(-2);
  // var month = ("0" + (now.getMonth() + 1)).slice(-2);
  // var today = now.getFullYear() + "-" + (month) + "-" + (day);
  // $('#m_dateOfVisit').val(today);
  // $('#m_dateOfVisit').attr({    
  //   "min" : today  
  // })
  //   }
});

$(function () {
  //disable the previous date in the Input date type
  var dtToday = new Date();
  var month = dtToday.getMonth() + 1;
  var day = dtToday.getDate();
  var year = dtToday.getFullYear();
  if (month < 10) month = '0' + month.toString();
  if (day < 10) day = '0' + day.toString();
  var maxDate = year + '-' + month + '-' + day;
  if ($('#m_dateOfVisit').length) {
    $('#m_dateOfVisit').attr('min', maxDate);
  }

  // State API call
  if ($('#allState').length) {
    $.get(stateAPI, function (resp, _status) {
      try {
        if (resp && resp.result && resp.result.length) {
          let data = resp.result;
          // State form dropdown call
          formOptions('#allState', 'Select State', data);
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    });
  }
  var count = 0;
  var countStar = 0;
  $('.loadMoreDataAPI2').click(function () {
    if ($("#starAlumniContent").length > 0) {
      countStar++;
      getAlumniStar(countStar, 'star_alumni');
    }
  });
  $('#loadMoreDataAPI').click(function () {
    if ($("#ourFacultyContent").length > 0) {
      count++;
      getOurFaculty(count);
    }
    if ($("#studentWorkList").length > 0) {
      count++;
      let termId = $('ul.common-tabs').find('li button.active').data('termid');
      getStudentResult(termId === undefined ? "" : termId, count);
    }
    if ($("#advisoryContent").length > 0) {
      count++;
      let termId = $('ul.common-tabs').find('li button.active').data('termid');
      getadvisoryData(termId === "undefined" ? "" : termId, count);
    }
    if ($("#DownloadWorkList").length > 0) {
      count++;
      console.log(count, "!@#$#$#@@#$");
      let termId = $('ul.common-tabs').find('li button.active').data('termid');
      getDownloadResult(termId === undefined ? "" : termId, count);
    }
    if ($("#FAQWorkList").length > 0) {
      count++;
      let termId = $('ul.common-tabs').find('li button.active').data('termid');
      getFAQResult(termId === undefined ? "" : termId, count);
    }
    if ($("#similarFaculty").length > 0) {
      count++;
      getSimilerFaculty(count);
    }
    if ($("#awardsHonorsList").length > 0) {
      count++;
      getCommonComponent("awards", count);
    }
    if ($("#notableAlumniContent").length > 0) {
      count++;
      getAlumniDataNoTable(count, "notable");
    }

    // getOurFaculty(count)
  });

  $('input[name="radio-group"]').on("click", function () {
    $('#loadMoreDataAPI').show().text('Load More');
    $('#eventList').length && $('#eventList').empty();
    page_no = 0;
    var radioValue = $('input[name="radio-group"]:checked').val();
    let event_type = "upcoming";
    if (radioValue === "Upcoming events") {
      event_type = "upcoming";
    } else {
      event_type = "past";
    }
    getEventData(`${event_type}`, page_no);
    if ($('#loadMoreDataAPI').length) {
      $('#loadMoreDataAPI').unbind().click(function () {
        $('#loadMoreDataAPI').text('Loading...');
        page_no++;
        getEventData(`${event_type}`, page_no);
      });
    }
  });
  $(document).on("click", ".contactNowBtn", function () {
    // console.log("click ",this.id)
    if (this.id == "Delhi-South") $("select.form-control").find('option[value="Delhi-South"]').prop('selected', true);
    if (this.id?.includes("Bangaluru")) $("select.form-control").find('option[value="Bangaluru"]').prop('selected', true);
    if (this.id?.includes("Jaipur")) $("select.form-control").find('option[value="Jaipur"]').prop('selected', true);
    if (this.id == "Delhi-West") $("select.form-control").find('option[value="Delhi-West"]').prop('selected', true);
    if (this.id == "Mumbai") $("select.form-control").find('option[value="Mumbai"]').prop('selected', true);
  });
  $(document).on("click", 'input[name="radio-city-campus"]', function () {
    var location = $('input[name="radio-city-campus"]:checked').val();
    var category = $('input[name="radio-study-category"]:checked').val() === "both" ? "" : $('input[name="radio-study-category"]:checked').val();
    var program = $('input[name="radio-course"]:checked').val();
    getTabListCourse(program, category, location, 1);
  });
  $(document).on("click", 'input[name="radio-study-category"]', function () {
    var location = $('input[name="radio-city-campus"]:checked').val();
    var category = $('input[name="radio-study-category"]:checked').val() === "both" ? "" : $('input[name="radio-study-category"]:checked').val();
    var program = $('input[name="radio-course"]:checked').val();
    getTabListCourse(program, category, location, 2);
  });
  $(document).on("click", 'input[name="radio-course"]', function () {
    var location = $('input[name="radio-city-campus"]:checked').val();
    var category = $('input[name="radio-study-category"]:checked').val() === "both" ? "" : $('input[name="radio-study-category"]:checked').val();
    var program = $('input[name="radio-course"]:checked').val();
    getTabListCourse(program, category, location, 3);
  });
  $(document).on('shown.bs.tab', '.freeStruction_section [data-bs-toggle="tab"]', function (e) {
    let nid = $(this).attr("data-termId");
    getFeeStructure(0, nid);
  });

  //contact us
  $(document).on('submit', 'form.contactus', function () {
    let form = $('.contactus');
    let pageName = $('.breadcrumb-section').find('ul li:last').text();
    let name = $('#m_fullname').val();
    let mobile = $('#p_mobile').val();
    let email = $('#p_email').val();
    let campus = $('#locationAPI option:selected').text();
    let message = $('#m_message').val();
    if (name == "") {
      return false;
    } else if (mobile == "") {
      return false;
    } else if (email == "") {
      return false;
    } else if (campus == "" || $('#locationAPI').val() == 'default') {
      return false;
    } else {
      if (form.find('.errorMsg:visible').length > 0) {
        return false;
      }
    }
    let payload = {
      "name": name,
      "email_id": email,
      "mobile_no": mobile,
      "campuse": campus,
      "message": message,
      "state": "NA",
      "page_type": pageName || "NA",
      "intersted": 'NA',
      "course": 'NA',
      "page_url": location.href || 'NA'
      // "g-recaptcha-response": $('#token').val()
    };
    //  $(".callsubmit").attr('disabled','disabled').find('span').text('Loading...');
    postDataToGusFunc(payload, $(".callsubmit"));
    return;
  });

  //contact us LMS
  $(document).on('submit', 'form.contactusLMS', function () {
    let form = $('.contactusLMS');
    let pageName = $('.breadcrumb-section').find('ul li:last').text();
    let name = $('#m_fullname').val();
    let mobile = $('#p_mobile').val();
    let email = $('#p_email').val();
    let campus = $('#locationAPI option:selected').text();
    let message = $('#m_message').val();
    if (name == "") {
      return false;
    } else if (mobile == "") {
      return false;
    } else if (email == "") {
      return false;
    } else if (campus == "" || $('#locationAPI').val() == 'default') {
      return false;
    } else {
      if (form.find('.errorMsg:visible').length > 0) {
        return false;
      }
    }
    let payload = {
      "name": name,
      "email": email,
      "phone": mobile,
      "campus": campus,
      "state": "Delhi",
      "city": "New Delhi",
      "intersted": "UGFDFD-UG_FD",
      "course": "1",
      "leadtype": "LP",
      "adunit": "adunit",
      "keyword": "keyword",
      "siteid": "Career360",
      "qualification": "Postgraduate",
      "adgroup": "utm_adgroup1",
      "gclid": "gclid",
      "term": "utm_term1",
      "device": "utm_device1",
      "creative": "utm_creative1",
      "loc_physical_ms": "utm_loc_physical_ms1",
      "placement": "utm_placement1",
      "target": "utm_target1",
      "BU": "Pearl_Xstudio",
      "URL": "https://pearlacademy.com/admission/Brand/index.php?utm_source=google-search&utm_medium=cpc&utm_campaign=Pearl_Brand_2022_S&source=&medium=&campaign=&term=pearlacademy&device=c&adposition=&creative=561197228532&loc_physical_ms=1007765&adgroup=127799731614&placement=&target=&gclid=EAIaIQobChMI-9q16Lrq9AIV_p1LBR0m6Qt8EAAYASAAEgLs0_D_BwE"
    };
    let cmspayload = {
      "name": name,
      "email": email,
      "phone": mobile,
      "campus": campus,
      "state": "Delhi",
      "city": "New Delhi",
      "intersted": "UGFDFD-UG_FD",
      "course": "1",
      "leadtype": "LP",
      "adunit": "adunit",
      "keyword": "keyword",
      "siteid": "Career360",
      "qualification": "Postgraduate",
      "adgroup": "utm_adgroup1",
      "gclid": "gclid",
      "term": "utm_term1",
      "device": "utm_device1",
      "creative": "utm_creative1",
      "loc_physical_ms": "utm_loc_physical_ms1",
      "placement": "utm_placement1",
      "target": "utm_target1",
      "BU": "Pearl_Xstudio",
      "URL": "https://pearlacademy.com/admission/Brand/index.php?utm_source=google-search&utm_medium=cpc&utm_campaign=Pearl_Brand_2022_S&source=&medium=&campaign=&term=pearlacademy&device=c&adposition=&creative=561197228532&loc_physical_ms=1007765&adgroup=127799731614&placement=&target=&gclid=EAIaIQobChMI-9q16Lrq9AIV_p1LBR0m6Qt8EAAYASAAEgLs0_D_BwE"
    };
    // console.log(cmspayload)
    //  $(this).attr('disabled','disabled').text('Loading...');

    postDataToGusCMS(cmspayload, $(this), payload);
    return;
  });

  //landing Page
  $('#submitlandingForm').click(function () {
    let form = $('#landingForm');
    let pageName = $('.breadcrumb-section').find('ul li:last').text() || 'landing-page';
    let name = $('#fullName').val();
    let mobile = $('#mobileNo').val();
    let email = $('#email').val();
    let interestedIn = $('#interestedIn').val();
    let campusVal = $('#locationAPI').val();
    let stateVal = $('#allState').val();
    // console.log("click on checked", $('#flexCheckDefault').val())
    // console.log("click on checked",$('#flexCheckDefault').prop('checked')===true )

    let interestedCourseText = $('#interestedIn option:selected').text();
    let campus = $('#locationAPI option:selected').text();
    let state = $('#allState option:selected').text();
    if (name == "") {
      return false;
    } else if (mobile == "") {
      return false;
    } else if (email == "") {
      return false;
    } else if (interestedIn == "") {
      return false;
    } else if (campusVal == "") {
      return false;
    } else if (stateVal == "") {
      return false;
    } else {
      if (form.find('.errorMsg:visible').length > 0) {
        return false;
      }
    }
    let payload = {
      "name": name,
      "email_id": email,
      "mobile_no": mobile,
      "campuse": campus,
      "state": state || "NA",
      "page_type": pageName || "NA",
      "course": interestedCourseText || 'NA',
      "page_url": location.href || 'NA'
      // "g-recaptcha-response": $('#token').val()
    };

    let cmspayload = {
      "name": name,
      "email": email,
      "phone": mobile,
      "campus": campus,
      "state": state || "NA",
      "BU": pageName || "NA",
      "course": 'NA',
      "intersted": interestedCourseText,
      // "g-recaptcha-response": $('#token').val(),
      "URL": location.href || 'NA'
    };
    // console.log(cmspayload)
    $(this).attr('disabled', 'disabled').text('Loading...');
    postDataToGusCMS(cmspayload, $(this), payload);
    return;
    // console.log(" is Cms save",isCMSSave)

    //   if (name !== "" && email !== "" && mobile !== "" && campusVal !== '' && stateVal !== '' && interestedIn !== '' && $('#flexCheckDefault').prop('checked')===true) {
    //     let payload = {
    //       "name": name,
    //       "email_id": email,
    //       "mobile_no": mobile,
    //       "campuse": campus,
    //       "state": state || "NA",
    //       "page_type" : pageName || "NA",    
    //       "course": interestedCourseText || 'NA',
    //       "page_url": location.href || 'NA',
    //       "g-recaptcha-response": $('#token').val()
    //     }
    //     let cmspayload = {
    //       "name": name,
    //       "email": email,
    //       "phone": mobile,
    //       "campus": campus,
    //       "state": state || "NA",
    //       "BU" : pageName || "NA",    
    //       "course":  'NA',
    //       "intersted":interestedCourseText,
    //       "g-recaptcha-response": $('#token').val(),
    //       "URL": location.href || 'NA'
    //     }
    //     // console.log(cmspayload)
    //     $(this).attr('disabled','disabled').text('Loading...');

    //  postDataToGusCMS(cmspayload, $(this),payload);
    //   // console.log(" is Cms save",isCMSSave)

    //   }
  });

  //event page details
  $(document).on('submit', 'form.eventscontactus', function () {
    let form = $('.eventscontactus');
    let pageName = $('.breadcrumb-section').find('ul li:last').text();
    let name = $('#m_fullname').val();
    let mobile = $('#p_mobile').val();
    let email = $('#p_email').val();
    let campus = $('#locationAPI option:selected').text();
    if (name == "") {
      return false;
    } else if (mobile == "") {
      return false;
    } else if (email == "") {
      return false;
    } else if (campus == "" || $('#locationAPI').val() == 'default') {
      return false;
    } else {
      if (form.find('.errorMsg:visible').length > 0) {
        return false;
      }
    }
    let payload = {
      "name": name,
      "email_id": email,
      "mobile_no": mobile,
      "campuse": campus,
      "state": "NA",
      "page_type": pageName || "NA",
      "intersted": 'NA',
      "course": 'NA',
      "page_url": location.href || 'NA'
      //  "g-recaptcha-response": $('#token').val()
    };
    // console.log(payload)

    // $(".callsubmit").attr('disabled','disabled').find('span').text('Loading...');
    postDataToGusFunc(payload, $(".callsubmit"));
    return;
  });

  //visitor form
  $(document).on('submit', 'form.visitorcontactus', function () {
    let form = $('.visitorcontactus');
    let pageName = $('.breadcrumb-section').find('ul li:last').text();
    let name = $('#m_fullname').val();
    let mobile = $('#p_mobile').val();
    let email = $('#p_email').val();
    let campus = $('input[name="campus"]:checked').val();
    let timeslot = $('input[name="time_slot"]:checked').val();
    let DateofVisit = $('#m_dateOfVisit').val();
    if (name == "") {
      return false;
    } else if (mobile == "") {
      return false;
    } else if (email == "") {
      return false;
    } else if (campus == "" || $('#locationAPI').val() == 'default') {
      return false;
    } else {
      if (form.find('.errorMsg:visible').length > 0) {
        return false;
      }
    }
    let payload = {
      "name": name,
      "email_id": email,
      "mobile_no": mobile,
      "campuse": campus,
      "state": "NA",
      "page_type": pageName || "NA",
      "intersted": 'NA',
      "course": 'NA',
      "page_url": location.href || 'NA',
      "timeslot": timeslot || "NA",
      "DateofVisit": DateofVisit || "NA"
      //  "g-recaptcha-response": $('#token').val()
    };

    console.log(payload);

    // $(".callsubmit").attr('disabled','disabled').find('span').text('Loading...');
    postDataToGusFunc(payload, $(".callsubmit"));
    return;
  });

  //enquiry form
  $(document).on('submit', 'form.enquiryform', function () {
    let form = $('.enquiryform');
    let pageName = $('.breadcrumb-section').find('ul li:last').text();
    let first_name = $('#m_first_name').val();
    let last_name = $('#m_last_name').val();
    let mobile = $('#m_mobile').val();
    let email = $('#m_email').val();
    if (first_name == "") {
      return false;
    } else if (mobile == "") {
      return false;
    } else if (email == "") {
      return false;
    } else if (last_name == "") {
      return false;
    } else {
      if (form.find('.errorMsg:visible').length > 0) {
        return false;
      }
    }
    let payload = {
      "name": first_name + " " + last_name,
      "email_id": email,
      "mobile_no": mobile,
      "page_type": pageName || "NA",
      "page_url": location.href || 'NA'
      //  "g-recaptcha-response": $('#token').val()
    };

    // $(".callsubmit").attr('disabled','disabled').find('span').text('Loading...');
    postDataToGusFuncEnq(payload, $(".callsubmit"));
    return;
  });

  //LMS enquiry form
  $(document).on('submit', 'form.enquiryformLMS', function () {
    debugger;
    console.log('thiissisisis', $(this).attr('data-bu'));
    let fieldBU = $(this).attr('data-bu') || '';
    let fieldCourseCode = $(this).attr('data-courseCode') || '';
    let dataCourseId = $(this).attr('data-courseId') || '';
    const sourceURL = location.search;
    let allParams = '';
    if (sourceURL.indexOf("?") > -1 && sourceURL.indexOf("&") > -1) {
      allParams = sourceURL?.split("?").pop()?.split('&').map(p => p.split('=')).reduce((obj, pair) => {
        const [key, value] = pair.map(decodeURIComponent);
        return {
          ...obj,
          [key]: value.indexOf(",") >= 0 ? value.split(",") : value
        };
      }, {});
    }
    console.log(allParams);
    let form = $('.enquiryformLMS');
    let pageName = $('.breadcrumb-section').find('ul li:last').text();
    let first_name = $('#m_first_name').val();
    let last_name = $('#m_last_name').val();
    let mobile = $('#m_mobile').val();
    let email = $('#m_email').val();
    if (first_name == "") {
      return false;
    } else if (mobile == "") {
      return false;
    } else if (email == "") {
      return false;
    } else if (last_name == "") {
      return false;
    } else {
      if (form.find('.errorMsg:visible').length > 0) {
        return false;
      }
    }
    let drupalpayload = {
      "name": first_name + " " + last_name,
      "email_id": email,
      "mobile_no": mobile
    };
    let payload = {
      "name": first_name + " " + last_name,
      "email": email,
      "phone": mobile,
      "state": "Delhi",
      "city": "New Delhi",
      "campus": "Delhi",
      "intersted": fieldCourseCode || '',
      "leadtype": "Online-leads",
      "course": dataCourseId || '',
      "adunit": allParams?.utm_medium || '',
      "keyword": allParams?.utm_campaign || '',
      "siteid": allParams?.utm_source || 'Website',
      "qualification": '',
      "adgroup": allParams?.adgroup || '',
      "gclid": allParams?.gclid || '',
      "term": allParams?.term || '',
      "device": allParams?.device || '',
      "creative": allParams?.creative || '',
      "loc_physical_ms": allParams?.loc_physical_ms || '',
      "placement": allParams?.placement || '',
      "target": allParams?.target || '',
      "BU": fieldBU || '',
      "URL": location.href || 'NA'
    };
    $(this).find('input.enquirySubmit').attr('disabled', 'disabled').val('Loading...');
    postDataToGusCMS(payload, $(".callsubmit"), drupalpayload);
    return false;
  });

  //Call me form
  $(document).on('submit', 'form#callBackForm', function () {
    console.log('hello');
    let form = $('#callBackForm');
    let call_first_name = $('#call_first_name').val();
    let call_last_name = $('#call_last_name').val();
    let call_mobile = $('#call_mobile').val();
    let call_email = $('#call_email').val();
    if (call_first_name == "") {
      console.log('name is empty');
      return false;
    } else if (call_last_name == "") {
      return false;
    } else if (call_mobile == "") {
      return false;
    } else if (call_email == "") {
      return false;
    } else {
      if (form.find('.errorMsg:visible').length > 0) {
        return false;
      }
    }
    console.log('test 2');
    let drupalpayload = {
      "name": call_first_name + " " + call_last_name,
      "email_id": call_email,
      "mobile_no": call_mobile
    };
    // let payload = {
    //   "name": call_first_name +" "+ call_last_name,
    //   "email": call_email,
    //   "phone": call_mobile,
    //   "campus": 'NA',
    //   "course": 'NA',
    //   "intersted": 'NA',
    //   "state" : 'NA'
    // }
    $(this).find('.callsubmit').attr('disabled', 'disabled').val('Loading...');
    //postDataToGusCMS(payload, $(this),drupalpayload);
    postDataToGusFunc(drupalpayload, $("#callSubmit"));
    return;
  });
  var $videoSrc;
  $(".vid_link").click(function () {
    $videoSrc = $(this).data("src");
  });
  $("#videoModal").on("shown.bs.modal", function (e) {
    $("#video").attr("src", $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0?&rel=0");
  });
  $("#videoModal").on("hide.bs.modal", function (e) {
    $("#video").attr("src", $videoSrc);
  });
  $('[data-bs-toggle="tab"]').on("shown.bs.tab", function (e) {
    let para = $(this).text();
    para = para !== "View All" ? para : "";
    if ($(this).closest("#achievementsCat").length) {
      sectionLoader(".achieveSlider");
      $(".achieveSlider").slick("unslick").css("visibility", "hidden");
      console.log(para);
      getAchievements(para);
    } else if ($(this).closest("#programCat").length && $("#advisoryTabContent").length) {
      getfacultyData(para);
    } else if ($(this).closest("#facultyCat").length) {
      $(".facultySlider").slick("unslick");
      // getfacultyData(para);
      if ($("#facultyTabs-content").length) {
        let termId = $(this).attr("data-termId");
        getfacultyData(termId === undefined ? "" : termId);
      }
    } else if ($(this).closest("#programCat").length) {
      $("#program-content .achieveSlider").slick("unslick");
      getProgramData(para);
    }
    if ($("#studentWorkList").length) {
      let termId = $(this).attr("data-termId");
      $("#studentWorkList").empty();
      count = 0;
      getStudentResult(termId, 0);
    }
    if ($("#advisoryContent").length) {
      let termId = $(this).attr("data-termId");
      $("#advisoryContent").empty();
      count = 0;
      getadvisoryData(termId, 0);
      //console.log('term id', termId);
    }

    if ($("#DownloadWorkList").length) {
      let termId = $(this).attr("data-termId");
      $("#DownloadWorkList").empty();
      count = 0;
      getDownloadResult(termId, 0);
    }
    if ($("#FAQWorkList").length) {
      let termId = $(this).attr("data-termId");
      $("#FAQWorkList").empty();
      count = 0;
      faqpage = 0;
      getFAQResult(termId, 0);
    }
    if ($("#advisoryTabContent").length) {
      let termId = $(this).attr("data-termId");
      getfacultyData(termId, 0);
    }
    if ($("#programTabs-content-fashion").length) {
      let termId = $(this).attr("data-termId");
      console.log('termId', termId);
      sectionLoader(".programSlider");
      $(".programSlider").slick("unslick").css("visibility", "hidden");
      getprogramDataFashion("58", termId);
    }
    if ($("#allOurProgramsTabsContent").length) {
      let termId = $(this).attr("data-termId");
      console.log('termId', termId);
      sectionLoader(".programSlider");
      $(".programSlider").slick("unslick").css("visibility", "hidden");
      getAllprogramsData(termId);
    }
    if ($("#programTabs-content-design").length) {
      let termId = $(this).attr("data-termId");
      sectionLoader(".programSlider");
      $(".programSlider").slick("unslick").css("visibility", "hidden");
      getprogramDataDesign("59", termId);
    }
    if ($("#programTabs-content-film").length) {
      let termId = $(this).attr("data-termId");
      sectionLoader(".programSlider");
      $(".programSlider").slick("unslick").css("visibility", "hidden");
      getprogramDataFilm("87", termId);
    }
    if ($("#programTabs-content-interiors").length) {
      let termId = $(this).attr("data-termId");
      sectionLoader(".programSlider");
      $(".programSlider").slick("unslick").css("visibility", "hidden");
      getprogramDataInteriors("162", termId);
    }
    if ($("#programTabs-content-gaming").length) {
      let termId = $(this).attr("data-termId");
      sectionLoader(".programSlider");
      $(".programSlider").slick("unslick").css("visibility", "hidden");
      getprogramDataGaming("163", termId);
    }
    if ($("#programTabs-content-business").length) {
      let termId = $(this).attr("data-termId");
      sectionLoader(".programSlider");
      $(".programSlider").slick("unslick").css("visibility", "hidden");
      getprogramDataBusiness("164", termId);
    }
    if ($("#programTabs-content-product").length) {
      let termId = $(this).attr("data-termId");
      sectionLoader(".programSlider");
      $(".programSlider").slick("unslick").css("visibility", "hidden");
      getprogramDataProduct("169", termId);
    }
    $(".slick-slider").slick("setPosition");
  });
  $(".alumniVoluntBeni").length && load_more_row(4, ".alumniVoluntBeni");
  $("#eventfest").length && load_more_row(6, ".load_more_container");
});
let sectionLoader = id => {
  var loadContent = $(
  // `<div class="sectonLoader" style="position:absolute; width:100%; min-height:50px; display:flex;align-items:center; height:100%; text-align:center; left:0; top:0; background:grey"><div class="loadLogo">Loading...</div></div>`
  //  `<div class="sectonLoader" style="position:absolute;border:12px solid #e3e3e3;display:flex;align-items:center;justify-content:center;  border-radius:50%;border-right-color:#4070f4; animation:spin 1s ease infinite; width:50px; min-height:50px; height:50px; text-align:center; background:none"></div>`
  `<div class="loadingContent" style="width: 100%;
    height: 100vh;
    position: fixed;
    background: #ffffffbf;
    z-index: 99999;
    top: 0%;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
">
    <div class="zoom-in-zoom-out"><img src="/assets/images/favicon.png" alt="" /></div>
   </div>`);
  $(id).append(loadContent);
};

// $('.achievement_section [data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
//   console.log('tab changed');
//   $('.achieveSlider').slick('setPosition');
// });

// $('.faculty-section [data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
//   console.log('tab changed');
//   $('.facultySlider').slick('setPosition');
// });
// let loadmoreclicktime=0;
$(window).bind("load", function () {
  try {
    getAchievements("Alumni Success");
    //achieveSlider();
    if ($("#advisoryTabContent").length === 0) {
      getfacultyData("");
    }
  } catch (e) {
    console.log(e);
  }
});

/////////////////////////========== Achievements API ===============/////////////
function getAchievements(cat) {
  try {
    if ($("#achievementsCat").length) {
      $.get(`/api/getAchievements?cat=${cat}`, function (obj, status) {
        try {
          if ((obj || obj === "") && obj !== null && obj.length > 0 && status) {
            $(".achieveSlider").removeAttr("style");
            createCategoryList("#achieveTabs-content .achieveSlider", obj);
            achieveSlider();
          } else {
            createCategoryList("#achieveTabs-content .achieveSlider", []);
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
}

/////////////////////////========== Achievements Item Generate ===============/////////////
function createCategoryList(containerId, data) {
  try {
    $(containerId).empty();
    let html = "";
    let resp = data;
    if (data && data.length === 0) {
      html += ejs.render(`
              <div class="alignCenter">
                  No Records
              </div>
          `);
    } else {
      data.forEach((_obj, index) => {
        html += ejs.render(`
                    <div class="item" data-aos="fade-up" data-aos-duration=${(index + 1) * 800} >
                        <div class="common-card">
                            <figure>
                                <img class="lazyload" data-src="<%- data.field_image || '' %>" alt="<%- data.field_tags || '' %>" title="<%- data.field_tags || '' %>" width="455" height="455" />
                            </figure>
                            <div class="common-card-body">
                                <h3><%- data.title || '' %></h3>
                                <%- data.body || '' %>
                            </div>
                        </div>
                    </div>
                  `, {
          data: resp[index]
        });
      });
    }
    $(containerId).html(html);
  } catch (e) {
    console.log(e);
  }
}

/////////////////////////========== Faculty API ===============/////////////
function getfacultyData(cat) {
  try {
    if ($("#facultyTabs-content").length) {
      $.get(`/api/getfaculty?category=${cat}`, function (obj, status) {
        try {
          if ((obj || obj === "") && obj !== null && status) {
            let res = obj.rows;
            if ($("#facultyTabs-content").length) {
              createFacultyList("#facultyTabs-content .facultySlider", res);
              facultySlider();
            }
          } else {
            if ($("#facultyTabs-content").length) {
              createFacultyList("#facultyTabs-content .facultySlider", []);
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
}
function getfacultyDataDesign(cat) {
  try {
    if ($("#facultyTabs-content-design").length) {
      $.get(`/api/getfaculty?category=${cat}`, function (obj, status) {
        try {
          if ((obj || obj === "") && obj !== null && status) {
            let res = obj.rows;
            if ($("#facultyTabs-content-design").length) {
              createFacultyList("#facultyTabs-content-design .facultySlider", res);
              facultySlider();
            }
          } else {
            if ($("#facultyTabs-content-design").length) {
              createFacultyList("#facultyTabs-content-design .facultySlider", []);
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
}
function getfacultyDataFashion(cat) {
  try {
    if ($("#facultyTabs-content-fashion").length) {
      $.get(`/api/getfaculty?category=${cat}`, function (obj, status) {
        try {
          if ((obj || obj === "") && obj !== null && status) {
            let res = obj.rows;
            if ($("#facultyTabs-content-fashion").length) {
              createFacultyList("#facultyTabs-content-fashion .facultySlider", res);
              facultySlider();
            }
          } else {
            if ($("#facultyTabs-content-fashion").length) {
              createFacultyList("#facultyTabs-content-fashion .facultySlider", []);
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
}
function getfacultyDataFilm(cat) {
  try {
    if ($("#facultyTabs-content-film").length) {
      $.get(`/api/getfaculty?category=${cat}`, function (obj, status) {
        try {
          if ((obj || obj === "") && obj !== null && status) {
            let res = obj.rows;
            if ($("#facultyTabs-content-film").length) {
              createFacultyList("#facultyTabs-content-film .facultySlider", res);
              facultySlider();
            }
          } else {
            if ($("#facultyTabs-content-film").length) {
              createFacultyList("#facultyTabs-content-film .facultySlider", []);
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
}
function getfacultyDataInteriors(cat) {
  try {
    if ($("#facultyTabs-content-interiors").length) {
      $.get(`/api/getfaculty?category=${cat}`, function (obj, status) {
        try {
          if ((obj || obj === "") && obj !== null && status) {
            let res = obj.rows;
            if ($("#facultyTabs-content-interiors").length) {
              createFacultyList("#facultyTabs-content-interiors .facultySlider", res);
              facultySlider();
            }
          } else {
            if ($("#facultyTabs-content-interiors").length) {
              createFacultyList("#facultyTabs-content-interiors .facultySlider", []);
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
}
function getfacultyDataGaming(cat) {
  try {
    if ($("#facultyTabs-content-gaming").length) {
      $.get(`/api/getfaculty?category=${cat}`, function (obj, status) {
        try {
          if ((obj || obj === "") && obj !== null && status) {
            let res = obj.rows;
            if ($("#facultyTabs-content-gaming").length) {
              createFacultyList("#facultyTabs-content-gaming .facultySlider", res);
              facultySlider();
            }
          } else {
            if ($("#facultyTabs-content-gaming").length) {
              createFacultyList("#facultyTabs-content-gaming .facultySlider", []);
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
}
function getfacultyDataBusiness(cat) {
  try {
    if ($("#facultyTabs-content-business").length) {
      $.get(`/api/getfaculty?category=${cat}`, function (obj, status) {
        try {
          if ((obj || obj === "") && obj !== null && status) {
            let res = obj.rows;
            if ($("#facultyTabs-content-business").length) {
              createFacultyList("#facultyTabs-content-business .facultySlider", res);
              facultySlider();
            }
          } else {
            if ($("#facultyTabs-content-business").length) {
              createFacultyList("#facultyTabs-content-business .facultySlider", []);
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
}
function getfacultyDataProduct(cat) {
  try {
    if ($("#facultyTabs-content-product").length) {
      $.get(`/api/getfaculty?category=${cat}`, function (obj, status) {
        try {
          if ((obj || obj === "") && obj !== null && status) {
            let res = obj.rows;
            if ($("#facultyTabs-content-product").length) {
              createFacultyList("#facultyTabs-content-product .facultySlider", res);
              facultySlider();
            }
          } else {
            if ($("#facultyTabs-content-product").length) {
              createFacultyList("#facultyTabs-content-product .facultySlider", []);
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
}

//=======================

function getprogramDataFashion(cat, program) {
  try {
    if ($("#programTabs-content-fashion").length) {
      $.get(`/api/getprogramCat?category=${cat}&program=${program}`, function (obj, status) {
        try {
          if ((obj || obj === "") && obj !== null && status) {
            let res = obj;
            if ($("#programTabs-content-fashion").length) {
              $(".programSlider").removeAttr("style");
              createProgramList("#programTabs-content-fashion .programSlider", res);
              programSlider();
            }
          } else {
            if ($("#programTabs-content-fashion").length) {
              createProgramList("#programTabs-content-fashion .programSlider", []);
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
}
function getAllprogramsData(program) {
  try {
    $.get(`/api/getAllprograms?program=${program}`, function (obj, status) {
      try {
        if ((obj || obj === "") && obj !== null && status) {
          let res = obj;
          if ($("#allOurProgramsTabsContent").length) {
            $(".programSlider").removeAttr("style");
            createProgramList("#allOurProgramsTabsContent .programSlider", res);
            programSlider();
          }
        } else {
          if ($("#allOurProgramsTabsContent").length) {
            createProgramList("#allOurProgramsTabsContent .programSlider", []);
          }
        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}
function getprogramDataDesign(cat, program) {
  try {
    if ($("#programTabs-content-design").length) {
      $.get(`/api/getprogramCat?category=${cat}&program=${program}`, function (obj, status) {
        try {
          if ((obj || obj === "") && obj !== null && status) {
            let res = obj;
            if ($("#programTabs-content-design").length) {
              $(".programSlider").removeAttr("style");
              createProgramList("#programTabs-content-design .programSlider", res);
              programSlider();
            }
          } else {
            if ($("#programTabs-content-design").length) {
              createProgramList("#programTabs-content-design .programSlider", []);
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
}
function getprogramDataFilm(cat, program) {
  console.log('cat', cat);
  console.log('program', program);
  try {
    if ($("#programTabs-content-film").length) {
      $.get(`/api/getprogramCat?category=${cat}&program=${program}`, function (obj, status) {
        try {
          if ((obj || obj === "") && obj !== null && status) {
            let res = obj;
            if ($("#programTabs-content-film").length) {
              $(".programSlider").removeAttr("style");
              createProgramList("#programTabs-content-film .programSlider", res);
              programSlider();
            }
          } else {
            if ($("#programTabs-content-film").length) {
              createProgramList("#programTabs-content-film .programSlider", []);
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
}
function getprogramDataInteriors(cat, program) {
  try {
    if ($("#programTabs-content-interiors").length) {
      $.get(`/api/getprogramCat?category=${cat}&program=${program}`, function (obj, status) {
        try {
          if ((obj || obj === "") && obj !== null && status) {
            let res = obj;
            if ($("#programTabs-content-interiors").length) {
              $(".programSlider").removeAttr("style");
              createProgramList("#programTabs-content-interiors .programSlider", res);
              programSlider();
            }
          } else {
            if ($("#programTabs-content-interiors").length) {
              createProgramList("#programTabs-content-interiors .programSlider", []);
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
}
function getprogramDataGaming(cat, program) {
  try {
    if ($("#programTabs-content-gaming").length) {
      $.get(`/api/getprogramCat?category=${cat}&program=${program}`, function (obj, status) {
        try {
          if ((obj || obj === "") && obj !== null && status) {
            let res = obj;
            if ($("#programTabs-content-gaming").length) {
              $(".programSlider").removeAttr("style");
              createProgramList("#programTabs-content-gaming .programSlider", res);
              programSlider();
            }
          } else {
            if ($("#programTabs-content-gaming").length) {
              createProgramList("#programTabs-content-gaming .programSlider", []);
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
}
function getprogramDataBusiness(cat, program) {
  try {
    if ($("#programTabs-content-business").length) {
      $.get(`/api/getprogramCat?category=${cat}&program=${program}`, function (obj, status) {
        try {
          if ((obj || obj === "") && obj !== null && status) {
            let res = obj;
            if ($("#programTabs-content-business").length) {
              $(".programSlider").removeAttr("style");
              createProgramList("#programTabs-content-business .programSlider", res);
              programSlider();
            }
          } else {
            if ($("#programTabs-content-business").length) {
              createProgramList("#programTabs-content-business .programSlider", []);
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
}
function getprogramDataProduct(cat, program) {
  try {
    if ($("#programTabs-content-product").length) {
      $.get(`/api/getprogramCat?category=${cat}&program=${program}`, function (obj, status) {
        try {
          if ((obj || obj === "") && obj !== null && status) {
            let res = obj;
            if ($("#programTabs-content-product").length) {
              $(".programSlider").removeAttr("style");
              createProgramList("#programTabs-content-product .programSlider", res);
              programSlider();
            }
          } else {
            if ($("#programTabs-content-product").length) {
              createProgramList("#programTabs-content-product .programSlider", []);
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
}

//==================================

function getadvisoryData(cat, page_no) {
  try {
    $.get(`/api/getadvisory?category=${cat}&page=${page_no}`, function (obj, status) {
      //$.get(`/api/getadvisory`, function (obj, status) {
      try {
        //console.log('obj ', obj.rows  , obj.status);
        if ((obj || obj === '') && obj !== null && obj.status !== 404 && status) {
          let res = obj.rows;
          //console.log(res)
          let total_pages = obj.pager.total_pages;
          if ($("#advisoryContent").length > 0) {
            advisoryList('#advisoryContent', res);
            console.log('total pages: ', total_pages);
            if (total_pages <= 1) {
              $('#loadMoreDataAPI').hide();
            } else {
              $('#loadMoreDataAPI').show();
            }
            if (page_no + 1 === total_pages) {
              $('#loadMoreDataAPI').hide();
            }
          }
          $("#advisoryContent .loadingContent").remove();
        } else {
          $('#advisoryContent').length && advisoryList('#advisoryContent', []);
          $('#advisoryContent').text('No Record');
          $('#loadMoreDataAPI').hide();
        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}
function getadvisoryData43423(cat, page_no) {
  try {
    sectionLoader("#advisoryContent");
    if ($("#advisoryContent").length) {
      $.get(`/api/getadvisory?category=${cat}&page=${page_no}`, function (obj, status) {
        try {
          if ((obj || obj === "") && obj !== null && status) {
            let res = obj.rows;
            let total_pages = obj.pager.total_pages;
            if ($("#advisoryContent").length) {
              advisoryList("#advisoryContent", res);
              if (page_no + 1 === total_pages) {
                $('#loadMoreDataAPI').hide();
              }
            }
            $("#advisoryContent .loadingContent").remove();
          } else {
            if ($("#advisoryContent").length) {
              advisoryList("#advisoryContent", []);
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
}
function getadvisoryDataSlider(cat) {
  try {
    sectionLoader("#advisoryContentSlider");
    cat = $('#advisoryContentSlider').attr('data-termid');
    console.log('category:', cat);
    if ($("#advisoryContentSlider").length) {
      $.get(`/api/getadvisoryCampus?category=${cat}`, function (obj, status) {
        try {
          if ((obj || obj === "") && obj !== null && status) {
            let res = obj.rows;
            if ($("#advisoryContentSlider").length) {
              advisorySliderList("#advisoryContentSlider", res);
              console.log("Response", res);
            }
            $("#advisoryContentSlider .loadingContent").remove();
          } else {
            if ($("#advisoryContentSlider").length) {
              advisorySliderList("#advisoryContentSlider", []);
            }
          }
          if ($("#advisoryContentSlider").length) {
            $("#advisoryContentSlider").slick({
              dots: false,
              arrows: true,
              autoplay: true,
              speed: 1000,
              autoplaySpeed: 3000,
              infinite: true,
              slidesToShow: 3,
              slidesToScroll: 1,
              centerMode: false,
              centerPadding: "0px",
              responsive: [{
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
                }
              }, {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  dots: true,
                  centerPadding: "40px",
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
        } catch (e) {
          console.log(e);
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
}

/////////////////////////========== Faculty Item Generate ===============/////////////
function createFacultyList(containerId, data) {
  try {
    $(containerId).empty();
    let html = "";
    let resp = data;
    if (data && data.length === 0) {
      html += ejs.render(`
              <div class="alignCenter">
                  No Records
              </div>
          `);
    } else {
      data.forEach((_obj, index) => {
        html += ejs.render(`
                  <div class="item" data-aos="fade-up" data-aos-duration=${(index + 1) * 1000}>
                    <a href="<%- data?.field_unique_url || 'javascript:;' %>" class="common-card">
                    <figure>
                    <img class="lazyload" data-src= ${_obj?.field_image || ''} alt="${_obj?.alt || _obj?.title || ''}" title="${_obj?.title || ''}" width="455" height="455" />
                </figure>

                <div class="common-card-body">
                         
                         <h3>${_obj?.title}</h3>
                         <p class="deanDetails">${_obj?.field_faculty_position}</p>
                         <p class="ellipsisWithTwoLines">${_obj?.body}</p>
                      </div>
                    </a>
                  </div>
                  `, {
          data: resp[index]
        });
      });
    }
    $(containerId).html(html);
  } catch (e) {
    console.log(e);
  }
}

/////////////////////////========== Program Item Generate ===============/////////////
function createProgramList(containerId, data) {
  try {
    $(containerId).empty();
    let html = "";
    let resp = data;
    // if(resp.length === 1){
    //   $(containerId).addClass('single-slider')
    //   $(containerId).hasClass('double-slider') && $(containerId).removeClass('double-slider')
    // }else if(resp.length === 2){
    //   $(containerId).addClass('double-slider');
    //   $(containerId).hasClass('single-slider') && $(containerId).removeClass('single-slider')
    // }
    if (data && data.length === 0) {
      html += ejs.render(`
              <div class="alignCenter">
                  No Records
              </div>
          `);
    } else {
      data.forEach((_obj, index) => {
        html += ejs.render(`
            <div class="item">
              <a href="<%- data?.field_unique_url || 'javascript:;' %>" class="common-card">
                  <% if(resp.length === 0){ %>
                    <picture>
                      <source media="(min-width:992px)" srcset="${_obj?.field_image || ''}" width="1920" height="755">
                      <source media="(max-width:991px)" srcset="${_obj?.field_image || ''}" width="390" height="490">
                      <img data-src="${_obj?.field_image || ''}" alt="${_obj?.alt || _obj?.title || ''}" title="${_obj?.alt || _obj?.title || ''}" width="390" height="490" class=" ls-is-cached lazyload">
                    </picture>
                  <% }else{ %>
                    <figure>
                      <img class="lazyload" data-src= ${_obj?.field_image || ''} alt="${_obj?.alt || _obj?.title || ''}" title="${_obj?.title || ''}" width="455" height="455" />
                    </figure>
                  <% } %>
                  <div class="common-card-body">
                    <p class="textDetails">${_obj?.field_category}</p>
                    <h3>${_obj?.title}</h3>                         
                  </div>
              </a>
            </div>
          `, {
          data: resp[index],
          resp
        });
      });
    }
    $(containerId).html(html);
  } catch (e) {
    console.log(e);
  }
}

/////////////////////////========== Faculty Slider Init ===============/////////////
function programSlider() {
  if ($(".programSlider").length) {
    $(".programSlider").slick({
      dots: false,
      arrows: true,
      autoplay: true,
      speed: 1000,
      autoplaySpeed: 3000,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: false,
      centerPadding: "0px",
      responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 600,
        settings: {
          infinite: false,
          centerMode: false,
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
          centerPadding: "40px",
          arrows: false
        }
      }, {
        breakpoint: 480,
        settings: {
          centerMode: false,
          infinite: false,
          slidesToShow: 1.07,
          slidesToScroll: 1,
          dots: true,
          arrows: false
        }
      }]
    });
  }
}

/////////////////////////========== Faculty Slider Init ===============/////////////
function facultySlider() {
  if ($(".facultySlider").length) {
    $(".facultySlider").slick({
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
    }).slick('slickPause');
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
  triggerScroll($('.facultySlider'));
}

/////////////////////////========== Program API ===============/////////////
function getProgramData(cat) {
  try {
    if ($("#program-content").length > 0) {
      $.get(`/api/getProgram?category=${cat}`, function (obj, status) {
        try {
          if ((obj || obj === "") && obj !== null && obj.length > 0 && status) {
            createPrograms("#program-content .achieveSlider", obj);
            achieveSlider();
          } else {
            createPrograms("#program-content .achieveSlider", []);
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
}

/////////////////////////========== Program Item Generate ===============/////////////
function createPrograms(containerId, data) {
  try {
    $(containerId).empty();
    let html = "";
    let resp = data;
    if (data && data.length === 0) {
      html += ejs.render(`
              <div class="alignCenter">
                  No Records
              </div>
          `);
    } else {
      data.forEach((_obj, index) => {
        html += ejs.render(`
                  <div class="item">
                       <a href="<%- data?.field_unique_url || 'javascript:;' %>" class="common-card">
                           <figure>
                              <img class="lazyload" data-src="<%- data.field_image || '' %>" alt="<%- data.field_image_1 || data.title %>" title="<%- data.field_image_1 || data.title %>" width="455" height="455" />
                           </figure>
                           <div class="common-card-body">
                              <p class="textDetails"><%- data.field_category || '' %></p>
                              <h3><%- data.title || '' %></h3>
                           </div>
                         </a>
                     </div>
                  `, {
          data: resp[index]
        });
      });
    }
    $(containerId).html(html);
  } catch (e) {
    console.log(e);
  }
}

/////////////////////////========== Global Content API ===============/////////////
function getGlobalContent(url) {
  try {
    if ($("#globalDurationSec").length > 0) {
      $.get(`/api/getGlobalContent?url=${url}`, function (obj, status) {
        try {
          if ((obj || obj === "") && obj !== null && status) {
            res = obj.content.field_components;
            createGlobalContent("#globalDurationSec", res);
          } else {
            createGlobalContent("#globalDurationSec", []);
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
}

/////////////////////////========== Global Content Generate ===============/////////////
function createGlobalContent(containerId, data) {
  try {
    $(containerId).empty();
    let html = "";
    let resp = data;
    if (data && data.length === 0) {
      html += ejs.render(`
              <div class="alignCenter">
                  No Records
              </div>
          `);
    } else {
      data[0].title_subtitle_components?.field_items.forEach((_obj, index) => {
        html += ejs.render(`
                  <div class="col-md-3">
                    <div class="num_box">
                        <p class="desc">${_obj?.title_subtitle?.field_title || ''}</p>
                        <p class="num">${_obj?.title_subtitle?.field_sub_title || ''}</p>
                    </div>
                  </div>
                  `, {
          data: resp[index]
        });
      });
    }
    $(containerId).html(html);
  } catch (e) {
    console.log(e);
  }
}

/////////////////////////========== Common Component API ===============/////////////
function getCommonComponent(url, page) {
  try {
    if ($("#awardsHonorsList").length > 0 || $("#academic-leadership").length > 0) {
      $.get(`/api/getCommonComponent?url=${url}&page=${page}`, function (obj, status) {
        let res = obj?.rows ? obj?.rows : obj;
        try {
          if ((obj || obj === "") && obj !== null && status) {
            let total_pages = obj?.pager?.total_pages;
            if ($("#awardsHonorsList").length) {
              createAwardList("#awardsHonorsList", res);
              if (page + 1 === total_pages) {
                $('#loadMoreDataAPI').hide();
              }
            }
            if ($("#academic-leadership").length > 0) {
              leadershipList("#academic-leadership", res);
              achieveSlider();
            }
          } else {
            $("#awardsHonorsList").length > 0 && createAwardList("#awardsHonorsList", []);
            $("#academic-leadership").length > 0 && leadershipList("#academic-leadership", []);
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
}

/////////////////////////========== Common Component Generate ===============/////////////
function createAwardList(containerId, data) {
  try {
    let container = $(containerId);
    var contentData = '';
    if (data && data.length === 0) {
      var contentData = `<div class="alignCenter">No Records</div>`;
      container.append(contentData);
    } else {
      data.forEach((_obj, index) => {
        contentData = `
        <div class="col-lg-4 col-md-6">
        <div class="common-card no_arrow award-card">
          <figure>
              <img data-src="${_obj?.field_image || ''}" alt="${_obj?.field_image_1 || ''}" title="${_obj?.field_image_1 || ''}" width="707" height="500" class="lazyload" />
          </figure>
          <div class="common-card-body">
              <h3 class="with_arrow">${_obj?.title || ''}</h3>
              ${_obj?.body || ''}
          </div>
        </div>
  </div>
     
        `;
        container.append(contentData);
      });
    }
  } catch (e) {
    console.log(e);
  }
}

/////////// Load More Row Function //////////////
function load_more_row(showItems, classPan) {
  if ($(classPan).length > 0) {
    $(classPan).each(function () {
      $(this).find("[class^='col-']").slice(0, showItems).show();
      if ($(this).find("[class^='col-']:hidden").length === 0 && $(this).find("[class^='col-']").length === 0) {
        $(".load_more_btn").hide();
      } else {
        $(".load_more_btn").show();
      }
      if ($(this).find("[class^='col-']:hidden").length > 0) {
        $(".load_more_btn").text("Load More");
      } else {
        $(".load_more_btn").text("No more content");
      }
    });
    $(".load_more_btn").on("click", function (e) {
      e.preventDefault();
      $(classPan).each(function () {});
      $(classPan).each(function () {
        if ($(this).find("[class^='col-']:hidden").length > 0) {
          $(this).find("[class^='col-']:hidden").slice(0, showItems).slideDown();
          if ($(this).find("[class^='col-']:hidden").length > 0) {
            $(".load_more_btn").text("Load More");
          } else {
            $(".load_more_btn").text("No more content");
          }
        } else {
          $(".load_more_btn").text("No more content");
        }
      });
    });
  }
}

/////////////////////////========== Leadership Content Generate ===============/////////////
function leadershipList(containerId, data) {
  try {
    $(containerId).empty();
    let html = "";
    let resp = data;
    if (data && data.length === 0) {
      html += ejs.render(`
              <div class="alignCenter">
                  No Records
              </div>
          `);
    } else {
      data.forEach((_obj, index) => {
        html += ejs.render(`
                  <div class="col-md-4 col-sm-6">
                      <a href="<%- data.field_unique_url || 'javascript:;' %>" class="common-card">
                          <figure>
                              <img class="lazyload" data-src="<%- data.field_image || '' %>" alt="<%- data.field_image_1 || '' %>" title="<%- data.field_image_1 || '' %>" width="455" height="455" />
                          </figure>
                          <div class="common-card-body">
                              <p class="yearDetails"><%- data.field_sub_title || '' %></p>
                              <h3><%- data.title || '' %></h3>
                              <p class="deanDetails"><%- data.field_designation || '' %></p>
                              <%- data.body || '' %>
                          </div>
                        </a>
                      </div>
                  `, {
          data: resp[index]
        });
      });
    }
    $(containerId).html(html);
  } catch (e) {
    console.log(e);
  }
}

/////////////////////////========== Advisory-board Content Generate ===============/////////////
let advisoryListpage = 0;
function advisoryList(containerId, data) {
  advisoryListpage++;
  try {
    let container = $(containerId);
    var contentData = '';
    if (data && data.length === 0) {
      var contentData = `<div class="alignCenter">No Records</div>`;
      container.append(contentData);
    } else {
      data.forEach((_obj, index) => {
        contentData = `
        <div class="col-md-4 col-sm-6" style="display: block;">
                  <a href="javascript:;" class="common-card no_arrow with_abs_footer" data-bs-toggle="modal" data-bs-target="#readmoreModal${index}${advisoryListpage}">
                      <figure>
                          <img fetchpriority="high" class='lazyload' data-src='${_obj?.field_image || ''}' alt='${_obj?.field_image_1 || ''}' title='${_obj?.field_image_1 || ''}' width='455' height='455' src='${_obj?.field_image || ''}'>
                      </figure>
                        <div class='common-card-body'>
                          <h3>${_obj?.title || ''}</h3>                          
                          <p>${_obj?.field_designation || ''}</p>
                          <p>${_obj?.field_sub_title || ''}</p>                          
                        </div>
                        <div class='common-card-footer'>
                          <h4 class='cta_with_arrow'>Read more</h4>
                        </div>                      
                      </a>
                  </div>
                  <div class="modal readmoreModal fade" id="readmoreModal${index}${advisoryListpage}" aria-hidden="true" aria-labelledby="readmoreModalLabel" tabindex="-1">
                  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                     <div class="modal-content">
                        <div class="modal-header">
                            <h3>${_obj?.title || ''}</h3>
                            <p>${_obj?.field_designation || ''}</p>
                           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">&times;</button>
                        </div>
                        <div class="modal-body">
                        ${_obj?.body || ''}
                        </div>
                     </div>
                  </div>
               </div>
                 
        `;
        container.append(contentData);
      });
    }
  } catch (e) {
    console.log(e);
  }
}

/////////////////////////========== Advisory-board Slider Content Generate ===============/////////////
//let advisoryListpage=0;
function advisorySliderList(containerId, data) {
  //advisoryListpage++;
  try {
    let container = $(containerId);
    var contentData = '';
    if (data && data.length === 0) {
      var contentData = `<div class="alignCenter">No Records</div>`;
      container.append(contentData);
    } else {
      data.forEach((_obj, index) => {
        contentData = `
        <div class="item">
        <a href="javascript:void(0);" class="common-card no_arrow with_abs_footer modalCard" data-bs-toggle="modal" data-bs-target="#readmoreModal">
            <figure>
               <img src="assets/images/blank.gif" class="lazyload" data-src='${_obj?.field_image || ''}' alt='${_obj?.field_image_1 || ''}' title='${_obj?.field_image_1 || ''}' width='455' height='455' src='${_obj?.field_image || ''}' />
            </figure>
            <div class="common-card-body">
            <h3>${_obj?.title || ''}</h3>
            <p class="advisory_design">${_obj?.field_designation || ''}</p>
            <p>${_obj?.field_sub_title || ''}</p>  
            </div>
            <div class="common-card-footer">
              <h4 class="cta_with_arrow">Know More</h4>
            </div>
            <div class="modalContent" style="display:none!important">${_obj?.body || ''}</div>
          </a>
      </div>
        `;
        container.append(contentData);
      });
      $('.modalCard').on('click', function () {
        var modaltext = $(this).find('.modalContent').html();
        var modalHeading = $(this).find('.common-card-body h3').html();
        var modalSubHeading = $(this).find('.common-card-body .advisory_design').html();
        $('#readmoreModal').find('.modal-body').html(modaltext);
        $('#readmoreModal').find('.modal-header h3').html(modalHeading);
        $('#readmoreModal').find('.modal-header p').html(modalSubHeading);
      });
    }
  } catch (e) {
    console.log(e);
  }
}

/////////////////////////========== Achievements && Program Slider Init ===============/////////////
function achieveSlider() {
  if ($(".achieveSlider").length) {
    $(".achieveSlider").slick({
      dots: false,
      arrows: true,
      autoplay: true,
      speed: 1000,
      autoplaySpeed: 3000,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: false,
      centerPadding: "0px",
      responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
          centerPadding: "40px",
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
}

/////////////////////////========== Alumni API ===============/////////////
function getAlumniData(type, count) {
  try {
    $.get(`/api/getAlumniData?page_no=${count}&type=${type}`, function (obj, status) {
      try {
        if ((obj || obj === "") && obj !== null && status) {
          let res = obj.data;
          $("#connectWithAlumni").length > 0 && createConnectWithAlumniList("#connectWithAlumni .alumniLoad", res);
          load_more_row(3, ".load_more_container");
        } else {
          $("#connectWithAlumni").length > 0 && createConnectWithAlumniList("#connectWithAlumni .alumniLoad", []);
        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}
function getPopularSearchTermList() {
  try {
    $.get(`/api/search?url=/menu/navigation&key=popularsarchterm`, function (obj, status) {
      try {
        $("#popular-search-terms").length > 0 && createPopularSearchTermList("#popular-search-terms", obj);
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}
function getPopularSearchList() {
  try {
    $.get(`/api/search?url=/get-popular-keyword-search-list`, function (obj, status) {
      try {
        $("#popular-search-list").length > 0 && createPopularSearchList("#popular-search-list", obj);
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}
function createPopularSearchTermList(containerId, data) {
  try {
    let html = "";
    if (data && data[0]?.items?.length === 0) {
      html = ejs.render(`
      <ul>
      </ul>
          `);
    } else {
      html = ` <h2>Popular Search Terms</h2><ul>`;
      data[0].items.forEach(item => {
        html += ` <li><a href="/search?keyword=${item.name}&page_no=0">${item.name}</a></li>`;
      });
      html += `</ul>`;
    }
    html = ejs.render(html);
    $(containerId).html(html);
  } catch (e) {
    console.log(e);
  }
}
function createPopularSearchList(containerId, data) {
  try {
    let html = "";
    if (data && data.length === 0 || !Array.isArray(data)) {
      html = `<ul></ul> `;
    } else {
      html = `<ul>`;
      data.forEach(item => {
        html += ` <li><a href="javascript:;" onClick="updateSearchAndLoad(${JSON.stringify(item).split('"').join("&quot;")})">${item.node_title}</a></li>`;
      });
      html += `</ul>`;
    }
    html = ejs.render(html);
    $(containerId).html(html);
  } catch (e) {
    console.log(e);
  }
}

// function updateSearchAndLoad(item) {
//   try{
//     console.log('item ajmat ', item);
//       if(item.node_id) {
//         $.get(`/api/search?url=/make-popular-search-list&id=${item.node_id}`, function (obj, status) {

//         });
//       }
//       if(item.path)
//         location.replace(item.path);
//    } catch(e) {
//     console.error(e)
//    }
// }

function updateSearchAndLoad(keyword) {
  try {
    if (keyword) {
      $.get(`/api/search?url=/make-popular-search?keyword=${keyword}`, function (obj, status) {});
    }
    // if(item.path)
    //   location.replace(item.path);
  } catch (e) {
    console.error(e);
  }
}
function searchKeyword(id, page_no = 0) {
  let keyword = $(id).val();
  if (!keyword) return;
  if (keyword?.length < 3) {
    $('.error-search').css({
      "display": "block"
    });
    return;
  }
  updateSearchAndLoad(keyword);
  $('.error-search').css({
    "display": "none"
  });
  location.replace(`/search?keyword=${keyword}&page_no=${page_no}`);
}
function getPastWinner(type, count) {
  try {
    $.get(`/api/getPastWinnerData?page_no=${count}`, function (obj, status) {
      try {
        $("#our-past-winner").length > 0 && createPastWinnerList("#our-past-winner", obj);
        load_more_row(3, ".load_more_container");
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}
function getCampuses(type, count) {
  try {
    $.get(`/api/getCampusesData`, function (obj, status) {
      try {
        $('#contactus-campus').length > 0 && createCampusesList('#contactus-campus', obj);
        // load_more_row(3, '.load_more_container')
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

/////////////////////////========== Alumni API - No Table ===============/////////////
function getAlumniDataNoTable(page_no, type) {
  try {
    $.get(`/api/getAlumniDataNoTable?page_no=${page_no}&type=${type}`, function (obj, status) {
      try {
        if ((obj || obj === "") && obj !== null && status) {
          let res = obj.data;
          let total_pages = obj.pager.total_pages;
          if ($("#notableAlumniContent").length) {
            createAlumniList("#notableAlumniContent", res);
            if (page_no + 1 === total_pages) {
              $('#loadMoreDataAPI').hide();
            }
          }
          $("#notableAlumniContent .loadingContent").remove();
        } else {
          if ($("#notableAlumniContent").length) {
            createAlumniList("#notableAlumniContent", []);
          }
        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

/////////////////////////========== Alumni Star  ===============/////////////
function getAlumniStar(page_no, type) {
  try {
    $.get(`/api/getAlumniDataNoTable?page_no=${page_no}&type=${type}`, function (obj, status) {
      try {
        if ((obj || obj === "") && obj !== null && status) {
          let res = obj.data;
          let total_pages = obj.pager.total_pages;
          if ($("#starAlumniContent").length) {
            createAlumniStarList("#starAlumniContent", res);
            if (page_no + 1 === total_pages) {
              $('.loadMoreDataAPI2').hide();
            }
          }
          $("#starAlumniContent .loadingContent").remove();
        } else {
          if ($("#starAlumniContent").length) {
            createAlumniStarList("#starAlumniContent", []);
          }
        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

/////////////////////////========== Past Winner List Generate ===============/////////////
function createPastWinnerList(containerId, data) {
  try {
    $(containerId).empty();
    let html = "";
    let resp = data;
    if (data && data.length === 0) {
      html += ejs.render(`
              <div class="alignCenter">
                  No Records
              </div>
          `);
    } else {
      html = ` <div class="row load_more_row">`;
      data.rows.forEach((_obj, index) => {
        html += `<div class="col-md-4 col-sm-6">
              <div class="common-card">
                  <figure>
                     <img class="lazyload" src="/assets/images/blank.gif" data-src="${_obj.field_image}" alt="${_obj.title}" title="${_obj.title}" width="455" height="455" />
                  </figure>
                  <div class="common-card-body">
                     <p class="yearDetails">${_obj.field_designation}</p>
                     <h3>${_obj.title}</h3>
                     ${_obj.body}
                     <p class="linkedinP">
                     <a href="${_obj.field_linkedin_url}">
                       <img src="assets/images/alumni/LinkedInIcon.svg" alt="LinkedIn" width="30" height="30" />
                     </a>
                     </p>
                  </div>
                  <div class="common-card-footer">
                    <a href="${_obj.field_unique_url}" class="cta_with_arrow">Read full stories</a>
                  </div>
                </div>
      </div> `;
      });
      html += `</div>
          <div class="load_more_btn_wrap">
           <a href="javascript:;" class="btn btn-outline load_more_btn">Load more past winners</a>
         </div>
          `;
    }
    html = ejs.render(html);
    $(containerId).html(html);
  } catch (e) {
    console.log(e);
  }
}
function createCampusesList(containerId, data) {
  try {
    $(containerId).empty();
    let html = "";
    let resp = data;
    if (data && data.length === 0) {
      html += ejs.render(`
              <div class="alignCenter">
                  No Records
              </div>
          `);
    } else {
      html = `<div class="row">`;
      data.forEach((_obj, index) => {
        html += `<div class="col-md-6">
            <a href="#contactNow" class="common-card no_arrow with_abs_footer">
               <figure>
                  <img src="/assets/images/blank.gif" data-src="${_obj.field_image}" alt="${_obj.title}" title="${_obj.title}" width="707" height="500" class="lazyload" />
               </figure>
               <div class="common-card-body contact-campus">
               ${_obj.field_address}
               </div>
               <div class="common-card-footer">
                 <h4 class="cta_with_arrow contactNowBtn" id="${_obj?.title?.split(' ')?.join('-')}">Contact</h4>
               </div>
            </a>
         </div>`;
      });
      html += `</div>`;
    }
    html = ejs.render(html);
    $(containerId).html(html);
  } catch (e) {
    console.log(e);
  }
}

/////////////////////////========== Alumni List Generate ===============/////////////
function createAlumniList(containerId, data) {
  try {
    let container = $(containerId);
    var contentData = '';
    if (data && data.length === 0) {
      var contentData = `<div class="alignCenter">No Records</div>`;
      container.append(contentData);
    } else {
      data.forEach((_obj, index) => {
        contentData = `
        <div class="col-md-4 col-sm-6" style="display: block;">
                      <div class="common-card no-cardFooter">
                         
                            <figure>
                                <img class="lazyload" src="${_obj?.field_image || ''}" data-src="${_obj?.field_image || ''}" alt="${_obj?.field_image_alt || ''}" title="${_obj?.field_image_alt || ''}" width="455" height="455" />
                            </figure>
                          
                          <div class="common-card-body">
                              <p class="yearDetails">${_obj?.field_sub_title || ''}</p>
                              <h3>${_obj?.title || ''}</h3>
                              ${_obj?.description || ''}                             
                          </div>
                      </div>
                  </div>
        `;
        container.append(contentData);
      });
    }
  } catch (e) {
    console.log(e);
  }
}

/////////////////////////========== Alumni Star Generate ===============/////////////
function createAlumniStarList(containerId, data) {
  try {
    let container = $(containerId);
    var contentData = '';
    if (data && data.length === 0) {
      var contentData = `<div class="alignCenter">No Records</div>`;
      container.append(contentData);
    } else {
      data.forEach((_obj, index) => {
        contentData = `
        <div class="col-md-4 col-sm-6" style="display: block;">
                      <div class="common-card no-cardFooter">
                         
                            <figure>
                                <img class="lazyload" src="${_obj?.field_image || ''}" data-src="${_obj?.field_image || ''}" alt="${_obj?.field_image_alt || ''}" title="${_obj?.field_image_alt || ''}" width="455" height="455" />
                            </figure>
                          
                          <div class="common-card-body">
                              <p class="yearDetails">${_obj?.field_sub_title || ''}</p>
                              <h3>${_obj?.title || ''}</h3>
                              ${_obj?.description || ''}
                             
                              
                             
                          </div>
                          <!-- <div class="common-card-footer">
                              <a href="${_obj?.field_unique_url || 'javascript:;'}" class="cta_with_arrow">Read full stories</a>
                          </div> -->
                      </div>
                  </div>
        `;
        container.append(contentData);
      });
    }
  } catch (e) {
    console.log(e);
  }
}

/////////////////////////========== Create Connect With Alumni List Generate ===============/////////////
function createConnectWithAlumniList(containerId, data) {
  try {
    $(containerId).empty();
    let html = "";
    let resp = data;
    if (data && data.length === 0) {
      html += ejs.render(`
              <div class="alignCenter">
                  No Records
              </div>
          `);
    } else {
      data.forEach((_obj, index) => {
        html += ejs.render(`
                  <div class="col-md-4 col-sm-6">
                      <a href="javascript:;" class="common-card">
                          <% if(data.field_image) { %>
                            <figure>
                                <img class="lazyload" src="<%- data.field_image || '' %>" data-src="<%- data.field_image || '' %>" alt="<%- data.field_image_alt || '' %>" title="<%- data.field_image_alt || '' %>" width="455" height="455" />
                            </figure>
                          <% } %>
                          <div class="common-card-body">
                              <p class="yearDetails"><%- data.field_sub_title || '' %></p>
                              <h3><%- data.title || '' %></h3>
                              <p class="deanDetails"><%- data.field_designation || '' %></p>
                              <%- data.description || '' %>
                          </div>
                        </a>
                  </div>
                  `, {
          data: resp[index]
        });
      });
    }
    $(containerId).html(html);
  } catch (e) {
    console.log(e);
  }
}

/////////////////////////========== Student Result API ===============/////////////
function getStudentResult(catId, page_no) {
  try {
    $.get(`/api/getStudentResult?cat=${catId}&page_no=${page_no}`, function (obj, status) {
      try {
        //console.log('obj ', obj.data  , obj.status);
        if ((obj || obj === '') && obj !== null && obj.status !== 404 && status) {
          let res = obj.data;
          let total_pages = obj.pager.total_pages;
          $('#totalCount').length && $('#totalCount').text(obj.count);
          if ($("#studentWorkList").length > 0) {
            createStudentResultList('#studentWorkList', res);
            // load_more_row(6,'.load_more_row')
            // console.log(res)
            if (total_pages === 1) {
              $('#loadMoreDataAPI').hide();
            } else {
              $('#loadMoreDataAPI').show();
            }
            if (page_no + 1 === total_pages) {
              $('#loadMoreDataAPI').hide();
            }
          }
          $("#studentWorkList .loadingContent").remove();
        } else {
          $('#totalCount').length && $('#totalCount').text(0);
          $('#studentWorkList').length && createStudentResultList('#studentWorkList', []);
          $('#studentWorkList').text('No Record');
          $('#loadMoreDataAPI').hide();
        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

/////////////////////////========== Create Connect With Alumni List Generate ===============/////////////
function createStudentResultList(containerId, data) {
  try {
    let container = $(containerId);
    var contentData = '';
    if (data && data.length === 0) {
      var contentData = `<div class="alignCenter">No Records</div>`;
      container.append(contentData);
    } else {
      data.forEach((_obj, index) => {
        contentData = `
        <div class="col-md-4 col-sm-6" style="display: flex;">
        <div class="common-card no_arrow with_abs_footer read_more_content">
        <figure>
        <img src="/assets/images/blank.gif" data-src=${_obj?.field_image || ''} alt='${_obj?.field_image_alt}' title='${_obj?.field_image_alt}' width="707" height="500" class="lazyload" />
      </figure>
              <div class='common-card-body'>
                <h3>${_obj?.title || ''}</h3>                
                  <p>${_obj?.summary || ''}</p>                
              </div>
              <div class='common-card-footer'>
                <h4 class='cta_with_arrow'>Read more</h4>
              </div>
              <div class="more_content">
                <div class="innerContent">${_obj?.description || ''}</div>  
              </div>
              <div class="inner_footer">
                  <button class="back_btn"><img src="/assets/images/back-arrow.webp" alt="back"> Back</button>
              </div>
            </div>
        </div>
        `;
        container.append(contentData);
      });
    }
  } catch (e) {
    console.log(e);
  }
}

/////////////////////////========== Download Result API ===============/////////////
function getDownloadResult(catId, page_no) {
  try {
    $.get(`/api/getDownloadResult?page_no=${page_no}&cat=${catId}`, function (obj, status) {
      try {
        if ((obj || obj === '') && obj !== null && status) {
          let res = obj.rows;
          let total_pages = obj.pager.total_pages;
          if ($("#DownloadWorkList").length > 0 && res.length > 0) {
            createDownloadResultList('#DownloadWorkList', res);
            // load_more_row(6,'.load_more_row')
            // console.log(res)
            if (total_pages === 1 || total_pages === 0) {
              $('#loadMoreDataAPI').hide();
            } else {
              $('#loadMoreDataAPI').show();
            }
            if (page_no + 1 === total_pages) {
              $('#loadMoreDataAPI').hide();
            }
          } else {
            $('#DownloadWorkList').length && createDownloadResultList('#DownloadWorkList', []);
          }
          $("#DownloadWorkList .loadingContent").remove();
        } else {
          $('#totalCount').length && $('#totalCount').text(0);
          $('#DownloadWorkList').length && createDownloadResultList('#DownloadWorkList', []);
        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

/////////////////////////========== Create Connect With Download List Generate ===============/////////////
function createDownloadResultList(containerId, data) {
  try {
    let container = $(containerId);
    var contentData = '';
    if (data && data.length === 0) {
      var contentData = `<div class="alignCenter">No Records</div>`;
      container.append(contentData);
    } else {
      data.forEach((_obj, index) => {
        // console.log(_obj.field_unique_url.includes("?")?_obj.field_unique_url?.split("?")[0]:_obj.field_unique_url)
        contentData = `
        <li class="col-md-12 col-lg-12 col-xl-12" style="display:block">
                             <a href="${_obj.field_unique_url.includes("?") ? _obj.field_unique_url?.split("?")[0] : _obj.field_unique_url || 'javascript:;'}"  target="_blank">
                             ${_obj.title || ''}     
                                   <span class="cta_with_arrow">Download</span>                                 
                             </a>
                         </li>
        `;
        container.append(contentData);
      });
    }
  } catch (e) {
    console.log(e);
  }
}

/////////////////////////========== FAQ Result API ===============/////////////
function getFAQResult(catId, page_no) {
  try {
    $.get(`/api/getFAQResult?page_no=${page_no}&cat=${catId}`, function (obj, status) {
      try {
        if ((obj || obj === '') && obj !== null && status) {
          let res = obj.rows;
          let total_pages = obj.pager.total_pages;
          if ($("#FAQWorkList").length > 0 && res.length > 0) {
            createFAQResultList('#FAQWorkList', res);
            // load_more_row(6,'.load_more_row')
            // console.log(res)
            if (total_pages === 1 || total_pages === 0) {
              $('#loadMoreDataAPI').hide();
            } else {
              $('#loadMoreDataAPI').show();
            }
            if (page_no + 1 === total_pages) {
              $('#loadMoreDataAPI').hide();
            }
          } else {
            $('#FAQWorkList').length && createFAQResultList('#FAQWorkList', []);
          }
          $("#FAQWorkList .loadingContent").remove();
        } else {
          $('#totalCount').length && $('#totalCount').text(0);
          $('#FAQWorkList').length && createFAQResultList('#FAQWorkList', []);
        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

/////////////////////////========== Create Connect With Download List Generate ===============/////////////

let faqpage = 0;
function createFAQResultList(containerId, data) {
  faqpage++;
  try {
    let container = $(containerId);
    var contentData = '';
    let faqAllData = [];
    if (data && data.length === 0) {
      var contentData = `<div class="alignCenter">No Records</div>`;
      container.append(contentData);
    } else {
      data.forEach((_obj, index) => {
        let question = _obj?.title.replace(/"/g, "");
        let answer = _obj?.body.replace(/"/g, "");
        contentData = `
            <div class="col-12 accordion-item ">
                <h3 class="accordion-header" id="headingThree${index}${faqpage}">
                  <button class="${index === 0 && faqpage === 1 ? 'accordion-button' : 'accordion-button collapsed'}"  type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree${index}${faqpage}" aria-expanded="${index === 0 ? true : false}" aria-controls="collapseThree${index}${faqpage}">
                    ${_obj?.title || ''}
                  </button>
                </h3>
                <div id="collapseThree${index}${faqpage}" class="${index === 0 && faqpage === 1 ? 'accordion-collapse collapse show' : 'accordion-collapse collapse'}" aria-labelledby="headingThree${index}${faqpage}" data-bs-parent="#FAQWorkList">
                    <div class="accordion-body">
                        ${_obj?.body || ''}
                    </div>
                </div>                
            </div>
        </div>
        `;
        faqAllData.push(`{
          "@type": "Question",
          "name": "${question || ''}",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "${answer || ''}"
          }
        }`);
        container.append(contentData);
      });
      let faqSchema = `
        <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [${faqAllData}]
          }
        </script>
      `;
      container.append(faqSchema);
    }
  } catch (e) {
    console.log(e);
  }
}

//events
function getEventData(type, count) {
  try {
    $.get(`/api/getEventData?type=${type}&page_no=${count}&`, function (obj, status) {
      try {
        obj?.error && $('#loadMoreDataAPI').hide();
        $('#loadMoreDataAPI span').text('Load More');
        let total_pages = obj?.pager?.total_pages;
        $("#eventList").length > 0 && createEventList("#eventList", obj);
        if (page_no + 1 === total_pages) {
          $('#loadMoreDataAPI').hide();
        }
        //load_more_row(4, ".load_more_container");
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

/////////////////////////========== events List Generate ===============/////////////
function createEventList(containerId, data) {
  try {
    //$(containerId).empty();
    let html = "";
    let resp = data;
    console.log('event ', data);
    if (data && data.length === 0 || data.error === true) {
      console.log('eventsss ', data.error);
      html += ejs.render(`
              <div class="alignCenter">
                  No Records
              </div>
          `);
    } else {
      // $(".eventLength").text(`(${data?.count ? data?.count : 0})`);

      const dayname = d => {
        if (d > 3 && d < 21) return `${d}th`;
        switch (d % 10) {
          case 1:
            return `${d}st`;
          case 2:
            return `${d}nd`;
          case 3:
            return `${d}rd`;
          default:
            return `${d}th`;
        }
      };
      const monthName = m => {
        return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][m];
      };
      // html=` <div class="row load_more_row">`;
      data?.data?.forEach((_obj, index) => {
        let timeStartDate = _obj?.field_start_date.split(' ');
        const monthStart = monthName(new Date(_obj.field_start_date).getMonth());
        const dayStart = dayname(new Date(_obj?.field_start_date).getDate());
        let timeEndDate = _obj?.field_end_date.split(' ');
        const monthEnd = monthName(new Date(_obj.field_end_date).getMonth());
        const dayEnd = dayname(new Date(_obj?.field_end_date).getDate());
        let location = "";
        _obj?.field_location?.forEach((cityname, index) => {
          location = location + (index === 0 ? "" : ", ") + cityname?.name + "";
        });
        let startDateVal = `${dayStart}  ${monthStart} ${new Date(_obj?.field_start_date).getFullYear()}`;
        let endDateVal = `${monthEnd}  ${dayEnd} ${new Date(_obj?.field_end_date).getFullYear()}`;
        html += `
      <div class="row event_row ">
      <div class="col-md-6">
          <figure>
              <img src="/assets/images/blank.gif" class="lazyload" data-src="${_obj?.field_image}" alt="${_obj?.field_image_alt}"
                title="${_obj?.field_image_alt}" width="706" height="454" />
          </figure>
      </div>
      <div class="col-md-6">
          <div class="text_content">
            <div class="datetimetag">
              <span>#${_obj?.field_category?.name}</span> 
              <span>${startDateVal}, ${timeStartDate[1]}</span>
              <span>${endDateVal}, ${timeEndDate[1]}</span>
            </div>
            <h3>${_obj?.title}</h3>
              ${_obj?.description}
             
                <p class="locationP">Location: ${location}  </p>
            
            
              <a href="${_obj?.field_unique_url}" class="btn btn-outline">Know more</a>
            </div>
      </div>
    </div>
      
      `;
      });
    }
    $(".eventLength").text(`(${data?.count ? data?.count : 0})`);
    html = ejs.render(html);
    $(containerId).append(html);
  } catch (e) {
    console.log(e);
  }
}
function getContactUsLable(count) {
  try {
    $.get(`/api/getContactUsLable?page_no=${count}&`, function (obj, status) {
      try {
        $("#first_namelable").html(`<span class="redStar">*</span>${obj?.data?.name?.includes("*") ? obj?.data?.name?.split("*")[1] : obj?.data?.name}`);
        $("#mob_emaillable").html(`<span class="redStar">*</span>${obj?.data?.mobile_no?.includes("*") ? obj?.data?.mobile_no?.split("*")[1] : obj?.data?.mobile_no}`);
        $("#emailidlable").html(`<span class="redStar">*</span>${obj?.data?.email?.includes("*") ? obj?.data?.email?.split("*")[1] : obj?.data?.email}`);
        $("#Campuslable").html(`<span class="redStar">*</span>${obj?.data?.campus?.includes("*") ? obj?.data?.campus?.split("*")[1] : obj?.data?.campus}`);

        // contact us
        $('#contact-form-heading-lable').html(`<h3>${obj.data.contact_us_heading}</h3>`);
        $('#message-label').html(`<span class="redStar">*</span>${obj?.data?.message?.includes("*") ? obj?.data?.message?.split("*")[1] : obj?.data?.message}`);

        //webinar
        $("#webinar_first_name").html(`<span class="redStar">*</span>${obj?.data?.first_name?.includes("*") ? obj?.data?.first_name?.split("*")[1] : obj?.data?.first_name}`);
        $("#webinar_mob_email").html(`<span class="redStar">*</span>${obj?.data?.mobile_no?.includes("*") ? obj?.data?.mobile_no?.split("*")[1] : obj?.data?.mobile_no}`);
        $("#webinar_email").html(`<span class="redStar">*</span>${obj?.data?.email?.includes("*") ? obj?.data?.email?.split("*")[1] : obj?.data?.email}`);
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}
function getLocationList(navigationFor, count) {
  try {
    $.get(`/api/getLocationList?page_no=${count}&`, function (obj, status) {
      try {
        if ((obj || obj === "") && obj !== null && status) {
          let res = obj[0].items;
          if (navigationFor === "feeStructure") {
            $("#locationAPIFee").length && createLocationListFee("#locationAPIFee", res);
          } else {
            $("#locationAPI").length && createCampusList("#locationAPI", res);
          }
        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}
function getFacultySitemapData() {
  try {
    $.get(`/api/getFacultySitemap`, function (obj, status) {
      try {
        if (obj && obj.length) {
          createFacultySitemap(obj, '#facultySitemapData');
        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}
function createFacultySitemap(data, id) {
  try {
    $(id).empty();
    let html = "";
    let resp = data;
    if (data && data.length === 0) {
      html += ejs.render(`
              <div class="alignCenter noRecored">
                  No Records
              </div>
          `);
    } else {
      data.forEach((_obj, index) => {
        html += ejs.render(`
                  <li>
                    <a href="<%- data?.field_unique_url %>" title="<%- data?.title %>"><%- data?.title %></a>
                    <p><%- data?.field_faculty_position %></p>
                  </li>
                  `, {
          data: resp[index]
        });
      });
    }
    $(id).html(html);
  } catch (e) {
    console.log(e);
  }
}
function createCampusList(containerId, data) {
  try {
    $(containerId).empty();
    let html = "";
    let resp = data;
    if (data && data.length === 0) {
      html += ejs.render(`
      <option value='' >Select Campus*</option>
          `);
    } else {
      html += ejs.render(`
      <option value='' >Select Campus*</option>
          `);
      data.forEach((_obj, index) => {
        html += ejs.render(`
          <option value='${_obj?.name}'>${_obj?.name}</option>
                  `, {
          data: resp[index]
        });
      });
    }
    $(containerId).html(html);
  } catch (e) {
    console.log(e);
  }
}
function getCourseList(count) {
  try {
    $.get(`/api/getCourseList?page_no=${count}&`, function (obj, status) {
      try {
        if ((obj || obj === "") && obj !== null && status) {
          let res = obj[0].items;
          $("#courseList").length && createCourseList("#courseList", res);
        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}
function createCourseList(containerId, data) {
  try {
    $(containerId).empty();
    let html = "";
    let resp = data;
    if (data && data.length === 0) {
      html += ejs.render(`

      <div class="alignCenter">
                  No Records
              </div>
      
          `);
    } else {
      html += ejs.render(`
      <h3>SELECT PROGRAM</h3>
          `);
      data.forEach((_obj, index) => {
        html += ejs.render(`
          <p>
          <input type="radio" id="program${index}" name="radio-course" value="${_obj?.term_id}"  ${index === 0 ? 'checked' : ''}>
          <label for="program${index}">${_obj?.name}</label>
          </p>
                  `, {
          data: resp[index]
        });
      });
    }
    $(containerId).html(html);
  } catch (e) {
    console.log(e);
  }
}
function getFooterData(key) {
  try {
    $.get(`/api/getFooterData?key=${key}`, function (obj, status) {
      try {
        if ((obj || obj === "") && obj !== null && status) {
          let res = obj;
          if (key === "bottom_navigation") {
            $("#bottomNavigation").length && createFooterData("#bottomNavigation", res);
          }
          if (key === "left_site_text") {
            $("#FooterLeftData").length && createFooterLeftData("#FooterLeftData", res);
          }
          if (key === "footer_menu_mobile") {
            $("#mobileFooterMenu").length && createFooterMobileMenu("#mobileFooterMenu", res);
          }
        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}
function createFooterData(containerId, data) {
  try {
    $(containerId).empty();
    let html = "";
    let resp = data;
    if (data && data.length === 0) {
      html += ejs.render(`

      <div class="alignCenter">
                  No Records
              </div>
      
          `);
    } else {
      data.forEach((_obj, index) => {
        html += ejs.render(`
        <%- data.description || '' %>
        <ul class="list-unstyled mb-0 d-flex py-xl-0 py-4 justify-content-xl-end justify-content-center">
        <%data?.items?.forEach(item =>{%>
         <li><a href= '<%- item?.url || 'javascript:;' %>' title='<%- item?.name || '' %>'  target="<%- item?.name==='Privacy Policy' ? '_blank' : '_self' %>" ><%- item?.name || "" %></a></li>
          <%})%>
        </ul>               
                `, {
          data: resp[index]
        });
      });
    }
    $(containerId).html(html);
  } catch (e) {
    console.log(e);
  }
}
function createFooterLeftData(containerId, data) {
  try {
    $(containerId).empty();
    let html = "";
    let resp = data;
    if (data && data.length === 0) {
      html += ejs.render(`

      <div class="alignCenter">
                  No Records
              </div>
      
          `);
    } else {
      data.forEach((_obj, index) => {
        html += ejs.render(`
        <ul>
        <li><a target='_blank' href= ${_obj?.items[0]?.url || "javascript:;"} target="_blank" rel="nofollow noreferrer" title= ${_obj?.items[0]?.name || "Runway"}><img class="lazyload"
          src="/assets/images/blank.gif" data-src="/assets/images/footer-logo-runway.webp" alt="Runway" title="Runway" width="140"
              height="54" /></a>
              ${_obj?.items[0]?.description || ""}
                      </li>
      </ul>
            `);

        //   html += ejs.render(`

        //   <ul>
        //   <li><a href="javascript:;" title="Runway"><img class="lazyload"
        //     src="/assets/images/blank.gif" data-src="/assets/images/footer-logo-pearlxstudio.webp" alt="PearlxStudio" title="PearlxStudio" width="140"
        //         height="52" /></a>
        //         <p>Experiential and Immersive courses that offer power-packed learning from basic to advanced levels.</p>
        //                   </li>
        //   <li><a href="javascript:;" title="PearlxStudio"><img class="lazyload"
        //     src="/assets/images/blank.gif" data-src="/assets/images/footer-logo-runway.webp" alt="Runway" title="Runway"
        //         width="140" height="54" /></a>
        //         <p>We help start-ups convert their ideas into real and viable businesses</p>
        //   </li>
        // </ul>

        //       `);
      });
    }

    $(containerId).html(html);
  } catch (e) {
    console.log(e);
  }
}
function createFooterMobileMenu(containerId, data) {
  try {
    $(containerId).empty();
    let html = "";
    let resp = data;
    if (data && data.length === 0) {
      html += ejs.render(`

      <div class="alignCenter">
                  No Records
              </div>
      
          `);
    } else {
      data.forEach((_obj, index) => {
        html += ejs.render(`
        <div class="col-md-4 col-4">
        <a href= ${_obj?.items[0]?.url || "tel:18001033005"}  class="content_box">
          <img src="/assets/images/chat-icon2.svg" alt="Chat icon" />
         ${_obj?.items[0]?.name || "Chat with <br>Student Buddy"} 
        </a>
      </div>
      <div class="col-md-4 col-4">
        <a  href=${_obj?.items[1]?.url || "javascript:;"} class="content_box" target="_blank">
          <img src="/assets/images/download-white.png" alt="Download" />
          ${_obj?.items[1]?.name || "Download <br>Brochure"}
        </a>
      </div>
      <div class="col-md-4 col-4">
        <div class="cta_box">
          <a href= ${_obj?.items[2]?.url || "https://admissions.pearlacademy.com/studentportal/sturegistration.aspx"} target="_blank" class="btn btn-primary">${_obj?.items[2]?.name || "Apply Now"}</a>
        </div>
      </div>
            `);

        //   html += ejs.render(`
        //   <div class="col-md-4 col-4">
        //   <a href= "tel:18001033005"  class="content_box">
        //     <img src="/assets/images/call-white.png" alt="" />
        //    Call<br> Me Back 
        //   </a>
        // </div>
        // <div class="col-md-4 col-4">
        //   <a  href= "javascript:;" class="content_box">
        //     <img src="/assets/images/download-white.png" alt="" />
        //      Download <br>Brochure 
        //   </a>
        // </div>
        // <div class="col-md-4 col-4">
        //   <div class="cta_box">
        //     <a href= "https://admissions.pearlacademy.com/studentportal/sturegistration.aspx" target="_blank" class="btn btn-primary">Apply Now</a>
        //   </div>
        // </div>
        //       `);
      });
    }

    $(containerId).html(html);
  } catch (e) {
    console.log(e);
  }
}
function getGlobalContentNextStep() {
  try {
    $.get(`/api/getGlobalContentNextStep`, function (obj, status) {
      try {
        if ((obj || obj === "") && obj !== null && status) {
          let res = obj?.content?.field_components;
          $("#globalContent").length && createGlobalContentNextStep("#globalContent", res);
        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}
function createGlobalContentNextStep(containerId, data) {
  try {
    $(containerId).empty();
    let html = "";
    let resp = data;
    if (data && data.length === 0) {
      html += ejs.render(`

      <div class="alignCenter">
                  No Records
              </div>
      
          `);
    } else {
      data.forEach((_obj, index) => {
        html += ejs.render(`

        <div class="container step_details">
              <div class="section-heading">
                  <h2>
                  ${_obj?.title_subtitle_with_cta_link?.field_title || "Take the <span>next step</span>"}
                  </h2>
                  
                      <p>
                      ${_obj?.title_subtitle_with_cta_link?.field_sub_title || " Start your journey of becoming a Complete Design Professional today!"}
                     </p>
                  
              </div>
              <div class="btnContainer">
                      <a href=${_obj?.title_subtitle_with_cta_link?.field_url[0]?.uri || 'javascript:;'} target="_blank" title='${_obj?.title_subtitle_with_cta_link?.field_url[0]?.title}' class="btn btn-primary">${_obj?.title_subtitle_with_cta_link?.field_url[0]?.title || 'Apply Now'}</a>
                  
                      <a href=${_obj?.title_subtitle_with_cta_link?.field_url[1]?.uri || 'javascript:;'} title='${_obj?.title_subtitle_with_cta_link?.field_url[1]?.title}' class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#counsellarModal">${_obj?.title_subtitle_with_cta_link?.field_url[1]?.title || 'Connect with a counsellor'}</a>
                  
                      <a href=${_obj?.title_subtitle_with_cta_link?.field_url[2]?.uri || 'javascript:;'} title='${_obj?.title_subtitle_with_cta_link?.field_url[2]?.title}' class="btn btn-primary">${_obj?.title_subtitle_with_cta_link?.field_url[2]?.title || 'Schedule a campus visit'}</a>
                  
              </div>
          </div>

         
<div class="modal fade counsellarModal" id="counsellarModal" tabindex="-1" aria-labelledby="counsellarModalLabel"
aria-hidden="true">
   <div class="modal-dialog modal-md modal-dialog-centered">
      <div class="modal-content">
         <div class="modal-header">
            <h5>Helpline</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
               <img src="/assets/images/icon-form-close.svg" alt="Close Modal" title="Close Modal">
            </button>
         </div>
         <div class="modal-body">
            <p><a href="tel:18001033005" title="Calling">1800-103-3005</a></p>
         </div>
      </div>
   </div>
</div>
        
            `);
      });
    }
    $(containerId).html(html);
  } catch (e) {
    console.log(e);
  }
}
function getCategoryList(count) {
  try {
    $.get(`/api/getCategoryList?page_no=${count}&`, function (obj, status) {
      try {
        if ((obj || obj === "") && obj !== null && status) {
          let res = obj[0].items;
          $("#categoryList").length && createCategoryListFee("#categoryList", res);
        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}
function createCategoryListFee(containerId, data) {
  try {
    $(containerId).empty();
    let html = "";
    let resp = data;
    if (data && data.length === 0) {
      html += ejs.render(`

      <div class="alignCenter">
                  No Records
              </div>
      
          `);
    } else {
      html += ejs.render(`
      <h3>SELECT AREA OF STUDY</h3>
      <p>
      <input type="radio" id="area_of_study01" name="radio-study-category" checked value="both"  >
      <label for="area_of_study01">All</label>
      </p>
          `);
      data.forEach((_obj, index) => {
        html += ejs.render(`
          <p>
          <input type="radio" id="area_of_study${index}" name="radio-study-category" value="${_obj?.term_id}">
          <label for="area_of_study${index}">${_obj?.name}</label>
          </p>
                  `, {
          data: resp[index]
        });
      });
    }
    $(containerId).html(html);
  } catch (e) {
    console.log(e);
  }
}
function createLocationListFee(containerId, data) {
  try {
    $(containerId).empty();
    let html = "";
    let resp = data;
    if (data && data.length === 0) {
      html += ejs.render(`

      <div class="alignCenter">
                  No Records
              </div>
      
          `);
    } else {
      html += ejs.render(`
      <h3>SELECT CAMPUS CITY</h3>
          `);
      data.forEach((_obj, index) => {
        html += ejs.render(`
          <p>
          <input type="radio" id="location${index}" name="radio-city-campus" value="${_obj?.term_id}" ${index === 0 ? 'checked' : ''}  >
          <label for="location${index}">${_obj?.name}</label>
          </p>
                  `, {
          data: resp[index]
        });
      });
    }
    $(containerId).html(html);
  } catch (e) {
    console.log(e);
  }
}
function getTabListCourse(program, category, location, count) {
  sectionLoader("#tablistcourse");
  try {
    $.get(`/api/getTabListCourse?program=${program}&category=${category}&location=${location}&page_no=${count}`, function (obj, status) {
      try {
        if ((obj || obj === "") && obj !== null && status) {
          let res = obj;
          $("#tablistcourse").length && createTabListCourse("#tablistcourse", res);
        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}
let apiCall = 0;
function createTabListCourse(containerId, data) {
  apiCall++;
  try {
    $(containerId).empty();
    let html = "";
    let resp = data;
    if ($(window).width() < 1024 && apiCall === 1) {
      var selected_programs = $('.selected_programs').html();
      $('.filter_toggle_content .filter_content .inner_content').append(selected_programs);
    }
    if (data && data.length === 0) {
      // getFeeStructure(5,0)
      createFeeStructure("#feeStrucure-tabs", []);
      html += ejs.render(`

      <div class="alignCenter">
                  No Course Available.
              </div>
        
          `);
    } else {
      getFeeStructure(0, data[0].nid);
      data.forEach((_obj, index) => {
        html += ejs.render(`<li class="nav-item" role="presentation" id="f${index}-tab">
          <button class="${index === 0 ? 'nav-link active' : 'nav-link'}" data-bs-toggle="tab" data-bs-target="#f${index}" type="button" role="tab" aria-controls="f${index}" aria-selected="${index === 0 ? 'true' : 'false'}" data-termId =${_obj?.nid} >${_obj?.field_course}</button>
       </li> `, {
          data: resp[index]
        });
      });
    }
    $(containerId).html(html);
  } catch (e) {
    console.log(e);
  }
}
function getFeeStructure(count, nid) {
  sectionLoader("#feeStrucure-tabs");
  try {
    $.get(`/api/getFeeStructure?page_no=${count}&nid=${nid}`, function (obj, status) {
      try {
        if ((obj || obj === "") && obj !== null && status) {
          let res = obj;
          if (obj[0]?.body) {
            $("#feeStrucure-tabs").length && createFeeStructure("#feeStrucure-tabs", res);
          } else {
            createFeeStructure("#feeStrucure-tabs", []);
          }
        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}
function createFeeStructure(containerId, data) {
  try {
    $(containerId).empty();
    let html = "";
    let resp = data;
    if (data && data.length === 0) {
      html += ejs.render(`

      <div class="alignCenter">
                  
              </div>
      
          `);
    } else {
      data.forEach((_obj, index) => {
        html += ejs.render(` ${_obj?.body}`, {
          data: resp[index]
        });
      });
    }
    $(containerId).html(html);
  } catch (e) {
    console.log(e);
  }
}

//ourFaculty
function getOurFaculty(page_no) {
  try {
    sectionLoader("#ourFacultyContent");
    if ($("#ourFacultyContent").length) {
      $.get(`/api/getOurFaculty?page=${page_no}`, function (obj, status) {
        try {
          if ((obj || obj === "") && obj !== null && status) {
            let res = obj.rows;
            let total_pages = obj.pager.total_pages;
            if ($("#ourFacultyContent").length) {
              createOurFacultyList("#ourFacultyContent", res);
              if (page_no + 1 === total_pages) {
                $('#loadMoreDataAPI').hide();
              }
            }
            $("#ourFacultyContent .loadingContent").remove();
          } else {
            if ($("#ourFacultyContent").length) {
              createOurFacultyList("#ourFacultyContent", []);
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
}

/////////////////////////========== OurFaculty Content Generate ===============/////////////
function createOurFacultyList(containerId, data) {
  try {
    let container = $(containerId);
    var contentData = '';
    if (data && data.length === 0) {
      var contentData = `<div class="alignCenter">No Records</div>`;
      container.append(contentData);
    } else {
      data.forEach((_obj, index) => {
        contentData = `
        <div class="col-md-4 col-sm-6 mb-5">   
            <a href=${_obj?.field_unique_url || 'javascript:;'} class="common-card">
              <figure>
                <img fetchpriority="high" class="lazyload" data-src= ${_obj?.field_image || ''} alt="${_obj?.title || ''}" title="${_obj?.title || ''}" width="455" height="455" />
              </figure>
              <div class="common-card-body">
                  <h3>${_obj?.title}</h3>
                  <p class="deanDetails">${_obj?.field_faculty_position}</p>
                  <p class="ellipsisWithTwoLines">${_obj?.body}</p>
              </div>
            </a>
        </div>
        `;
        container.append(contentData);
      });
    }
  } catch (e) {
    console.log(e);
  }
}

//similer faculty
function getSimilerFaculty(page_no) {
  try {
    if ($("#courseid").length > 0) {
      course = $(".similerFacultyCourse").html().split(",")[0].trim();
      nid = $(".similerFacultyID").html().trim();
      sectionLoader("#similarFaculty");
      if ($("#similarFaculty").length) {
        $.get(`/api/getSimilerFaculty?course=${course}&page_no=${page_no}&nid=${nid}`, function (obj, status) {
          try {
            if ((obj || obj === "") && obj !== null && status) {
              let res = obj;
              let total_pages = obj?.pager?.total_pages;
              if ($("#similarFaculty").length) {
                createSimilerFacultyList("#similarFaculty", res);
                if (page_no + 1 === total_pages) {
                  $('#loadMoreDataAPI').hide();
                }
              }
              $("#similarFaculty .loadingContent").remove();
            } else {
              if ($("#similarFaculty").length) {
                createSimilerFacultyList("#similarFaculty", []);
              }
            }
          } catch (e) {
            console.log(e);
          }
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
}

/////////////////////////========== OurFaculty Content Generate ===============/////////////
function createSimilerFacultyList(containerId, data) {
  try {
    let container = $(containerId);
    var contentData = '';
    if (data && data.length === 0) {
      var contentData = `<div class="alignCenter">No Records</div>`;
      container.append(contentData);
    } else {
      data.forEach((_obj, index) => {
        contentData = `
        <div class="col-md-4 col-sm-6 mb-5">   
            <a href=${_obj?.field_unique_url || 'javascript:;'} class="common-card">
              <figure>
                <img class="lazyload" data-src= ${_obj?.field_image || ''} alt="${_obj?.title || ''}" title="${_obj?.title || ''}" width="455" height="455" />
              </figure>
              <div class="common-card-body">
                  <h3>${_obj?.title}</h3>
                  <p class="deanDetails">${_obj?.field_faculty_position}</p>
                  <p class="ellipsisWithTwoLines">${_obj?.body}</p>
              </div>
            </a>
        </div>
        `;
        container.append(contentData);
      });
    }
  } catch (e) {
    console.log(e);
  }
}
//form api calling function to drupal

function postDataToGusFunc(payload, _this) {
  try {
    let URL = '/api/submitForm';
    $.get(URL, payload, function (resp, status) {
      if (status === 'success') {
        //alert('form resp '+ resp.message);
        //if(resp.message){
        //window.location.href = 'https://uat.pearlacademy.com/thankyou'
        // }
        // console.log(_this)
        // _this.removeAttr('disabled').find('.callsubmit') 
        // _this.removeAttr('disabled');
        // _this.removeAttr('disabled').find('span').text('Submit');
      } else {
        _this.removeAttr('disabled');
        // _this.removeAttr('disabled').find('span').text('Submit');
        alert("something went wrong!");
      }
    });
  } catch (e) {
    console.log(e);
  }
}
//form api calling function to cms
function postDataToGusCMS(payload, _this, drupalpayload) {
  debugger;
  try {
    let URL = '/api/sendFormData';
    $.get(URL, payload, async function (resp, status) {
      if (status) {
        if (resp?.response?.status) {
          postDataToGusFunc(drupalpayload, _this);
          window.location = "/thankyou";
        } else {
          alert('Something went wrong');
          _this.removeAttr('disabled').val('Call Me Back');
          return false;
        }
      } else {
        alert('Something went wrong');
        _this.removeAttr('disabled').val('Call Me Back');
        return false;
      }
    });
  } catch (e) {
    console.log(e);
  }
}
function postDataToGusFuncEnq(payload, _this) {
  try {
    let URL = '/api/submitForm';
    debugger;
    $.get(URL, payload, function (resp, status) {
      if (status === 'success') {
        alert('form resp ' + resp.message);
        if (resp.message) {
          window.location.href = 'https://www.pearlacademy.com/thankyou';
        }
        console.log(resp.message);
        console.log(_this);
        _this.removeAttr('disabled').find('.callsubmit');
        _this.removeAttr('disabled');
        _this.removeAttr('disabled').find('span').text('Submit');
      } else {
        _this.removeAttr('disabled');
        // _this.removeAttr('disabled').find('span').text('Submit');
        alert("something went wrong!");
      }
    });
  } catch (e) {
    console.log(e);
  }
}
function formOptions(containerId, defaultSelectOption, data) {
  try {
    $(containerId).empty();
    let html = "";
    let resp = data;
    if (data && data.length === 0) {
      html += ejs.render(`
              <div class="alignCenter">
                  No Records
              </div>
          `);
    } else {
      html += `<option value="" selected="${defaultSelectOption}">${defaultSelectOption}*</option>`;
      data.forEach((_obj, index) => {
        html += ejs.render(`
                  <option value="<%- data.id %>"><%- data.name %></option>
                  `, {
          data: resp[index]
        });
      });
    }
    $(containerId).html(html);
  } catch (e) {
    console.log(e);
  }
}