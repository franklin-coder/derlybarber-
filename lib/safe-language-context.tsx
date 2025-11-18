
"use client";

import { useLanguage } from '@/lib/language-context';

// Safe hook that handles both server and client rendering
export function useSafeLanguage() {
  let t: (key: string) => string;
  let currentLanguage: 'en' | 'es' | 'fr';
  let setLanguage: ((lang: 'en' | 'es' | 'fr') => void) | undefined;

  try {
    const context = useLanguage();
    t = context.t;
    currentLanguage = context.currentLanguage;
    setLanguage = context.setLanguage;
  } catch (error) {
    // Fallback for server-side rendering or when context is not available
    currentLanguage = 'en';
    setLanguage = undefined;
    t = (key: string) => {
      const fallbackTranslations: Record<string, string> = {
        // Navigation
        home: "Home",
        services: "Services", 
        about: "About",
        blog: "Blog",
        contact: "Contact",
        book: "Book Appointment",
        
        // Hero Section
        heroTitle: "Professional Barbering with Latin Warmth",
        heroSubtitle: "Experience precision cuts, beard shaping, and premium grooming in Montreal. Multilingual service in English, Spanish, and French.",
        heroButton: "Book Your Appointment",
        
        // Services
        servicesTitle: "Premium Services",
        servicesSubtitle: "From classic cuts to modern styling, every service includes our signature touch",
        haircut: "Haircut",
        haircutDesc: "Precision cuts tailored to your lifestyle and profession",
        beardShaping: "Beard Shaping",
        beardShapingDesc: "Professional beard trimming and shaping for the perfect look",
        hotTowel: "Hot Towel & Grooming",
        hotTowelDesc: "Relaxing hot towel treatment with premium grooming",
        eventStyling: "Event Styling",
        eventStylingDesc: "Special occasion styling - leave ready for your event",
        lookConsultation: "Look Consultation",
        lookConsultationDesc: "Personalized advice for your hair and style goals",
        
        // About
        aboutTitle: "Meet Derly",
        aboutSubtitle: "Your Professional Latina Barber in Montreal",
        aboutText: "As a passionate barber fluent in Spanish, French, and English, I bring professional expertise with Latin warmth to every service. I believe in the power of conversation - the chair is where transformations happen, stories are shared, and confidence is built.",
        
        // Testimonials
        testimonialsTitle: "Client Stories",
        testimonial1: "Derly transformed my look completely. Her attention to detail and warm personality made the experience amazing.",
        testimonial2: "Finally found a barber who understands my hair type and lifestyle. The hot towel service is incredible.",
        testimonial3: "Professional service with a personal touch. I always leave feeling confident and ready for anything.",
        
        // Contact
        contactTitle: "Get In Touch",
        contactSubtitle: "Ready for your transformation? Let's connect",
        name: "Name",
        email: "Email",
        phone: "Phone (Optional)",
        subject: "Subject",
        message: "Message",
        send: "Send Message",
        
        // Booking
        bookingTitle: "Book Your Appointment",
        selectService: "Select Service",
        selectDate: "Select Date",
        selectTime: "Select Time",
        clientInfo: "Your Information",
        confirmBooking: "Confirm Booking",
        
        // Blog
        blogTitle: "Tips & Stories",
        readMore: "Read More",
        comments: "Comments",
        leaveComment: "Leave a Comment",
        yourName: "Your Name",
        yourEmail: "Your Email",
        yourWebsite: "Your Website (Optional)",
        postComment: "Post Comment",
        
        // Footer
        followUs: "Follow Us",
        quickLinks: "Quick Links",
        contactInfo: "Contact Info"
      };
      return fallbackTranslations[key] || key;
    };
  }

  return { t, currentLanguage, setLanguage };
}
