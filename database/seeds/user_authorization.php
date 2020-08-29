<?php

use Illuminate\Database\Seeder;

class user_authorization extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user_authorization')->truncate();
        DB::table('user_authorization')->insert([
            'user_id' => 1,
            'authorization_id' => 1,
        ]);
        DB::table('user_authorization')->insert([
            'user_id' => 1,
            'authorization_id' => 2,
        ]);
        DB::table('user_authorization')->insert([
            'user_id' => 2,
            'authorization_id' => 1,
        ]);
    }
}
