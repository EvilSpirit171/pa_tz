<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace app\assets;

use yii\web\AssetBundle;

class AppAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'css/style.css',
        'css/bootstrap.min.css',
        'plugins/owlcarousel/assets/owl.carousel.min.css',
        'plugins/owlcarousel/assets/owl.theme.default.min.css',
        'plugins/selectric/selectric.css',
    ];
    public $js = [
        'plugins/hookah/hookah.min.js',
        'js/jquery-3.2.1.min.js',
        'https://unpkg.com/popper.js/dist/umd/popper.min.js',
        'js/bootstrap.min.js',
        'plugins/owlcarousel/owl.carousel.min.js',
        'plugins/selectric/jquery.selectric.min.js',
        'plugins/inputmask/jquery.inputmask.bundle.js',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/froogaloop.js',
        'https://cdnjs.cloudflare.com/ajax/libs/baguettebox.js/1.10.0/baguetteBox.min.js',
        'js/main.js',
        'js/panel.js',
        'https://unpkg.com/vue@2.5.16/dist/vue.min.js',
        'https://unpkg.com/axios/dist/axios.min.js'
    ];
    public $depends = [
    ];
}
