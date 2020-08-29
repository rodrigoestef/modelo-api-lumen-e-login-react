<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix'=> 'user'],function() use ($router){
    $router->get('/',function(){ return 'teste';});

    $router->post('/login','User@login');
    $router->post('/newuser','User@newUser');
    $router->get('/newuser/{token}','User@newUserActivate');
    $router->get('/',['middleware'=>'auth','uses'=>'User@check']);
});