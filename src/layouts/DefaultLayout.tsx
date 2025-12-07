// import libraries
import {useState, useEffect} from "react";
import {Outlet, useNavigation} from "react-router-dom";

// import components
import {useStore} from "@/hooks/hooks";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import LoadingPage from "@/components/ui/common/LoadingPage";
// import icons
import {ArrowUp} from "lucide-react";

const DefaultLayout = () => {
  const navigation = useNavigation();
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: "smooth"});
  };
  const [state] = useStore();
  const {isSidebarOpen} = state;

  

  // Show loading page when navigation is in loading state
  const isLoading = navigation.state === "loading";

  return (
    <div className="flex">
      <Sidebar />
      <div
        className={`flex flex-col flex-1 ${
          isSidebarOpen ? "ml-80" : "ml-22"
        } transition-all duration-300`}
      >
        <Header />
        <main className="mt-17.5 p-2 md:p-4 bg-gray-100 overflow-y-auto min-h-[calc(100vh-230px)]">
          {isLoading ? <LoadingPage /> : <Outlet />}
        </main>
        <Footer />
      </div>
      {showButton && (
        <button
          className="fixed hidden md:block bottom-4 right-4 p-2 bg-red-400 text-white rounded-full shadow-lg transition-opacity duration-300"
          onClick={scrollToTop}
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default DefaultLayout;
