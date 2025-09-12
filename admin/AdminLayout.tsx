import React from 'react';
import { AdminSidebar } from './AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
  activePage: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activePage }) => {
  const handleLogout = () => {
    // Simple logout - redirect to login page
    window.location.hash = '#/admin/login';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar activePage={activePage} />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow">
          <div className="px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 capitalize">{activePage}</h1>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-brand-charcoal hover:text-brand-tan"
            >
              Logout
            </button>
          </div>
        </header>
        
        <main className="flex-1">
          <div className="py-6">
            <div className="px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};