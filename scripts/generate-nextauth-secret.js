
#!/usr/bin/env node

/**
 * Script para generar un NEXTAUTH_SECRET seguro
 * Uso: node scripts/generate-nextauth-secret.js
 */

const crypto = require('crypto');

console.log('\n🔐 Generando NEXTAUTH_SECRET...\n');

const secret = crypto.randomBytes(32).toString('base64');

console.log('✅ Secret generado exitosamente:\n');
console.log('━'.repeat(70));
console.log(secret);
console.log('━'.repeat(70));

console.log('\n📋 Copia este valor y agrégalo a tus variables de entorno:\n');
console.log('En Vercel:');
console.log('  1. Ve a Settings > Environment Variables');
console.log('  2. Agrega: NEXTAUTH_SECRET');
console.log('  3. Pega el valor de arriba');
console.log('  4. Selecciona: Production, Preview, Development');
console.log('  5. Haz clic en Save\n');

console.log('En .env.local (desarrollo):');
console.log(`  NEXTAUTH_SECRET="${secret}"\n`);

console.log('⚠️  IMPORTANTE: Guarda este secret de forma segura.');
console.log('   No lo compartas públicamente ni lo subas a Git.\n');
