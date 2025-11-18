
"use client";

import { useSafeLanguage } from '@/lib/safe-language-context';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function TestimonialsSection() {
  const { t } = useSafeLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const testimonials = [
    {
      name: "François Dubois",
      role: "Real Estate Agent",
      content: t('testimonial1'),
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Carlos Martinez",
      role: "Business Owner",
      content: t('testimonial2'),
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Jean-Pierre Laval",
      role: "Financial Advisor",
      content: t('testimonial3'),
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-playfair">
            {t('testimonialsTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real experiences from Montreal professionals who trust Derly
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-derly-brown-light to-derly-brown-dark mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="h-full bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-0">
                <CardContent className="p-8 h-full flex flex-col">
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <Quote className="w-8 h-8 text-derly-brown-light transform rotate-180" />
                  </div>

                  {/* Rating */}
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-gray-700 italic text-lg leading-relaxed mb-6 flex-grow">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center">
                    <div className="relative w-12 h-12 mr-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-derly-brown-dark">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-3xl font-bold text-derly-brown-dark mb-2">500+</div>
            <div className="text-gray-600 font-medium">Happy Clients</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-3xl font-bold text-derly-brown-dark mb-2">5★</div>
            <div className="text-gray-600 font-medium">Average Rating</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-3xl font-bold text-derly-brown-dark mb-2">3</div>
            <div className="text-gray-600 font-medium">Languages Spoken</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-3xl font-bold text-derly-brown-dark mb-2">5+</div>
            <div className="text-gray-600 font-medium">Years Experience</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
