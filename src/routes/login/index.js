import React, { useState } from 'react'
import conexao from '../../conexao';
import qs from 'querystring';
import {useUser} from '../../context/userContext'
import { useHistory } from 'react-router-dom';
export default () =>{
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [failed, setFailed] = useState('')
    const history = useHistory()
    const {setId,setName,setAuthorizations,setAuth} = useUser()
    const login = async()=>{
        if (email == '' || password == '') {
            return
        }
        const con = conexao()
        const {data} = await con.post('/user/login',qs.stringify({email,password}))
        if (data.failed) {
            setFailed(data.failed)
        }
        if (data.id) {
            setId(data.id)
            setName(data.name)
            setEmail(data.email)
            setAuthorizations(data.authorizations)
            localStorage.setItem('token',data.token)
            setAuth(1)
            history.push('/')
        }

    }


    return(
        <div class='container'>
            <div class='p-5'></div>
            <div class='col-md-4 m-auto bg-white shadow-lg p-3 text-center rounded'>
                {failed && <div class='alert alert-danger'>{failed}</div>}
                <div class='form-group'>
                    <input class='form-control' placeholder='seu@email.com'  onChange={e=> setEmail(e.target.value)} value={email} type='email'/>
                </div>
                <div class='form-group'>
                    <input class='form-control' placeholder='senha' onChange={e=> setPassword(e.target.value)} value={password} type='password'/>
                </div>
                <div class='form-group'>
                    <button class='btn btn-info col' onClick={()=>{login()}}>entrar</button>
                </div>
                <div class='form-group'>
                    <button class='btn btn-danger col'>esqueci a senha</button>
                </div>
            </div>
        </div>
    )
}