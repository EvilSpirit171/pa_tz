document.addEventListener("DOMContentLoaded", function(event) {


    $('#apartments-carousel').owlCarousel({
        items: 1,
        loop: false,
        margin: 0,
        stagePadding: 60,
        dots: false,
        autoWidth: true,
        responsive: {
            375: {
                items: 2
            },
            768: {
                items: 3
            }
        }
    });






    $('.jsApartmentCard').on('click', function(e) {
        var apartmentToExpand = $(this).attr('href');

        e.preventDefault();

        $('.apartment-card').removeClass('active');
        $('.apartment-info').removeClass('active');

        $(this).addClass('active');
        $(apartmentToExpand).addClass('active');
    });






    $(function() {
        $('.apartment-edit-form').submit(function(e) {
            var formName = $(this).attr('name');
            var formId = $(this).attr('id');
            e.preventDefault();

            validateForm(formName);

            if (!validateForm(formName)) {
                $('#' + formId).addClass('processing');


                setTimeout(function() {
                    mailResult('success', '#' + formId);
                }, 1000);
            }

        });
    });








    $('.jsApartmentPhotosThumb').on('click', function(e) {
        var imgEl = $(this).attr('data-image-el');

        e.preventDefault();

        $('.apartment-photos-main-item').removeClass('active faded');
        $(imgEl).addClass('active');

        setTimeout(function() {
            $(imgEl).addClass('faded');
        }, 300);
    });


    aptid = '';
    $(function() {
        $('#add-apartment-step-1').submit(function(e) {
            var formName = $(this).attr('name');
            var nextStep = $('#add-apartment-step-2');
            e.preventDefault();

            validateForm(formName);

            $('#add-apartment-step-1').addClass('processing');

            if (!validateForm(formName)) {
                $.post('/api/internal/lk_ownerAddAppart.php', {
                    step: 1,
                    aptid: aptid,
                    addApartmentAddressStreet: $('#add-apartment-address-street').val(),
                    addApartmentAddressBuilding: $('#add-apartment-address-building').val(),
                    addApartmentAddressApartment: $('#add-apartment-address-apartment').val(),
                    addApartmentRooms: $('#add-apartment-rooms').val(),
                    addApartmentArea: $('#add-apartment-area').val(),
                }, function(d) {
                    alert(d);
                    ans = $.parseJSON(d);
                    aptid = ans.uuid;
                    if (ans.result != 'error') {
                        if (ans.result == 'ok') {
                            $('#add-apartment-step-1').removeClass('current');
                            $(nextStep).addClass('current');
                            $('#add-apartment-step-1').removeClass('processing');
                        } else {
                            alert("Непредвиденная ошибка, попробуйте еще раз");
                        }
                    } else {
                        if (ans.error.street !== undefined) {
                            $('#add-apartment-address-street').addClass('invalid');
                        } else {
                            $('#add-apartment-address-street').removeClass('invalid');
                        }
                        if (ans.error.home !== undefined) {
                            $('#add-apartment-address-building').addClass('invalid');
                        } else {
                            $('#add-apartment-address-building').removeClass('invalid');
                        }
                        if (ans.error.apart !== undefined) {
                            $('#add-apartment-address-apartment').addClass('invalid');
                        } else {
                            $('#add-apartment-address-apartment').removeClass('invalid');
                        }
                    }
                });
            }

            $('#add-apartment-step-1').removeClass('current');
            $(nextStep).addClass('current');
            $('#add-apartment-step-1').removeClass('processing');

        });
    });







    var apartmentAdditional = new Vue({
        el: '#add-apartment-additional',
        data: {
            itemsList: [{
                object: '',
                qty: '',
                id: 1,
                name: 'add-apartment-additional-1'
            }]
        },
        methods: {
            addProperty: function() {
                this.itemsList.push({
                    object: '',
                    qty: '',
                    id: parseInt(this.itemsList.length) + 1,
                    name: 'add-apartment-additional-' + (parseInt(this.itemsList.length) + 1)
                })
            },
            removeItem: function(index) {
                Vue.delete(this.itemsList, index);
            }
        }
    });






    $(function() {
        $('#add-apartment-step-2').submit(function(e) {
            var formName = $(this).attr('name');
            var nextStep = $('#add-apartment-step-3');
            var theResult = '';

            e.preventDefault();

            validateForm(formName);


            $('#add-apartment-additional .inputs-repeater-item').each(function(index, item) {
                var thisPaymentItem = '';

                $(this).find('input').each(function(index, item) {
                    thisPaymentItem += '::' + $(this).val();
                });
                theResult += (index + 1) + thisPaymentItem + '||';
            });



            if ($('#add-apartment-cb-registration').prop('checked')) {
                var conditionRegistration = "Да";
            } else {
                var conditionRegistration = "Нет";
            }

            if ($('#add-apartment-cb-pets').prop('checked')) {
                var conditionPets = "Да";
            } else {
                var conditionPets = "Нет";
            }

            if ($('#add-apartment-cb-kids').prop('checked')) {
                var conditionKids = "Да";
            } else {
                var conditionKids = "Нет";
            }


            $('#add-apartment-step-2').addClass('processing');

            if (validateEl('#add-apartment-price')) {} else {
                $.post('/api/internal/lk_ownerAddAppart.php', {
                    step: 2,
                    aptid: aptid,
                    addApartmentPrice: $('#add-apartment-price').val(),
                    conditionRegistration: conditionRegistration,
                    conditionPets: conditionPets,
                    conditionKids: conditionKids,
                    additPayment: theResult,
                }, function(d) {
                    alert(d);
                    ans = $.parseJSON(d);
                    aptid = ans.uuid;
                    if (ans.result != 'error') {
                        if (ans.result == 'ok') {
                            $('#add-apartment-step-2').removeClass('current');
                            $(nextStep).addClass('current');
                            $('#add-apartment-step-2').removeClass('processing');
                        } else {
                            alert("Непредвиденная ошибка, попробуйте еще раз");
                        }
                    } else {
                        if (ans.error.price !== undefined) {
                            $('#add-apartment-price').addClass('invalid');
                        } else {
                            $('#add-apartment-price').removeClass('invalid');
                        }
                        if (ans.error.comment !== undefined) {
                            $('#add-apartment-comment').addClass('invalid');
                        } else {
                            $('#add-apartment-comment').removeClass('invalid');
                        }
                        if (ans.error.aptid !== undefined) {
                            alert("Непредвиденная ошибка 2, попробуйте еще раз");
                        }
                    }
                });

                $('#add-apartment-step-2').removeClass('current');
                $(nextStep).addClass('current');
                $('#add-apartment-step-2').removeClass('processing');
            }

        });
    });







    $(function() {
        $('#add-apartment-step-3').submit(function(e) {
            var formName = $(this).attr('name');
            var nextStep = $('#add-apartment-step-4');
            e.preventDefault();

            validateForm(formName);

            $('#add-apartment-step-3').addClass('processing');

            if (!validateForm(formName)) {
                $.post('ссылка на PHP', {
                    AddApartmentPassportNumber: $('#add-apartment-passport-number').val(),
                    AddApartmentPassportIssuer: $('#add-apartment-passport-issuer').val(),
                    AddApartmentPassportDate: $('#add-apartment-passport-date').val(),
                    AddApartmentIssuerCode: $('#add-apartment-issuer-code').val(),
                    UploadPassport: $('#upload-passport').val(),
                    UploadPassport19: $('#upload-passport19').val(),
                }, function(d) {});

                $('#add-apartment-step-3').removeClass('current');
                $(nextStep).addClass('current');
                $('#add-apartment-step-3').removeClass('processing');
            }

        });
    });







    $(function() {
        $('#add-apartment-step-4').submit(function(e) {
            var formName = $(this).attr('name');
            var nextStep = $('#add-apartment-step-6');
            var pmethod = "Переводом на карту";
            e.preventDefault();

            if ($('#add-apartment-pmethod-card').prop('checked')) {
                pmethod = "Переводом на карту";
                nextStep = $('#add-apartment-step-5');
            } else {
                pmethod = "Наличными";
            }

            $('#add-apartment-step-4').addClass('processing');

            $.post('ссылка на PHP', {
                pmethod: pmethod,
            }, function(d) {});

            $('#add-apartment-step-4').removeClass('current');
            $(nextStep).addClass('current');
            $('#add-apartment-step-4').removeClass('processing');

        });
    });







    $("#add-apartment-step-5-skip").change(function() {
        if ($('#add-apartment-step-5-skip').is(':checked')) {
            $('#add-apartment-bik, #add-apartment-benficiary, #add-apartment-beneficiary-acc').removeAttr('required');
            $('#add-apartment-step-5').find('.form-submit-btn').removeAttr('disabled');
        } else {
            $('#add-apartment-bik, #add-apartment-benficiary, #add-apartment-beneficiary-acc').attr('required', 'true');
            $('#add-apartment-step-5').find('.form-submit-btn').attr('disabled', 'true');
        }
    });

    $(function() {
        $('#add-apartment-step-5').submit(function(e) {
            var formName = $(this).attr('name');
            var nextStep = $('#add-apartment-step-6');
            e.preventDefault();

            validateForm(formName);

            $('#add-apartment-step-5').addClass('processing');

            if (!validateForm(formName)) {
                $.post('ссылка на PHP', {
                    AddApartmentPassportNumber: $('#add-apartment-passport-number').val(),
                }, function(d) {});

                $('#add-apartment-step-5').removeClass('current');
                $(nextStep).addClass('current');
                $('#add-apartment-step-5').removeClass('processing');
            }

        });
    });




    $('#apartmentId').on('input', function() {
        if (parseInt($(this).val().length) == 6) {

            $(this).addClass('invalid');
        }
    });



    $(function() {
        $('#rent-apartment-step-1').submit(function(e) {
            var formName = $(this).attr('name');
            var nextStep = "/panel-renter-rent-2.html";
            e.preventDefault();

            validateForm(formName);

            $('#rent-apartment-step-1').addClass('processing');

            if (!validateForm(formName)) {
                $.post('ссылка на PHP', {
                    RentApartmentPassportNumber: $('#rent-apartment-passport-number').val(),
                    RentApartmentPassportIssuer: $('#rent-apartment-passport-issuer').val(),
                    RentApartmentPassportDate: $('#rent-apartment-passport-date').val(),
                    RentApartmentIssuerCode: $('#rent-apartment-issuer-code').val(),
                    UploadPassport: $('#upload-passport').val(),
                    UploadPassport19: $('#upload-passport19').val(),
                    UploadSelfie: $('#upload-selfie').val(),
                }, function(d) {});

                setTimeout(function() {
                    window.location.replace(nextStep);
                }, 500);

            }

        });
    });




    $(function() {
        $('#rent-apartment-step-2').submit(function(e) {
            var formName = $(this).attr('name');
            var nextStep = "/panel-renter-rent-3.html";
            e.preventDefault();

            validateForm(formName);

            $('#rent-apartment-step-2').addClass('processing');

            if (!validateForm(formName)) {
                $.post('ссылка на PHP', {
                    RentApartmentBik: $('#rent-apartment-bik').val(),
                    RentApartmentBenficiary: $('#rent-apartment-benficiary').val(),
                    RentApartmentBeneficiaryAcc: $('#rent-apartment-beneficiary-acc').val(),
                    RentApartmentPaymentPurpose: $('#rent-apartment-payment-purpose').val(),
                }, function(d) {});

                setTimeout(function() {
                    window.location.replace(nextStep);
                }, 500);

            }

        });
    });







    var isAlone = true;



    $("#rent-apartment-alone-true, #rent-apartment-alone-false").change(function() {
        if ($('#rent-apartment-alone-true').is(':checked')) {
            isAlone = true;
        } else {
            isAlone = false;
        }
    });



    $(function() {
        $('#rent-apartment-step-3').submit(function(e) {
            var formName = $(this).attr('name');
            var nextStep = "/panel-renter-rent-4.html";
            e.preventDefault();

            var theResult = '';

            if (isAlone) {
                theResult = 'Проживать буду только я';
            } else {
                $('#rent-apartment-rommates .inputs-repeater-item').each(function(index, item) {
                    var theRommate = '';
                    $(this).find('input').each(function(index, item) {
                        theRommate += $(this).val() + ' ';
                    });
                    theResult += (index + 1) + '. ' + theRommate + '<br />';
                });
            }

            console.log(theResult);

            $('#rent-apartment-step-3').addClass('processing');

            $.post('ссылка на PHP', {
                theResult: theResult,
            }, function(d) {});

            setTimeout(function() {
                window.location.replace(nextStep);
            }, 500);

        });
    });




    var apartmentRommates = new Vue({
        el: '#rent-apartment-step-3',
        data: {
            isAlone: 'alone',
            roommatesList: [{
                firstName: '',
                lastName: '',
                patronymic: '',
                passportNum: '',
                id: 1,
            }]
        },
        methods: {
            addRoommate: function() {
                this.roommatesList.push({
                    firstName: '',
                    lastName: '',
                    id: parseInt(this.roommatesList.length) + 1,
                })
            },
            removeRoommate: function(index) {
                Vue.delete(this.roommatesList, index);
            }
        }
    });





    var loadingAnimation = function(instance) {
        var theData = instance;

        instance.checkEverySecond = setInterval(function() {
            if (theData.loaded < 99) {



                theData.loaded = theData.loaded + 2;

                theData.loaded = currentState;
            } else {

                clearInterval(theData.checkEverySecond);


                window.location.replace("/panel-renter-rent-5.html");
            }
        }, 150);
    }

    var rentApartmentChecking = new Vue({
        el: '#rent-apartment-checking',
        data: {
            loaded: 0
        },
        methods: {
            checkLoading: function() {
                var currentState = Math.floor(Math.random() * 20) + 1;

                this.loaded = currentState;

                loadingAnimation(this);
            }
        },
        mounted: function() {
            if (document.getElementById('rent-apartment-checking')) {
                this.checkLoading();
            }
        }
    });







    $(function() {
        $('#rent-apartment-step-5').submit(function(e) {
            var formName = $(this).attr('name');
            var nextStep = "/panel-renter-rent-6.html";
            e.preventDefault();

            $('#rent-apartment-step-5').addClass('processing');

            if (!validateForm(formName)) {
                $.post('ссылка на PHP', {
                    hasSigned: 'Сообщение о том, что юзер подписал',
                }, function(d) {});

                setTimeout(function() {
                    window.location.replace(nextStep);
                }, 500);

            }

        });
    });






    $(function() {
        $('#rent-apartment-step-6').submit(function(e) {
            var formName = $(this).attr('name');
            var nextStep = "/finance/view-cards";
            e.preventDefault();

            validateForm(formName);

            $('#rent-apartment-step-6').addClass('processing');

            if (!validateForm(formName)) {
                $.post('/finance/save-card', {
                    CardNum: $('#rent-apartment-card-num').val(),
                    CardHolder: $('#rent-apartment-card-holder').val(),
                    CardMonth: $('#rent-apartment-card-month').val(),
                    CardYear: $('#rent-apartment-card-year').val(),
                    CardCvv: $('#rent-apartment-card-cvv').val(),
                }, function(d) {
                    setTimeout(function() {
                        window.location.replace(nextStep);
                    }, 500);
                });
            }

        });
    });




    $('#loginSmsCode').on('input', function() {
        if (parseInt($(this).val().length) == 4) {
            $.post('/api/internal/login.php', {
                sms: $('#loginSmsCode').val()
            }, function(d) {
                if (d == 0) {
                    $('#loginSmsCode').addClass('invalid');
                    $('#loginSmsCode').val("");
                }
                if (d == 1) {
                    window.location = '/';
                }
                if (d == 2) {
                    window.location = '/reg';
                }

            });
        }
    });


    $(function() {
        $('#login-step-1-form').submit(function(e) {
            var formName = $(this).attr('name');
            e.preventDefault();

            validateForm(formName);
            if (!validateForm(formName)) {
                if ($('#loginPhoneNum').val().indexOf("_") + 1) {
                    return;
                }
                $.post('/api/internal/login.php', {
                    phone: $('#loginPhoneNum').val()
                }, function(d) {
                    if (d == -1) {
                        $('#loginPhoneNum').addClass('invalid');
                    } else {
                        $('#login-step-1-form').addClass('processing');
                        $('#login-step-1').hide();
                        $('#login-step-2').show();
                        $('#loginPhoneSpan').text($('#loginPhoneNum').val());
                        buttonTimeout('#login-step-2-sms-timeout', d);
                    }
                });
            }
        });
    });



    $(function() {
        $('#login-step-2-form').submit(function(e) {
            var formName = $(this).attr('name');
            e.preventDefault();

            validateForm(formName);
            if (!validateForm(formName)) {
                $('#login-step-2-form').addClass('processing');

            }

        });
    });

    $('#login-step-2-sms-timeout').on('click', function() {
        $.post('/api/internal/login.php', {
            phone: $('#loginPhoneNum').val()
        }, function(d) {
            buttonTimeout('#login-step-2-sms-timeout', d);
        });
    });





    $('#registerSmsCode').on('input', function() {
        if (parseInt($(this).val().length) == 4) {

            $(this).addClass('invalid');
        }
    });


    $(function() {
        $('#register-step-1-form').submit(function(e) {
            var formName = $(this).attr('name');
            e.preventDefault();

            validateForm(formName);
            if (validateForm(formName)) {} else {
                $('#register-step-1-form').addClass('processing');

                $.post('/api/internal/login.php', {
                    phone: $('#loginPhoneNum').val()
                }, function(d) {
                    mailResult(d, '#register-step-1-form');
                });

                $('#register-step-1').hide();
                $('#register-step-2').show();
                $('#loginPhoneSpan').text($('#loginPhoneNum').val());
                buttonTimeout('#register-step-2-sms-timeout', d);
            }

        });
    });

    $(function() {
        $('#register-step-2-form').submit(function(e) {
            var formName = $(this).attr('name');
            e.preventDefault();

            validateForm(formName);
            if (validateForm(formName)) {} else {
                $('#register-step-2-form').addClass('processing');


                $('#register-step-2').hide();
                $('#register-step-3').show();
            }

        });
    });

    $(function() {
        $('#register-step-3-form').submit(function(e) {
            var formName = $(this).attr('name');
            e.preventDefault();

            validateForm(formName);
            if (!validateForm(formName)) {
                $('#register-step-3-form').addClass('processing');
                $.post('/api/internal/reg.php', {
                    reg: 1,
                    lastname: $('#registerLastName').val(),
                    firstname: $('#registerFirstName').val(),
                    middlename: $('#registerMiddleName').val(),
                    email: $('#registerEmail').val()
                }, function(d) {
                    ans = $.parseJSON(d);
                    if (ans.result != 'error') {
                        if (ans.result == 'ok') {
                            window.location = '/';
                        } else {
                            alert("Непредвиденная ошибка, попробуйте еще раз");
                        }
                    } else {
                        if (ans.error.firstname !== undefined) {
                            $('#registerFirstName').addClass('invalid');
                        } else {
                            $('#registerFirstName').removeClass('invalid');
                        }
                        if (ans.error.lastname !== undefined) {
                            $('#registerLastName').addClass('invalid');
                        } else {
                            $('#registerLastName').removeClass('invalid');
                        }
                        if (ans.error.middlename !== undefined) {
                            $('#registerMiddleName').addClass('invalid');
                        } else {
                            $('#registerMiddleName').removeClass('invalid');
                        }
                        if (ans.error.email !== undefined) {
                            $('#registerEmailName').addClass('invalid');
                        } else {
                            $('#registerEmailName').removeClass('invalid');
                        }
                    }
                });
            }
        });
    });




    $(function() {
        $('#profile-docs-form').submit(function(e) {
            var formName = $(this).attr('name');
            e.preventDefault();

            validateForm(formName);

            if (!validateForm(formName)) {
                $('#profile-docs-form').addClass('processing');


                setTimeout(function() {
                    $('#panel-docs').removeClass('expanded');
                }, 1000);
            }

        });
    });




    $(function() {
        $('#passport-change').submit(function(e) {
            var formName = $(this).attr('name');
            e.preventDefault();

            validateForm(formName);

            if (!validateForm(formName)) {
                $('#passport-change').addClass('processing');


                setTimeout(function() {
                    $('#panel-docs-change').removeClass('expanded');
                }, 1000);

                setTimeout(function() {
                    mailResult('success', '#passport-change', true);
                }, 1000);
            }

        });
    });




    $(function() {
        $('#panel-profile-pay-info').submit(function(e) {

            var formName = $(this).attr('name');
            e.preventDefault();

            validateForm(formName);

            if (!validateForm(formName)) {
                $('#panel-profile-pay-info').addClass('processing');
                $.post('/api/internal/lk_req.php', {
                    bik: $('#paymentBik').val(),
                    name: $('#paymentBeneficiary').val(),
                    account: $('#paymentBeneficiaryAcc').val(),
                    details: $('#payment-purpose').val()
                }, function(d) {
                    ans = $.parseJSON(d);
                    if (ans.result != 'error') {
                        if (ans.result == 'ok') {
                            $('#panel-pmnt-info').removeClass('expanded');
                        } else {
                            alert("Непредвиденная ошибка, попробуйте еще раз");
                        }
                    } else {
                        if (ans.error.bik !== undefined) {
                            $('#paymentBik').addClass('invalid');
                        } else {
                            $('#paymentBik').removeClass('invalid');
                        }
                        if (ans.error.name !== undefined) {
                            $('#paymentBeneficiary').addClass('invalid');
                        } else {
                            $('#paymentBeneficiary').removeClass('invalid');
                        }
                        if (ans.error.account !== undefined) {
                            $('#paymentBeneficiaryAcc').addClass('invalid');
                        } else {
                            $('#paymentBeneficiaryAcc').removeClass('invalid');
                        }
                        if (ans.error.details !== undefined) {
                            $('#payment-purpose').addClass('invalid');
                        } else {
                            $('#payment-purpose').removeClass('invalid');
                        }
                    }
                });
            }
        });
    });



    $(function() {
        $('#pmnt-info-change').submit(function(e) {
            var formName = $(this).attr('name');
            e.preventDefault();

            validateForm(formName);

            if (!validateForm(formName)) {
                $('#pmnt-info-change').addClass('processing');


                setTimeout(function() {
                    $('#panel-pmnt-info-change').removeClass('expanded');
                }, 1000);

                setTimeout(function() {
                    mailResult('success', '#pmnt-info-change');
                }, 1000);
            }

        });
    });


    var isMenuExpanded = false;

    $(document).ready(function() {

        $('#menu-btn').on('click', function() {
            if (isMenuExpanded == true) {
                $('#menu-btn').removeClass('active');
                $('#p-menu-mob #p-menu-mob-links').slideUp();
                $('html').removeClass('of-hidden');
                $('#page-overlay').fadeOut();

                isMenuExpanded = false;
            } else {
                $('#menu-btn').addClass('active');
                $('#p-menu-mob #p-menu-mob-links').slideDown();
                $('html').addClass('of-hidden');
                $('#page-overlay').fadeIn();

                isMenuExpanded = true;
            }
        });

        $('#p-menu-mob a').on('click', function() {
            var linkHref = $(this).attr('href');
            if (linkHref.indexOf('#') !== -1) {
                $('#menu-btn').removeClass('active');
                $('#p-menu-mob #p-menu-mob-links').slideUp();
                $('html').removeClass('of-hidden');
                $('#page-overlay').fadeOut();
                isMenuExpanded = false;
            }

        });

    });



});