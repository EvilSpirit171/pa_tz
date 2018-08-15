<?php

declare(strict_types = 1);

namespace app\models;

/**
 * This is the model class for table "finance.cards".
 *
 * @property int $id
 * @property string $uuid
 * @property string $created_at
 * @property int $card
 * @property int $mm
 * @property int $yy
 * @property string $name
 */
class Card extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName(): string
    {
        return 'finance.cards';
    }

    /**
     * {@inheritdoc}
     */
    public function behaviors(): array
    {
        return [
            'id' => [
                'class' => 'app\behaviors\common\UniqueIdBehavior',
                'attributes' => [
                    self::EVENT_BEFORE_INSERT => 'id',
                ],
            ],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules(): array
    {
        return [
            // value
            ['id', 'integer', 'max' => 6],
            ['id', 'unique'],

            //mm
            ['mm', 'integer', 'min' => 1, 'max' => 12],
            ['mm', 'required'],

            //yy
            ['yy', 'integer'],
            ['yy', 'required'],

            // uuid
            ['uuid', 'string'],

            ['name', 'string'],

            // card
            ['card', 'integer'],
            ['card', 'required'],
            ['card', 'app\validators\CardNumberValidator'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels(): array
    {
        return [
            'id' => 'ID',
            'uuid' => 'Uuid',
            'created_at' => 'Created At',
            'card' => 'Card',
            'mm' => 'Mm',
            'yy' => 'Yy',
            'name' => 'Name',
        ];
    }
}
