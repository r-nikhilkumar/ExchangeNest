import React, { useState } from "react";
import "../assets/Profile.css";
import axios from "axios";
import trade from "../assets/photos/trading.jpg";
export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitform = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      password: password,
    };
    // try {
    //   await axios.post("https://localhost:3001/auth/signup", data)
    //     .then((res) => {
    //       console.log(res);
    //       alert("check console");
    //     });
    // } catch (err) {
    //   console.log(err);
    // }
    try{
    const resp = await fetch("http://localhost:3001/auth/signup",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    })
    const resData=await resp.json()
    console.log(resData)
    alert('see log')
  }catch(err){
    console.log(err)
  }
  };

  return (
    <div className="profile-form py-5">
      <div className="prof-bg-image"></div>
      <form>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            autoComplete={name}
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            autoComplete={email + "@gmail.com"}
            onChange={(e) => setEmail(e.target.value)}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            autoComplete={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-dark" onClick={submitform}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
