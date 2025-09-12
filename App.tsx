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
// Admin components
import { AuthProvider } from './hooks/useAuth';
import { AdminLayout } from './components/Admin/AdminLayout';
import { LoginPage } from './pages/Admin/LoginPage';
import { AdminDashboard } from './pages/Admin/AdminDashboard';
import { ProductsPage } from './pages/Admin/ProductsPage';
import { OrdersPage } from './pages/Admin/OrdersPage';

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

  // Admin routes
  if (route.startsWith('#/admin')) {
    const adminRoute = route.replace('#/admin', '');
    
    switch (adminRoute) {
      case '':
      case '/':
        return (
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        );
      case '/products':
        return (
          <AdminLayout>
            <ProductsPage />
          </AdminLayout>
        );
      case '/orders':
        return (
          <AdminLayout>
            <OrdersPage />
          </AdminLayout>
        );
      case '/login':
        return <LoginPage />;
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
    <AuthProvider>
      <CartProvider>
        <div className="bg-brand-cream min-h-screen">
          {!window.location.hash.startsWith('#/admin') && <Header />}
          <main>
            <Router />
          </main>
          {!window.location.hash.startsWith('#/admin') && <FloatingCartIcon />}
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;