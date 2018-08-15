<?php

namespace app\controllers;

use yii\web\Controller;

class FinanceController extends Controller
{
    /**
     * {@inheritdoc}
     */
    public function actions()
    {
        return [
            'save-card' => [
                'class' => 'app\actions\finance\SaveCardAction',
            ],
            'view-cards' => [
                'class' => 'app\actions\finance\ListAction',
            ],
        ];
    }
}
