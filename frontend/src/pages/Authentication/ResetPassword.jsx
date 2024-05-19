import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { request } from '../../common/api/config';
import { resetPasswordAPI } from '../../common/api/apiCall';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const location = useLocation()
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const data = await request(resetPasswordAPI, { password })

            if (data.message ==="Password reset successfully!") {
                alert(data.message)
                navigate('/')
            } else {
                alert(data.message)
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Something went wrong. Please try again later.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-gray-400 rounded-lg shadow-lg p-8 w-full max-w-md text-black">
                <h2 className="text-xl font-bold mb-4">Reset Password</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                {message && <div className="text-green-500 mb-4">{message}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium">New Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 p-2 bg-gray-100 rounded-md focus:outline-none focus:bg-white w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ResetPassword;
