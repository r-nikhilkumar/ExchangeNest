import "./App.css";
import Navigation from "./components/Navigation";
import { BrowserRouter } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import { useContext, useEffect, useState } from "react";
// import UseProgress, { LoaderContext } from "./Contexts/UseProgress";
// const progressContext = require('./Contexts/useProgress')

function App() {
  const [load, setLoad] = useState(0)
  return (
    <div className="cont">
        <BrowserRouter>
        <LoadingBar
          height={2}
          color='red'
          progress={load}
        />
          <Navigation loading = {{load, setLoad}} />
   
        </BrowserRouter>
    </div>
  );
}

export default App;
