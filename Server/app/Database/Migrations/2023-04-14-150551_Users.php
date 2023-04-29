<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Users extends Migration
{
    public function up()
    {
        $this->db = \Config\Database::connect();
        if (!$this->db->tableExists('users')) {
            $this->forge->addField([
                'id' => [
                    'type' => 'INT',
                    'constraint' => 25,
                    'auto_increment' => true,
                ],

                'fullName' => [
                    'type' => 'VARCHAR',
                    'constraint' => 100,
                ],

                'email' => [
                    'type' => 'VARCHAR',
                    'constraint' => 50,
                ],

                'province' => [
                    'type' => 'VARCHAR',
                    'constraint' => 200,
                    'NULL' => true,
                ],
                
                'city' => [
                    'type' => 'VARCHAR',
                    'constraint' => 200,
                    'NULL' => true,
                ],

                'districts' => [
                    'type' => 'VARCHAR',
                    'constraint' => 200,
                    'NULL' => true,
                ],

                'postalCode' => [
                    'type' => 'VARCHAR',
                    'constraint' => 200,
                    'NULL' => true,
                ],

                'address' => [
                    'type' => 'VARCHAR',
                    'constraint' => 200,
                    'NULL' => true,
                ],

                'mobilePhone' => [
                    'type' => 'VARCHAR',
                    'constraint' => 200,
                    'NULL' => true,
                ],

                'password' => [
                    'type' => 'VARCHAR',
                    'constraint' => 1000,
                ],

                'created_at' => [
                    'type' => 'TIMESTAMP',
                    'current_timestamp()' => true,
                ],
            ]);

            $this->forge->addKey('id', true);
            $this->forge->createTable('users');
        }
    }

    public function down()
    {
        //
    }
}
