import React, { useEffect } from 'react'
import Unauth from './unauthorizated'
import Style from '../globalStyle';
import con from '../conexao'

export default ()=>{
    // useEffect(()=>{const isAuth = async()=>{
    //     const teste = await con.get('/user')
    //     console.log(teste)
    // }
    // isAuth()
    // },[]);
    return(
        <>
            <Style/>
            <Unauth/>
        </>
    )
}