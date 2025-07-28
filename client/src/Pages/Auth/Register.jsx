import React, { useState } from 'react';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const authHandle = async (e) => {
        e.preventDefault(); 

        const payload = {
            name: name,
            email: email,
            password: password
        };

        try {
            const res = await fetch('BACKEND_API',{
                method: POST,
                headers: {
                    'Content-Type': 'applications/json',
                },
                body: JSON.stringify(payload),
            });

            if(!res.ok) {
                throw new Error('Failed to register');
            }
            const data = await res.json();
            console.log('Successull', {data});
            // use navigate 
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="min-h-screen bg-sky-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Create an Account</h1>
                    <p className="text-gray-500 mt-2">Join us and start exploring premium products.</p>
                </div>

                <form onSubmit={authHandle} className="space-y-5">
                    {/* Full Name */}
                    <div className="relative">
                        <FiUser className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none transition"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <FiMail className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none transition"
                            value = {email}
                            onChange ={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none transition"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="cursor-pointer w-full py-3 bg-sky-600 text-white font-semibold rounded-lg shadow hover:bg-sky-700 transition-transform transform hover:-translate-y-1"
                    >
                        Create Account
                    </button>
                </form>

                {/* OR Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-3 text-sm text-gray-500">or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Social Icons */}
                <div className="flex flex-col gap-3 mt-2">
                    <button className="cursor-pointer flex items-center justify-center gap-3 w-full py-2 px-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 transition">
                        <FcGoogle className="text-xl" />
                        <span className="text-sm text-gray-700 font-medium">Continue with Google</span>
                    </button>

                    <button className="cursor-pointer flex items-center justify-center gap-3 w-full py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
                        <FaFacebookF className="text-lg" />
                        <span className="text-sm font-medium">Continue with Facebook</span>
                    </button>
                </div>


                {/* Login Redirect */}
                <p className="text-center text-gray-500 mt-8 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-sky-600 hover:underline font-medium">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
