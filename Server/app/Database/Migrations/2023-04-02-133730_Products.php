<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Products extends Migration
{
    public function up()
    {
        $this->db = \Config\Database::connect();
        if (!$this->db->tableExists('products')) {
            $this->forge->addField([
                'id' => [
                    'type' => 'INT',
                    'constraint' => 100,
                    'auto_increment' => true,
                ],

                'nameProduct' => [
                    'type' => 'VARCHAR',
                    'constraint' => 100,
                ],

                'price' => [
                    'type' => 'INT',
                    'constraint' => 100,
                ],

                'amount' => [
                    'type' => 'INT',
                    'constraint' => 100,
                ],

                'specification' => [
                    'type' => 'TEXT',
                ],

                'type' => [
                    'type' => 'VARCHAR',
                    'constraint' => 200,
                ],

                'image' => [
                    'type' => 'TEXT',
                ],

                'created_at' => [
                    'type' => 'TIMESTAMP',
                    'current_timestamp()' => true,
                ],
            ]);

            $this->forge->addKey('id', true);
            $this->forge->createTable("products");
        }
    }

    public function down()
    {
        //
    }
}
