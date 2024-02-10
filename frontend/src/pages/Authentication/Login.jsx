// src/Login.jsx
import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { isLogged } from '../../contexts/IsloggedIn';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [msg, setmsg] = useState(null)
  const isLoggedContext = useContext(isLogged)
  const navigate = useNavigate()
  const currentLocation = useLocation().pathname
  const handleSubmit = async (e) => {
    try {
      await e.preventDefault();
      // Handle login logic
      const data = {
        email: email,
        password: password
      }
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      const resJSON = await res.json()
      if (resJSON.message === "Login Successfull") {
        if (rememberMe) {
          window.localStorage.setItem("authToken", resJSON.authToken)
          window.localStorage.setItem("isLoggedIn", true)
          isLoggedContext.setIsloggedInState(true)
          setmsg(null)
          if (currentLocation === "/login") {
            navigate('/community')
          }
          window.location.reload();
        } else {
          setmsg(null)
          isLoggedContext.setIsloggedInState(true)
          window.localStorage.setItem("authToken", resJSON.authToken)
          navigate('/community')
        }

      } else {
        // alert(resJSON.message)
        setmsg(resJSON.message)
      }
    } catch (error) {
      console.log(error)
      alert('something went wrong!')
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-gray rounded-md shadow-md">
        <h2 className="text-3xl font-semibold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
            <small className='my-0 py-0' style={{ color: 'red' }}>{msg}</small>
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2"
            />
            <label htmlFor="rememberMe" className="text-gray-600">Remember me</label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <div className="mt-4">
          <p className='inline'>Don't have an account?</p>
          <Link to="/signup"><p className="text-blue-500 inline"> Sign up here.</p></Link>
        </div>
        <div className="mt-2">
          <Link to="/forgot_password" className="text-blue-500">Forgot your password?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
