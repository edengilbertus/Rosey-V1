import React, { useState } from 'react';
import { Squiggle } from '../components/Squiggle';

export const ContactPage = () => {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      // Combine all information into the message
      const fullMessage = `Name: ${name || 'Not provided'}\nEmail: ${email || 'Not provided'}\n\nMessage:\n${message}`;
      const phoneNumber = '+256778701307';
      const encodedMessage = encodeURIComponent(fullMessage);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
      // Reset form
      setMessage('');
      setName('');
      setEmail('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSendMessage();
    }
  };

  return (
    <div className="bg-brand-cream py-24 px-12 pt-40">
      <div className="container mx-auto">
        <h1 className="font-serif text-5xl text-brand-charcoal mb-4 text-center">Contact Us</h1>
        <p className="font-sans text-lg text-gray-500 mb-12 text-center max-w-2xl mx-auto">
          We'd love to hear from you! Reach out to us with any questions or inquiries.
        </p>
        
        <div className="bg-brand-peach w-full max-w-6xl p-8 mx-auto rounded-lg">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Contact Form */}
            <div className="w-full lg:w-1/2">
              <h2 className="font-serif text-3xl text-brand-charcoal mb-6">Send us a Message</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-lg font-sans text-brand-charcoal mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-charcoal focus:border-transparent"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-lg font-sans text-brand-charcoal mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-charcoal focus:border-transparent"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-lg font-sans text-brand-charcoal mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-charcoal focus:border-transparent"
                    placeholder="Type your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                </div>
                
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
                <p className="text-sm text-gray-600">
                  Press Ctrl+Enter (Cmd+Enter on Mac) to send
                </p>
              </div>
            </div>
            
            {/* Contact Information and Map */}
            <div className="w-full lg:w-1/2">
              <h2 className="font-serif text-3xl text-brand-charcoal mb-6">Contact Information</h2>
              
              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="font-serif text-2xl text-brand-charcoal mb-3">Phone Numbers</h3>
                  <p className="font-sans text-lg">
                    Main: <a href="tel:+256778701307" className="text-brand-charcoal underline">+256 778 701307</a>
                  </p>
                  <p className="font-sans text-lg mt-2">
                    WhatsApp: <a href="https://wa.me/256778701307" className="text-brand-charcoal underline">+256 778 701307</a>
                  </p>
                  <p className="font-sans text-lg mt-2">
                    Alternative: <a href="tel:+256726408312" className="text-brand-charcoal underline">+256 726 408312</a>
                  </p>
                </div>
                
                <div>
                  <h3 className="font-serif text-2xl text-brand-charcoal mb-3">Location</h3>
                  <p className="font-sans text-lg">
                    Maricah Centrum, Wandegeya
                  </p>
                  <p className="font-sans text-lg mt-2">
                    Kampala, Uganda
                  </p>
                </div>
              </div>
              
              {/* Google Maps Embed */}
              <h3 className="font-serif text-2xl text-brand-charcoal mb-4">Find Us on Map</h3>
              <div className="bg-white rounded-lg overflow-hidden shadow-lg h-80">
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
      </div>
      
      {/* Decorative Elements */}
      <Squiggle className="absolute bottom-0 -left-10" />
      <Squiggle className="absolute top-0 -right-20 transform scale-x-[-1]" />
    </div>
  );
};