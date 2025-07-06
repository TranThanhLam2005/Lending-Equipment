// import libraries
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import components and actions
import { Button } from '@/components/ui/Button';
import Notification from '@/components/ui/Notification';
import { useStore } from '@/hooks/hooks';
import { setSidebarOpen } from '@/store/actions';

// import icons
import { BellRing, SquareMenu, SquareX, Users, ChevronRight, Settings, MessagesSquare, LogOut, Monitor } from 'lucide-react';
import Tippy from '@tippyjs/react/headless';

// Define the URL for the API
const URL_API = '192.168.1.127';

const Header = () => {
    const [state, dispatch] = useStore();
    const { isSidebarOpen } = state;
    const [showGeneral, setShowGeneral] = useState(false);
    const [showNotification, setShowNotification] = useState(false);


    const navigate = useNavigate();

    const handleLogout = async () => {
        setShowGeneral(false);
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
                navigate('/', { replace: true });
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
        <div className={`fixed top-0 transition-all duration-300 ${isSidebarOpen ? "left-80" : "left-22"} right-0 h-17.5 bg-white flex justify-between items-center px-4`}>

            {!isSidebarOpen && <SquareMenu size={32} className="text-[#F26666]" onClick={() => dispatch(setSidebarOpen(!isSidebarOpen))} />}

            {isSidebarOpen && <SquareX size={32} className="text-[#F26666]" onClick={() => dispatch(setSidebarOpen(!isSidebarOpen))} />}

            <div className={`flex items-center md:flex ${isSidebarOpen ? "hidden" : "block"}`}>
                <Tippy
                    interactive
                    visible={showNotification}
                    onClickOutside={() => setShowNotification(false)}
                    placement="bottom-end"
                    render={attrs => (
                        <div tabIndex="-1" {...attrs} className="w-64 md:w-82 h-120 md:h-160 p-4 bg-white shadow-lg rounded-xl">
                            <div className="text-2xl md:text-4xl font-medium mb-4">Notification</div>
                            <div className="flex items-center space-x-2">
                                <Button variant="primary" size="medium" className="mb-2 rounded-3xl">
                                    All
                                </Button>
                                <Button variant="secondary" size="medium" className="mb-2 rounded-3xl">
                                    Unread
                                </Button>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <span className="font-medium">Previous</span>
                                <span className="text-red-400 ">View All</span>
                            </div>
                            <div className="mt-2 space-y-2 max-h-80 md:max-h-120 overflow-y-auto pb-4">
                                <Notification />
                                <Notification />
                                <Notification />
                                <Notification />
                                <Notification />
                                <Notification />
                                <Notification />
                                <Notification />
                                <Notification />
                                <Button variant="primary" size="medium" className="w-full mt-4">
                                    View previous notifications
                                </Button>
                            </div>
                        </div>
                    )}
                >

                    <BellRing size={24} className="text-[#5B6B79]" onClick={() => setShowNotification(!showNotification)} />
                </Tippy>


                <Tippy
                    interactive
                    visible={showGeneral}
                    onClickOutside={() => setShowGeneral(false)}
                    placement="bottom-end"
                    render={attrs => (
                        <div tabIndex="-1" {...attrs} className="w-60 md:w-82 h-auto p-4 bg-white shadow-lg rounded-xl">
                            <div className="rounded-xl shadow-lg p-4">
                                <div className="flex items-center space-x-2 border-b-2 pb-3 mb-4">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg/250px-Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg" alt="Avatar" className="w-9 h-9 rounded-full" />
                                    <span>Tran Thanh Lam</span>
                                </div>
                                <Button variant="primary" size="medium" className="w-full mb-2">
                                    <Users className="w-4 h-4 mr-2" />
                                    View Profile Page
                                </Button>
                            </div>
                            <div className="mt-6 space-y-2">
                                <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer rounded-lg">
                                    <Settings className="w-6 h-6 mr-2 text-[#5B6B79] rounded-full" />
                                    Settings
                                    <ChevronRight className="w-6 h-6 ml-auto text-[#5B6B79]" />
                                </div>
                                <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer rounded-lg">
                                    <Monitor className="w-6 h-6 mr-2 text-[#5B6B79] rounded-full" />
                                    Screen Settings
                                    <ChevronRight className="w-6 h-6 ml-auto text-[#5B6B79]" />
                                </div>
                                <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer rounded-lg">
                                    <MessagesSquare className="w-6 h-6 mr-2 text-[#5B6B79] rounded-full" />
                                    Feedback
                                    <ChevronRight className="w-6 h-6 ml-auto text-[#5B6B79]" />
                                </div>
                                <div className="md:hidden flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer rounded-lg" onClick={handleLogout}>
                                    <LogOut className="w-6 h-6 mr-2 text-[#5B6B79] rounded-full" />
                                    Logout
                                </div>
                            </div>
                        </div>
                    )}
                >
                    <Button size="icon" variant="outline" className="ml-4 text-[#F26666] bg-[#F26666]" onClick={() => setShowGeneral(!showGeneral)}>
                        {/* Avatar or icon */}
                    </Button>
                </Tippy>
            </div>
        </div>
    );
};

export default Header;
