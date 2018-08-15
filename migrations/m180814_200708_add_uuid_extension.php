<?php

use yii\db\Migration;

/**
 * Class m180814_200708_add_uuid_extension
 */
class m180814_200708_add_uuid_extension extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->execute('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        echo "m180814_200708_add_uuid_extencion cannot be reverted.\n";

        return false;
    }
}
