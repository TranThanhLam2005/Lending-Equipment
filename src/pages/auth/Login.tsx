import {Button} from "@/components/ui/Button";
import {Link} from "react-router-dom";
import { Eye } from "lucide-react";
import Logo from '@/assets/Rmit.png';

const Login = () => {
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

                    <input
                        type="text"
                        placeholder="Enter Username"
                        className="mb-4 px-3 py-2 md:px-4 md:py-3 rounded-full bg-[#FDECEC] placeholder:text-[#F58989] text-[#F58989] text-sm md:text-base outline-none"
                    />

                    <div className="relative mb-2">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="w-full px-3 py-2 md:px-4 md:py-3 rounded-full bg-[#FDECEC] placeholder:text-[#F58989] text-[#F58989] text-sm md:text-base outline-none pr-12"
                        />
                        <Eye className="absolute right-3 top-2 w-5 h-5 md:right-4 md:top-3 md:w-6 md:h-6 text-[#F26666] cursor-pointer" />
                    </div>

                    <div className="text-right mb-6">
                        <Link
                            to="/forgot-password"
                            className="text-sm md:text-base text-[#F26666] hover:underline transition"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <Button variant="primary" size="primary" className="mb-2 font-light rounded-full">
                        Login
                    </Button>

                    <Link to ="/visitor" className="border border-[#F26666] text-center text-[#F26666] rounded-full py-2 hover:bg-[#F26666] hover:text-white md:text-base text-sm transition">
                        Guest
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
