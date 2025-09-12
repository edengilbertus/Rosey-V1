import React, { useState, useEffect, useRef, forwardRef } from 'react';

const HighlightCard: React.FC<{ imageUrl: string, alt: string }> = ({ imageUrl, alt }) => (
  <div className="p-3 bg-brand-yellow rounded-t-[150px] rounded-b-3xl">
    <div className="w-64 h-80 bg-white rounded-t-[150px] rounded-b-3xl overflow-hidden">
      <img src={imageUrl} alt={alt} className="w-full h-full object-cover" />
    </div>
  </div>
);

export const CollectionHighlight = forwardRef<HTMLElement, {}>((props, forwardedRef) => {
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
      className={`bg-brand-peach py-24 px-12 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-16">
        <div className="flex flex-wrap justify-center gap-8">
          <HighlightCard imageUrl="https://images.unsplash.com/photo-1611591437281-462bf4a281a2?q=80&w=400" alt="Gold necklace" />
          <HighlightCard imageUrl="https://images.unsplash.com/photo-1593452449079-479b1834220b?q=80&w=400" alt="Assortment of rings" />
          <HighlightCard imageUrl="https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=400" alt="Pendant necklace" />
        </div>
        <div className="text-center md:text-left max-w-sm">
          <h2 className="font-serif text-6xl text-brand-charcoal tracking-[0.2em] mb-4">YOU ORDER WE CUSTOMIZE</h2>
          <p className="font-serif text-3xl text-brand-charcoal leading-relaxed">
            Sparkle up your style with a piece of jewelery from rosey gems
          </p>
        </div>
      </div>
    </section>
  );
});
