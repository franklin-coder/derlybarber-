
export const languages = {
  en: {
    code: 'en',
    name: 'English',
    flag: '🇨🇦'
  },
  es: {
    code: 'es', 
    name: 'Español',
    flag: '🇪🇸'
  },
  fr: {
    code: 'fr',
    name: 'Français', 
    flag: '🇫🇷'
  }
} as const;

export type LanguageCode = keyof typeof languages;

export const translations = {
  en: {
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
    aboutFeatures: [
      "Multilingual service (ES/FR/EN)",
      "Personalized consultations",
      "Premium hot towel experience", 
      "Ready-to-go styling",
      "Professional advice"
    ],
    
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
    
    // Common
    loading: "Loading...",
    submit: "Submit",
    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    approve: "Approve",
    pending: "Pending Approval",
    
    // Footer
    followUs: "Follow Us",
    quickLinks: "Quick Links",
    contactInfo: "Contact Info",
    
    // Hours
    hoursTitle: "Opening Hours",
    tuesdayToThursday: "Tuesday - Thursday",
    saturday: "Saturday",
    homeService: "Home Service",
    homeServiceDays: "Sunday, Monday, Friday",
    allDay: "All day (by appointment)",
    closed: "Closed",
    
    // Services & Prices
    traditionalCut: "Traditional Haircut",
    traditionalCutDesc: "Classic cut tailored to your style",
    traditionalCutPrice: "$25",
    
    traditionalCutBeard: "Traditional Cut + Beard",
    traditionalCutBeardDesc: "Complete look with haircut and beard grooming",
    traditionalCutBeardPrice: "$43",
    
    skinfadeTaper: "Skinfade or Taper",
    skinfadeTaperDesc: "Modern fade technique for a sharp look",
    skinfadeTaperPrice: "$30",
    
    mullet: "Mullet",
    mulletDesc: "Trendy mullet cut styled to perfection",
    mulletPrice: "$35",
    
    skinfadeBeard: "Skinfade/Taper + Beard",
    skinfadeBeardDesc: "Premium fade with professional beard grooming",
    skinfadeBeardPrice: "$45.50",
    
    fullBeard: "Full Beard Service",
    fullBeardDesc: "Complete beard grooming with hot towel, oil & consultation",
    fullBeardPrice: "$21",
    
    kidsTraditional: "Kids Traditional Cut (up to 11 years)",
    kidsTraditionalDesc: "Gentle haircut for children with patience and care",
    kidsTraditionalPrice: "$20",
    
    kidsFade: "Kids Taper/Skinfade (up to 11 years)",
    kidsFadeDesc: "Modern fade for young clients",
    kidsFadePrice: "$25",
    
    kidsLineDesign: "Kids Line Design (up to 11 years)",
    kidsLineDesignDesc: "Creative line designs and patterns",
    kidsLineDesignPrice: "$12",
    
    homeServiceTitle: "Home Service Available",
    homeServiceDesc: "Personalized service at your location - perfect for clients who can't travel to Terrebonne. More personalized and convenient.",
    homeServiceNote: "Available Sunday, Monday & Friday by appointment"
  },
  es: {
    // Navigation
    home: "Inicio",
    services: "Servicios", 
    about: "Acerca de",
    blog: "Blog",
    contact: "Contacto",
    book: "Reservar Cita",
    
    // Hero Section
    heroTitle: "Barbería Profesional con Calidez Latina",
    heroSubtitle: "Experimenta cortes precisos, perfilado de barba y peluquería premium en Montreal. Servicio multilingüe en inglés, español y francés.",
    heroButton: "Reserva Tu Cita",
    
    // Services
    servicesTitle: "Servicios Premium",
    servicesSubtitle: "Desde cortes clásicos hasta estilos modernos, cada servicio incluye nuestro toque especial",
    
    haircut: "Corte de Cabello",
    haircutDesc: "Cortes precisos adaptados a tu estilo de vida y profesión",
    beardShaping: "Perfilado de Barba", 
    beardShapingDesc: "Recorte y perfilado profesional de barba para el look perfecto",
    hotTowel: "Hot Towel & Grooming",
    hotTowelDesc: "Tratamiento relajante con toalla caliente y peluquería premium",
    eventStyling: "Styling para Eventos",
    eventStylingDesc: "Peinado para ocasiones especiales - sal listo para tu evento",
    lookConsultation: "Consultoría de Look",
    lookConsultationDesc: "Asesoría personalizada para tus objetivos de cabello y estilo",
    
    // About
    aboutTitle: "Conoce a Derly",
    aboutSubtitle: "Tu Barbera Latina Profesional en Montreal",
    aboutText: "Como barbera apasionada que habla español, francés e inglés, traigo experiencia profesional con calidez latina a cada servicio. Creo en el poder de la conversación - la silla es donde suceden las transformaciones, se comparten historias y se construye confianza.",
    aboutFeatures: [
      "Servicio multilingüe (ES/FR/EN)",
      "Consultas personalizadas",
      "Experiencia premium con toalla caliente",
      "Styling listo para salir",
      "Asesoría profesional"
    ],
    
    // Testimonials
    testimonialsTitle: "Historias de Clientes",
    testimonial1: "Derly transformó mi look completamente. Su atención al detalle y personalidad cálida hicieron la experiencia increíble.",
    testimonial2: "Finalmente encontré una barbera que entiende mi tipo de cabello y estilo de vida. El servicio de toalla caliente es increíble.",
    testimonial3: "Servicio profesional con toque personal. Siempre salgo sintiéndome confiado y listo para todo.",
    
    // Contact
    contactTitle: "Ponte en Contacto",
    contactSubtitle: "¿Listo para tu transformación? Conectemos",
    name: "Nombre",
    email: "Email",
    phone: "Teléfono (Opcional)",
    subject: "Asunto",
    message: "Mensaje",
    send: "Enviar Mensaje",
    
    // Booking
    bookingTitle: "Reserva Tu Cita",
    selectService: "Seleccionar Servicio",
    selectDate: "Seleccionar Fecha", 
    selectTime: "Seleccionar Hora",
    clientInfo: "Tu Información",
    confirmBooking: "Confirmar Reserva",
    
    // Blog
    blogTitle: "Tips e Historias",
    readMore: "Leer Más",
    comments: "Comentarios",
    leaveComment: "Dejar Comentario",
    yourName: "Tu Nombre",
    yourEmail: "Tu Email",
    yourWebsite: "Tu Sitio Web (Opcional)",
    postComment: "Publicar Comentario",
    
    // Common
    loading: "Cargando...",
    submit: "Enviar",
    cancel: "Cancelar",
    save: "Guardar",
    edit: "Editar",
    delete: "Eliminar",
    approve: "Aprobar",
    pending: "Pendiente de Aprobación",
    
    // Footer
    followUs: "Síguenos",
    quickLinks: "Enlaces Rápidos",
    contactInfo: "Info de Contacto",
    
    // Hours
    hoursTitle: "Horario de Atención",
    tuesdayToThursday: "Martes - Jueves",
    saturday: "Sábado",
    homeService: "Servicio a Domicilio",
    homeServiceDays: "Domingo, Lunes, Viernes",
    allDay: "Todo el día (con cita previa)",
    closed: "Cerrado",
    
    // Services & Prices
    traditionalCut: "Corte Tradicional",
    traditionalCutDesc: "Corte clásico adaptado a tu estilo",
    traditionalCutPrice: "$25",
    
    traditionalCutBeard: "Corte Tradicional + Barba",
    traditionalCutBeardDesc: "Look completo con corte y arreglo de barba",
    traditionalCutBeardPrice: "$43",
    
    skinfadeTaper: "Skinfade o Taper",
    skinfadeTaperDesc: "Técnica moderna de desvanecido para un look impecable",
    skinfadeTaperPrice: "$30",
    
    mullet: "Mullet",
    mulletDesc: "Corte mullet moderno estilizado a la perfección",
    mulletPrice: "$35",
    
    skinfadeBeard: "Skinfade/Taper + Barba",
    skinfadeBeardDesc: "Desvanecido premium con arreglo profesional de barba",
    skinfadeBeardPrice: "$45.50",
    
    fullBeard: "Servicio Completo de Barba",
    fullBeardDesc: "Arreglo completo de barba con toalla caliente, aceite y asesoría",
    fullBeardPrice: "$21",
    
    kidsTraditional: "Corte Tradicional Niños (hasta 11 años)",
    kidsTraditionalDesc: "Corte suave para niños con paciencia y cuidado",
    kidsTraditionalPrice: "$20",
    
    kidsFade: "Taper/Skinfade Niños (hasta 11 años)",
    kidsFadeDesc: "Desvanecido moderno para jóvenes clientes",
    kidsFadePrice: "$25",
    
    kidsLineDesign: "Diseño de Líneas Niños (hasta 11 años)",
    kidsLineDesignDesc: "Diseños creativos y patrones",
    kidsLineDesignPrice: "$12",
    
    homeServiceTitle: "Servicio a Domicilio Disponible",
    homeServiceDesc: "Servicio personalizado en tu ubicación - perfecto para clientes que no pueden viajar a Terrebonne. Más personalizado y conveniente.",
    homeServiceNote: "Disponible Domingo, Lunes y Viernes con cita previa"
  },
  fr: {
    // Navigation
    home: "Accueil",
    services: "Services",
    about: "À Propos",
    blog: "Blog", 
    contact: "Contact",
    book: "Prendre RDV",
    
    // Hero Section
    heroTitle: "Barberie Professionnelle avec Chaleur Latine",
    heroSubtitle: "Découvrez des coupes précises, taille de barbe et toilettage premium à Montréal. Service multilingue en anglais, espagnol et français.",
    heroButton: "Réservez Votre Rendez-vous",
    
    // Services
    servicesTitle: "Services Premium",
    servicesSubtitle: "Des coupes classiques au style moderne, chaque service inclut notre touche signature",
    
    haircut: "Coupe de Cheveux",
    haircutDesc: "Coupes précises adaptées à votre style de vie et profession",
    beardShaping: "Taille de Barbe",
    beardShapingDesc: "Taille et façonnage professionnel de barbe pour le look parfait",
    hotTowel: "Serviette Chaude & Toilettage",
    hotTowelDesc: "Traitement relaxant à la serviette chaude avec toilettage premium",
    eventStyling: "Coiffage pour Événements",
    eventStylingDesc: "Coiffage pour occasions spéciales - partez prêt pour votre événement",
    lookConsultation: "Conseil Look",
    lookConsultationDesc: "Conseils personnalisés pour vos objectifs cheveux et style",
    
    // About
    aboutTitle: "Rencontrez Derly",
    aboutSubtitle: "Votre Barbière Latina Professionnelle à Montréal",
    aboutText: "En tant que barbière passionnée parlant espagnol, français et anglais, j'apporte une expertise professionnelle avec la chaleur latine à chaque service. Je crois au pouvoir de la conversation - la chaise est là où les transformations arrivent, les histoires sont partagées et la confiance est construite.",
    aboutFeatures: [
      "Service multilingue (ES/FR/EN)",
      "Consultations personnalisées",
      "Expérience premium serviette chaude",
      "Coiffage prêt à partir",
      "Conseils professionnels"
    ],
    
    // Testimonials
    testimonialsTitle: "Témoignages Clients",
    testimonial1: "Derly a complètement transformé mon look. Son attention aux détails et sa personnalité chaleureuse ont rendu l'expérience incroyable.",
    testimonial2: "J'ai finalement trouvé une barbière qui comprend mon type de cheveux et style de vie. Le service serviette chaude est incroyable.",
    testimonial3: "Service professionnel avec une touche personnelle. Je repars toujours confiant et prêt pour tout.",
    
    // Contact
    contactTitle: "Contactez-nous",
    contactSubtitle: "Prêt pour votre transformation? Connectons-nous",
    name: "Nom",
    email: "Email",
    phone: "Téléphone (Optionnel)",
    subject: "Sujet",
    message: "Message", 
    send: "Envoyer Message",
    
    // Booking
    bookingTitle: "Réservez Votre Rendez-vous",
    selectService: "Sélectionner Service",
    selectDate: "Sélectionner Date",
    selectTime: "Sélectionner Heure",
    clientInfo: "Vos Informations",
    confirmBooking: "Confirmer Réservation",
    
    // Blog
    blogTitle: "Conseils & Histoires",
    readMore: "Lire Plus",
    comments: "Commentaires",
    leaveComment: "Laisser Commentaire",
    yourName: "Votre Nom",
    yourEmail: "Votre Email",
    yourWebsite: "Votre Site Web (Optionnel)",
    postComment: "Publier Commentaire",
    
    // Common
    loading: "Chargement...",
    submit: "Soumettre",
    cancel: "Annuler",
    save: "Sauvegarder",
    edit: "Modifier",
    delete: "Supprimer",
    approve: "Approuver",
    pending: "En Attente d'Approbation",
    
    // Footer
    followUs: "Suivez-nous",
    quickLinks: "Liens Rapides", 
    contactInfo: "Info Contact",
    
    // Hours
    hoursTitle: "Heures d'Ouverture",
    tuesdayToThursday: "Mardi - Jeudi",
    saturday: "Samedi",
    homeService: "Service à Domicile",
    homeServiceDays: "Dimanche, Lundi, Vendredi",
    allDay: "Toute la journée (sur rendez-vous)",
    closed: "Fermé",
    
    // Services & Prices
    traditionalCut: "Coupe Traditionnelle",
    traditionalCutDesc: "Coupe classique adaptée à votre style",
    traditionalCutPrice: "$25",
    
    traditionalCutBeard: "Coupe Traditionnelle + Barbe",
    traditionalCutBeardDesc: "Look complet avec coupe et soin de barbe",
    traditionalCutBeardPrice: "$43",
    
    skinfadeTaper: "Skinfade ou Taper",
    skinfadeTaperDesc: "Technique moderne de dégradé pour un look impeccable",
    skinfadeTaperPrice: "$30",
    
    mullet: "Mullet",
    mulletDesc: "Coupe mullet tendance stylisée à la perfection",
    mulletPrice: "$35",
    
    skinfadeBeard: "Skinfade/Taper + Barbe",
    skinfadeBeardDesc: "Dégradé premium avec soin professionnel de barbe",
    skinfadeBeardPrice: "$45.50",
    
    fullBeard: "Service Complet de Barbe",
    fullBeardDesc: "Soin complet de barbe avec serviette chaude, huile et consultation",
    fullBeardPrice: "$21",
    
    kidsTraditional: "Coupe Traditionnelle Enfants (jusqu'à 11 ans)",
    kidsTraditionalDesc: "Coupe douce pour enfants avec patience et soin",
    kidsTraditionalPrice: "$20",
    
    kidsFade: "Taper/Skinfade Enfants (jusqu'à 11 ans)",
    kidsFadeDesc: "Dégradé moderne pour jeunes clients",
    kidsFadePrice: "$25",
    
    kidsLineDesign: "Design de Lignes Enfants (jusqu'à 11 ans)",
    kidsLineDesignDesc: "Designs créatifs et motifs",
    kidsLineDesignPrice: "$12",
    
    homeServiceTitle: "Service à Domicile Disponible",
    homeServiceDesc: "Service personnalisé à votre emplacement - parfait pour les clients qui ne peuvent pas se déplacer à Terrebonne. Plus personnalisé et pratique.",
    homeServiceNote: "Disponible Dimanche, Lundi et Vendredi sur rendez-vous"
  }
} as const;

export function getTranslation(lang: LanguageCode, key: string): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}
