// import libraries
import {useState} from "react";
import {useNavigate} from "react-router-dom";

// import components and actions
import {Button} from "@/components/ui/common/Button";
import Notification from "@/components/ui/common/Notification";
import {useStore} from "@/hooks/hooks";
import {setSidebarOpen} from "@/store/actions";

// import handlers
import {handleLogout} from "@/handlers";



// import icons
import {
  BellRing,
  SquareMenu,
  SquareX,
  Users,
  ChevronRight,
  Settings,
  MessagesSquare,
  LogOut,
  Monitor,
} from "lucide-react";
import Tippy from "@tippyjs/react/headless";

const Header = () => {
  const [state, dispatch] = useStore() as [any, any];
  const {isSidebarOpen} = state;
  const [showGeneral, setShowGeneral] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const navigate = useNavigate();

  const onLogout = async () => {
    setShowGeneral(false);
    try {
      await handleLogout(navigate);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <div
      className={`fixed top-0 transition-all duration-300 ${
        isSidebarOpen ? "left-80" : "left-22"
      } right-0 h-17.5 bg-white border-b-2 border-gray-200 flex justify-between items-center px-4 shadow-sm z-40`}
    >
      {!isSidebarOpen && (
        <SquareMenu
          size={32}
          className="text-gray-900 hover:text-gray-700 cursor-pointer transition-colors"
          onClick={() => dispatch(setSidebarOpen(!isSidebarOpen))}
        />
      )}

      {isSidebarOpen && (
        <SquareX
          size={32}
          className="text-gray-900 hover:text-gray-700 cursor-pointer transition-colors"
          onClick={() => dispatch(setSidebarOpen(!isSidebarOpen))}
        />
      )}

      <div
        className={`flex items-center md:flex ${
          isSidebarOpen ? "hidden" : "block"
        }`}
      >
        <Tippy
          interactive
          visible={showNotification}
          onClickOutside={() => setShowNotification(false)}
          placement="bottom-end"
          render={(attrs) => (
            <div
              tabIndex={-1}
              {...attrs}
              className="w-64 md:w-120 max-h-160 overflow-y-auto p-6 bg-white shadow-2xl rounded-2xl border-2 border-gray-200"
            >
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Notifications
              </div>
              <div className="flex items-center space-x-2 mb-4">
                <Button
                  variant="primary"
                  size="medium"
                  className="rounded-full"
                >
                  All
                </Button>
                <Button
                  variant="outline"
                  size="medium"
                  className="rounded-full"
                >
                  Unread
                </Button>
              </div>
              <div className="flex items-center justify-between mt-4 mb-3">
                <span className="font-semibold text-gray-900">Recent</span>
                <span className="text-gray-600 hover:text-gray-900 cursor-pointer text-sm font-medium transition-colors">
                  View All
                </span>
              </div>
              <div className="mt-2 space-y-2 pb-4">
                <Notification />
                <Notification />
                <Notification />
                <Notification />
                <Notification />
                <Notification />
                <Notification />
                <Notification />
                <Notification />
                <Button variant="outline" size="medium" className="w-full mt-4">
                  View previous notifications
                </Button>
              </div>
            </div>
          )}
        >
          <BellRing
            size={24}
            className="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors"
            onClick={() => setShowNotification(!showNotification)}
          />
        </Tippy>

        <Tippy
          interactive
          visible={showGeneral}
          onClickOutside={() => setShowGeneral(false)}
          placement="bottom-end"
          render={(attrs) => (
            <div
              tabIndex={-1}
              {...attrs}
              className="w-60 md:w-82 h-auto p-6 bg-white shadow-2xl rounded-2xl border-2 border-gray-200"
            >
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center space-x-3 border-b-2 border-gray-200 pb-3 mb-4">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg/250px-Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg"
                    alt="Avatar"
                    className="w-10 h-10 rounded-full border-2 border-gray-300"
                  />
                  <span className="font-semibold text-gray-900">
                    Tran Thanh Lam
                  </span>
                </div>
                <Button variant="primary" size="medium" className="w-full">
                  <Users className="w-4 h-4 mr-2" />
                  View Profile
                </Button>
              </div>
              <div className="mt-6 space-y-1">
                <div className="flex items-center space-x-3 p-3 hover:bg-gray-100 cursor-pointer rounded-xl transition-all group">
                  <Settings className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
                  <span className="flex-1 text-gray-700 group-hover:text-gray-900">
                    Settings
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                </div>
                <div className="flex items-center space-x-3 p-3 hover:bg-gray-100 cursor-pointer rounded-xl transition-all group">
                  <Monitor className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
                  <span className="flex-1 text-gray-700 group-hover:text-gray-900">
                    Screen Settings
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                </div>
                <div className="flex items-center space-x-3 p-3 hover:bg-gray-100 cursor-pointer rounded-xl transition-all group">
                  <MessagesSquare className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
                  <span className="flex-1 text-gray-700 group-hover:text-gray-900">
                    Feedback
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                </div>
                <div
                  className="md:hidden flex items-center space-x-3 p-3 hover:bg-gray-100 cursor-pointer rounded-xl transition-all group"
                  onClick={onLogout}
                >
                  <LogOut className="w-5 h-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
                  <span className="flex-1 text-gray-700 group-hover:text-gray-900">
                    Logout
                  </span>
                </div>
              </div>
            </div>
          )}
        >
          <Button
            size="icon"
            variant="outline"
            className="ml-4 border-gray-300 hover:border-gray-900"
            onClick={() => setShowGeneral(!showGeneral)}
          >
            {/* Avatar or icon */}
          </Button>
        </Tippy>
      </div>
    </div>
  );
};

export default Header;
