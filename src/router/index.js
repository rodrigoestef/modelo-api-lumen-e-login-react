import React, { useEffect, useState } from 'react'
import Unauth from './unauthorizated'
import Auth from './authorizated'
import {useUser} from '../context/userContext';
import Style from '../globalStyle';
import conexao from '../conexao'

export default ()=>{
    const {isAuth,setAuth} = useUser()
    const {checked,setChecked} = useUser()
    

    useEffect(()=>{const isAuth = async()=>{
        try {
            const con = conexao()
            const {data} = await con.get('/user')
            console.log(data)
            
        } catch (error) {
            
        
        }
        setChecked(1)
    }
    isAuth()
    },[]);
    return(
        <>
            <Style/>
            {isAuth == 0 && checked == 1 ? <Unauth/>:<div/>}
            {isAuth == 1 && checked == 1 ? <Auth/>:<div/>}
        </>
    )
}