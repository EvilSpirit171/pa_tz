<?php

use yii\db\Migration;

/**
 * Handles the creation of table `cards`.
 */
class m180814_225335_create_cards_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->execute('CREATE SCHEMA finance');
        $this->execute('create table finance.cards
        (
            id integer not null
                constraint cards_pkey
                    primary key,
            uuid uuid default uuid_generate_v4(),
            created_at timestamp with time zone default CURRENT_TIMESTAMP,
            card bigint,
            mm integer,
            yy integer,
            name varchar
        )');
        $this->execute('alter table finance.cards owner to pa_tz');
        $this->execute('create unique index cards_id_uindex on finance.cards (id)');


    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('cards');
    }
}
