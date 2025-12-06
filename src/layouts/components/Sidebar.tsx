// import libraries
import {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {useStore} from "@/hooks/hooks";

// import components and actions
import {setSidebarOpen} from "@/store/actions";
import {Button} from "@/components/ui/common/Button";
import ConfirmModal from "@/components/ui/common/ConfirmModal";

// import routes
import {ROUTES} from "@/api/config";
import {authService} from "@/api/auth.service";

// import icons
import {
  CalendarDays,
  BookOpen,
  ClipboardList,
  User2,
  LayoutDashboard,
  CalendarSearch,
  LogOut,
} from "lucide-react";
import Logo from "@/assets/loan.svg"; // Logo for collapsed sidebar

const Sidebar = () => {
  const renderLink = ({
    to,
    icon: Icon,
    label,
    size = 18,
    extra = "",
    onClick = () => {},
  }: {
    to: string;
    icon: React.ComponentType<{size?: number; className?: string}>;
    label: string;
    size?: number;
    extra?: string;
    onClick?: () => void;
  }) => (
    <>
      {isSidebarOpen ? (
        <NavLink
          to={to}
          onClick={onClick}
          className={({isActive}) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
              isActive
                ? "bg-gray-900 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            } ${extra}`
          }
        >
          <Icon size={size} />
          {label}
        </NavLink>
      ) : (
        <NavLink
          to={to}
          onClick={onClick}
          className={({isActive}) =>
            `flex items-center justify-center p-3 rounded-xl transition-all ${
              isActive
                ? "bg-gray-900 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            } ${extra}`
          }
        >
          <Icon className="w-6 h-6 md:w-7 md:h-7" />
        </NavLink>
      )}
    </>
  );
  const [state, dispatch] = useStore() as [any, any];
  const {isSidebarOpen} = state;
  const [courseOpen, setCourseOpen] = useState(false);
  const navigate = useNavigate();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const handleLogoutClick = () => {
    setIsConfirmModalOpen(true);
  };
  const handleConfirmLogout = () => {
    logout();
    setIsConfirmModalOpen(false);
  };
  const handleCancelLogout = () => {
    setIsConfirmModalOpen(false);
  };

  const logout = async () => {
    try {
      await authService.logout();
      console.log("Logout successful");
      dispatch(setSidebarOpen(false));
      navigate(ROUTES.HOME, {replace: true});
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <div
      className={`fixed top-0 left-0 h-full transition-all duration-300 ${
        isSidebarOpen ? "w-80" : "w-22"
      } bg-white shadow-lg border-r-2 border-gray-200 z-50`}
    >
      {/* Header logo / icon */}
      <div className="text-center py-6 px-4 text-2xl font-bold border-b-2 border-gray-100">
        {isSidebarOpen ? (
          <div className="text-gray-900">
            Lend<span className="text-gray-600">Equip</span>
          </div>
        ) : (
          <img src={Logo} alt="Logo" className="w-12 h-12 mx-auto" />
        )}
      </div>

      {/* Navigation links */}
      <nav className="flex flex-col space-y-2 px-3 py-4">
        {renderLink({
          to: ROUTES.STUDENT_DASHBOARD,
          icon: LayoutDashboard,
          label: "Dashboard",
          onClick: () => setCourseOpen(false),
        })}

        {/* Course link group */}
        {isSidebarOpen
          ? renderLink({
              to: ROUTES.MY_COURSE,
              icon: CalendarDays,
              label: "Course",
              extra: courseOpen ? "bg-gray-900 text-white" : "",
              onClick: () => setCourseOpen(!courseOpen),
            })
          : renderLink({
              to: ROUTES.MY_COURSE,
              icon: CalendarDays,
              label: "Course",
              onClick: () => {
                setCourseOpen(!courseOpen);
                dispatch(setSidebarOpen(true));
              },
              extra: courseOpen ? "bg-gray-900 text-white" : "",
            })}

        {/* Submenu: My Course / Browse Course */}
        {courseOpen && isSidebarOpen && (
          <div className="ml-4 flex flex-col space-y-2 pl-4 border-l-2 border-gray-200">
            {renderLink({
              to: ROUTES.MY_COURSE,
              icon: CalendarDays,
              label: "My Course",
              size: 16,
            })}
            {renderLink({
              to: ROUTES.BROWSE_COURSE,
              icon: CalendarSearch,
              label: "Browse Course",
              size: 16,
            })}
          </div>
        )}

        {renderLink({
          to: ROUTES.STUDENT_EQUIPMENT,
          icon: BookOpen,
          label: "Equipment",
          onClick: () => setCourseOpen(false),
        })}

        {renderLink({
          to: ROUTES.STUDENT_RECORD,
          icon: ClipboardList,
          label: "Lending Record",
          onClick: () => setCourseOpen(false),
        })}

        {renderLink({
          to: ROUTES.ACCOUNT,
          icon: User2,
          label: "Account",
          onClick: () => setCourseOpen(false),
        })}
      </nav>
      {/* Logout */}
      {isSidebarOpen && (
        <div className="absolute bottom-0 w-full flex justify-center p-4 border-t-2 border-gray-100 hidden md:flex">
          <Button
            className="flex items-center gap-2 w-full mx-3"
            variant="primary"
            size="lg"
            onClick={handleLogoutClick}
          >
            <LogOut size={20} />
            Log out
          </Button>
        </div>
      )}
      {/* Confirm Modal */}
      {isConfirmModalOpen && (
        <ConfirmModal
          type="logout"
          title="Confirm Logout"
          message="Are you sure you want to log out?"
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      )}
    </div>
  );
};

export default Sidebar;
