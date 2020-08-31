import React from 'react'

export default () =>{
    return(
        <div class='container'>
            <div class='p-5'></div>
            <div class='col-md-4 m-auto bg-white shadow-lg p-3 text-center rounded'>
                <div class='form-group'>
                    <input class='form-control' placeholder='seu@email.com' type='email'/>
                </div>
                <div class='form-group'>
                    <input class='form-control' placeholder='senha' type='password'/>
                </div>
                <div class='form-group'>
                    <button class='btn btn-info col'>entrar</button>
                </div>
                <div class='form-group'>
                    <button class='btn btn-danger col'>esqueci a senha</button>
                </div>
            </div>
        </div>
    )
}