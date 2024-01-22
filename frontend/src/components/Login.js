import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const submitLogin = async (e)=>{
        e.preventDefault();
        const data = {
            email:email,
            password:password
        }
        const res = await fetch("http://localhost:3001/auth/login", {
            method:"POST", 
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        const resJSON = await res.json()
        if(resJSON.message==="User not found"){
            alert('User does not exist')
        }else if(resJSON.message==="Login Successfull"){
            navigate('/community')
        }else if(resJSON.message==="Wrong password"){
            alert('Wrong Password')
        }
        else{
            alert("something wrong")
            console.log(resJSON)
        }
    }
    
  return (
    <div className="profile-form py-5">
      <div className="prof-bg-image"></div>
      <form>
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
          <button type="submit" className="btn btn-dark" onClick={submitLogin}>
            Login
          </button>
        </div>
      </form>
    </div>
  )
}
