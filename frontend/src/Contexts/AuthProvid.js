import React, { createContext, useContext, useState } from 'react'


const AuthContext = createContext()


export default function AuthProvid({children}) {
    const [isAuthenticated, setAuth] = useState(false)
    const login = ()=>{
        setAuth(true)
    }
    const logout = ()=>{
        setAuth(false)
    }
  return (
    <AuthContext.Provider value={{isAuthenticated, setAuth, login, logout}}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)