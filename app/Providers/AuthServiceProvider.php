<?php

namespace App\Providers;

use App\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Auth\GenericUser;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Boot the authentication services for the application.
     *
     * @return void
     */
    public function boot()
    {
        // Here you may define how you wish users to be authenticated for your Lumen
        // application. The callback which receives the incoming request instance
        // should return either a User instance or null. You're free to obtain
        // the User instance via an API token or any other method necessary.

        $this->app['auth']->viaRequest('api', function ($request) {
            if ($request->header('Authorization')) {
                $method = explode(' ',$request->header('Authorization'))[0];
                if ($method != 'Bearer') {
                    return NULL;
                }
                $hash = explode(' ',$request->header('Authorization'))[1];
                try {
                    $jwt = explode('.',Crypt::decrypt($hash));
                    $userJson = json_decode($jwt[0]); 
                    $sessionJson = json_decode($jwt[1]); 
                    $secretJson = json_decode($jwt[2]); 
                    if ($secretJson->secret != 'portal1234') {
                        return null;
                    }

                    $limitDate = date('Y-m-d G:i:s',strtotime("$sessionJson->lastUpdate +$sessionJson->validate"));

                    if (strtotime(date('Y-m-d G:i:s')) > strtotime($limitDate)) {
                        return null;
                    }
                    return new GenericUser([
                        'id' => $userJson->id,
                        'name'=>$userJson->name,
                        'authorizations' =>$userJson->authorizations,
                    ]);

                } catch (DecryptException $e) {
                    
                }
            }
        });
    }
}
