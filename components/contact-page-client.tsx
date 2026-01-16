
"use client";

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { ContactForm } from '@/components/contact-form';
import { MapPin, Phone, Mail, Clock, Globe } from 'lucide-react';

export function ContactPageClient() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-derly-brown-dark to-derly-brown text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-playfair">Get In Touch</h1>
            <p className="text-xl text-derly-beige max-w-3xl mx-auto">
              Ready for your transformation? Let's connect and schedule your appointment
            </p>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 font-playfair">
                    Let's Start Your Hair Journey
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    Whether you need a precision cut, beard shaping, or styling for a special event, 
                    I'm here to help you look and feel your best. Reach out in your preferred language!
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-derly-beige rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-derly-brown-dark" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                      <p className="text-gray-600">Montreal, Quebec, Canada</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-derly-beige rounded-lg flex items-center justify-center">
                        <Phone className="w-5 h-5 text-derly-brown-dark" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
                      <a 
                        href="https://wa.me/1514467259" 
                        className="text-derly-brown-dark hover:text-derly-brown transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        +1 514467259
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-derly-beige rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-derly-brown-dark" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <a 
                        href="mailto:derllybarber@gmail.com" 
                        className="text-derly-brown-dark hover:text-derly-brown transition-colors"
                      >
                        derllybarber@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-derly-beige rounded-lg flex items-center justify-center">
                        <Clock className="w-5 h-5 text-derly-brown-dark" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Hours</h3>
                      <p className="text-gray-600">Flexible schedule - by appointment</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-derly-beige rounded-lg flex items-center justify-center">
                        <Globe className="w-5 h-5 text-derly-brown-dark" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Languages</h3>
                      <p className="text-gray-600">English • Spanish • French</p>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <a 
                      href="/booking" 
                      className="block w-full bg-derly-brown-dark hover:bg-derly-brown text-white py-3 px-4 rounded-lg text-center font-medium transition-colors"
                    >
                      Book Appointment Online
                    </a>
                    <a 
                      href="https://wa.me/1514467259" 
                      className="block w-full border border-derly-brown-dark text-derly-brown-dark hover:bg-derly-beige-light py-3 px-4 rounded-lg text-center font-medium transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
