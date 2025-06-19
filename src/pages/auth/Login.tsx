import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/Button";
import LoginForm from '@/components/ui/LoginForm'
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

import Logo from '@/assets/Rmit.png';
import FacebookIcon from '@/assets/facebook.png';
import GoogleIcon from '@/assets/google.webp';

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);


    const login = async () => {
        try {
            const response = await fetch('http://192.168.1.8:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // 👈 Important for cookies
                body: JSON.stringify({
                    Username: userName,
                    Password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                // You can store role or other non-sensitive info in state
            } else {
                console.error('Login failed:', response.statusText);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };





    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#F58989] to-[#b07d84] p-4">
            <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden w-full max-w-4xl">
                {/* Left side - Logo */}
                <div className="w-full md:w-1/2 h-64 md:h-auto flex items-center justify-center">
                    <img
                        src={Logo}
                        alt="Confused Person"
                        className="object-cover"
                    />
                </div>

                {/* Right side - Login form */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                    <h1 className="text-center text-3xl md:text-5xl font-light mb-1 text-[#F26666]">
                        <span className="text-light">Lend</span><span className="font-semibold">Equip</span>
                    </h1>
                    <h2 className="text-center text-xl md:text-2xl text-dark-6 items-center mt-10 mb-5">Login</h2>

                    <div className="flex flex-col items-center">
                        <div className="flex items-center mb-4 space-x-4">
                            <Link to="" className="flex items-center cursor-pointer transition bg-[#1877F2] px-4 py-2 rounded-full text-white">
                                <img src={FacebookIcon} alt="Facebook Icon" className="inline-block mr-2 w-4 h-4 md:w-6 md:h-6" />
                                Facebook
                            </Link>
                            <Link to="" className="flex items-center cursor-pointer transition bg-gray-300 px-4 py-2 rounded-full text-black">
                                <img src={GoogleIcon} alt="Google Icon" className="inline-block mr-2 w-4 h-4 md:w-6 md:h-6" />
                                Google
                            </Link>
                        </div>

                        <div className="flex items-center w-full max-w-xs mb-2">
                            <div className="flex-grow border-t border-gray-400"></div>
                            <span className="mx-4 text-gray-500 font-semibold">or</span>
                            <div className="flex-grow border-t border-gray-400"></div>
                        </div>
                    </div>

                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter Username"
                        className="mb-4 px-3 py-2 md:px-4 md:py-3 rounded-full bg-[#FDECEC] placeholder:text-[#F58989] text-[#F58989] text-xs md:text-base outline-none"
                    />

                    <div className="relative mb-2">
                        <input
                            type={showPassword ? "password" : "text"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                            className="w-full px-3 py-2 md:px-4 md:py-3 rounded-full bg-[#FDECEC] placeholder:text-[#F58989] text-[#F58989] text-xs md:text-base outline-none pr-12"
                        />
                        <span onClick={() => setShowPassword(!showPassword)}>
                            <Eye className="absolute right-3 top-2 w-5 h-5 md:right-4 md:top-3 md:w-6 md:h-6 text-[#F26666] cursor-pointer" />
                        </span>
                    </div>

                    <div className="text-right mb-6">
                        <Link
                            style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}
                            to="/forgot-password"
                            className="text-sm md:text-base text-[#F26666] hover:underline transition"

                        >
                            Forgot password?
                        </Link>
                    </div>

                    <Button variant="primary" size="primary" className="mb-2 font-light rounded-full" onClick={login}>
                        Login
                    </Button>

                    <Link to="/visitor" className="border border-[#F26666] text-center text-[#F26666] rounded-full py-2 hover:bg-[#F26666] hover:text-white md:text-base text-sm transition">
                        Guest
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
