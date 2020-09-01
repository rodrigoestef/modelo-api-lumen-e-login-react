import React, { useState } from 'react';
import qs from 'querystring';
import conexao from '../../../conexao'

export default () =>{
    const [email,setEmail] = useState('')
    const novaSenha = async() =>{
        if (email == '') {
            return
        }
        const con = conexao()
        const {data}= await con.post('/user/newpass',qs.stringify({email}))
        if (data.failed) {
            alert(data.failed)
        }
        if (data.sucess) {
            setEmail('')
            alert(data.sucess)
        }
    }

    return (
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header alert bg-danger text-white">
                    <h5 class="modal-title" id="exampleModalLabel">Esqueci minha senha</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <input type="email" class="form-control" value={email} onChange={e => setEmail(e.target.value)}  placeholder="seu.email@exemplo.com"/>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="col btn btn-primary" onClick={()=>novaSenha()}>nova senha</button>
                    
                </div>
                </div>
            </div>
        </div>
    )
}