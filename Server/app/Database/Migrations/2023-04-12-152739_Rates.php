<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Rates extends Migration
{
    public function up()
    {
        $this->db = \Config\Database::connect();
        if (!$this->db->tableExists('rates')) {
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

                'productId' => [
                    'type' => 'INT',
                    'constraint' => 100,
                ],

                'rate' => [
                    'type' => 'INT',
                    'constraint' => 11,
                ],

                'created_at' => [
                    'type' => 'TIMESTAMP',
                    'current_timestamp()' => true,
                ],
            ]);
            
            $this->forge->addKey('id', true);
            $this->forge->addForeignKey('userId', "users", 'id');
            $this->forge->addForeignKey('productId', "products", 'id');
            $this->forge->createTable("rates");
        }
    }

    public function down()
    {
        $this->forge->dropTable('rates');
    }
}
