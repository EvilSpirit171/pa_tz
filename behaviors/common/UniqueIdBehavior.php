<?php

declare(strict_types = 1);

namespace app\behaviors\common;

use yii\behaviors\AttributeBehavior;

class UniqueIdBehavior extends AttributeBehavior
{
    /**
     * @var int
     */
    public $length = 6;

    /**
     * {@inheritdoc}
     */
    public function getValue($event): int
    {
        $min = (int) ('1' . str_repeat('0', $this->length - 1));
        $max = (int) (str_repeat('9', $this->length));
        $id = random_int($min, $max);

        return $id;
    }
}
