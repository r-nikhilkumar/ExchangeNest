import React, { useState } from 'react';
import './signup.css'
import { useNavigate } from 'react-router-dom';
function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        password: ''
    });
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
        // Handle form submission, e.g., send data to server
            const data = {
                name:formData.name,
                email:formData.email,
                contact:formData.contact,
                password:formData.password
            }
            const res = await fetch('http://localhost:3001/auth/signup', {
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const resJSON = await res.json();
            if(resJSON.message === "registered successfully!"){
                window.localStorage.setItem("authToken", resJSON.authToken)
                window.localStorage.setItem("isLoggedIn", true)
                navigate('/profile')
                window.location.reload();
            }else if(resJSON.message==="user already exists!" || resJSON.message.split(" ").includes("duplicate")){
                alert("user already exists!")
            }
            else{
                console.log(resizeBy.errors)
            }
        } catch (error) {
            console.log(error)
            alert("Something went wrong!")
        }
    };

    return (
        <div className="flex justify-center items-center h-screen noScroll">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 p-2 block w-full border rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 p-2 block w-full border rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact</label>
                        <input type="tel" id="contact" name="contact" value={formData.contact} onChange={handleChange} className="mt-1 p-2 block w-full border rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="mt-1 p-2 block w-full border rounded-md" />
                    </div>
                    <div>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
