<?php

/* @var $this \yii\web\View */
/* @var $content string */

use app\assets\AppAsset;

AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>PIK</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="shortcut icon" type="image/ico" href="favicon/favicon.ico">
    <link rel="icon" type="image/x-icon" href="favicon/favicon.ico">
    <link rel="mask-icon" href="favicon/pinned-tab-icon.svg" color="rgb(0,0,0)">
    <link rel="apple-touch-icon" href="favicon/apple-touch-icon.png">
    <meta name="msapplication-TileColor" content="#FFFFFF">
    <link rel="icon" type="image/png" href="favicon/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="favicon/favicon-16x16.png" sizes="16x16">

    <?php $this->head() ?>
</head>
<body class="page-panel page-panel-renter page-gray">

<?php $this->beginBody() ?>

<div id="page-main" class="page-main">

    <div id="page-overlay" class="overlay"></div>

    <header id="panel-header" class="panel-header">
        <div class="container-fluid">
            <div class="row align-items-center">
                <div class="panel-header-col col-auto">
                    <a href="index.html" class="logo"><img src="img/logo.svg" alt=""></a>
                </div>
                <div class="panel-header-col col">
                    <nav class="tab-menu">
                        <ul class="tab-menu-list">
                            <li class="tab-menu-item current"><a href="panel-home.html">Комаров&nbsp;Н.&nbsp;К.</a></li>
                            <li class="tab-menu-divider"></li>
                            <li class="tab-menu-item"><a href="panel-owner.html">Сдать квартиру</a></li>
                            <li class="tab-menu-item"><a href="panel-renter.html">Снять квартиру</a></li>
                        </ul>
                    </nav>
                </div>
                <div class="panel-header-col col-auto">
                    <a href="#" class="btn btn-outline-secondary uppercase">Выйти</a>
                </div>
            </div>
        </div>
    </header>


    <header id="panel-header-mobile" class="panel-header-mobile">
        <div class="container-fluid">
            <div class="row align-items-center">
                <div class="header-col col">
                    <a href="/" class="logo"><img src="img/logo.svg" alt=""></a>
                </div>
                <div class="col-auto">
                    <button id="menu-btn" class="btn-hamburger js-menu-btn">Меню<span></span><span></span></button>
                </div>
            </div>
        </div>
        <div id="p-menu-mob" class="p-menu-mob">
            <ul id="p-menu-mob-links" class="p-menu-mob-links">
                <li class="p-menu-mob-item"><a href="panel-owner.html">Сдать квартиру</a></li>
                <li class="p-menu-mob-item"><a href="panel-renter.html">Снять квартиру</a></li>
                <li class="p-menu-mob-item p-menu-mob-item--logout"><a href="#">Выйти</a></li>
            </ul>
        </div>
    </header>
<div class="wrap">
    <?= $content ?>
</div>

<footer class="panel-footer">
    <div class="panel-footer-contact">
        <div class="container">
            <div class="row panel-footer-contact-row">
                <div class="col panel-footer-contact-col">
                    <div class="row">
                        <div class="col">
                            <a class="panel-footer-phone" href="tel:8 800 320-30-23">8 800 320-30-23</a>
                            <div class="panel-footer-contact-notice">Звонок бесплатный</div>
                        </div>
                        <div class="col-auto">
                            <button class="btn btn-md btn-outline-secondary-color panel-footer-getacall-btn" data-toggle="modal" data-target="#callFormModal">Обратный звонок</button>
                        </div>
                    </div>
                </div>
                <div class="col panel-footer-contact-col">
                    <div class="row">
                        <div class="col-auto">
                            <div class="panel-footer-ask-title">Задать вопрос</div>
                            <div class="panel-footer-contact-notice">Мы всегда на связи</div>
                        </div>
                        <div class="col-auto">
                            <a class="panel-footer-ask-btn" href="mailto:support@pik-arenda.ru">support@pik-arenda.ru</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="panel-footer-contact-m">
        <div class="panel-footer-contact-m__item"><a href="tel:+74951064868" class="panel-footer-contact-m__phone">+7 (495) 106-48-68</a></div>
        <div class="panel-footer-contact-m__item"><a href="mailto:support@pik-arenda.ru" class="panel-footer-contact-m__email">support@pik-arenda.ru</a></div>
    </div>

    <div class="panel-footer-bottom">
        <div class="container">
            <div class="panel-footer-bottom__link"><a href="#">Проект договора аренды</a></div>
            <div class="panel-footer-bottom__link"><a href="#">Пользовательское соглашение</a></div>
            <div class="panel-footer-bottom__link"><a href="#">Лицензионный договор</a></div>
            <div class="panel-footer-bottom__link"><a href="#">Подробная информация о компании и оплате</a></div>
        </div>
    </div>

</footer>

<div class="modal modal-form fade" id="callFormModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <button type="button" class="close" data-dismiss="modal" remove-class="processing submit-fail submit-not-filled submit-success" class-el="#callForm" data-fn-delay="500">Закрыть</button>
            <div class="modal-body">

                <div id="callFormBefore" class="py-30">
                    <div class="container-sm text-center mb-45">
                        <p>Оставьте заявку, мы перезвоним в ближайшее время</p>
                    </div>
                    <div class="text-center">
                        <button class="btn btn-lg btn-primary" data-display-hide="#callFormBefore" data-display-show="#callForm">Оставить заявку</button>
                    </div>
                </div>

                <form id="callForm" name="callForm" class="form-disabled" style="display: none;">
                    <div class="container-sm">
                        <div class="title-6 text-center">Оставьте номер телефона, мы&nbsp;перезвоним в&nbsp;ближайшее время</div>
                        <div class="container-xs">
                            <div class="inputs inputs--lg">
                                <div class="input">
                                    <div class="input__inner">
                                        <input type="tel" name="callFormPhoneNum" id="callFormPhoneNum" required>
                                        <label>Номер телефона</label>
                                    </div>
                                </div>
                                <label><input type="submit" formnovalidate class="btn btn-lg btn-block btn-blue form-submit-btn" value="Перезвоните мне" disabled></label>
                            </div>
                        </div>
                    </div>
                    <div class="form-processing">
                        <div class="form-processing__text">Секунду...</div>
                    </div>
                    <div class="form-result form-result--success form-dismiss">
                        <div>
                            <div class="container-sm">
                                <div class="title-3 mb-2 form-dismiss__title">Спасибо!</div>
                                <p class="smaller mb-4 form-dismiss__text">Ваша заявка принята, <br />ожидайте звонка</p>
                                <div class="container-xs">
                                    <button class="btn btn-lg btn-block btn-primary" data-dismiss="modal" remove-class="processing submit-fail submit-not-filled submit-success" class-el="#callForm" data-fn-delay="500">Ok</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-result form-result--fail">
                        <div>
                            <div class="form-result__title">Ошибка!</div>
                            <div class="form-result__text"><p>Форма не отправилась, свяжитесь с нами по телефону выше</p></div>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    </div>
</div>

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
