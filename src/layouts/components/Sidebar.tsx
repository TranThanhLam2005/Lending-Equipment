// import libraries
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useStore } from '@/hooks/hooks';

// import components and actions
import { setSidebarOpen } from '@/store/actions';
import { Button } from '@/components/ui/Button';
import ConfirmModal from '@/components/ui/ConfirmModal';



import {
  CalendarDays,
  BookOpen,
  ClipboardList,
  User2,
  LayoutDashboard,
  CalendarSearch,
  LogOut
} from 'lucide-react';
import Logo from '@/assets/loan.svg'; // Logo for collapsed sidebar



const URL_API = '192.168.1.12';


const Sidebar = () => {
  const renderLink = (
    { to, icon: Icon, label, size = 18, extra = '', onClick = () => { } }
  ) => (
    <>
      {isSidebarOpen ? (
        <NavLink
          to={to}
          onClick={onClick}
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded transition-all ${isActive ? 'bg-[#FDECEC] text-[#F26666]' : 'text-[#687382]'} ${extra}`
          }
        >
          <Icon size={size} />
          {label}
        </NavLink>
      ) : (
        <NavLink
          to={to}
          onClick={onClick}
          className={({ isActive }) =>
            `flex items-center justify-center p-2 rounded transition-all ${isActive ? 'bg-[#FDECEC] text-[#F26666]' : 'text-[#687382]'} ${extra}`
          }
        >
          <Icon className="w-6 h-6 md:w-8 md:h-8" />
        </NavLink>
      )}
    </>
  );
  const [state, dispatch] = useStore();
  const { isSidebarOpen } = state;
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
      const response = await fetch(`http://${URL_API}:3000/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (response.status === 200) {
        console.log('Logout successful:', data.message);
        dispatch(setSidebarOpen(false));
        navigate('/login', { replace: true });
      } else if (response.status === 400) {
        console.error('Logout error:', data.error);
      }
      else {
        console.error('An error occurred while logging out:', data.error);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
  return (
    <div
      className={`fixed top-0 left-0 h-full transition-all duration-300 ${isSidebarOpen ? 'w-80' : 'w-22'
        } bg-white shadow-md border-r`}
    >
      {/* Header logo / icon */}
      <div className="text-center py-6 px-4 text-2xl font-bold text-red-500">
        {isSidebarOpen ? (
          <>Lend<span className="text-gray-900">Equip</span></>
        ) : (
          <img src={Logo} alt="Logo" className="w-12 h-12 mx-auto" />
        )}
      </div>

      {/* Navigation links */}
      <nav className="flex flex-col space-y-1 px-2">
        {renderLink({
          to: '/',
          icon: LayoutDashboard,
          label: 'Dashboard',
          onClick: () => setCourseOpen(false),
        })}

        {/* Course link group */}
        {isSidebarOpen ? (
          renderLink({
            to: '/course/my_course',
            icon: CalendarDays,
            label: 'Course',
            extra: courseOpen ? 'bg-[#FDECEC] text-[#F26666]' : '',
            onClick: () => setCourseOpen(!courseOpen),
          })
        ) : (
          renderLink({
            to: '/course/my_course',
            icon: CalendarDays,
            label: 'Course',
            onClick: () => {
              setCourseOpen(!courseOpen);
              dispatch(setSidebarOpen(true));
            },
            extra: courseOpen ? 'bg-[#FDECEC] text-[#F26666]' : '',
          })
        )}

        {/* Submenu: My Course / Browse Course */}
        {courseOpen && isSidebarOpen && (
          <div className="ml-6 flex flex-col space-y-1">
            {renderLink({
              to: '/course/my_course',
              icon: CalendarDays,
              label: 'My Course',
              size: 16,
            })}
            {renderLink({
              to: '/course/browse_course',
              icon: CalendarSearch,
              label: 'Browse Course',
              size: 16,
            })}
          </div>
        )}

        {renderLink({
          to: '/student_equipment',
          icon: BookOpen,
          label: 'Equipment',
          onClick: () => setCourseOpen(false),
        })}

        {renderLink({
          to: '/student_record',
          icon: ClipboardList,
          label: 'Lending Record',
          onClick: () => setCourseOpen(false),
        })}

        {renderLink({
          to: '/account',
          icon: User2,
          label: 'Account',
          onClick: () => setCourseOpen(false),
        })}


      </nav>
      {/* Logout */}
      {isSidebarOpen &&
        (<div className="absolute bottom-0 w-full flex justify-center py-4">
          <Button className="flex items-center" variant="primary" size="lg" onClick={handleLogoutClick}>
            <LogOut size={24} />
            Log out
          </Button>
        </div>)
      }
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
