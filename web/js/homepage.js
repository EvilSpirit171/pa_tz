var isMenuExpanded = false;

$(document).ready(function() {

    $('#menu-btn').on('click', function() {
        if (isMenuExpanded == true) {
            $('#menu-btn').removeClass('active');
            $('#lp-menu-mob #lp-menu-mob-links').slideUp();
            $('html').removeClass('of-hidden');
            $('#page-overlay').fadeOut();

            isMenuExpanded = false;
        } else {
            $('#menu-btn').addClass('active');
            $('#lp-menu-mob #lp-menu-mob-links').slideDown();
            $('html').addClass('of-hidden');
            $('#page-overlay').fadeIn();

            isMenuExpanded = true;
        }
    });

    $('#lp-menu-mob a').on('click', function() {
        var linkHref = $(this).attr('href');
        if (linkHref.indexOf('#') !== -1) {
            $('#menu-btn').removeClass('active');
            $('#lp-menu-mob #lp-menu-mob-links').slideUp();
            $('html').removeClass('of-hidden');
            $('#page-overlay').fadeOut();
            isMenuExpanded = false;
        }

    });

});



document.addEventListener("DOMContentLoaded", function(event) {

    $(function() {
        $('#form1').submit(function(e) {
            var formName = $(this).attr('name');
            e.preventDefault();

            validateForm(formName);

            if (!validateForm(formName)) {
                $('#form1').addClass('processing');

                $.post('form-1.php', {
                    form1PhoneNum: $('#form1PhoneNum').val()
                }, function(d) {
                    mailResult(d, '#form1', true);
                });
            }

        });
    });


    $(function() {
        $('#form2').submit(function(e) {
            var formName = $(this).attr('name');
            e.preventDefault();

            validateForm(formName);

            if (!validateForm(formName)) {
                $('#form2').addClass('processing');

                $.post('form-2.php', {
                    form2Address: $('#form2Address').val(),
                    form2Rooms: $('#form2Rooms .selected').text(),
                    form2Furniture: $('#form2Furniture .selected').text(),
                    form2Repair: $('#form2Repair .selected').text(),
                    form2PhoneNum: $('#form2PhoneNum').val()
                }, function(d) {
                    mailResult(d, '#form2', true);
                });
            }

        });
    });


    $(function() {
        $('#form3').submit(function(e) {
            var formName = $(this).attr('name');
            e.preventDefault();

            validateForm(formName);

            if (!validateForm(formName)) {
                $('#form3').addClass('processing');

                $.post('form-3.php', {
                    form3Address: $('#form3Address').val(),
                    form3Rooms: $('#form3Rooms').val(),
                    form3PhoneNum: $('#form3PhoneNum').val(),
                    form3Rooms: $('#form3Rooms .selected').text(),
                    form3Furniture: $('#form3Furniture .selected').text(),
                    form3Repair: $('#form3Repair .selected').text(),
                }, function(d) {
                    mailResult(d, '#form3', true);
                });
            }

        });
    });


    if ($('#sticky-header').length) {

        var stickyShowOn = $('#global-header').height() + 50;
        var stickyHideOn = parseInt($('#section-calc').offset().top) - 100;

        var stickyMobShowOn = 300;
        var stickyMobHideOn = parseInt($('#section-calc-mob').offset().top) - 50;

        $(window).scroll(function() {
            var scrollPos = $(window).scrollTop();

            if (scrollPos > stickyShowOn) {
                $('#sticky-header').addClass('shown');
            } else {
                $('#sticky-header').removeClass('shown');
            }

            if (scrollPos > stickyMobShowOn) {
                $('#sticky-header-mob').addClass('shown');
            } else {
                $('#sticky-header-mob').removeClass('shown');
            }

            if (scrollPos > stickyMobHideOn && scrollPos > stickyHideOn) {
                $('#sticky-header-mob').removeClass('shown');
            }

        });

    }




    function is_touch_device() {
        var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
        var mq = function(query) {
            return window.matchMedia(query).matches;
        }

        if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
            return true;
        }

        var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
        return mq(query);
    }


    if (is_touch_device()) {
        $('#sticky-social-btn').click(function() {
            $('#sticky-social').toggleClass('expanded');
        });
        $(document).click(function() {
            $('#sticky-social').removeClass('expanded');
        });
        $('#sticky-social-icons a, #sticky-social-btn').click(function(e) {
            e.stopPropagation();
        });
    } else {
        $('#sticky-social').hover(
            function() {
                $(this).addClass('expanded');
            },
            function() {
                $(this).removeClass('expanded');
            }
        );
    }

    $('#steps-carousel').owlCarousel({
        center: true,
        items: 1,
        loop: false,
        margin: 17,
        stagePadding: 34,
        dots: true,
        responsive: {
            600: {
                items: 2
            }
        }
    });


});