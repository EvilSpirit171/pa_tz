<?php

return [
    'class' => 'yii\db\Connection',
    'dsn' => vsprintf('pgsql:host=%s;port=%s;dbname=%s', [
        'localhost',
        '5432',
        'pa_tz_base',
    ]),
    'username' => 'pa_tz',
    'password' => 'pa_tz',
    'charset' => 'utf8',
];
