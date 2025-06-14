import { useStore } from '@/hooks/hooks';
import { setSidebarOpen } from '@/store/actions';
import { BellRing, SquareMenu, SquareX } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const Header = () => {
    const [state, dispatch] = useStore();
    const { isSidebarOpen } = state;
    console.log('Sidebar open:', isSidebarOpen); 

    return (
        <div className={`fixed top-0 transition-all duration-300 ${isSidebarOpen ? "left-80" :"left-22"} right-0 h-17.5 bg-white flex justify-between items-center px-4 z-50`}>

            {!isSidebarOpen && <SquareMenu size={32} className="text-[#F26666]" onClick={() => dispatch(setSidebarOpen(!isSidebarOpen))} />}

            {isSidebarOpen && <SquareX size={32} className="text-[#F26666]" onClick={() => dispatch(setSidebarOpen(!isSidebarOpen))} />}

            <div className={`flex items-center md:flex ${isSidebarOpen ? "hidden" : "block"}`}>
                <BellRing size={24} className="text-[#5B6B79]" />
                <Button size="icon" variant="outline" className="ml-4 text-[#F26666] bg-[#F26666]">
                    {/* Avatar or icon */}
                </Button>
            </div>
        </div>
    );
};

export default Header;
