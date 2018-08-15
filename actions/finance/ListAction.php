<?php

declare(strict_types = 1);

namespace app\actions\finance;

use app\models\Card;
use Yii;
use yii\base\Action;
use yii\web\Response;

class ListAction extends Action
{
    /**
     * @var Card[]
     */
    private $cards;

    /**
     * {@inheritdoc}
     */
    public function beforeRun(): bool
    {
        $this->configureResponse();

        return parent::beforeRun();
    }

    /**
     * @return array
     */
    public function run(): array
    {
        $this->initializeCards();

        return $this->cards;
    }

    /**
     * Configures HTTP response.
     */
    private function configureResponse(): void
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
    }

    /**
     * Initialize Cards array.
     */
    private function initializeCards(): void
    {
        $this->cards = Card::find()->asArray()->all();
    }
}
