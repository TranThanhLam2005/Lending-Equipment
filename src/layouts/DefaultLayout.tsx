import { useStore } from '@/hooks/hooks';
import { setSidebarOpen } from '@/store/actions';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

const DefaultLayout = () => {
  const [state, dispatch] = useStore();
  const { isSidebarOpen } = state;

  return (
    <div className="flex">
      <Sidebar />
      <div className={`flex flex-col flex-1 ${isSidebarOpen ? 'ml-80' : 'ml-22'} transition-all duration-300`}>
        <Header />
        <main className="mt-17.5 p-2 md:p-4 bg-gray-100 overflow-y-auto min-h-[calc(100vh-230px)]">
          <Outlet/>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default DefaultLayout;
