
import React from 'react';
import { CATALOGUE_PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';

export const CollectionPage: React.FC = () => {
  return (
    <div className="bg-brand-cream py-24 px-12 pt-40">
      <div className="container mx-auto">
        <h1 className="font-serif text-5xl text-brand-charcoal mb-4 text-center">Our Collection</h1>
        <p className="font-sans text-lg text-gray-500 mb-12 text-center max-w-2xl mx-auto">
          Discover our curated selection of fine jewelry, crafted with passion and precision. Find the perfect piece to complement your style.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {CATALOGUE_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
