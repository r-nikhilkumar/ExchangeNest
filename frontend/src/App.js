import { useEffect } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import News from './components/News';
import { BrowserRouter } from "react-router-dom";


function App(){
  
  return(
    <div className="cont">
      <BrowserRouter>
        <Navigation/>

      
      </BrowserRouter>

    </div>
  )
}

export default App;
