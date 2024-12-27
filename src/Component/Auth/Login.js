import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import loginBg from '../../assets/loginbg.png';

const Login = () => {
    const navigate = useNavigate(); // Hook to navigate programmatically

    const handleLogin = (e) => {
        e.preventDefault();
        // For simplicity, navigate to the dashboard upon login
        navigate('/dashboard');
    };

    return (
        <div className="flex min-h-screen bg-gray-100 ">
            {/* Left Side - Image */}
            <div className="hidden md:flex h-screen">
                <img
                    src={loginBg}
                    alt="Login Background"
                    className="w-full h-full object-cover p-[50px]"
                />
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center font-serif">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg animate-fadeIn">
                    <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800 font-serif">Login</h2>
                    <form onSubmit={handleLogin}>
                        {/* Email Input */}
                        <div className="mb-4">
                            <label className="block text-gray-600 mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-6">
                            <label className="block text-gray-600 mb-1">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password"
                            />
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
                        >
                            Login
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-gray-500 text-sm text-center mt-4">
                        Don't have an account?{' '}
                        <a href="#" className="text-blue-600 hover:underline">
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
