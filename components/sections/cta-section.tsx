
"use client";

import { useSafeLanguage } from '@/lib/safe-language-context';
import { Button } from '@/components/ui/button';
import { Calendar, Phone, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function CTASection() {
  const { t } = useSafeLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 bg-gradient-to-br from-derly-brown-dark to-derly-brown text-white overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-32 translate-y-32"></div>
        </div>

        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
              Ready for Your Transformation?
            </h2>
            <p className="text-xl text-derly-beige mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience the difference of professional barbering with Latin warmth. 
              Book your appointment today and leave feeling confident and ready for anything.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            <Link href="/booking">
              <Button 
                size="lg" 
                className="bg-white text-derly-brown-dark hover:bg-derly-beige-light shadow-xl shadow-black/20 text-lg px-8 py-4"
              >
                <Calendar className="w-5 h-5 mr-2" />
                {t('book')} Now
              </Button>
            </Link>
            
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white bg-white text-derly-brown-dark hover:bg-derly-beige-light hover:text-derly-brown text-lg px-8 py-4"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Get In Touch
              </Button>
            </Link>

            <a 
              href="https://wa.me/1514467259" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white bg-white text-derly-brown-dark hover:bg-derly-beige-light hover:text-derly-brown text-lg px-8 py-4"
              >
                <Phone className="w-5 h-5 mr-2" />
                WhatsApp
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Calendar className="w-8 h-8 text-derly-beige-light mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Easy Booking</h3>
              <p className="text-derly-beige text-sm">
                Book online or via WhatsApp - flexible scheduling to fit your lifestyle
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <MessageCircle className="w-8 h-8 text-derly-beige-light mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Personal Service</h3>
              <p className="text-derly-beige text-sm">
                Multilingual service with the human touch you deserve
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <Phone className="w-8 h-8 text-derly-beige-light mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Always Available</h3>
              <p className="text-derly-beige text-sm">
                Flexible hours and responsive communication in 3 languages
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
