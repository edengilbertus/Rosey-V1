import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { Product } from '../../types';
import { OrderList } from './OrderList';
import { ProductList } from './ProductList';
import { ProductForm } from './ProductForm';

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'add-product'>('orders');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // For now, we'll use the constants file as our data source
      // In a real implementation, this would come from Supabase
      const { CATALOGUE_PRODUCTS } = await import('../../constants');
      setProducts(CATALOGUE_PRODUCTS);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductUpdate = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleProductDelete = (productId: number) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleProductAdd = (newProduct: Product) => {
    setProducts([...products, newProduct]);
    setActiveTab('products');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-cream py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-brand-charcoal">Admin Dashboard</h1>
            <p className="mt-2 text-lg text-brand-charcoal">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Header */}
      <div className="bg-brand-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <button
              onClick={onLogout}
              className="bg-brand-tan hover:bg-brand-yellow text-brand-charcoal font-medium py-2 px-4 rounded-md transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('orders')}
              className={`${
                activeTab === 'orders'
                  ? 'border-brand-tan text-brand-tan'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`${
                activeTab === 'products'
                  ? 'border-brand-tan text-brand-tan'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab('add-product')}
              className={`${
                activeTab === 'add-product'
                  ? 'border-brand-tan text-brand-tan'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Add Product
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'orders' && <OrderList />}
        {activeTab === 'products' && (
          <ProductList 
            products={products} 
            onProductUpdate={handleProductUpdate}
            onProductDelete={handleProductDelete}
          />
        )}
        {activeTab === 'add-product' && (
          <ProductForm 
            onProductAdd={handleProductAdd}
            existingProducts={products}
          />
        )}
      </div>
    </div>
  );
};