import React from 'react';
import GridShape from '../../components/common/GridShape.jsx';
import authLogo from '../../../images/logo/auth-logo-new.svg';
import authImage from '../../../images/pexels-elly-fairytale-3822621.jpg';
import ThemeTogglerTwo from '../../components/common/ThemeTogglerTwo.jsx';

export default function AuthLayout({ children }) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        <div className="relative items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid"
             style={{
                 backgroundImage: `url(${authImage})`,
                 backgroundSize:   'cover',
                 backgroundPosition: 'center',
             }}
        >
            {/* ===== Overlay ===== */}
            <div className="absolute w-full right-0 inset-0 bg-black/30"></div>

          <div className="absolute w-full flex items-center justify-center z-100">
            {/* ===== Common Grid Shape Start ===== */}
            <GridShape />
            <div className="flex flex-col items-center max-w-xs">
              <p className="text-center text-[42px] text-gray-400 dark:text-white/60">Welcome to yoga admin panel</p>
            </div>
          </div>
        </div>
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}
