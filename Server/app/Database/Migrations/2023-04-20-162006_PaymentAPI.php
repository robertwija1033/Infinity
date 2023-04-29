<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class PaymentAPI extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'BIGINT',
                'constraint' => 20,
                'unsigned' => true,
                'auto_increment' => true,
            ],

            'userId' => [
                'type' => 'INT',
                'constraint' => 25,
            ],

            'paymentAPI' => [
                'type' => 'VARCHAR',
                'constraint' => 1000,
            ],

            'created_at' => [
                'type' => 'TIMESTAMP',
                'current_timestamp()' => true,
            ],
        ]);
        
        $this->forge->addKey('id', true);
        $this->forge->addForeignKey('userId', "users", 'id');
        $this->forge->createTable("paymentapi");
    }

    public function down()
    {
        //
    }
}
