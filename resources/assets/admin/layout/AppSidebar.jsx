import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDownIcon, HorizontaLDots } from '../icons';
import { useSidebar } from '../context/SidebarContext.jsx';
import LogoLight from '../../images/logo/auth-logo.svg';
import LogoDark from '../../images/logo/auth-logo.svg';
import LogoIcon from '../../images/logo/logo-icon.svg';
import { useGetMenuItemsQuery } from '../redux/auth/authApiSlice.js';
import { convertMenu } from '../components/utils/convertMenu.js';
import { Loading } from '../components/loadingBar/Loading.jsx';

const AppSidebar = () => {
    const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
    const location = useLocation();
    const [openSubmenu, setOpenSubmenu] = useState(null);
    const [subMenuHeight, setSubMenuHeight] = useState({});
    const subMenuRefs = useRef({});

    const { data: menuItemsData, isLoading: isMenuItemsLoading } = useGetMenuItemsQuery();
    const navItems = menuItemsData ? convertMenu(menuItemsData) : [];

    const isActive = useCallback((path) => location.pathname === path, [location.pathname]);

    useEffect(() => {
        let submenuMatched = false;

        navItems.forEach((nav, index) => {
            nav.subItems?.forEach((subItem) => {
                if (isActive(subItem.path)) {
                    setOpenSubmenu({ type: 'main', index });
                    submenuMatched = true;
                }
            });
        });

        if (!submenuMatched) setOpenSubmenu(null);
    }, [location, isActive]);

    useEffect(() => {
        if (openSubmenu !== null) {
            const key = `${openSubmenu.type}-${openSubmenu.index}`;
            const ref = subMenuRefs.current[key];
            if (ref) {
                setSubMenuHeight((prev) => ({
                    ...prev,
                    [key]: ref.scrollHeight || 0,
                }));
            }
        }
    }, [openSubmenu]);

    const handleSubmenuToggle = (index, menuType) => {
        setOpenSubmenu((prev) =>
            prev?.type === menuType && prev.index === index ? null : { type: menuType, index },
        );
    };

    const renderMenuItems = (items, menuType) => (
        <ul className="flex flex-col gap-4">
            <li>
                <a href="/" className="menu-item group menu-item-inactive">
                <span className="menu-item-icon-size menu-item-icon-inactive">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path d="M13 19l-7-7 7-7M6 12h13" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"
        stroke-linejoin="round" />
</svg>

                </span>
                    <span className="menu-item-text"><b>Back to the site</b></span>
                </a>
            </li>
            {items.map((nav, index) => (
                <li key={nav.name}>
                    {nav.subItems ? (
                        <button
                            onClick={() => handleSubmenuToggle(index, menuType)}
                            className={`menu-item group ${
                                openSubmenu?.type === menuType && openSubmenu?.index === index
                                    ? 'menu-item-active'
                                    : 'menu-item-inactive'
                            } cursor-pointer ${
                                !isExpanded && !isHovered ? 'lg:justify-center' : 'lg:justify-start'
                            }`}
                        >
              <span
                  className={`menu-item-icon-size ${
                      openSubmenu?.type === menuType && openSubmenu?.index === index
                          ? 'menu-item-icon-active'
                          : 'menu-item-icon-inactive'
                  }`}
              >
                {nav.icon}
              </span>
                            {(isExpanded || isHovered || isMobileOpen) && (
                                <span className="menu-item-text">{nav.name}</span>
                            )}
                            {(isExpanded || isHovered || isMobileOpen) && (
                                <ChevronDownIcon
                                    className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                                        openSubmenu?.type === menuType && openSubmenu?.index === index
                                            ? 'rotate-180 text-brand-500'
                                            : ''
                                    }`}
                                />
                            )}
                        </button>
                    ) : (
                        nav.path && (
                            <Link
                                to={nav.path}
                                className={`menu-item group ${
                                    isActive(nav.path) ? 'menu-item-active' : 'menu-item-inactive'
                                }`}
                            >
                <span
                    className={`menu-item-icon-size ${
                        isActive(nav.path) ? 'menu-item-icon-active' : 'menu-item-icon-inactive'
                    }`}
                >
                  {nav.icon}
                </span>
                                {(isExpanded || isHovered || isMobileOpen) && (
                                    <span className="menu-item-text">{nav.name}</span>
                                )}
                            </Link>
                        )
                    )}
                    {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
                        <div
                            ref={(el) => {
                                subMenuRefs.current[`${menuType}-${index}`] = el;
                            }}
                            className="overflow-hidden transition-all duration-300"
                            style={{
                                height:
                                    openSubmenu?.type === menuType && openSubmenu?.index === index
                                        ? `${subMenuHeight[`${menuType}-${index}`]}px`
                                        : '0px',
                            }}
                        >
                            <ul className="mt-2 space-y-1 ml-9">
                                {nav.subItems.map((subItem) => (
                                    <li key={subItem.name}>
                                        <Link
                                            to={subItem.path}
                                            className={`menu-dropdown-item ${
                                                isActive(subItem.path)
                                                    ? 'menu-dropdown-item-active'
                                                    : 'menu-dropdown-item-inactive'
                                            }`}
                                        >
                                            {subItem.name}
                                            <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                            <span
                                className={`ml-auto ${
                                    isActive(subItem.path)
                                        ? 'menu-dropdown-badge-active'
                                        : 'menu-dropdown-badge-inactive'
                                } menu-dropdown-badge`}
                            >
                            new
                          </span>
                        )}
                      </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );

    return (
        <aside
            className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200
        ${isExpanded || isMobileOpen ? 'w-[290px]' : isHovered ? 'w-[290px]' : 'w-[90px]'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0`}
            onMouseEnter={() => !isExpanded && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`py-8 flex ${!isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'}`}
            >
                <a href="/">
                    {isExpanded || isHovered || isMobileOpen ? (
                        <>
                            <img
                                src={LogoLight}
                                className="dark:hidden w-[175px]"
                                alt="Logo" />
                            <img
                                src={LogoDark}
                                // width={154}
                                // height={32}
                                className="hidden dark:block w-[175px]"
                                alt="Logo"
                            />
                        </>
                    ) : (
                        <img src={LogoIcon} width={32} height={32} alt="Logo" />
                    )}
                </a>
            </div>
            <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
                <nav className="mb-6">
                    <div className="flex flex-col gap-4">
                        <div>
                            <h2
                                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                                    !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'
                                }`}
                            >
                                {isExpanded || isHovered || isMobileOpen ? (
                                    'Menu'
                                ) : (
                                    <HorizontaLDots className="size-6" />
                                )}
                            </h2>
                            {isMenuItemsLoading ? (
                                <div
                                    className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-gray-900/60 rounded-3xl">
                                    <Loading />
                                </div>
                            ) : (
                                renderMenuItems(navItems, 'main')
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default AppSidebar;
