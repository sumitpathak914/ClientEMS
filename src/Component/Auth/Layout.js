import React from 'react';

import { Outlet } from 'react-router-dom';
import SidebarComponent from './sidebar';

const Layout = () => {
    return (
        <div className="flex">
            {/* Sidebar */}
            <SidebarComponent />
            {/* Main Content */}
            <div className="flex-1 min-h-screen p-6 bg-gray-100">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
