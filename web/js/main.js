function validateEl(element) {
    var isInvalid = false;
    theEl = document.querySelector(element);

    if (theEl.attributes.required && theEl.value == "") {
        theEl.classList.add("invalid");
        isInvalid = true;
    } else {
        theEl.classList.remove("invalid");
    }

    if (theEl.tagName == 'SELECT') {
        theEl.parentNode.classList.add("invalid");
        isInvalid = true;
    } else {
        theEl.parentNode.classList.remove("invalid");
    }

    return isInvalid;
}


function validateForm(formName) {
    var hasInvalidInputs = false;
    var theForm = document.forms[formName];

    for (i = 0; i < theForm.length; i++) {

        if (theForm[i].attributes.required && theForm[i].value == "") {
            theForm[i].classList.add("invalid");
            hasInvalidInputs = true;
        } else {
            theForm[i].classList.remove("invalid");
        }

        if (theForm[i].tagName == 'SELECT') {
            if (theForm[i].querySelector('[disabled]').value == theForm[i].value) {
                theForm[i].parentNode.classList.add("invalid");
                hasInvalidInputs = true;
            } else {
                theForm[i].parentNode.classList.remove("invalid");
            }
        }

        if (theForm[i].attributes.required && theForm[i].type == 'checkbox' && !theForm[i].checked) {
            theForm[i].classList.add("invalid");
            hasInvalidInputs = true;
        } else {
            theForm[i].classList.remove("invalid");
        }

    }

    return hasInvalidInputs;
}



function validateFormWithoutWarning(formName) {
    var hasInvalidInputs = false;
    var theForm = document.forms[formName];

    for (i = 0; i < theForm.length; i++) {
        if (theForm[i].attributes.required && theForm[i].value == "") {
            hasInvalidInputs = true;
        }
        if (theForm[i].tagName == 'SELECT') {
            if (theForm[i].querySelector('[disabled]').value == theForm[i].value) {
                hasInvalidInputs = true;
            }
        }
        if (theForm[i].attributes.required && theForm[i].type == 'checkbox' && !theForm[i].checked) {
            hasInvalidInputs = true;
        }
    }

    return hasInvalidInputs;
}


$('#paymentBik').on('keyup', (function(e) {
    if ($('#paymentBik').val().length == 9) {
        $.get('/api/internal/bik.php', {
            bik: $('#paymentBik').val()
        }, function(d) {
            ans = $.parseJSON(d);
            if (d.error === undefined) {
                $('#bankName').html(ans.name);
                $('#bankAddress').text(ans.address);
                $('#bankKS').text(ans.ks);
            } else {
                $('#bankName').text("--");
                $('#bankAddress').text("--");
                $('#bankKS').text("--");
            }
        });
    } else {
        $('#bankName').text("--");
        $('#bankAddress').text("--");
        $('#bankKS').text("--");
    }
}));


var mailResult = function(response, formId, emptyInputs) {
    $(formId).removeClass('processing');

    console.log(formId);

    if (response == 'fail') {
        $(formId).addClass('submit-fail');
    } else if (response == 'notfilled') {
        $(formId).addClass('submit-not-filled');
    } else {
        $(formId).addClass('submit-success');
        if (emptyInputs) {
            setTimeout(function() {
                $(formId + ' .input input').val('');
                $(formId + ' input').each(function(index, item) {
                    if ($(this).val().length != 0) {
                        $(this).removeClass('input-field-not-empty');
                    }
                });
            }, 800);
        }
    }
}



