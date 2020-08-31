<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Crypt;
use App\pessoal\mail;
class User extends Controller
{

    function newPassSolicitation(Request $request){
        $this->validate($request,['email'=> 'required']);
        $email = $request->input('email');
        $result = DB::select("SELECT a.id from users as a inner join user_authorization as b on a.id=b.user_id where b.authorization_id = 1 and a.email=?",[$email]);
        if ($result) {
            $user_id = $result[0]->id;

            do {
                $token = mail::createHash();
                $check = DB::table('newpass')->where(['token'=>$token])->first();
            } while ($check);

            DB::table('newpass')->where(['user_id'=>$user_id])->delete();
            DB::table('newpass')->insert(['user_id'=>$user_id,'token'=>$token]);
            return json_encode(['sucess'=>"um email foi enviado para $email"]);
        }else {
            return json_encode(['failed'=> 'usuario nao cadastrado ou nao ativado']);
        }
    }

    function newUserActivate($token){
        
        $result = DB::table('first_access')->where(['token'=>$token])->first();

        if (isset($result->user_id)) {
            $user_id = $result->user_id;
            DB::table('user_authorization')->insert(['user_id'=>$user_id,'authorization_id'=>1]);   
            DB::table('first_access')->where(['token'=>$token])->delete();
            return "<script>
                alert('usuario ativado');
                document.location='".getenv('APP_URL_DASHBOARD')."';
            </script>";
        }
    }

    function newUser(Request $request){
        $this->validate($request,['email'=> 'required', 'password'=>'required','name'=>'required']);
        $email = $request->input('email');
        $password = $request->input('password');
        $name = $request->input('name');

        $result = DB::select('select * from users where email=?',[$email]);
        if ($result) {
            return json_encode(['falied'=> 'email ja cadastrado']);
        }

        $user_id = DB::table('users')->insertGetId(['name'=>$name,'email'=>$email,'password'=>Hash::make($password)]);
        do {
            $token = mail::createHash();
            $check = DB::table('first_access')->where(['token'=>$token])->first();
        } while ($check);
        DB::table('first_access')->insert(['user_id'=>$user_id,'token'=>$token]);

        mail::send($email,'falta pouco',"cadastro quase finalizado. Para confirmar seu email clique <a href=".getenv('APP_URL')."/user/newuser/$token>aqui</a>");
        return json_encode(['sucess'=>"um email foi enviado para $email. verifique seu email para ativar conta"]);
    }

    function check(Request $request){
        $user = $request->user();
        $userJson = [
            'id' => $user->id,
            'name' => $user->name,
            'authorizations' =>$user->authorizations,
        ];

        $sessionJson=[
            'lastUpdate' => date('Y-m-d G:i:s'),
            'validate' => '1 hour'
        ]; 

        $secretJson=[
            'secret' => 'portal1234'
        ];

        return json_encode([
            'id' =>$user->id,
            'name' => $user->name,
            'authorizations' =>$user->authorizations,
            'token' => Crypt::encrypt(json_encode($userJson).'.'.json_encode($sessionJson).'.'.json_encode($secretJson))
        ]);
    }
    
    function login(Request $request){
        
        $this->validate($request,['email'=> 'required', 'password'=>'required']);
        $email =  $request->input('email');
        $password = $request->input('password');
        $result = DB::select('SELECT * from users as a INNER JOIN user_authorization as b on a.id = b.user_id inner join authorization as c on c.id = b.authorization_id where email=:email',['email'=>$email]);
        
        
        if ($result) {
            $user = $result[0];

            
            

            if (Hash::check($password,$user->password)) {

                $authorizations = [];
                foreach ($result as $line) {
                    array_push($authorizations,$line->action);
                }

                $userJson = [
                    'id' => $user->user_id,
                    'name' => $user->name,
                    'authorizations' =>$authorizations,
                ];
    
                $sessionJson=[
                    'lastUpdate' => date('Y-m-d G:i:s'),
                    'validate' => '1 hour'
                ]; 

                $secretJson=[
                    'secret' => 'portal1234'
                ];

                
                
                return json_encode([
                    'id' =>$user->user_id,
                    'name' => $user->name,
                    'authorizations' =>$authorizations,
                    'token' => Crypt::encrypt(json_encode($userJson).'.'.json_encode($sessionJson).'.'.json_encode($secretJson))
                ]);
            }else{
                return json_encode(['failed'=>'senha incorreta']);
            }
            
            
            
        }else{

            return json_encode(['failed'=>'usuario ou senha incorretos']);
        }
    }

}
