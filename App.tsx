import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { CollectionPage } from './pages/CollectionPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CartProvider, useCart } from './contexts/CartContext';
import { CartIcon } from './components/icons/CartIcon';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

const NotFoundPage = () => (
  <div className="text-center py-40">
    <h1 className="text-4xl font-serif mb-4">404 - Page Not Found</h1>
    <a href="#/" className="text-brand-tan hover:underline">Go to Homepage</a>
  </div>
);

// Floating Cart Icon Component
const FloatingCartIcon: React.FC = () => {
  const { cartItemCount } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (cartItemCount > 0) {
      setIsVisible(true);
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartItemCount]);

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${isAnimating ? 'animate-bounce' : ''}`}>
      <a 
        href="#/cart" 
        className="bg-brand-tan text-white p-4 rounded-full shadow-lg hover:bg-brand-charcoal transition-all duration-300 flex items-center justify-center relative"
        aria-label={`View shopping cart with ${cartItemCount} items`}
      >
        <CartIcon className="w-6 h-6" />
        {cartItemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-brand-yellow text-brand-charcoal text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
            {cartItemCount}
          </span>
        )}
      </a>
    </div>
  );
};

const Router = () => {
  const [route, setRoute] = useState(window.location.hash);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is admin
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
    
    // If user is already logged in as admin and trying to access login page, redirect to dashboard
    if (adminStatus && window.location.hash === '#/admin/login') {
      window.location.hash = '#/admin/dashboard';
    }
  }, []);

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

  // Handle admin routes
  if (route.startsWith('#/admin')) {
    if (!isAdmin && route !== '#/admin/login') {
      window.location.hash = '#/admin/login';
      return null;
    }
    
    switch (route) {
      case '#/admin/login':
        return <AdminLogin onLogin={() => setIsAdmin(true)} />;
      case '#/admin':
      case '#/admin/dashboard':
        return <AdminDashboard onLogout={() => {
          localStorage.removeItem('isAdmin');
          setIsAdmin(false);
          window.location.hash = '#/admin/login';
        }} />;
      default:
        return <NotFoundPage />;
    }
  }

  if (route.startsWith('#/products/')) {
    const id = parseInt(route.replace('#/products/', ''), 10);
    if (!isNaN(id)) {
      return <ProductDetailPage productId={id} />;
    }
    return <NotFoundPage />;
  }
  
  switch (route) {
    case '#/collection':
      return <CollectionPage />;
    case '#/contact':
      return <ContactPage />;
    case '#/cart':
      return <CartPage />;
    case '#/checkout':
      return <CheckoutPage />;
    case '#/':
    case '':
      return <HomePage />;
    default:
      return <NotFoundPage />;
  }
}

function App() {
  return (
    <CartProvider>
      <div className="bg-brand-cream min-h-screen">
        <Header />
        <main>
          <Router />
        </main>
        <FloatingCartIcon />
      </div>
    </CartProvider>
  );
}

export default App;