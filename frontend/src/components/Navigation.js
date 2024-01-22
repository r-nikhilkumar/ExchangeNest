import React, { useEffect, useState } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import News from "./News";
import "../assets/Navigation.css";
import Home from "./Home";
import Profile from "./Profile";
import Login from "./Login";
import Community from "./Community";

export default function Navigation() {
  let currLoc = useLocation().pathname
  return (
    <div>
      <nav className="navigation">
        <div className="nav-in">
          <Link className="name" to="/">
            <h3>ExchangeNest</h3>
          </Link>
          <Link className="nav-items" to="/" style={{background:`${currLoc==="/"?'#2f2f56':''}`, color:`${currLoc==="/"?'white':''}`}}>
            <div>Home</div>
          </Link>
          <Link className="nav-items" to="/community" style={{background:`${currLoc==="/community"?'#2f2f56':''}`, color:`${currLoc==="/community"?'white':''}`}}>
            <div>Community</div>
          </Link>
          <Link className="nav-items" to="/chat" style={{background:`${currLoc==="/chat"?'#2f2f56':''}`, color:`${currLoc==="/chat"?'white':''}`}}>
            <div>Chats</div>
          </Link>
          <Link className="nav-items" to="/news" style={{background:`${currLoc==="/news"?'#2f2f56':''}`, color:`${currLoc==="/news"?'white':''}`}}>
            <div>News</div>
          </Link>
          <Link className="nav-items" to="/courses" style={{background:`${currLoc==="/courses"?'#2f2f56':''}`, color:`${currLoc==="/courses"?'white':''}`}}>
            <div>Courses</div>
          </Link>
        </div>
        <div className="profile-icon">
          <Link to='/profileSign' style={{}}>
          <svg
            width="6vmin"
            height="80%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.4"
              d="M12.1605 10.87C12.0605 10.86 11.9405 10.86 11.8305 10.87C9.45055 10.79 7.56055 8.84 7.56055 6.44C7.56055 3.99 9.54055 2 12.0005 2C14.4505 2 16.4405 3.99 16.4405 6.44C16.4305 8.84 14.5405 10.79 12.1605 10.87Z"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.1607 14.56C4.7407 16.18 4.7407 18.82 7.1607 20.43C9.9107 22.27 14.4207 22.27 17.1707 20.43C19.5907 18.81 19.5907 16.17 17.1707 14.56C14.4307 12.73 9.9207 12.73 7.1607 14.56Z"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/news" element={<News />} />
        <Route path="/community" element={<Community/>} />
        <Route path="/chat" />
        <Route path="/courses" />
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Home/>} />
        <Route path="/profileSign" element={<Profile/>} />
      </Routes>
    </div>
  );
}

// <div>
//       <div className="navbar">
//         <i className="fas fa-home"></i>
//         <i className="fas fa-file"></i>
//         <i className="fas fa-envelope"></i>
//         <i className="fas fa-circle-info"></i>
//         <button className="last-icon">
//           <i className="fas fa-circle-half-stroke last-icon"></i>
//         </button>
//       </div>

//       <div className="sections">
//         <section className="hero" id="hero">
//           <h1 className="example-text">Section1</h1>
//         </section>
//         <section className="projects" id="projects">
//           <h1 className="example-text">Section2</h1>
//         </section>
//         <section className="contact" id="contact">
//           <h1 className="example-text">Section3</h1>
//         </section>
//         <section className="info" id="info">
//           <h1 className="example-text">Section4</h1>
//         </section>
//       </div>
//     </div>
