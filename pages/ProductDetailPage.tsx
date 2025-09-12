
import React, { useState, useEffect } from 'react';
import { CATALOGUE_PRODUCTS } from '../constants';
import { useCart } from '../contexts/CartContext';

interface ProductDetailPageProps {
  productId: number;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId }) => {
  const { addToCart } = useCart();
  const product = CATALOGUE_PRODUCTS.find(p => p.id === productId);
  
  const [selectedImage, setSelectedImage] = useState(product?.imageUrls[0] || '');

  useEffect(() => {
    if (product) {
      setSelectedImage(product.imageUrls[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="py-24 px-12 pt-40 text-center">
        <h1 className="text-3xl font-serif">Product not found</h1>
        <a href="#/collection" className="text-brand-tan hover:underline mt-4 inline-block">Back to Collection</a>
      </div>
    );
  }

  return (
    <div className="bg-brand-cream min-h-screen py-24 px-12 pt-40">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
        {/* Image Gallery */}
        <div>
          <div className="bg-gray-100 mb-4 h-[400px] md:h-[550px] flex items-center justify-center p-4">
            <img src={selectedImage} alt={product.name} className="max-w-full max-h-full object-contain" />
          </div>
          <div className="flex gap-4">
            {product.imageUrls.map((url, index) => (
              <div 
                key={index} 
                className={`w-24 h-24 bg-gray-100 cursor-pointer p-1 border-2 transition-colors ${selectedImage === url ? 'border-brand-tan' : 'border-transparent hover:border-brand-peach'}`}
                onClick={() => setSelectedImage(url)}
                onMouseOver={() => setSelectedImage(url)}
                aria-label={`View image ${index + 1} of ${product.name}`}
              >
                <img src={url} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="font-serif text-brand-charcoal pt-4">
          <h1 className="text-5xl lg:text-6xl mb-4">{product.name}</h1>
          <p className="text-3xl text-gray-600 mb-8">${product.price.toFixed(2)}</p>
          <div className="font-sans text-gray-600 text-lg leading-relaxed space-y-4">
            <p>{product.description}</p>
          </div>
          <button 
            onClick={() => addToCart(product)}
            className="mt-8 bg-brand-tan text-white px-10 py-3 rounded-lg hover:opacity-90 transition-opacity font-sans text-xl"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