document.addEventListener("DOMContentLoaded", function(event) {

    $('[data-display-toggle]').on('click', function(e) {
        var el = $($(this).attr('data-display-toggle'));
        var functionDelay = parseInt($(this).attr('data-fn-delay'));

        if (!el.length) {
            el = $(this);
        }

        if (functionDelay) {
            setTimeout(function() {
                el.toggle();
            }, functionDelay);
        } else {
            el.toggle();
        }
    });

    $('[data-display-hide]').on('click', function(e) {
        var el = $($(this).attr('data-display-hide'));
        var functionDelay = parseInt($(this).attr('data-fn-delay'));

        if (!el.length) {
            el = $(this);
        }

        if (functionDelay) {
            setTimeout(function() {
                el.hide();
            }, functionDelay);
        } else {
            el.hide();
        }
    });


    $('[data-display-show]').on('click', function(e) {
        var el = $($(this).attr('data-display-show'));
        var functionDelay = parseInt($(this).attr('data-fn-delay'));

        if (!el.length) {
            el = $(this);
        }

        if (functionDelay) {
            setTimeout(function() {
                el.show();
            }, functionDelay);
        } else {
            el.show();
        }
    });



    $('[data-to-focus]').on('click', function(e) {
        var toFocus = $(this).attr('data-to-focus');
        $(toFocus).focus();
    });



    $("[remove-class]").on('click', function() {
        var elementClasses = $(this).attr('remove-class');
        var elementSelector = $(this).attr('class-el');
        var functionDelay = parseInt($(this).attr('data-fn-delay'));

        if (functionDelay) {
            setTimeout(function() {
                $(elementSelector).removeClass(elementClasses);
            }, functionDelay);
        } else {
            $(elementSelector).removeClass(elementClasses);
        }
    });


    $("[add-class]").on('click', function() {
        var elementClasses = $(this).attr('add-class');
        var elementSelector = $(this).attr('class-el');
        var functionDelay = parseInt($(this).attr('data-fn-delay'));

        if (functionDelay) {
            setTimeout(function() {
                $(elementSelector).addClass(elementClasses);
            }, functionDelay);
        } else {
            $(elementSelector).addClass(elementClasses);
        }
    });


    $("[toggle-class]").on('click', function() {
        var elementClasses = $(this).attr('toggle-class');
        var elementSelector = $(this).attr('class-el');
        var functionDelay = parseInt($(this).attr('data-fn-delay'));

        if (functionDelay) {
            setTimeout(function() {
                $(elementSelector).toggleClass(elementClasses);
            }, functionDelay);
        } else {
            $(elementSelector).toggleClass(elementClasses);
        }
    });




    $('[clear-form]').on('click', function(e) {
        var el = $(this).attr('clear-form');
        var functionDelay = parseInt($(this).attr('data-fn-delay'));

        if (!el.length) {
            el = $(this);
        }

        if (functionDelay) {
            setTimeout(function() {
                $(el + ' .input input').val('');
            }, functionDelay);
        } else {
            $(el + ' .input input').val('');
        }
    });




    $('[wizard-switch]').on('click', function() {
        var switchTo = $(this).attr('wizard-switch');
        var currentStep = $(this).attr('wizard-current');

        $(currentStep).removeClass('current');
        $(switchTo).addClass('current');
    });



    $('.js-smooth-scroll').on('click', function(event) {
        var linkHref = $(this).attr('href');

        event.preventDefault();

        if (linkHref == "#") {
            $('html, body').animate({
                scrollTop: 0
            }, 600);
        } else {
            $('html, body').animate({
                scrollTop: $(linkHref).offset().top
            }, 600);
        }

    });




    $(document).ready(function() {
        $('input').on('input', function() {
            $(this).removeClass('invalid')

            if ($(this).val().length > 0) {
                $(this).addClass('input-field-not-empty');
            } else {
                $(this).removeClass('input-field-not-empty');
            }
        });
    });





    $('.form-disabled').on('input', function() {
        var thisForm = $(this).attr('name');
        if (validateFormWithoutWarning(thisForm)) {
            $(this).find('.form-submit-btn').attr('disabled', 'true');
        } else {
            $(this).find('.form-submit-btn').removeAttr('disabled');
        }
    });


    function buttonTimeout(element, time) {
        var theButton = $(element);
        var theTicker = $(element + ' .timeout-button__tick');
        var timerDigits = time;

        theTicker.text(time);
        theButton.attr('disabled', 'disabled').removeClass('enabled');
        $(element + ' .val1').show();
        $(element + ' .val2').hide();


        var tickTheDigits = setInterval(function() {
            if (timerDigits > 0) {
                timerDigits--;
                theTicker.text(timerDigits);
            } else {
                clearInterval(tickTheDigits);
                theButton.removeAttr('disabled').addClass('enabled');
                $(element + ' .val1').hide();
                $(element + ' .val2').show();
            }
        }, 1000);
    }

    $(function() {
        $('.upload-doc-input').change(function() {
            var thisInputId = $(this).attr('id');
            var input = this;
            var url = $(this).val();
            var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();

            if (input.files && input.files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    $('#' + thisInputId + '-img').attr('src', e.target.result);
                    $('#' + thisInputId + '-wrap').addClass('upload-doc--filled');
                }
                reader.readAsDataURL(input.files[0]);
            } else {
                $('#' + thisInputId + '-img').attr('src', '/assets/img/upload-pic.png');
                $('#' + thisInputId + '-wrap').removeClass('upload-doc--filled');
            }

        });
    });


    $('.js-payInfoTgl').on('click', function() {
        var TglEl = $(this).attr('data-el');

        $(TglEl).toggleClass('shown');
    });




    $('[data-vimeo-play]').on('click', function(e) {
        var iframe = document.getElementById($(this).attr('data-vimeo-play'));
        var player = $f(iframe);

        player.api("play");
    });


    $('[data-vimeo-pause]').on('click', function(e) {
        var iframe = document.getElementById($(this).attr('data-vimeo-pause'));
        var player = $f(iframe);

        player.api("pause");
    });


    var foldSwitcher = $('.js-FoldHeader');

    foldSwitcher.on('click', function() {
        var foldId = $(this).attr('data-fold-id');

        $('#' + foldId).toggleClass('expanded');
    });

    $('[data-popup]').on('click', function(e) {
        var popupId = $(this).attr('data-popup');
        e.preventDefault();

        $('#' + popupId).addClass('displayed');
        setTimeout(function() {
            $('#' + popupId).addClass('show');
        }, 50);
        $('html').addClass('of-hidden');
    });



    $('.popup-close').on('click', function() {
        var closeBtn = $(this);

        closeBtn.parent().removeClass('show');
        setTimeout(function() {
            closeBtn.parent().removeClass('displayed');
        }, 500);
        $('html').removeClass('of-hidden');
    });

    $('#psst-close').on('click', function() {
        $('#psst').slideUp();
    });


    $(function() {
        $('#callForm').submit(function(e) {
            var formName = $(this).attr('name');
            e.preventDefault();

            validateForm(formName);

            if (!validateForm(formName)) {
                $('#callForm').addClass('processing');


                setTimeout(function() {
                    mailResult('success', '#callForm');
                }, 1000);
            }

        });
    });


    $(function() {
        $('[data-toggle="tooltip"]').tooltip()
    });

    $('input[type="tel"]').inputmask("+7 (999) 999 99 99");
    $('.input-mask-cvv').inputmask("999");
    $('.input-mask-card-date').inputmask("99/99");
    $('.input-mask-date').inputmask("99.99.9999");


    baguetteBox.run('.baguetteBox', {
        overlayBackgroundColor: 'rgba(140, 154, 172, 0.5)',
    });


    $(function() {
        $('select').selectric({
            onChange: function(element) {
                var elName = $(element).attr('name');
                var listItemValue = $(element).parent().siblings('.selectric-items').find('.selected').text();
                var elSelect = document.getElementsByName(elName)[0];
                var elOptions = elSelect.options;

                $(this).addClass('touched');

                for (var opt, j = 0; opt = elOptions[j]; j++) {
                    if (opt.value == listItemValue) {
                        elSelect.selectedIndex = j;
                        break;
                    }
                }

                $(element).parent().removeClass('invalid');
                $(element).change();
                $('select').selectric('refresh');
            },
        });
    });


});