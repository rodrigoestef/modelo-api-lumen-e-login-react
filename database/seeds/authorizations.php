<?php

use Illuminate\Database\Seeder;

class authorizations extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('authorization')->truncate();
        DB::table('authorization')->insert([
           'action' => 'login'
        ]);
        DB::table('authorization')->insert([
            'action' => 'admin'
         ]);
    }
}
