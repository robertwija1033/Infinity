<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Carts extends Migration
{
    public function up()
    {
        $this->db = \Config\Database::connect();
        if (!$this->db->tableExists('carts')) {
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

                'quantity' => [
                    'type' => 'INT',
                    'constraint' => 100,
                ],
            ]);
            
            $this->forge->addKey('id', true);
            $this->forge->addForeignKey('userId', "users", 'id');
            $this->forge->addForeignKey('productId', "products", 'id');
            $this->forge->createTable("carts");
        }
    }

    public function down()
    {
        $this->forge->dropTable('carts');
    }
}
