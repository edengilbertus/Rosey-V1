
import React, { useRef } from 'react';
import { Hero } from '../components/Hero';
import { CollectionHighlight } from '../components/CollectionHighlight';
import { BestSeller } from '../components/BestSeller';
import { ContactSection } from '../components/ContactSection';

export function HomePage() {
  const homeRef = useRef<HTMLElement>(null);
  const collectionRef = useRef<HTMLElement>(null);
  const shopRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  return (
    <>
      <Hero ref={homeRef} />
      <CollectionHighlight ref={collectionRef} />
      <BestSeller ref={shopRef} />
      <ContactSection ref={contactRef} />
    </>
  );
}
