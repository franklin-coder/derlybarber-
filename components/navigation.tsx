
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Calendar, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { useSafeLanguage } from '@/lib/safe-language-context';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { t } = useSafeLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('services'), href: '/#services' },
    { name: t('about'), href: '/#about' },
    { name: t('blog'), href: '/blog' },
    { name: t('contact'), href: '/contact' },
  ];

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-12 h-12">
                <Image
                  src="/derly-logo.png"
                  alt="Derly Barbería Latina Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div className="text-white">
                <h1 className="font-playfair text-xl font-bold">Derly</h1>
                <p className="text-xs text-derly-beige-light -mt-1">Barbería Latina</p>
              </div>
            </Link>
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-white text-sm font-medium">Home</Link>
              <Link href="/#services" className="text-white text-sm font-medium">Services</Link>
              <Link href="/#about" className="text-white text-sm font-medium">About</Link>
              <Link href="/blog" className="text-white text-sm font-medium">Blog</Link>
              <Link href="/contact" className="text-white text-sm font-medium">Contact</Link>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <Link href="/booking">
                <Button className="bg-derly-brown-dark hover:bg-derly-brown text-white">
                  Book Appointment
                </Button>
              </Link>
            </div>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <motion.header 
      initial={false}
      animate={{ 
        backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.95)' : 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)'
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : ''
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-12 h-12">
              <Image
                src="/derly-logo.png"
                alt="Derly Barbería Latina Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="text-white">
              <h1 className="font-playfair text-xl font-bold">Derly</h1>
              <p className="text-xs text-derly-beige-light -mt-1">Barbería Latina</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? 'text-derly-brown-light border-b-2 border-derly-brown-light pb-1'
                    : 'text-white hover:text-derly-beige'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSwitcher />
            <Link href="/booking">
              <Button className="bg-derly-brown-dark hover:bg-derly-brown text-white gap-2">
                <Calendar className="w-4 h-4" />
                {t('book')}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-derly-beige"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 backdrop-blur-md rounded-lg mt-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
                      pathname === item.href
                        ? 'text-derly-brown-light bg-derly-brown/20'
                        : 'text-white hover:text-derly-beige hover:bg-white/10'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-white/20">
                  <Link href="/booking" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-derly-brown-dark hover:bg-derly-brown text-white gap-2">
                      <Calendar className="w-4 h-4" />
                      {t('book')}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
