<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class users extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->truncate();
        DB::table('users')->insert([
            'name' => 'dev',
            'email' => 'dev@dev.com',
            'password'=> Hash::make('1234')
        ]);
        DB::table('users')->insert([
            'name' => 'unauthorized',
            'email' => 'un@dev.com',
            'password'=> Hash::make('1234')
        ]);
    }
}
