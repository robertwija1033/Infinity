<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Admin extends Migration
{
    public function up()
    {
          $this->db = \Config\Database::connect();
          if (!$this->db->tableExists('admin')) {
               $this->forge->addField([
                    'id' => [
                         'type' => 'INT',
                         'constraint' => 5,
                         'auto_increment' => true
                    ],

                    'fullName' => [
                         'type' => 'VARCHAR',
                         'constraint' => 100,
                    ],

                    'email' => [
                         'type' => 'VARCHAR',
                         'constraint' => 100,
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
               $this->forge->createTable('admin');
          }
    }

    public function down()
    {
        //
    }
}
