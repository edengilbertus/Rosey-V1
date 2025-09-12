
import React from 'react';
import type { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <a href={`#/products/${product.id}`} className="block text-center font-serif text-brand-charcoal group">
      <div className="bg-gray-100 overflow-hidden mb-3 aspect-square">
        <img src={product.imageUrls[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <h3 className="text-lg">{product.name}</h3>
      <p className="text-md text-gray-500">${product.price.toFixed(2)}</p>
      <button 
        onClick={handleAddToCart}
        className="mt-2 bg-brand-tan text-white px-4 py-1 rounded-md text-sm font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-label={`Add ${product.name} to cart`}
      >
        Add to Cart
      </button>
    </a>
  );
};
