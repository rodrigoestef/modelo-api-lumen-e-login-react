<?php

namespace App\pessoal;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class mail
{
    static function createHash($length = 10){
        
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@*';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
        
    }

    static function send($cliente,$assunto,$body){
        try {
            
            $mail = new PHPMailer;
            $mail->isSMTP();
            $mail->CharSet = "UTF-8";
            $mail->Host = getenv('MAIL_HOST');
            $mail->SMTPAuth = true;
            $mail->Port = getenv('MAIL_PORT');
            $mail->Username = getenv('MAIL_USERNAME');
            $mail->Password = getenv('MAIL_PASSWORD');
            $mail->setFrom(getenv('MAIL_FROM'));
            $mail->addAddress($cliente);
            $mail->isHTML(true);
            $mail->Subject = $assunto;
            $mail->Body = "
            <p>Prezado cliente,<br />
            $body <br />
            </p>				
            <p>Atenciosamente,<br /><strong>Equipe de sistemas - Altran<br /></strong>
            Rua Victor Civita, 77, Bloco 1, Sala 402<br />
            Condomínio Rio Office Park - Barra da Tijuca<br />
            22775-022 | Rio de Janeiro, RJ | Brazil<br />
            </p>
            ";
            $mail->send();
        } catch (Exception $e) {
            var_dump($e);
        }
    }
}
