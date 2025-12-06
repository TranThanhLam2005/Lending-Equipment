// import libraries
import {Link} from "react-router-dom";

// import components
import {Button} from "@/components/ui/common/Button";
import {FadeInSection} from "@/components/ui/common/FadeInSection";

// import routes
import {ROUTES} from "@/api/config";

// import icons
import Logo from "@/assets/Ishowspeed.png";
const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#F58989] to-[#b07d84] p-4">
      <div className="relative w-full max-w-4xl">
        <FadeInSection>
          <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden">
            {/* Left Image Section */}
            <div className="w-full md:w-1/2 h-64 md:h-auto">
              <img
                src={Logo}
                alt="Confused Person"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Right Form Section */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
              <h2 className="text-2xl md:text-5xl text-center font-light text-[#F58989] pb-10">
                Forgot Password?
              </h2>
              <p className="text-sm md:text-text text-[#475467] mb-6 text-center">
                Don’t worry, we’ll help you reset it. Enter your email address
                below.
              </p>

              <input
                type="email"
                placeholder="Enter Email"
                className="mb-4 px-3 py-2 md:px-4 md:py-3 rounded-full bg-[#FDECEC] placeholder:text-[#F58989] text-[#F58989] text-sm md:text-base outline-none"
              />
              <Button
                variant="primary"
                size="primary"
                className="mb-2 font-light rounded-full"
              >
                Send Reset Link
              </Button>

              <div className="text-right mb-6">
                <Link
                  to={ROUTES.LOGIN}
                  className="text-sm md:text-base text-[#F26666] hover:underline transition"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default ForgotPassword;
