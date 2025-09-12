import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { BEST_SELLER_PRODUCTS } from '../constants';
import { ProductCard } from './ProductCard';

export const BestSeller = forwardRef<HTMLElement, {}>((props, forwardedRef) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const setRefs = (el: HTMLElement | null) => {
    sectionRef.current = el;
    if (typeof forwardedRef === 'function') {
      forwardedRef(el);
    } else if (forwardedRef) {
      forwardedRef.current = el;
    }
  };

  return (
    <section 
      ref={setRefs}
      className={`bg-brand-cream py-24 px-12 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-baseline mb-12">
          <h2 className="font-serif text-5xl text-brand-charcoal">Best Seller</h2>
          <a href="#" className="font-serif text-2xl text-gray-500 hover:text-brand-tan transition-colors">
            See More
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {BEST_SELLER_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
});
