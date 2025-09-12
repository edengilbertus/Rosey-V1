import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { Squiggle } from './Squiggle';

export const ContactSection = forwardRef<HTMLElement, {}>((props, forwardedRef) => {
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
      className={`bg-brand-cream py-24 px-12 relative overflow-hidden transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
    >
        <Squiggle className="absolute bottom-0 -left-10" />
        <Squiggle className="absolute top-0 -right-20 transform scale-x-[-1]" />
      <div className="container mx-auto flex justify-center">
        <div className="bg-brand-peach w-full max-w-6xl p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="p-3 bg-brand-yellow rounded-t-[200px] rounded-b-3xl">
                <div className="w-80 h-96 rounded-t-[200px] rounded-b-3xl overflow-hidden">
                    <img 
                        src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=400"
                        alt="Woman wearing a silver necklace"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left gap-6">
            <h2 className="font-serif text-5xl text-brand-charcoal">Contact Us</h2>
            <p className="font-serif text-2xl text-brand-charcoal max-w-md">
              Sparkle up your style with a piece of jewelery from the glam collection
            </p>
            <button className="bg-brand-cream text-brand-charcoal px-8 py-3 rounded-lg hover:bg-white transition-colors font-sans text-lg mt-4">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});
