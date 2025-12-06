// import libraries
import {useState, useRef} from "react";
import {useNavigate} from "react-router-dom";

// import components
import {Button} from "@/components/ui/Button";
import Footer from "@/layouts/components/Footer";
import {FadeInSection} from "@/components/ui/FadeInSection";

// import routes
import {ROUTES} from "@/api/config";

// import icons
import logo from "@/assets/Rmit.png";
import Image from "@/assets/dashboard.png";
import {
  ArrowRight,
  CalendarDays,
  MessageSquare,
  BarChart,
  CircleCheck,
  ArrowUp,
  ArrowDown,
  Wrench,
} from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <header className="fixed bg-white h-16 w-full flex items-center justify-between border-b-1 px-4 md:px-30 z-20">
        <div className="flex items-center">
          <img
            src={logo}
            alt="RMIT Logo"
            className="h-14 w-14 inline-block mr-4"
          />
          <span>EasyEd Track</span>
        </div>
        <div className="flex items-center gap-0 md:gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(ROUTES.LOGIN)}
          >
            Login
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(ROUTES.VISITOR)}
          >
            Visitor
          </Button>
        </div>
      </header>
      <section className="px-4 md:px-50 pt-10 md:pt-30">
        <FadeInSection>
          <div className="flex flex-col md:flex-row gap-x-20 ">
            <div className="w-full md:w-1/2 flex flex-col md:items-start">
              <h1 className="text-4xl font-bold mt-10 text-center md:text-left">
                EasyEd Track
              </h1>
              <p className="mt-4 text-lg text-gray-600 text-center md:text-left">
                EasyEd Track is a smart, centralized platform designed to help
                schools manage course schedules and equipment lending with ease.
                Built for students, staff, and administrators, it simplifies
                enrollment, tracks equipment usage, and improves communication —
                all in one place.
              </p>
              <div className="flex flex-col md:flex-row justify-center items-center md:gap-x-4 gap-y-2 md:gap-y-0 mt-6 mb-4 md:mb-0">
                <Button
                  variant="primary"
                  size="sm"
                  className="group w-full md:w-auto"
                >
                  Get Started
                  <ArrowRight className="transition-transform duration-300 transform group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full md:w-auto"
                >
                  Try It Now
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <img
                src={Image}
                alt="Landing Image"
                className="w-full h-auto py-2 rounded-2xl border-1 shadow-2xl"
              />
            </div>
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className="mt-30">
            <h1 className="text-center text-4xl font-bold">
              Powerful Features to Run Your School Smoothly
            </h1>
            <h2 className="text-center text-lg text-gray-500 mt-3">
              Powerful features designed to make event management effortless
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 justify-items-center">
              {featureComponent(
                <Wrench className="size-8" />,
                "Equipment Management",
                "Utilize the lending equipment for student. Make it easy for tracking the record of equipment usage and availability."
              )}
              {featureComponent(
                <CalendarDays className="size-8" />,
                "Course Management",
                "Providing course details, schedules, and relative equipment for staff and student."
              )}
              {featureComponent(
                <MessageSquare className="size-8" />,
                "Discussion Boards",
                "Foster engagement through discussion boards and chat features."
              )}
              {featureComponent(
                <BarChart className="size-8" />,
                "Analytics & Reporting",
                "Gain insights into student lending recording and equipment information."
              )}
            </div>
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className="mt-30">
            <h1 className="text-center text-4xl font-bold">How it work</h1>
            <h2 className="text-center text-lg text-gray-500 mt-3">
              A smarter way for students and staff to organize, borrow, and
              learn.
            </h2>
            <div className="flex flex-col items-center gap-10 md:gap-14 mt-10">
              {workComponent(
                "1",
                "Log In to Your Student Portal",
                "Start by logging into your student account to access your courses and borrowing features."
              )}
              {workComponent(
                "2",
                "View Courses and Assigned Equipment",
                "Easily view your enrolled courses along with the equipment available for each one."
              )}
              {workComponent(
                "3",
                "Borrow Equipment You Need",
                "Submit equipment requests, check availability, and borrow items linked to your course work."
              )}
              {workComponent(
                "4",
                "Join the Discussion & Share Feedback",
                "Engage with classmates by reviewing courses and equipment through the discussion board.",
                true
              )}
            </div>
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className="mt-30">
            <h1 className="text-center text-4xl font-bold">
              Explore the Equipment You Can Borrow
            </h1>
            <h2 className="text-center text-lg text-gray-500 mt-3">
              From laptops to VR headsets — everything you need to succeed in
              class.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-2 mt-10 justify-items-center">
              {equipmentComponent(
                "https://bizweb.dktcdn.net/100/444/581/products/1-6d8ef4a6-01b5-45fd-906c-272cf0d27a9d-bea26076-46a2-4edb-b69b-4087a5fa6844-8983484b-ddbc-46ea-b13e-29586d358501-11dd4b37-d8f0-489c-94d3-ee36f7f0443f-bcc4987d-4c2e-4a2c-a144-2123b6f50339.png?v=1734923193447",
                "VR Headset",
                "Experience the future of virtual reality with our state-of-the-art VR headset."
              )}
              {equipmentComponent(
                "https://bizweb.dktcdn.net/100/444/581/products/1-6d8ef4a6-01b5-45fd-906c-272cf0d27a9d-bea26076-46a2-4edb-b69b-4087a5fa6844-8983484b-ddbc-46ea-b13e-29586d358501-11dd4b37-d8f0-489c-94d3-ee36f7f0443f-bcc4987d-4c2e-4a2c-a144-2123b6f50339.png?v=1734923193447",
                "Laptop",
                "High-performance laptops for all your computing needs, from gaming to professional work."
              )}
              {equipmentComponent(
                "https://bizweb.dktcdn.net/100/444/581/products/1-6d8ef4a6-01b5-45fd-906c-272cf0d27a9d-bea26076-46a2-4edb-b69b-4087a5fa6844-8983484b-ddbc-46ea-b13e-29586d358501-11dd4b37-d8f0-489c-94d3-ee36f7f0443f-bcc4987d-4c2e-4a2c-a144-2123b6f50339.png?v=1734923193447",
                "Smartphone",
                "Stay connected with the latest smartphones featuring cutting-edge technology."
              )}
              {equipmentComponent(
                "https://bizweb.dktcdn.net/100/444/581/products/1-6d8ef4a6-01b5-45fd-906c-272cf0d27a9d-bea26076-46a2-4edb-b69b-4087a5fa6844-8983484b-ddbc-46ea-b13e-29586d358501-11dd4b37-d8f0-489c-94d3-ee36f7f0443f-bcc4987d-4c2e-4a2c-a144-2123b6f50339.png?v=1734923193447",
                "Tablet",
                "Versatile tablets for work, play, and everything in between."
              )}
            </div>
          </div>
        </FadeInSection>

        <div className="mt-30">
          <h1 className="text-center text-4xl font-bold">
            Smart Features Built for Modern Education
          </h1>
          <h2 className="text-center text-lg text-gray-500 mt-3">
            Everything you need to manage courses and equipment — in one
            platform.
          </h2>
          <div className="flex flex-col items-center gap-20 mt-20">
            {featureDetail(
              "https://bizweb.dktcdn.net/100/444/581/products/1-6d8ef4a6-01b5-45fd-906c-272cf0d27a9d-bea26076-46a2-4edb-b69b-4087a5fa6844-8983484b-ddbc-46ea-b13e-29586d358501-11dd4b37-d8f0-489c-94d3-ee36f7f0443f-bcc4987d-4c2e-4a2c-a144-2123b6f50339.png?v=1734923193447",
              "Comprehensive Event Management",
              "EventApp offers a complete suite of tools for managing every aspect of your event, from planning to execution. Create events, manage registrations, and engage with attendees seamlessly.",
              "Create and Manage Events",
              "Customizable Event Pages",
              "Real-time Analytics",
              "Seamless Registration Process",
              true
            )}
            {featureDetail(
              "https://bizweb.dktcdn.net/100/444/581/products/1-6d8ef4a6-01b5-45fd-906c-272cf0d27a9d-bea26076-46a2-4edb-b69b-4087a5fa6844-8983484b-ddbc-46ea-b13e-29586d358501-11dd4b37-d8f0-489c-94d3-ee36f7f0443f-bcc4987d-4c2e-4a2c-a144-2123b6f50339.png?v=1734923193447",
              "Comprehensive Event Management",
              "EventApp offers a complete suite of tools for managing every aspect of your event, from planning to execution. Create events, manage registrations, and engage with attendees seamlessly.",
              "Create and Manage Events",
              "Customizable Event Pages",
              "Real-time Analytics",
              "Seamless Registration Process",
              false
            )}
            {featureDetail(
              "https://bizweb.dktcdn.net/100/444/581/products/1-6d8ef4a6-01b5-45fd-906c-272cf0d27a9d-bea26076-46a2-4edb-b69b-4087a5fa6844-8983484b-ddbc-46ea-b13e-29586d358501-11dd4b37-d8f0-489c-94d3-ee36f7f0443f-bcc4987d-4c2e-4a2c-a144-2123b6f50339.png?v=1734923193447",
              "Comprehensive Event Management",
              "EventApp offers a complete suite of tools for managing every aspect of your event, from planning to execution. Create events, manage registrations, and engage with attendees seamlessly.",
              "Create and Manage Events",
              "Customizable Event Pages",
              "Real-time Analytics",
              "Seamless Registration Process",
              true
            )}
            {featureDetail(
              "https://bizweb.dktcdn.net/100/444/581/products/1-6d8ef4a6-01b5-45fd-906c-272cf0d27a9d-bea26076-46a2-4edb-b69b-4087a5fa6844-8983484b-ddbc-46ea-b13e-29586d358501-11dd4b37-d8f0-489c-94d3-ee36f7f0443f-bcc4987d-4c2e-4a2c-a144-2123b6f50339.png?v=1734923193447",
              "Comprehensive Event Management",
              "EventApp offers a complete suite of tools for managing every aspect of your event, from planning to execution. Create events, manage registrations, and engage with attendees seamlessly.",
              "Create and Manage Events",
              "Customizable Event Pages",
              "Real-time Analytics",
              "Seamless Registration Process",
              false
            )}
          </div>
        </div>

        <FadeInSection>
          <div className="mt-30">
            <h1 className="text-center text-4xl font-bold">
              Seamless Experience on Any Device
            </h1>
            <h2 className="text-center text-lg text-gray-500 mt-3">
              Access your dashboard from desktop, tablet, or mobile — anytime,
              anywhere.
            </h2>
            <div className="flex flex-col md:flex-row justify-center mt-10 gap-4">
              <img
                src="https://eventify.solve.vn/LandingPage/desktop.png"
                alt="Desktop View"
                className="w-164 rounded-2xl shadow-lg"
              />
              <div className="flex justify-center gap-2">
                <img
                  src="https://eventify.solve.vn/LandingPage/tablet.png"
                  alt="Tablet View"
                  className="w-60 rounded-2xl shadow-lg"
                />
                <img
                  src="https://eventify.solve.vn/LandingPage/mobile.png"
                  alt="Mobile View"
                  className="w-40 rounded-2xl shadow-lg"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 justify-items-center">
              <div className="w-88 shadow-xl rounded-2xl p-6 mt-10 bg-white">
                <h2 className="text-lg font-semibold mb-2">
                  Desktop Experience
                </h2>
                <p className="text-gray-700 ">
                  Get full control over course scheduling, equipment inventory,
                  and analytics. Perfect for school administrators and staff
                  managing operations with advanced tools and detailed
                  dashboards.
                </p>
              </div>
              <div className="w-88 shadow-xl rounded-2xl p-6 mt-10 bg-white">
                <h2 className="text-lg font-semibold mb-2">Tablet View</h2>
                <p className="text-gray-700 ">
                  A balanced experience for both students and instructors. Ideal
                  for classroom use, registration booths, or on-site equipment
                  check-ins with a clean, touch-friendly interface.
                </p>
              </div>
              <div className="w-88 shadow-xl rounded-2xl p-6 mt-10 bg-white">
                <h2 className="text-lg font-semibold mb-2">Mobile View</h2>
                <p className="text-gray-700 ">
                  Quick and easy access for students on the go. Check your
                  course schedule, request equipment, and stay updated —
                  anytime, from anywhere.
                </p>
              </div>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className="mt-30">
            <h1 className="text-center text-4xl font-bold">
              Trusted and Loved by Students and Staff
            </h1>
            <h2 className="text-center text-lg text-gray-500 mt-3">
              Thousands of users rely on EasyEd Track to simplify course and
              equipment management every day.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 justify-items-center">
              {feedbackComponent(
                "https://eventify.solve.vn/LandingPage/user1.jpg",
                "John Doe",
                "I used to spend so much time figuring out how to borrow equipment for my projects. Now with EasyEd Track, everything is fast and organized. Super helpful!"
              )}
              {feedbackComponent(
                "https://eventify.solve.vn/images/dr_tri_dang.jpg",
                "Jane Smith",
                "Managing lab devices used to be chaotic. This platform gave me clear visibility on who borrowed what, when it's due, and what needs maintenance. A game changer!"
              )}
              {feedbackComponent(
                "https://eventify.solve.vn/images/Dr_Tuan_Tran.jpg",
                "Alice Johnson",
                "EasyEd Track made scheduling and managing course materials incredibly smooth. I love how intuitive the interface is. Highly recommended for any school."
              )}
            </div>
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className="mt-30">
            <h1 className="text-center text-4xl font-bold">
              Frequently Asked Questions
            </h1>
            <h2 className="text-center text-lg text-gray-500 mt-3">
              Find quick answers to the most common questions about using EasyEd
              Track.
            </h2>
            <div className="flex flex-col items-center gap-4 mt-10">
              {FAQComponent(
                "What is EasyEd Track?",
                "EasyEd Track is an all-in-one platform that helps schools manage student course schedules and handle equipment lending efficiently. It’s designed for both students and staff to simplify administrative tasks and improve the learning experience."
              )}
              {FAQComponent(
                "Can students borrow equipment online?",
                "Yes! Students can log in to their portal, browse available equipment (like laptops, tablets, VR headsets), and submit borrowing requests directly through the platform."
              )}
              {FAQComponent(
                "How does course management work?",
                "Instructors and admins can create courses, assign students, upload resources, and track progress. Students can view their course schedules and access relevant equipment or materials."
              )}
              {FAQComponent(
                "Is EasyEd Track available on mobile devices?",
                "Absolutely. EasyEd Track is fully responsive and works seamlessly on desktops, tablets, and smartphones — so you can manage tasks anywhere, anytime."
              )}
            </div>
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className="my-30 shadow-2xl rounded-2xl p-10 bg-white">
            <h1 className="text-center text-4xl font-bold">
              Enter email for receive the notification
            </h1>
            <h2 className="text-center text-lg mt-3">
              Stay updated with the latest features and updates from EventApp
            </h2>
            <div className="flex justify-center items-center mt-10">
              <div className="flex gap-x-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1"
                />
                <Button variant="primary" size="sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>
      <Footer />
    </div>
  );
};

