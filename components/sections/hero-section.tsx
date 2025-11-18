
"use client";

import { useSafeLanguage } from '@/lib/safe-language-context';
import { Button } from '@/components/ui/button';
import { Calendar, Star, Scissors } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function HeroSection() {
  const { t } = useSafeLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-derly-brown">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold font-playfair">Derly</h1>
          <p className="text-xl text-derly-beige mt-2">Barbería Latina</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <Image
            src="https://cdn.abacus.ai/images/348137fd-2a22-45e5-832a-a9c9229f80d2.png"
            alt="Female barber cutting client's hair - Professional barbershop"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-derly-brown/30" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Logo */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative w-16 h-16">
                  <Image
                    src="https://cdn.abacus.ai/images/ba61d56d-233b-4930-a18b-edb766c98798.png"
                    alt="Derly Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="text-white">
                  <h1 className="font-playfair text-4xl font-bold">Derly</h1>
                  <p className="text-derly-beige text-lg -mt-2">Barbería Latina</p>
                </div>
              </div>

              {/* Main Heading */}
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                <span className="block">{t('heroTitle').split(' ').slice(0, 2).join(' ')}</span>
                <span className="block text-derly-brown-light">
                  {t('heroTitle').split(' ').slice(2).join(' ')}
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
                {t('heroSubtitle')}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center text-white">
                  <Scissors className="w-5 h-5 text-derly-brown-light mr-2" />
                  <span className="text-sm font-medium">Precision Cuts</span>
                </div>
                <div className="flex items-center text-white">
                  <Star className="w-5 h-5 text-derly-brown-light mr-2" />
                  <span className="text-sm font-medium">Premium Experience</span>
                </div>
                <div className="flex items-center text-white">
                  <div className="w-5 h-5 text-derly-brown-light mr-2 flex items-center justify-center">
                    <span className="text-xs font-bold">3</span>
                  </div>
                  <span className="text-sm font-medium">Languages: EN/ES/FR</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/booking">
                  <Button size="lg" className="bg-derly-brown-dark hover:bg-derly-brown text-white shadow-lg shadow-derly-brown-dark/25 gap-3 text-lg px-8 py-4">
                    <Calendar className="w-5 h-5" />
                    {t('heroButton')}
                  </Button>
                </Link>
                <Link href="/#about">
                  <Button size="lg" variant="outline" className="border-white bg-white text-black hover:bg-gray-100 hover:text-black text-lg px-8 py-4">
                    {t('about')} Derly
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Stats */}
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute bottom-8 right-8 hidden lg:block"
      >
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-white">
          <div className="text-center">
            <div className="text-3xl font-bold text-derly-brown-light">5+</div>
            <div className="text-sm">Years Experience</div>
          </div>
          <div className="border-t border-white/20 my-3"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-derly-brown-light">3</div>
            <div className="text-sm">Languages</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
