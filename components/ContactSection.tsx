import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { Squiggle } from './Squiggle';

export const ContactSection = forwardRef<HTMLElement, {}>((props, forwardedRef) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
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

  const handleSendMessage = () => {
    if (message.trim()) {
      const phoneNumber = '+256778701307';
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSendMessage();
    }
  };

  return (
    <section 
      ref={setRefs}
      className={`bg-brand-cream py-24 px-12 relative overflow-hidden transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
    >
      <Squiggle className="absolute bottom-0 -left-10" />
      <Squiggle className="absolute top-0 -right-20 transform scale-x-[-1]" />
      
      <div className="container mx-auto">
        <h2 className="font-serif text-5xl text-brand-charcoal text-center mb-12">Contact Us</h2>
        
        <div className="bg-brand-peach w-full max-w-6xl p-8 mx-auto flex flex-col lg:flex-row items-center gap-8">
          {/* Contact Form and Info */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <h3 className="font-serif text-3xl text-brand-charcoal">Get in Touch</h3>
            <p className="font-serif text-xl text-brand-charcoal">
              Have questions or want to know more about our jewelry collection? Reach out to us!
            </p>
            
            {/* WhatsApp Message Form */}
            <div className="mt-4">
              <label htmlFor="message" className="block text-lg font-sans text-brand-charcoal mb-2">
                Send us a message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-charcoal focus:border-transparent"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className={`mt-3 bg-brand-charcoal text-white px-6 py-3 rounded-lg font-sans text-lg transition-colors ${
                  message.trim() 
                    ? 'hover:bg-gray-800 cursor-pointer' 
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                Send Message via WhatsApp
              </button>
              <p className="mt-2 text-sm text-gray-600">
                Press Ctrl+Enter (Cmd+Enter on Mac) to send
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="mt-6">
              <h4 className="font-serif text-2xl text-brand-charcoal mb-3">Contact Information</h4>
              <p className="font-sans text-lg">
                Phone: <a href="tel:+256778701307" className="text-brand-charcoal underline">+256 778 701307</a>
              </p>
              <p className="font-sans text-lg mt-2">
                Location: Maricah Centrum, Wandegeya
              </p>
            </div>
          </div>
          
          {/* Google Maps Embed */}
          <div className="w-full lg:w-1/2">
            <h3 className="font-serif text-3xl text-brand-charcoal mb-4 text-center">Visit Our Store</h3>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.754709200008!2d32.57595331475304!3d0.3475249997567089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19d3b0d9d0d0d0d1%3A0x19d3b0d9d0d0d0d1!2sMaricah%20Centrum%2C%20Wandegeya!5e0!3m2!1sen!2sug!4v1666666666666!5m2!1sen!2sug"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Maricah Centrum, Wandegeya Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});