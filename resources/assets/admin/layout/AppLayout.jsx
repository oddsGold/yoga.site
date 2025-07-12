import { SidebarProvider, useSidebar } from '../context/SidebarContext.jsx';
import { Outlet } from 'react-router';
import AppHeader from './AppHeader.jsx';
import Backdrop from './Backdrop.jsx';
import AppSidebar from './AppSidebar.jsx';
import { useGetAccountQuery, useLogoutMutation } from '../redux/auth/authApiSlice.js';
import { errorHandler } from '../components/utils/toastHandler.js';
import { Loading } from '../components/loadingBar/Loading.jsx';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const LayoutContent = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const { data: user, error: isAccountError, isLoading: isAccountLoading } = useGetAccountQuery();
  const [logout, { isLoading: logoutLoading }] = useLogoutMutation();

  const TEMP_CONST = true;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      errorHandler('Logout failed');
    }
  };

  const isLoading = isAccountLoading || logoutLoading;

  return (
    <div className="min-h-screen xl:flex dark:bg-gray-900">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>

      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? 'lg:ml-[290px]' : 'lg:ml-[90px]'
        } ${isMobileOpen ? 'ml-0' : ''}`}
      >
        {isAccountLoading || logoutLoading ? (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-gray-900/60 rounded-3xl">
            <Loading />
          </div>
        ) : (
          <>
            {!isAccountError && user && <AppHeader user={user} handleLogout={handleLogout} />}
            <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
              <Outlet />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const AppLayout = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
