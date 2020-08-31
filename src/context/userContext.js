import React,{createContext, useState,useContext} from 'react'

const Context = createContext()

export default ({children})=>{
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [token,setToken] = useState('')
    const [isAuth,setAuth] = useState(0)
    const [checked,setChecked] = useState(0)
    const [authorizations,setAuthorizations] = useState([])
    return(
        <Context.Provider value={{name,setName,email,setEmail,token,setToken,authorizations,setAuthorizations,isAuth,setAuth,checked,setChecked}}>{children}</Context.Provider>
    )
}

export const useUser= ()=>{
    return useContext(Context)
}