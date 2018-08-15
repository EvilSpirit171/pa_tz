<?php

declare(strict_types = 1);

namespace app\actions\finance;

use app\models\Card;
use Yii;
use yii\base\Action;
use yii\db\Exception as DbException;
use yii\web\BadRequestHttpException;

class SaveCardAction extends Action
{
    /**
     * @throws BadRequestHttpException
     * @throws DbException
     */
    public function run(): void
    {
        $this->saveCard();
    }

    /**
     * @throws BadRequestHttpException
     * @throws DbException
     */
    private function saveCard(): void
    {
        $card = new Card();
        $card->card = Yii::$app->request->post('CardNum');
        $card->name = Yii::$app->request->post('CardHolder');
        $card->mm = Yii::$app->request->post('CardMonth');
        $card->yy = Yii::$app->request->post('CardYear');
        $cardIsValid = $card->validate();

        if ($cardIsValid === false) {
            throw new BadRequestHttpException('Invalid card data');
        }

        $cardWasSaved = $card->save();

        if ($cardWasSaved === false) {
            throw new DbException('Could not save card');
        }
    }
}
