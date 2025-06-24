// import libraries
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

// import components
import { Button } from "@/components/ui/Button";
//import LoginForm from '@/components/ui/LoginForm'

// import icons and assets
import { Eye, TriangleAlert, AlertTriangle } from "lucide-react";
import Logo from '@/assets/Rmit.png';
import FacebookIcon from '@/assets/facebook.png';
import GoogleIcon from '@/assets/google.webp';


const URL_API = '192.168.1.12';

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [usernameCheck, setUCheck] = useState("");
    const [passwordCheck, setPCheck] = useState("");
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");
    const navigate = useNavigate();


    const validateUsername = (value: string) => {
        if (value.length === 0) return "Username is required";
        return "";
    }
    const validatePassword = (value: string) => {
        if (value.length === 0) return "Password is required";
        return "";
    }
    const handleUsernameChange = (value: string) => {
        setUserName(value);
        if (value.length > 0) {
            setUCheck("");
        }
    }
    const handlePasswordChange = (value: string) => {
        setPassword(value);
        if (value.length > 0) {
            setPCheck("");
        }
    }
    const handleUsernameBlur = () => {
        setUCheck(validateUsername(userName));
    }
    const handlePasswordBlur = () => {
        setPCheck(validatePassword(password));
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            login();
        }
    }


    const login = async () => {
        setLoading(true);
        setError("");
        setUCheck("");
        setPCheck("");

        const usernameError = validateUsername(userName);
        const passwordError = validatePassword(password);

        if (usernameError || passwordError) {
            setUCheck(usernameError);
            setPCheck(passwordError);
            setLoading(false);
            return;
        }


        try {
            const response = await fetch(`http://${URL_API}:3000/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        Username: userName,
                        Password: password,
                    }),
                }
            );
            const data = await response.json();
            if (response.status === 200) {
                console.log('Login successful:', data);
                navigate('/', { replace: true });
                return;
                // You can store role or other non-sensitive info in state
            } else if (response.status === 400) {
                setError(data.error);
                setLoading(false);
            } else if (response.status === 401) {
                setError(data.error);
                setLoading(false);
            } else if (response.status === 404) {
                setError(data.error);
                setLoading(false);
            }
            else {
                setError("An error occurred while logging in. Please try again later.");
                setLoading(false);
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
                        onChange={(e) => handleUsernameChange(e.target.value)}
                        onBlur={handleUsernameBlur}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter Username"
                        className={`${usernameCheck ? "mb-2": "mb-4"} px-3 py-2 md:px-4 md:py-3 rounded-full bg-[#FDECEC] placeholder:text-[#F58989] text-[#F58989] text-xs md:text-base outline-none ${usernameCheck ? "ring-2 ring-red-400" : ""
                            }`}
                    />
                    {usernameCheck && (
                        <p
                            id="username-error"
                            className="ml-2 mb-2 text-sm text-red-600 flex items-center animate-fade-in"
                            aria-live="polite"
                        >
                            <TriangleAlert className="w-4 h-4 mr-1" />
                            {usernameCheck}
                        </p>
                    )}

                    <div className="relative mb-2">
                        <input
                            type={showPassword ? "password" : "text"}
                            value={password}
                            onChange={(e) => handlePasswordChange(e.target.value)}
                            onBlur={handlePasswordBlur}
                            onKeyDown={handleKeyDown}
                            placeholder="Enter Password"
                            className="w-full px-3 py-2 md:px-4 md:py-3 rounded-full bg-[#FDECEC] placeholder:text-[#F58989] text-[#F58989] text-xs md:text-base outline-none pr-12"
                        />
                        <span onClick={() => setShowPassword(!showPassword)}>
                            <Eye className="absolute right-3 top-2 w-5 h-5 md:right-4 md:top-3 md:w-6 md:h-6 text-[#F26666] cursor-pointer" />
                        </span>
                    </div>
                    {passwordCheck && (
                        <p
                            id="password-error"
                            className="ml-2 mb-2 text-sm text-red-600 flex items-center animate-fade-in"
                            aria-live="polite"
                        >
                            <TriangleAlert className="w-4 h-4 mr-1" />
                            {passwordCheck}
                        </p>
                    )}

                    <div className="text-right mb-6">
                        <Link
                            to="/forgot-password"
                            className="text-sm md:text-base text-[#F26666] hover:underline transition"

                        >
                            Forgot password?
                        </Link>
                    </div>

                    <Button variant="primary" size="primary" className="mb-2 font-light rounded-full" onClick={login}>
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                    {error && (
                        <p
                            className="text-sm text-red-600 flex items-center animate-fade-in mb-2"
                            aria-live="polite"
                        >
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            {error}
                        </p>
                    )}
                    <Link to="/visitor" className="border border-[#F26666] text-center text-[#F26666] rounded-full py-2 hover:bg-[#F26666] hover:text-white md:text-base text-sm transition">
                        Guest
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
