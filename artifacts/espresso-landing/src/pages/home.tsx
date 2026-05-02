import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { MultiSend } from '@/components/MultiSend';
import { HowItWorks } from '@/components/HowItWorks';
import { Screenshots } from '@/components/Screenshots';
import { BusinessCallout } from '@/components/BusinessCallout';
import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <MultiSend />
        <HowItWorks />
        <Screenshots />
        <BusinessCallout />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
