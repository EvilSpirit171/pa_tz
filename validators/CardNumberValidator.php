<?php

declare(strict_types = 1);

namespace app\validators;

use yii\validators\Validator;

class CardNumberValidator extends Validator
{
    /**
     * {@inheritdoc}
     */
    public function init(): void
    {
        $this->message = 'Invalid Card number';

        parent::init();
    }

    /**
     * {@inheritdoc}
     */
    protected function validateValue($value): ?array
    {
        $valid = (bool) $this->checkLuhn($value);

        if (!$valid) {
            return [$this->message, []];
        }

        return null;
    }

    /**
     *  Luhn algorithm check valid card number
     *
     * @param $number
     * @return bool
     */
    private function checkLuhn($number): bool
    {
        $sum = 0;
        $numDigits = strlen($number)-1;
        $parity = $numDigits % 2;

        for ($i = $numDigits; $i >= 0; $i--) {
            $digit = substr($number, $i, 1);

            if (!$parity == ($i % 2)) {
                $digit <<= 1;
            }

            $digit = ($digit > 9) ? ($digit - 9) : $digit;
            $sum += $digit;
        }

        return (0 == ($sum % 10));
    }
}
