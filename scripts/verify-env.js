
#!/usr/bin/env node

/**
 * Script para verificar que todas las variables de entorno requeridas estén configuradas
 * Uso: node scripts/verify-env.js
 */

require('dotenv').config({ path: '.env.local' });

console.log('\n🔍 Verificando variables de entorno...\n');

const requiredVars = {
  'DATABASE_URL': {
    required: true,
    description: 'URL de conexión a PostgreSQL (Supabase)',
    example: 'postgresql://user:pass@host:5432/db'
  },
  'NEXTAUTH_SECRET': {
    required: true,
    description: 'Secret para NextAuth (mínimo 32 caracteres)',
    example: 'genera con: openssl rand -base64 32',
    minLength: 32
  },
  'NEXT_PUBLIC_BASE_URL': {
    required: true,
    description: 'URL base de tu aplicación',
    example: 'https://tu-dominio.vercel.app'
  },
  'EMAIL_USER': {
    required: true,
    description: 'Email para enviar notificaciones',
    example: 'tu-email@gmail.com'
  },
  'EMAIL_PASSWORD': {
    required: true,
    description: 'App Password de Gmail (16 caracteres)',
    example: 'xxxx xxxx xxxx xxxx',
    minLength: 16
  },
  'EMAIL_HOST': {
    required: false,
    description: 'Servidor SMTP',
    default: 'smtp.gmail.com'
  },
  'EMAIL_PORT': {
    required: false,
    description: 'Puerto SMTP',
    default: '587'
  }
};

let hasErrors = false;
let hasWarnings = false;

Object.entries(requiredVars).forEach(([varName, config]) => {
  const value = process.env[varName];
  const isSet = value && value.trim() !== '';
  
  if (config.required && !isSet) {
    console.log(`❌ ${varName}`);
    console.log(`   FALTA - ${config.description}`);
    console.log(`   Ejemplo: ${config.example}\n`);
    hasErrors = true;
  } else if (config.required && isSet) {
    // Verificar longitud mínima si aplica
    if (config.minLength && value.length < config.minLength) {
      console.log(`⚠️  ${varName}`);
      console.log(`   ADVERTENCIA - Muy corto (${value.length} caracteres, mínimo ${config.minLength})`);
      console.log(`   Valor actual: ${value.substring(0, 10)}...`);
      console.log(`   ${config.description}\n`);
      hasWarnings = true;
    } else {
      console.log(`✅ ${varName}`);
      console.log(`   Configurado correctamente`);
      // Mostrar preview del valor (ocultando partes sensibles)
      if (varName.includes('PASSWORD') || varName.includes('SECRET')) {
        console.log(`   Valor: ***${value.slice(-4)}\n`);
      } else {
        console.log(`   Valor: ${value}\n`);
      }
    }
  } else if (!config.required && !isSet) {
    console.log(`ℹ️  ${varName}`);
    console.log(`   Opcional - Usando valor por defecto: ${config.default || 'N/A'}`);
    console.log(`   ${config.description}\n`);
  } else {
    console.log(`✅ ${varName}`);
    console.log(`   Configurado: ${value}\n`);
  }
});

console.log('━'.repeat(70));

if (hasErrors) {
  console.log('\n❌ ERRORES ENCONTRADOS');
  console.log('   Configura las variables faltantes antes de deployar.\n');
  console.log('📖 Lee CONFIGURAR_VERCEL_PRODUCCION.md para más detalles.\n');
  process.exit(1);
} else if (hasWarnings) {
  console.log('\n⚠️  ADVERTENCIAS ENCONTRADAS');
  console.log('   Revisa las advertencias antes de deployar.\n');
  process.exit(0);
} else {
  console.log('\n✅ TODAS LAS VARIABLES CONFIGURADAS CORRECTAMENTE');
  console.log('   Tu aplicación está lista para producción.\n');
  process.exit(0);
}
