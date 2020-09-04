import React, { useEffect, useState } from 'react'
import Unauth from './unauthorizated'
import Auth from './authorizated'
import {useUser} from '../context/userContext';
import Style,{Loading} from '../globalStyle';
import conexao from '../conexao'

export default ()=>{
    const {isAuth,setAuth} = useUser()
    const {checked,setChecked} = useUser()
    const {setId,setName,setEmail,setAuthorizations} = useUser()
    

    useEffect(()=>{const isAuth = async()=>{
        const con = conexao()
        try {
            const {data} = await con.get('/user')
            
            if (data.id) {
                setId(data.id)
                setName(data.name)
                setEmail(data.email)
                setAuthorizations(data.authorizations)
                localStorage.setItem('token',data.token)
                setAuth(1)
            }

            
        } catch (error) {
            console.log(error)
        
        }
        
        setChecked(1)
    }
    isAuth()
    },[]);
    return(
        <>
            <Style/>
            {!checked && <Loading><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></Loading>}
            {isAuth == 0 && checked == 1 && <Unauth/>}
            {isAuth == 1 && checked == 1 && <Auth/>}
        </>
    )
}