
"use client";

import Link from 'next/link';
import { Facebook, Instagram, MapPin, Phone, Mail } from 'lucide-react';
import { useSafeLanguage } from '@/lib/safe-language-context';
import Image from 'next/image';

export function Footer() {
  const { t } = useSafeLanguage();

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/derly-logo.png"
                  alt="Derly Barbería Latina Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="font-playfair text-xl font-bold">Derly</h1>
                <p className="text-xs text-derly-beige-light -mt-1">Barbería Latina</p>
              </div>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Professional barbering with Latin warmth in Montreal. Multilingual service in English, Spanish & French.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-derly-brown-light transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-derly-brown-light transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-derly-beige">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">{t('home')}</Link></li>
              <li><Link href="/#services" className="text-sm text-gray-400 hover:text-white transition-colors">{t('services')}</Link></li>
              <li><Link href="/#about" className="text-sm text-gray-400 hover:text-white transition-colors">{t('about')}</Link></li>
              <li><Link href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">{t('blog')}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-derly-beige">{t('services')}</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-400">{t('haircut')}</li>
              <li className="text-sm text-gray-400">{t('beardShaping')}</li>
              <li className="text-sm text-gray-400">{t('hotTowel')}</li>
              <li className="text-sm text-gray-400">{t('eventStyling')}</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-derly-beige">{t('contactInfo')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start text-sm text-gray-400">
                <MapPin className="w-4 h-4 mr-2 mt-0.5 text-derly-brown-light flex-shrink-0" />
                <span>1700 Ch. Gascon suite 102,<br />Terrebonne, QC J6X 3A4</span>
              </li>
              <li className="flex items-center text-sm text-gray-400">
                <Phone className="w-4 h-4 mr-2 text-derly-brown-light" />
                <a href="tel:+15144672596" className="hover:text-derly-brown-light transition-colors">
                  +1 (514) 467-2596
                </a>
              </li>
              <li className="flex items-center text-sm text-gray-400">
                <Mail className="w-4 h-4 mr-2 text-derly-brown-light" />
                <a href="mailto:franklin.tejadag@gmail.com" className="hover:text-derly-brown-light transition-colors">
                  franklin.tejadag@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © 2024 Derly — Barbería Latina. Professional barbering with Latin warmth.
          </p>
        </div>
      </div>
    </footer>
  );
}
