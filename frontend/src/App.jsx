import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import { BrowserRouter} from 'react-router-dom'
import Home from './pages/Home/Home'
import IsloggedIn from './contexts/IsloggedIn'



function App() {
  return (
    <div className='app'>
      <IsloggedIn>
        <BrowserRouter>
          <Navbar/>
          <Hero/>
        </BrowserRouter>
      </IsloggedIn>
    </div>
  )
}

export default App


