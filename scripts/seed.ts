
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user (Derly)
  const derlyPassword = await bcrypt.hash('admin123', 10);
  const derly = await prisma.user.upsert({
    where: { email: 'derly@barberia.com' },
    update: {},
    create: {
      email: 'derly@barberia.com',
      password: derlyPassword,
      firstName: 'Derly',
      lastName: 'Cruz',
      name: 'Derly Cruz',
      role: 'admin'
    }
  });

  // Create test user (john@doe.com)
  const testPassword = await bcrypt.hash('johndoe123', 10);
  const testUser = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      password: testPassword,
      firstName: 'John',
      lastName: 'Doe',
      name: 'John Doe',
      role: 'admin'
    }
  });

  // Create sample blog posts
  const blogPost1 = await prisma.blogPost.upsert({
    where: { slug: 'maintaining-your-haircut' },
    update: {},
    create: {
      title: {
        en: "3 Keys to Make Your Haircut Last Longer",
        es: "3 Claves Para Que Tu Corte Dure Más Tiempo",
        fr: "3 Clés Pour Faire Durer Votre Coupe Plus Longtemps"
      },
      slug: 'maintaining-your-haircut',
      content: {
        en: "A great haircut is an investment in your appearance and confidence. Here are three professional tips to help maintain your fresh look between appointments:\n\n**1. Proper Drying Technique**\nHow you dry your hair sets the foundation for your style. Always use a towel to gently pat your hair dry - never rub vigorously. When using a blow dryer, use medium heat and direct the airflow from roots to tips.\n\n**2. Quality Products Matter**\nInvest in professional-grade styling products that suit your hair type. A good pomade or gel can maintain your style throughout the day while nourishing your hair.\n\n**3. Daily Maintenance**\nSpend 2-3 minutes each morning with a quality comb to maintain your style's shape. This small investment of time will keep you looking professional all day.",
        es: "Un gran corte es una inversión en tu apariencia y confianza. Aquí tienes tres consejos profesionales para mantener tu look fresco entre citas:\n\n**1. Técnica de Secado Correcta**\nCómo secas tu cabello establece la base de tu estilo. Siempre usa una toalla para secar suavemente - nunca frotes vigorosamente. Al usar secador, usa calor medio y dirige el flujo de aire desde la raíz hasta las puntas.\n\n**2. Los Productos de Calidad Importan**\nInvierte en productos de peinado de grado profesional que se adapten a tu tipo de cabello. Una buena pomada o gel puede mantener tu estilo durante todo el día mientras nutre tu cabello.\n\n**3. Mantenimiento Diario**\nDedica 2-3 minutos cada mañana con un peine de calidad para mantener la forma de tu estilo. Esta pequeña inversión de tiempo te mantendrá luciendo profesional todo el día.",
        fr: "Une excellente coupe est un investissement dans votre apparence et votre confiance. Voici trois conseils professionnels pour maintenir votre look frais entre les rendez-vous:\n\n**1. Technique de Séchage Appropriée**\nComment vous séchez vos cheveux établit la base de votre style. Utilisez toujours une serviette pour sécher doucement - ne frottez jamais vigoureusement. Lors de l'utilisation d'un sèche-cheveux, utilisez une chaleur moyenne et dirigez le flux d'air des racines aux pointes.\n\n**2. Les Produits de Qualité Comptent**\nInvestissez dans des produits de coiffage de qualité professionnelle adaptés à votre type de cheveux. Une bonne pommade ou gel peut maintenir votre style toute la journée tout en nourrissant vos cheveux.\n\n**3. Entretien Quotidien**\nPassez 2-3 minutes chaque matin avec un peigne de qualité pour maintenir la forme de votre style. Ce petit investissement de temps vous gardera professionnel toute la journée."
      },
      excerpt: {
        en: "Learn the professional secrets to maintaining your fresh haircut longer with these three essential daily practices.",
        es: "Aprende los secretos profesionales para mantener tu corte fresco por más tiempo con estas tres prácticas esenciales diarias.",
        fr: "Apprenez les secrets professionnels pour maintenir votre coupe fraîche plus longtemps avec ces trois pratiques quotidiennes essentielles."
      },
      image: "https://www.elegantgbarbershop.com/wp-content/uploads/2025/01/10-Barbershop-Tools-That-Make-a-Difference.jpg",
      published: true,
      featured: true,
      authorId: derly.id,
      publishedAt: new Date()
    }
  });

  const blogPost2 = await prisma.blogPost.upsert({
    where: { slug: 'beard-grooming-essentials' },
    update: {},
    create: {
      title: {
        en: "Beard Grooming Essentials: A Professional Guide",
        es: "Esenciales del Cuidado de la Barba: Una Guía Profesional",
        fr: "Essentiels de Toilettage de Barbe: Un Guide Professionnel"
      },
      slug: 'beard-grooming-essentials',
      content: {
        en: "A well-maintained beard is a statement of style and sophistication. Here's your complete guide to professional beard care:\n\n**Daily Maintenance**\nBrush your beard daily with a quality boar bristle brush to distribute natural oils and remove loose hairs. This keeps your beard healthy and shaped.\n\n**Weekly Deep Clean**\nUse a specialized beard shampoo once or twice a week. Regular hair shampoo can be too harsh and dry out your facial hair.\n\n**Professional Shaping**\nVisit a professional barber every 3-4 weeks for precise trimming and shaping. A professional can maintain the proper proportions that complement your face shape.\n\n**Quality Products**\nInvest in beard oil for moisturizing and beard balm for styling and hold. These products will keep your beard soft, manageable, and professionally groomed.",
        es: "Una barba bien mantenida es una declaración de estilo y sofisticación. Aquí está tu guía completa para el cuidado profesional de la barba:\n\n**Mantenimiento Diario**\nCepilla tu barba diariamente con un cepillo de calidad de cerdas de jabalí para distribuir los aceites naturales y remover pelos sueltos. Esto mantiene tu barba saludable y con forma.\n\n**Limpieza Profunda Semanal**\nUsa un champú especializado para barba una o dos veces por semana. El champú regular puede ser muy fuerte y resecar el vello facial.\n\n**Perfilado Profesional**\nVisita un barbero profesional cada 3-4 semanas para recorte y perfilado precisos. Un profesional puede mantener las proporciones adecuadas que complementen la forma de tu cara.\n\n**Productos de Calidad**\nInvierte en aceite para barba para hidratar y bálsamo para estilizar y fijar. Estos productos mantendrán tu barba suave, manejable y profesionalmente arreglada.",
        fr: "Une barbe bien entretenue est une déclaration de style et de sophistication. Voici votre guide complet pour les soins professionnels de la barbe:\n\n**Entretien Quotidien**\nBrossez votre barbe quotidiennement avec une brosse de qualité en soies de sanglier pour distribuer les huiles naturelles et enlever les poils lâches. Cela garde votre barbe saine et en forme.\n\n**Nettoyage Profond Hebdomadaire**\nUtilisez un shampooing spécialisé pour barbe une ou deux fois par semaine. Le shampooing régulier peut être trop dur et assécher vos poils faciaux.\n\n**Façonnage Professionnel**\nRendez visite à un barbier professionnel toutes les 3-4 semaines pour une taille et un façonnage précis. Un professionnel peut maintenir les bonnes proportions qui complètent la forme de votre visage.\n\n**Produits de Qualité**\nInvestissez dans l'huile à barbe pour hydrater et le baume à barbe pour styliser et tenir. Ces produits garderont votre barbe douce, gérable et soignée professionnellement."
      },
      excerpt: {
        en: "Master the art of beard grooming with professional techniques and product recommendations from an expert barber.",
        es: "Domina el arte del cuidado de la barba con técnicas profesionales y recomendaciones de productos de un barbero experto.",
        fr: "Maîtrisez l'art du toilettage de barbe avec des techniques professionnelles et des recommandations de produits d'un barbier expert."
      },
      image: "https://i.ytimg.com/vi/6mRHwzU2AUw/maxresdefault.jpg",
      published: true,
      featured: false,
      authorId: derly.id,
      publishedAt: new Date()
    }
  });

  // Create sample contact submissions
  await prisma.contactSubmission.create({
    data: {
      name: 'François Dubois',
      email: 'francois.dubois@example.com',
      phone: '+1-514-555-0123',
      subject: 'Appointment Booking',
      message: 'Hello, I would like to book an appointment for next week. I need a haircut and beard trim.',
      language: 'fr',
      status: 'new'
    }
  });

  // Create sample appointments
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  await prisma.appointment.create({
    data: {
      clientName: 'Carlos Martinez',
      clientEmail: 'carlos.martinez@example.com',
      clientPhone: '+1-514-555-0456',
      service: 'Haircut + Beard Shaping',
      date: tomorrow,
      time: '14:00',
      duration: 90,
      notes: 'First time client, prefers Spanish communication',
      status: 'confirmed',
      language: 'es'
    }
  });

  console.log('Database seeded successfully!');
  console.log('Admin users created:');
  console.log('- derly@barberia.com (password: admin123)');
  console.log('- john@doe.com (password: johndoe123)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
