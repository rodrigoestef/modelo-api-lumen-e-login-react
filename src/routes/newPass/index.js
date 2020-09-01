import React, { useState } from 'react';
import qs from 'querystring';
import conexao from '../../conexao';
import { useHistory } from 'react-router-dom';

export default () =>{
    const [token,setToken] = useState('')
    const [password,setPassword] = useState('')
    const [password2,setPassword2] = useState('')
    const history = useHistory()
    const redefinir = async() =>{
        if (token == '' || password == '') {
            return
        }
        if (password2 != password) {
            alert('senhas não correspondentes')
            return
        }
        const con = conexao()
        const {data} = await con.put('/user/newpass',qs.stringify({token,password}))
        if (data.failed) {
            alert(data.failed)
        }
        if (data.sucess) {
            alert(data.sucess)
            history.push('/')
        }
    }
    return(
        <div class='container'>
            <div class='p-5'></div>
            <div class='col-md-4 m-auto bg-white shadow-lg p-3 text-center rounded'>
                <div class='form-group'>
                    <input class='form-control' value={token} onChange={e=>setToken(e.target.value)} placeholder='código'/>
                </div>
                <div class='form-group'>
                    <input class='form-control' type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='senha'/>
                </div>
                <div class='form-group'>
                    <input class='form-control' type='password' value={password2} onChange={e=>setPassword2(e.target.value)} placeholder='confirmar senha'/>
                </div>
                <div class='form-group'>
                    <button class='btn btn-info col' onClick={() => redefinir()}>redefinir</button>
                </div>
                <div class='form-group'>
                </div>
            </div>
        </div>
    )
}