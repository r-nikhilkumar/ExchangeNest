import React, { useState } from 'react'
import { createContext } from 'react'

const isLogged = createContext()

function IsloggedIn({children}) {
    const [IsloggedInState, setIsloggedInState] = useState(false)
  return (
    <isLogged.Provider value={{IsloggedInState, setIsloggedInState}}>
      {children}
    </isLogged.Provider>
  )
}

export default IsloggedIn
export {isLogged}
