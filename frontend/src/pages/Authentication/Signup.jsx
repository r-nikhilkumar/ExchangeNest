// src/Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { request } from '../../common/api/config';
import { userRegisterApi } from '../../common/api/apiCall';
import Notification from '../../common/Notification/Notification';
import './signup.css'; // Ensure you have the correct path to your CSS file

function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            // Handle form submission, e.g., send data to server
            const data = {
                name: formData.name,
                email: formData.email,
                contact: formData.contact,
                password: formData.password
            };
            const response = await request(userRegisterApi, data);
            if (response.message === "registered successfully!") {
                navigate('/profile');
                window.location.reload();
            } else if (response.message === "user already exists!" || response.message.split(" ").includes("duplicate")) {
                alert(response.message);
            } else {
                console.log(response.errors);
            }
        } catch (error) {
            console.log(error);
            alert(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="max-w-md w-full p-6 bg-gray-800 rounded-md shadow-md">
                <h2 className="text-3xl font-semibold mb-6 text-white">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-white">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border rounded-md bg-white text-black"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border rounded-md bg-white text-black"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="contact" className="block text-sm font-medium text-white">Contact</label>
                        <input
                            type="tel"
                            id="contact"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border rounded-md bg-white text-black"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border rounded-md bg-white text-black"
                        />
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