const workComponent = (
  number: string,
  title: string,
  description: string,
  isLast = false
) => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-x-50">
      <div className="relative flex flex-col items-center w-full md:w-auto mb-4 md:mb-0">
        <div className="flex items-center justify-center h-18 w-18 bg-gradient-to-r from-[#0071e3]/20 to-[#6c56f5]/20 text-3xl font-bold text-blue-600 rounded-full shadow-xl">
          {number}
        </div>
        {/* Connector line */}
        {!isLast && (
          <div className="hidden md:block absolute top-18 h-18 w-0.5 bg-blue-200" />
        )}
      </div>
      <div className="flex flex-col max-w-md">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-500 mt-3">{description}</p>
      </div>
    </div>
  );
};

const featureComponent = (
  icon: React.ReactNode,
  title: string,
  description: string
) => {
  return (
    <div className="p-4 w-88 md:w-66 min-h-60 bg-white rounded-2xl shadow-2xl">
      <Button size="icon" className="text-white">
        {icon}
      </Button>
      <h2 className="text-2xl font-semibold my-3">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const equipmentComponent = (
  image: string,
  title: string,
  description: string
) => {
  return (
    <div className="w-88 md:w-66 min-h-60 bg-white rounded-2xl shadow-2xl transition-transform duration-200 hover:-translate-y-1">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-t-2xl"
      />
      <div className="p-4">
        <h2 className="text-2xl font-semibold my-3">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const featureDetail = (
  Image: string,
  title: string,
  description: string,
  feature1: string,
  feature2: string,
  feature3: string,
  feature4: string,
  imageLeft = false
) => {
  return (
    <FadeInSection>
      <div className="flex flex-col md:flex-row gap-10 items-center justify-between">
        <div
          className={`w-full md:w-1/2 ${
            imageLeft ? "order-1 md:order-1" : "order-1 md:order-2"
          }`}
        >
          <img
            src={Image}
            alt="Landing Image"
            className="w-full h-64 rounded-2xl border-1 shadow-2xl"
          />
        </div>
        <div
          className={`w-full md:w-1/2 flex flex-col items-start ${
            imageLeft ? "order-1 md:order-2 " : "order-1 md:order-1"
          }`}
        >
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-lg text-gray-600 mt-4">{description}</p>
          <div className="flex flex-col mt-6 gap-4">
            <div className="flex items-center gap-2">
              <CircleCheck className="text-red-400" />
              <span>{feature1}</span>
            </div>
            <div className="flex items-center gap-2">
              <CircleCheck className="text-red-400" />
              <span>{feature2}</span>
            </div>
            <div className="flex items-center gap-2">
              <CircleCheck className="text-red-400" />
              <span>{feature3}</span>
            </div>
            <div className="flex items-center gap-2">
              <CircleCheck className="text-red-400" />
              <span>{feature4}</span>
            </div>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
};

const feedbackComponent = (image: string, name: string, feedback: string) => {
  return (
    <div className="w-88 shadow-2xl rounded-2xl p-6 bg-white">
      <div className="flex  items-center mb-2">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full mb-4 mr-4"
        />
        <h2 className="text-lg font-semibold mb-2">{name}</h2>
      </div>
      <p className="text-gray-700 mb-2">{feedback}</p>
      <div className="text-red-400 text-xl">★★★★★</div>
    </div>
  );
};

const FAQComponent = (question: string, answer: string) => {
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full shadow-xl rounded-2xl border-1 p-6 bg-white transition-all duration-200 ease-in-out">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsShowAnswer(!isShowAnswer)}
      >
        <h2 className="text-lg font-semibold">{question}</h2>
        {isShowAnswer ? (
          <ArrowUp className="text-gray-500" />
        ) : (
          <ArrowDown className="text-gray-500" />
        )}
      </div>

      <div
        ref={contentRef}
        className={`transition-all duration-200 ease-in-out overflow-hidden ${
          isShowAnswer ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-700">{answer}</p>
      </div>
    </div>
  );
};
export default LandingPage;
