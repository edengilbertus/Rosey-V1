import React from 'react';
import { Link } from 'react-router-dom';

interface AdminSidebarProps {
  activePage: string;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activePage }) => {
  const navItems = [
    { name: 'Dashboard', path: '#/admin' },
    { name: 'Products', path: '#/admin/products' },
    { name: 'Orders', path: '#/admin/orders' },
  ];

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex flex-col flex-grow border-r border-gray-200 bg-white pt-5">
        <div className="flex items-center flex-shrink-0 px-4">
          <h1 className="text-2xl font-serif text-brand-charcoal">ROSEY GEMS Admin</h1>
        </div>
        
        <div className="mt-5 flex-grow flex flex-col">
          <nav className="flex-1 px-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className={`${
                  activePage === item.name.toLowerCase() 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};