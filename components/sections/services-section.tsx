
"use client";

import { useSafeLanguage } from '@/lib/safe-language-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Scissors, Users, Sparkles, Calendar, Star, Droplets } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function ServicesSection() {
  const { t } = useSafeLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Adult Services
  const adultServices = [
    {
      icon: Scissors,
      title: t('traditionalCut'),
      description: t('traditionalCutDesc'),
      price: t('traditionalCutPrice') + " CAD + tax",
      image: "/gallery-haircut-1.jpeg"
    },
    {
      icon: Scissors,
      title: t('traditionalCutBeard'),
      description: t('traditionalCutBeardDesc'),
      price: t('traditionalCutBeardPrice') + " CAD + tax",
      image: "/gallery-haircut-2.jpeg"
    },
    {
      icon: Star,
      title: t('skinfadeTaper'),
      description: t('skinfadeTaperDesc'),
      price: t('skinfadeTaperPrice') + " CAD + tax",
      image: "/gallery-haircut-3.jpeg"
    },
    {
      icon: Sparkles,
      title: t('mullet'),
      description: t('mulletDesc'),
      price: t('mulletPrice') + " CAD + tax",
      image: "/gallery-haircut-4.jpeg"
    },
    {
      icon: Star,
      title: t('skinfadeBeard'),
      description: t('skinfadeBeardDesc'),
      price: t('skinfadeBeardPrice') + " CAD + tax",
      image: "/gallery-haircut-5.jpeg"
    },
    {
      icon: Droplets,
      title: t('fullBeard'),
      description: t('fullBeardDesc'),
      price: t('fullBeardPrice') + " CAD + tax",
      image: "/gallery-haircut-6.jpeg"
    },
  ];

  // Kids Services
  const kidsServices = [
    {
      icon: Scissors,
      title: t('kidsTraditional'),
      description: t('kidsTraditionalDesc'),
      price: t('kidsTraditionalPrice') + " CAD + tax",
      image: "/gallery-haircut-7.jpeg"
    },
    {
      icon: Star,
      title: t('kidsFade'),
      description: t('kidsFadeDesc'),
      price: t('kidsFadePrice') + " CAD + tax",
      image: "/gallery-haircut-3.jpeg"
    },
    {
      icon: Sparkles,
      title: t('kidsLineDesign'),
      description: t('kidsLineDesignDesc'),
      price: t('kidsLineDesignPrice') + " CAD + tax",
      image: "/gallery-haircut-4.jpeg"
    },
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-white to-derly-beige-light" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-playfair">
            {t('servicesTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('servicesSubtitle')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-derly-brown-light to-derly-brown-dark mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* Adult Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Adult Services / Servicios para Adultos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {adultServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-white h-full">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <div className="aspect-[4/3] relative bg-gradient-to-br from-derly-beige to-derly-beige-light">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                          <service.icon className="w-6 h-6 text-derly-brown-dark" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-derly-brown-dark transition-colors">
                        {service.title}
                      </h3>
                    </div>
                    <span className="text-derly-brown-dark font-semibold text-xl mb-3 block">
                      {service.price}
                    </span>
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                      {service.description}
                    </p>
                    <Link href="/booking">
                      <Button className="w-full bg-derly-brown-dark hover:bg-derly-brown text-white group-hover:shadow-lg group-hover:shadow-derly-brown-dark/25 transition-all duration-300">
                        <Calendar className="w-4 h-4 mr-2" />
                        {t('book')}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Kids Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Kids Services (up to 11 years) / Servicios para Niños (hasta 11 años)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {kidsServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              >
                <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-white h-full">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <div className="aspect-[4/3] relative bg-gradient-to-br from-derly-beige to-derly-beige-light">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                          <service.icon className="w-6 h-6 text-derly-brown-dark" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-derly-brown-dark transition-colors">
                        {service.title}
                      </h3>
                    </div>
                    <span className="text-derly-brown-dark font-semibold text-xl mb-3 block">
                      {service.price}
                    </span>
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                      {service.description}
                    </p>
                    <Link href="/booking">
                      <Button className="w-full bg-derly-brown-dark hover:bg-derly-brown text-white group-hover:shadow-lg group-hover:shadow-derly-brown-dark/25 transition-all duration-300">
                        <Calendar className="w-4 h-4 mr-2" />
                        {t('book')}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Home Service Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 mb-12"
        >
          <div className="bg-gradient-to-r from-derly-brown-dark to-derly-brown text-white rounded-2xl p-8 shadow-xl shadow-derly-brown-dark/25">
            <div className="text-center mb-6">
              <Users className="w-12 h-12 mx-auto mb-4 text-derly-beige-light" />
              <h3 className="text-3xl font-bold mb-3">{t('homeServiceTitle')}</h3>
              <p className="text-lg text-derly-beige-light max-w-3xl mx-auto">
                {t('homeServiceDesc')}
              </p>
              <p className="text-sm text-derly-beige mt-3 font-medium">
                {t('homeServiceNote')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Opening Hours */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 text-center"
        >
          <div className="bg-white border-2 border-derly-brown-light rounded-2xl p-8 shadow-lg max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">{t('hoursTitle')}</h3>
            <div className="space-y-4 text-left max-w-md mx-auto">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-semibold text-gray-900">{t('tuesdayToThursday')}</span>
                <span className="text-derly-brown-dark font-medium">5:00 PM - 9:30 PM</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-semibold text-gray-900">{t('saturday')}</span>
                <span className="text-derly-brown-dark font-medium">9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-3 bg-derly-beige-light rounded-lg px-4">
                <span className="font-semibold text-gray-900">{t('homeService')}</span>
                <div className="text-right">
                  <div className="text-derly-brown-dark font-medium">{t('homeServiceDays')}</div>
                  <div className="text-sm text-gray-600">{t('allDay')}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
