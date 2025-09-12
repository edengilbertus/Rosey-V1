
import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { PalmLeaf } from './PalmLeaf';

export const Hero = forwardRef<HTMLElement>((props, forwardedRef) => {
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
      className={`relative bg-brand-cream pt-48 pb-24 px-12 overflow-hidden transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
    >
      <PalmLeaf className="absolute -top-40 right-0 h-full w-auto z-0 text-brand-tan" />
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="text-center max-w-2xl">
          <h1 className="font-serif text-5xl md:text-7xl text-brand-charcoal mb-6 leading-tight">
            Exquisite Jewelry for the Modern Woman
          </h1>
          <p className="font-serif text-xl md:text-2xl text-gray-600 mb-8">
            Sparkle up your style with a piece of jewelery from rosey gems
          </p>
          <a 
            href="#/collection" 
            className="bg-brand-tan text-white px-8 py-4 rounded-lg hover:opacity-90 transition-opacity font-sans text-xl inline-block"
          >
            Shop Now
          </a>
        </div>
        <div className="relative h-[500px] hidden md:block">
          <div className="absolute top-0 left-0 w-[320px] h-[400px] p-2 bg-brand-yellow rounded-t-[160px] rounded-b-3xl">
             <img 
              src="https://images.unsplash.com/photo-1599354753554-7389a128e235?q=80&w=400" 
              alt="Diamond ring on white cloth" 
              className="w-full h-full object-cover rounded-t-[160px] rounded-b-3xl"
            />
          </div>
          <div className="absolute bottom-0 right-10 w-[300px] h-[300px] p-2 bg-brand-yellow rounded-b-[150px] rounded-t-3xl">
            <img 
              src="https://images.unsplash.com/photo-1627293589115-6430513c5166?q=80&w=400" 
              alt="Silver necklace on a woman's neck" 
              className="w-full h-full object-cover rounded-b-[150px] rounded-t-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
});
