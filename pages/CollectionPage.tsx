import React, { useState, useMemo } from 'react';
import { CATALOGUE_PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';

export const CollectionPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return CATALOGUE_PRODUCTS;
    
    const term = searchTerm.toLowerCase();
    return CATALOGUE_PRODUCTS.filter(product => 
      product.name.toLowerCase().includes(term) || 
      product.description.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  return (
    <div className="bg-brand-cream py-24 px-12 pt-40">
      <div className="container mx-auto">
        <h1 className="font-serif text-5xl text-brand-charcoal mb-4 text-center">Our Collection</h1>
        <p className="font-sans text-lg text-gray-500 mb-12 text-center max-w-2xl mx-auto">
          Discover our curated selection of fine jewelry, crafted with passion and precision. Find the perfect piece to complement your style.
        </p>
        
        {/* Search Input */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-charcoal focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setSearchTerm('')}
              >
                Clear
              </button>
            )}
          </div>
          <p className="mt-2 text-sm text-gray-500 text-center">
            Showing {filteredProducts.length} of {CATALOGUE_PRODUCTS.length} products
          </p>
        </div>
        
        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="font-serif text-2xl text-brand-charcoal mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search term</p>
          </div>
        )}
      </div>
    </div>
  );
};