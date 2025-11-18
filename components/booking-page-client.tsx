
"use client";

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { BookingForm } from '@/components/booking-form';

export function BookingPageClient() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-derly-brown-dark to-derly-brown text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-playfair">Book Your Appointment</h1>
            <p className="text-xl text-derly-beige max-w-3xl mx-auto">
              Schedule your transformation with Derly - Montreal's premier Latina barber
            </p>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <BookingForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
