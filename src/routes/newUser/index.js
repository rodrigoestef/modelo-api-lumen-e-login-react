import React, { useState } from 'react';
import qs from 'querystring';
import conexao from '../../conexao';
import { useHistory } from 'react-router-dom';

export default ()=>{
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [password2,setPassword2] = useState('')
    const [loading,setLoading] = useState(0)
    const history = useHistory()

    const  cadastrar = async() =>{
        if (name == '' || email == '' || password == '') {
            return
        }
        setLoading(1)
        if (password2 != password) {
            alert('senhas não correspondentes')
            return
        }
        const con = conexao()
        const {data} = await con.post('/user/newuser',qs.stringify({name,email,password}))
        
        if (data.failed) {
            alert(data.failed)
        }
        if (data.sucess) {
            alert(data.sucess)
            history.push('/')
        }
        setLoading(0)
    }

    return(
        <div class='container'>
            <div class='p-5'></div>
            <div class='col-md-4 m-auto bg-white shadow-lg p-3 text-center rounded'>
                <div class='form-group'>
                    <input class='form-control' value={name} onChange={e=>setName(e.target.value)} placeholder='primeiro nome'/>
                </div>
                <div class='form-group'>
                    <input class='form-control' type='email' value={email} onChange={e=>setEmail(e.target.value)} placeholder='seu@email.com'/>
                </div>
                <div class='form-group'>
                    <input class='form-control' type='password' value={password} onChange={e=>setPassword(e.target.value)} placeholder='senha'/>
                </div>
                <div class='form-group'>
                    <input class='form-control' type='password' value={password2} onChange={e=>setPassword2(e.target.value)} placeholder='confirmar senha'/>
                </div>
                <div class='form-group'>
                    <button class='btn btn-info col' onClick={()=>{cadastrar()}}>
                        { loading ? <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div> : 'entrar'}
                    </button>
                </div>
                <div class='form-group'>
                </div>
            </div>
        </div>
    )
}