import React,{createContext, useState,useContext} from 'react'

const Context = createContext()

export default ({children})=>{
    const [id,setId] = useState(0)
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [isAuth,setAuth] = useState(0)
    const [checked,setChecked] = useState(0)
    const [authorizations,setAuthorizations] = useState([])
    return(
        <Context.Provider value={{id,setId,name,setName,email,setEmail,authorizations,setAuthorizations,isAuth,setAuth,checked,setChecked}}>{children}</Context.Provider>
    )
}

export const useUser= ()=>{
    return useContext(Context)
}