// import libraries
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

// import components
import {Button} from "@/components/ui/common/Button";
import {FadeInSection} from "@/components/ui/common/FadeInSection";
//import LoginForm from '@/components/ui/LoginForm'

// import config and routes
import {ROUTES} from "@/api/config";
import {authService} from "@/api/auth.service";

// import icons and assets
import {Eye, TriangleAlert, AlertTriangle} from "lucide-react";
import Logo from "@/assets/Rmit.png";
import FacebookIcon from "@/assets/facebook.png";
import GoogleIcon from "@/assets/google.webp";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [usernameCheck, setUCheck] = useState("");
  const [passwordCheck, setPCheck] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateUsername = (value: string) => {
    if (value.length === 0) return "Username is required";
    return "";
  };
  const validatePassword = (value: string) => {
    if (value.length === 0) return "Password is required";
    return "";
  };
  const handleUsernameChange = (value: string) => {
    setUserName(value);
    if (value.length > 0) {
      setUCheck("");
    }
  };
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (value.length > 0) {
      setPCheck("");
    }
  };
  const handleUsernameBlur = () => {
    setUCheck(validateUsername(userName));
  };
  const handlePasswordBlur = () => {
    setPCheck(validatePassword(password));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      login();
    }
  };

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
      const response = await authService.login({
        Username: userName,
        Password: password,
      });
      console.log("Login successful:", response.data);
      navigate(ROUTES.STUDENT_DASHBOARD, {replace: true});
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.data?.error || "Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="relative w-full max-w-4xl">
        <FadeInSection>
          <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-gray-200">
            {/* Left side - Logo */}
            <div className="w-full md:w-1/2 h-60 md:h-auto flex items-center justify-center bg-gray-50 p-8">
              <img
                src={Logo}
                alt="Logo"
                className="object-contain w-full h-full"
              />
            </div>

            {/* Right side - Login form */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h1 className="text-center text-3xl md:text-4xl font-bold mb-2 text-gray-900">
                <span className="font-light">Lend</span>
                <span className="font-bold">Equip</span>
              </h1>
              <h2 className="text-center text-xl md:text-2xl text-gray-600 mt-4 md:mt-8 mb-8 font-medium">
                Welcome Back
              </h2>

              <div className="flex flex-col items-center">
                <div className="flex items-center mb-6 space-x-3 w-full max-w-sm">
                  <Link
                    to=""
                    className="flex-1 flex items-center justify-center cursor-pointer transition bg-gray-900 hover:bg-gray-800 px-4 py-2.5 rounded-xl text-white font-medium shadow-sm"
                  >
                    <img
                      src={FacebookIcon}
                      alt="Facebook Icon"
                      className="inline-block mr-2 w-5 h-5"
                    />
                    Facebook
                  </Link>
                  <Link
                    to=""
                    className="flex-1 flex items-center justify-center cursor-pointer transition bg-white hover:bg-gray-50 border-2 border-gray-300 px-4 py-2.5 rounded-xl text-gray-900 font-medium shadow-sm"
                  >
                    <img
                      src={GoogleIcon}
                      alt="Google Icon"
                      className="inline-block mr-2 w-5 h-5"
                    />
                    Google
                  </Link>
                </div>

                <div className="flex items-center w-full max-w-sm mb-6">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="mx-4 text-gray-500 font-medium text-sm">
                    or
                  </span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>
              </div>

              <input
                type="text"
                value={userName}
                onChange={(e) => handleUsernameChange(e.target.value)}
                onBlur={handleUsernameBlur}
                onKeyDown={handleKeyDown}
                placeholder="Enter Username"
                className={`${
                  usernameCheck ? "mb-2" : "mb-4"
                } px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 placeholder:text-gray-400 text-gray-900 text-sm md:text-base outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 transition-all ${
                  usernameCheck ? "border-red-400 ring-2 ring-red-400/20" : ""
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
                  className={`w-full px-4 py-3 rounded-xl bg-gray-50 border-2 border-gray-200 placeholder:text-gray-400 text-gray-900 text-sm md:text-base outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 transition-all pr-12 ${
                    passwordCheck ? "border-red-400 ring-2 ring-red-400/20" : ""
                  }`}
                />
                <span onClick={() => setShowPassword(!showPassword)}>
                  <Eye className="absolute right-3 top-3 w-5 h-5 md:w-6 md:h-6 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors" />
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
                  to={ROUTES.FORGOT_PASSWORD}
                  className="text-sm md:text-base text-gray-900 hover:text-gray-700 font-medium hover:underline transition"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                variant="primary"
                size="primary"
                className="mb-3 font-medium rounded-xl"
                onClick={login}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
              {error && (
                <p
                  className="text-sm text-red-600 flex items-center animate-fade-in mb-3 bg-red-50 p-3 rounded-xl"
                  aria-live="polite"
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  {error}
                </p>
              )}
              <Link
                to={ROUTES.VISITOR}
                className="border-2 border-gray-300 text-center text-gray-900 rounded-xl py-2.5 hover:bg-gray-900 hover:text-white hover:border-gray-900 md:text-base text-sm transition-all font-medium"
              >
                Continue as Visitor
              </Link>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default Login;
