import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { CartIcon } from '../components/icons/CartIcon';

export const CartPage = () => {
  const { cart, cartItemCount, removeFromCart, updateQuantity } = useCart();
  const [removingItemId, setRemovingItemId] = useState<number | null>(null);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const handleRemoveItem = (productId: number) => {
    setRemovingItemId(productId);
    setTimeout(() => {
      removeFromCart(productId);
      setRemovingItemId(null);
    }, 300);
  };

  const handleQuantityChange = (productId: number, change: number) => {
    const item = cart.find(item => item.product.id === productId);
    if (item) {
      const newQuantity = item.quantity + change;
      updateQuantity(productId, newQuantity);
    }
  };

  if (cartItemCount === 0) {
    return (
      <div className="bg-brand-cream py-24 px-12 pt-40">
        <div className="container mx-auto text-center">
          <CartIcon className="w-16 h-16 mx-auto text-brand-charcoal mb-6" />
          <h1 className="font-serif text-4xl text-brand-charcoal mb-4">Your Cart is Empty</h1>
          <p className="font-sans text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
            You haven't added any items to your cart yet. Browse our collection and find something beautiful!
          </p>
          <a 
            href="#/collection" 
            className="bg-brand-tan text-white px-8 py-3 rounded-lg hover:bg-brand-charcoal transition-colors font-sans text-lg inline-block"
          >
            Browse Collection
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-cream py-24 px-12 pt-40">
      <div className="container mx-auto">
        <h1 className="font-serif text-4xl text-brand-charcoal mb-8">Your Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {cart.map((item) => (
                <div 
                  key={item.product.id} 
                  className={`flex flex-col sm:flex-row items-center p-6 border-b border-gray-200 last:border-b-0 transition-all duration-300 ${
                    removingItemId === item.product.id ? 'opacity-0 max-h-0 overflow-hidden' : 'opacity-100 max-h-96'
                  }`}
                >
                  <div className="w-32 h-32 mb-4 sm:mb-0 sm:mr-6">
                    <img 
                      src={item.product.imageUrls[0]} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="font-serif text-xl text-brand-charcoal mb-2">{item.product.name}</h2>
                    <p className="font-sans text-gray-600 mb-4 line-clamp-2">{item.product.description}</p>
                    <div className="flex flex-col sm:flex-row items-center justify-between">
                      <div className="flex items-center mb-4 sm:mb-0">
                        <span className="font-sans text-lg text-brand-charcoal font-medium">
                          UGX {(item.product.price * item.quantity).toLocaleString()}
                        </span>
                        <span className="mx-4 text-gray-400">|</span>
                        <div className="flex items-center">
                          <button 
                            onClick={() => handleQuantityChange(item.product.id, -1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-l hover:bg-gray-300 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="w-12 h-8 flex items-center justify-center bg-gray-100">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => handleQuantityChange(item.product.id, 1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-r hover:bg-gray-300 transition-colors"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-sans text-lg text-brand-charcoal">
                          UGX {item.product.price.toLocaleString()} each
                        </span>
                        <button 
                          onClick={() => handleRemoveItem(item.product.id)}
                          className="text-red-500 hover:text-red-700 transition-colors font-sans"
                          aria-label={`Remove ${item.product.name} from cart`}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="w-full lg:w-96">
            <div className="bg-brand-peach p-6 rounded-lg shadow-md">
              <h2 className="font-serif text-2xl text-brand-charcoal mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-sans text-gray-600">Subtotal</span>
                  <span className="font-sans text-brand-charcoal">UGX {calculateTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sans text-gray-600">Shipping</span>
                  <span className="font-sans text-brand-charcoal">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sans text-gray-600">Tax</span>
                  <span className="font-sans text-brand-charcoal">UGX 0</span>
                </div>
                <div className="border-t border-gray-300 pt-4">
                  <div className="flex justify-between">
                    <span className="font-serif text-xl text-brand-charcoal">Total</span>
                    <span className="font-serif text-xl text-brand-charcoal">UGX {calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-brand-charcoal text-white py-3 rounded-lg font-sans text-lg hover:bg-gray-800 transition-colors">
                Proceed to Checkout
              </button>
              
              <a 
                href="#/collection" 
                className="block text-center mt-4 text-brand-charcoal hover:text-brand-tan transition-colors font-sans"
              >
                Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};