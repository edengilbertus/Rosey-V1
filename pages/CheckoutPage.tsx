import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { supabase } from '../supabaseClient';

export const CheckoutPage = () => {
  const { cart, cartItemCount, removeFromCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create order object
    const order = {
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      customer_location: formData.location,
      items: cart.map(item => ({
        product_id: item.product.id,
        product_name: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      })),
      total_amount: calculateTotal(),
      status: 'pending',
      created_at: new Date().toISOString()
    };

    try {
      // Format order items for the message
      const itemsList = order.items.map((item: any) => 
        `${item.product_name} (x${item.quantity}) - UGX ${(item.price * item.quantity).toLocaleString()}`
      ).join('\n');
      
      const message = `*New Order Request*

Customer: ${order.customer_name}
Email: ${order.customer_email}
Phone: ${order.customer_phone}
Location: ${order.customer_location}

*Order Items:*
${itemsList}

*Total Amount:* UGX ${order.total_amount.toLocaleString()}

Please confirm this order.`;
      
      const encodedMessage = encodeURIComponent(message);
      const phoneNumber = '256726408312'; // Owner's WhatsApp number
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      
      // Redirect to WhatsApp with pre-filled message
      window.location.href = whatsappUrl;
      
      // Clear cart after redirecting to WhatsApp
      cart.forEach(item => removeFromCart(item.product.id));
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error preparing order:', error);
      alert('There was an error preparing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-brand-cream py-24 px-12 pt-40">
        <div className="container mx-auto text-center">
          <h1 className="font-serif text-4xl text-brand-charcoal mb-4">Order Placed Successfully!</h1>
          <p className="font-sans text-lg text-gray-600 mb-8">
            Thank you for your order. We'll contact you soon to confirm the details.
          </p>
          <a 
            href="#/" 
            className="bg-brand-tan text-white px-8 py-3 rounded-lg hover:bg-brand-charcoal transition-colors font-sans text-lg inline-block"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  if (cartItemCount === 0) {
    return (
      <div className="bg-brand-cream py-24 px-12 pt-40">
        <div className="container mx-auto text-center">
          <h1 className="font-serif text-4xl text-brand-charcoal mb-4">Your Cart is Empty</h1>
          <p className="font-sans text-lg text-gray-600 mb-8">
            You need to add items to your cart before checking out.
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
        <h1 className="font-serif text-4xl text-brand-charcoal mb-8">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="font-serif text-2xl text-brand-charcoal mb-6">Customer Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-lg font-sans text-brand-charcoal mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-charcoal focus:border-transparent"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-lg font-sans text-brand-charcoal mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-charcoal focus:border-transparent"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-lg font-sans text-brand-charcoal mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-charcoal focus:border-transparent"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-lg font-sans text-brand-charcoal mb-2">
                    Delivery Location *
                  </label>
                  <textarea
                    id="location"
                    name="location"
                    required
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-charcoal focus:border-transparent"
                    placeholder="Enter your full delivery address"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`mt-8 w-full bg-brand-charcoal text-white py-3 rounded-lg font-sans text-lg hover:bg-gray-800 transition-colors ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Redirecting to WhatsApp...' : 'Place Order'}
              </button>
            </form>
          </div>
          
          {/* Order Summary */}
          <div className="w-full lg:w-96">
            <div className="bg-brand-peach p-6 rounded-lg shadow-md">
              <h2 className="font-serif text-2xl text-brand-charcoal mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex justify-between">
                    <span className="font-sans text-gray-600">
                      {item.product.name} (x{item.quantity})
                    </span>
                    <span className="font-sans text-brand-charcoal">
                      UGX {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
                
                <div className="border-t border-gray-300 pt-4">
                  <div className="flex justify-between">
                    <span className="font-serif text-xl text-brand-charcoal">Total</span>
                    <span className="font-serif text-xl text-brand-charcoal">
                      UGX {calculateTotal().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};