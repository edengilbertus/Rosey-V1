
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { CollectionPage } from './pages/CollectionPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartProvider } from './contexts/CartContext';

const NotFoundPage = () => (
  <div className="text-center py-40">
    <h1 className="text-4xl font-serif mb-4">404 - Page Not Found</h1>
    <a href="#/" className="text-brand-tan hover:underline">Go to Homepage</a>
  </div>
);

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
      </div>
    </CartProvider>
  );
}

export default App;
