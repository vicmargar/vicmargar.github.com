/*global $:false, jQuery:false, $Dash:true */
$Dash = {};
$(function () {
    "use strict";

    /* on scroll event */

    $(window).scroll(function() {
        var pos = $(this).scrollTop();

        /* show menu items and scroll top */
        if (pos >= 100) {
            $('#main-menu').removeClass('hidden');
            $('#scroll-top').removeClass('hidden');
        } else {
            $('#main-menu').addClass('hidden');
            $('#scroll-top').addClass('hidden');
        }
    });

    /* menu click events */
    $('#main-menu a').click(function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        if (target === '#*') {
            target = $('.tab-wrapper');
            $Dash.closeAll(target);
        } else {
            var pos = $(target).position();
            $('html,body').animate({scrollTop: pos.top}, 'slow');
            $Dash.toggleTab(target);
        }
        return false;

    });

    /* scroll top event */
    $('#scroll-top a').click(function(e) {
        e.preventDefault();
        $('html,body').animate({scrollTop: 0}, 'slow');
        return false;
    });

    /* collapse */
    $('.tab-trigger').click(function() {
        var wrapper = $(this).closest('.tab-wrapper');
        $Dash.toggleTab(wrapper);

        // pull the main content wrapper up when at least one tab is opened
        if ($('.tab-wrapper').hasClass('open')) {
            $(this).closest('.main-content > .wrapper').addClass('up');
        } else {
            $(this).closest('.main-content > .wrapper').removeClass('up');
        }

    });

    /* make each tab heading title same width */
    var titleWidth = 0;
    $('.tab-header > .tab-text').each(function(i, obj) {
        var width = $(obj).outerWidth();
        titleWidth = (width > titleWidth) ? width : titleWidth;
    });
    $('.tab-header > .tab-text').width(titleWidth);

    /* Skills Radial Preloader */
    $(".radial-progress .progress").knob();
    

    /* Portfolio isotope */
    var $portfolio = $('#portfolio');
    $portfolio.isotope({
        // options...
    });

    // filter items when filter link is clicked
    $('#portfolio-filter a').click(function() {
        var selector = $(this).attr('data-filter');
        $portfolio.isotope({filter: selector});
        return false;
    });
    
    /* fancybox */
    $("a.portfolio-image").fancybox();

    $("#profile-tab h4").click();
});

jQuery(window).on('scroll', function (){
  "use strict";
   /* skills gradual fill animations */
   jQuery('.tab-wrapper.open .linear-progress .progress-fill').each(function (i, obj){       
       if($Dash.isInViewport(obj)){
           $(obj).css('width', $(this).attr('data-value') +'%');
       }
   });
});


$Dash.toggleTab = function toggleTab(wrapper) {
   "use strict";
    var content = $(wrapper).find('.tab-content');

    if ($(wrapper).hasClass('open')) {
        $Dash.closeAll(wrapper);
    } else {
        var height = content.find('.content-wrapper').outerHeight();
        content.css('height', height + 'px');
        $(wrapper).toggleClass('open');
    }
};

$Dash.closeAll = function closeAll(wrapper) {
  "use strict";
    $(wrapper).find('.tab-content').css('height', '0px');
    $(wrapper).removeClass('open');
    $('.main-content > .wrapper').removeClass('up');
};

$Dash.isInViewport = function isInViewport(elem) {
  "use strict";
    var rect = elem.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
};