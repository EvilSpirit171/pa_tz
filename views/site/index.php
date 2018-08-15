<?php

/* @var $this yii\web\View */

?>

<div class="rent-apartment">

    <button type="button" class="close-btn" data-toggle="modal" data-target="#cancel-modal"><span>Отмена</span></button>

    <div class="modal fade cancel-modal" id="cancel-modal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <button type="button" class="close d-none d-sm-block" data-dismiss="modal">Закрыть</button>
                <div class="modal-body">
                    <div class="cancel-modal__title">Вы действительно хотите прервать оформление квартиры? </div>
                    <div class="container-xs">
                        <button class="btn btn-lg btn-block btn-primary mb-15" data-dismiss="modal">Продолжить</button>
                        <a class="btn btn-lg btn-block btn-outline-primary mb-15" href="panel-renter.html">Прервать</a>
                    </div>
                </div>
            </div>
        </div>
    </div>



    <form id="rent-apartment-step-6" name="rent-apartment-step-6" class="form-disabled rent-apartment-step">
        <div class="container">
            <div class="rent-apartment-pay">

                <div class="rent-apartment-pay__title">
                    <h4>Подписание договора и оплата</h4>
                </div>
                <div class="text-center mb-30">Общая сумма оплаты в адрес ООО «ПИК Аренда»: <span class="c-blue">1500 руб.</span></div>
                <div class="text-center smaller container-md">
                    <p>
                        Размер гарантированной компенсации «ПИК Аренда» <br />при условии соблюдения условий договора: <span class="c-blue">1000 руб.</span>
                        <button type="button" class="tip ml-1" data-toggle="tooltip" data-placement="right" title="Размер гарантии определяется в процентном отношении к лицензионному вознаграждению"><span>Подсказка</span></button>
                    </p>
                    <p>После оплаты вам необходимо оплатить первый месяц аренды напрямую по реквизитам собственника</p>
                </div>

                <div class="container-md">

                    <div class="inputs-grid">
                        <div class="col-12">
                            <div class="input">
                                <div class="input__inner">
                                    <input type="number" name="rent-apartment-card-num" id="rent-apartment-card-num" placeholder="0000 0000 0000 0000" required>
                                    <label>Номер карты</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="input">
                                <div class="input__inner">
                                    <input type="text" name="rent-apartment-card-holder" id="rent-apartment-card-holder" required>
                                    <label>Имя держателя карты</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 col-sm-4">
                            <div class="input">
                                <div class="input__inner">
                                    <input type="number" name="rent-apartment-card-month" id="rent-apartment-card-month" maxlength="2" required>
                                    <label>Месяц</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 col-sm-4">
                            <div class="input">
                                <div class="input__inner">
                                    <input type="number" name="rent-apartment-card-month" id="rent-apartment-card-year" maxlength="2" required>
                                    <label>Год</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-sm-4">
                            <div class="input input-with-tip">
                                <div>
                                    <div class="input__inner">
                                        <input type="text" name="rent-apartment-card-cvv" id="rent-apartment-card-cvv" class="input-mask-cvv" required>
                                        <label>CVV</label>
                                    </div>
                                </div>
                                <div>
                                    <button type="button" class="tip" data-toggle="tooltip" data-placement="right" data-html="true" title="Код на обороте <br />карты"><span>Подсказка</span></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-30">
                        <div class="col-12 col-sm">
                            <button type="submit" class="btn btn-lg btn-primary add-apartment-next form-submit-btn" formnovalidate disabled>Оплатить</button>
                        </div>
                        <div class="col-12 col-sm">
                            <div style="margin-right: -95px;">Фактом оплаты вы подписываете <br />договор аренды</div>
                        </div>
                    </div>

                    <div class="form-notice text-left c-gray">Защищено сертификатом SSL. Сайт полностью отвечает стандартам безопасности Visa и MasterCard.</div>

                    <div class="rent-apartment-card-brands mt-30">
                        <img src="icons/icon-brand-visa.png" alt="VISA">
                        <img src="icons/icon-brand-mc.png" alt="MasterCard">
                    </div>

                </div>
            </div>
        </div>
    </form>


</div>


