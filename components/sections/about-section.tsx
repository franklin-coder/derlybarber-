
"use client";

import { useSafeLanguage } from '@/lib/safe-language-context';
import { Button } from '@/components/ui/button';
import { Check, Globe, Heart, Scissors, Star, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function AboutSection() {
  const { t } = useSafeLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const features = [
    {
      icon: Globe,
      title: "Multilingual Service",
      description: "Spanish • French • English"
    },
    {
      icon: Heart,
      title: "Personal Touch",
      description: "Conversations & connections"
    },
    {
      icon: Scissors,
      title: "Professional Excellence",
      description: "Precision cuts & styling"
    },
    {
      icon: Star,
      title: "Premium Experience",
      description: "Hot towel & ready-to-go styling"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-derly-beige-light to-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://cdn.abacus.ai/images/9d6f492b-6e2c-4b74-b6ce-5f8adc46ebe2.png"
                  alt="Derly - Professional Latina barber in Montreal"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl border border-derly-beige">
                <div className="text-center">
                  <div className="text-3xl font-bold text-derly-brown-dark mb-1">5+</div>
                  <div className="text-sm text-gray-600">Years of Experience</div>
                </div>
                <div className="border-t border-gray-200 my-3"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-derly-brown-dark mb-1">100%</div>
                  <div className="text-sm text-gray-600">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:pl-8"
          >
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-playfair">
                {t('aboutTitle')}
              </h2>
              <p className="text-xl text-derly-brown-dark font-medium mb-6">
                {t('aboutSubtitle')}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('aboutText')}
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="flex items-start space-x-4 p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-derly-brown-light to-derly-brown-dark rounded-lg flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Features List */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What Makes Derly Different:</h3>
              <ul className="space-y-3">
                {[
                  "Multilingual service (ES/FR/EN)",
                  "Personalized consultations",
                  "Premium hot towel experience", 
                  "Ready-to-go styling",
                  "Professional advice"
                ].map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="flex items-center"
                  >
                    <Check className="w-5 h-5 text-derly-brown-dark mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/booking">
                <Button size="lg" className="bg-derly-brown-dark hover:bg-derly-brown text-white shadow-lg shadow-derly-brown-dark/25">
                  Book Your Appointment
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-derly-brown-dark text-derly-brown-dark hover:bg-derly-beige-light">
                  Get In Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
