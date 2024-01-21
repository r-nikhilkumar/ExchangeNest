import "./App.css";
import Navigation from "./components/Navigation";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import News from "./components/News";
import Home from "./components/Home";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="cont">
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    </div>
  );
}

export default App;
