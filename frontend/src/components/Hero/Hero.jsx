import React, { useContext, useState } from 'react'
import Home from '../../pages/Home/Home'
import Community from '../../pages/Community/Community'
import Markets from '../../pages/Markets/Markets'
import Trades from '../../pages/Trades/Trades'
import Social from '../../pages/Social/Social'
import { Route, Routes } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import Login from '../../pages/Authentication/Login'
import Signup from '../../pages/Authentication/Signup'
import { isLogged } from '../../contexts/IsloggedIn'
import Profile from '../../pages/Profile/Profile'
import ForgotPassword from '../../pages/Authentication/ForgotPassword'
import ResetPassword from '../../pages/Authentication/ResetPassword'
import AddPost from '../../pages/AddPost/AddPost'

export default function Hero() {
    const [load, setLoad] = useState(0)
    const islogged = window.localStorage.getItem('isLoggedIn')
    const isLoggedContext = useContext(isLogged)
  return (
    <>
        <LoadingBar
          height={2}
          color='red'
          progress={load}
        />
        <div className='mt-16'>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/community' element={islogged || isLoggedContext.IsloggedInState?<Community/>:<Login/>}/>
            <Route path='/news' element={islogged || isLoggedContext.IsloggedInState?<Markets loading = {{load, setLoad}}/>:<Login/>}/>
            <Route path='/trades' element={islogged || isLoggedContext.IsloggedInState?<Trades/>:<Login/>}/>
            <Route path='/social' element={islogged || isLoggedContext.IsloggedInState?<Social/>:<Login/>}/>
            <Route path='/profile' element={islogged || isLoggedContext.IsloggedInState?<Profile/>:<Login/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/forgot_password' element={<ForgotPassword/>}/>
            <Route path='/reset_password' element={<ResetPassword/>}/>
            <Route path='/add_post' element={<AddPost/>}/>
        </Routes>
        </div>
        
    </>
  )
}
