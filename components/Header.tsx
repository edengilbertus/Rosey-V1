
import React from 'react';
import { SearchIcon } from './icons/SearchIcon';
import { MailIcon } from './icons/MailIcon';
import { LoginIcon } from './icons/LoginIcon';
import { CartIcon } from './icons/CartIcon';
import { useCart } from '../contexts/CartContext';

export const Header: React.FC = () => {
  const { cartItemCount } = useCart();
  
  const navLinks = [
    { name: 'Home', href: '#/' },
    { name: 'Collection', href: '#/collection' },
    { name: 'Contact', href: '#/contact' },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-20 py-6 px-12 text-brand-charcoal bg-brand-cream/80 backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#/" className="flex items-center gap-4" aria-label="Go to Homepage">
          <div className="w-4 h-4 rounded-full bg-brand-gray"></div>
          <div className="w-4 h-4 rounded-full bg-brand-yellow"></div>
          <div className="w-4 h-4 rounded-full bg-brand-tan"></div>
        </a>
        <div className="flex-1 flex justify-center items-center gap-16">
          <a href="#/" className="text-4xl font-serif tracking-[0.3em] font-medium">ROSEY GEMS</a>
          <nav className="hidden md:flex items-center gap-10 text-lg font-sans">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="hover:text-brand-tan transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-6">
            <SearchIcon className="cursor-pointer hover:text-brand-tan transition-colors" />
            <a href="#/cart" className="relative" aria-label={`View shopping cart with ${cartItemCount} items`}>
              <CartIcon className="cursor-pointer hover:text-brand-tan transition-colors" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-brand-yellow text-brand-charcoal text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </a>
            <LoginIcon className="cursor-pointer hover:text-brand-tan transition-colors" />
          </div>
          <a 
            href="#/contact"
            className="bg-brand-tan text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity font-sans text-lg"
          >
            Contact us
          </a>
        </div>
      </div>
    </header>
  );
};
