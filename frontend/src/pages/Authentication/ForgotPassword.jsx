import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPasswordAPI } from '../../common/api/apiCall';
import { request } from '../../common/api/config';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const data = await request(forgotPasswordAPI, { email });
            if (data.message === "user found!") {
                navigate('/reset_password', {state:{authToken : data.authToken}})
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Something went wrong. Please try again later.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-gray-400 rounded-lg shadow-lg p-8 w-full max-w-md text-black">
                <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                {message && <div className="text-green-500 mb-4">{message}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 p-2 bg-gray-100 rounded-md focus:outline-none focus:bg-white w-full"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 focus:outline-none">Reset Password</button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
