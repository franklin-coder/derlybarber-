
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/lib/language-context'
import { Toaster } from '@/components/ui/toaster'
import { SessionProvider } from '@/components/session-provider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Derly — Barbería Latina | Professional Barbershop in Montreal',
  description: 'Experience professional barbering with Latin warmth in Montreal. Multilingual service (EN/ES/FR), precision cuts, beard shaping, hot towel grooming.',
  keywords: 'barber Montreal, barbería latina, corte cabello Montreal, beard shaping, multilingual barber, Spanish barber Montreal',
  openGraph: {
    title: 'Derly — Barbería Latina | Professional Barbershop in Montreal',
    description: 'Professional barbering with Latin warmth. Multilingual service in English, Spanish & French.',
    url: 'https://derly-barbershop.com',
    siteName: 'Derly Barbería Latina',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Derly Barbería Latina - Professional Barbershop Montreal'
      }
    ],
    locale: 'en_CA',
    alternateLocale: ['es_ES', 'fr_CA'],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Derly — Barbería Latina | Professional Barbershop Montreal',
    description: 'Professional barbering with Latin warmth. Multilingual service in English, Spanish & French.',
    images: ['/og-image.png']
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/derly-logo.png'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HairSalon",
              "name": "Derly — Barbería Latina",
              "description": "Professional barbershop in Montreal offering multilingual service in English, Spanish, and French",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Montreal",
                "addressLocality": "Montreal",
                "addressRegion": "Quebec",
                "addressCountry": "CA"
              },
              "telephone": "+1-514-000-0000",
              "email": "franklin.tejadag@gmail.com",
              "url": "https://derly-barbershop.com",
              "image": "https://www.shutterstock.com/image-vector/barbershop-logo-vector-design-cut-600nw-2494643347.jpg",
              "priceRange": "$$",
              "openingHours": "Mo-Sa 09:00-19:00",
              "sameAs": [
                "https://instagram.com/derly_barbershop",
                "https://facebook.com/derly.barberia.latina"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Barber Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Haircut",
                      "description": "Precision cuts tailored to your lifestyle and profession"
                    }
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Beard Shaping",
                      "description": "Professional beard trimming and shaping"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service", 
                      "name": "Hot Towel & Grooming",
                      "description": "Relaxing hot towel treatment with premium grooming"
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`} suppressHydrationWarning>
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
            <LanguageProvider>
              {children}
              <Toaster />
            </LanguageProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
