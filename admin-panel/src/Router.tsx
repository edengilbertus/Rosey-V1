import React, { useState, useEffect } from 'react';
import { AdminDashboardPage } from './components/AdminDashboardPage';
import { AdminProductsPage } from './components/AdminProductsPage';
import { AdminOrdersPage } from './components/AdminOrdersPage';
import { AdminLoginPage } from './components/AdminLoginPage';

const NotFoundPage = () => (
  <div className="text-center py-20">
    <h1 className="text-3xl font-serif mb-4">404 - Page Not Found</h1>
    <a href="#/" className="text-brand-tan hover:underline">Go to Admin Dashboard</a>
  </div>
);

export const Router = () => {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Check if user is trying to access admin routes
  const isAdminRoute = route.startsWith('#/admin');
  const isLoggedIn = true; // In a real app, this would check actual authentication state

  // Redirect to login if trying to access admin pages without being logged in
  if (isAdminRoute && route !== '#/admin/login' && !isLoggedIn) {
    window.location.hash = '#/admin/login';
    return null;
  }

  switch (route) {
    case '#/admin':
      return <AdminDashboardPage />;
    case '#/admin/products':
      return <AdminProductsPage />;
    case '#/admin/orders':
      return <AdminOrdersPage />;
    case '#/admin/login':
      return <AdminLoginPage />;
    case '#/':
    case '':
      return <AdminDashboardPage />;
    default:
      return <NotFoundPage />;
  }
};