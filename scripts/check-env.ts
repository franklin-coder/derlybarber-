import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

// Load .env file
const envPath = path.join(process.cwd(), '.env');
const envLocalPath = path.join(process.cwd(), '.env.local');

console.log('🔍 Checking environment variables...\n');
console.log('Looking for .env files:');
console.log('  - .env:', fs.existsSync(envPath) ? '✅ Found' : '❌ Not found');
console.log('  - .env.local:', fs.existsSync(envLocalPath) ? '✅ Found' : '❌ Not found');
console.log('');

// Try to load .env.local first (takes precedence), then .env
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
  console.log('📄 Loaded .env.local');
} else if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log('📄 Loaded .env');
} else {
  console.log('⚠️  No .env file found!');
  console.log('   Create a .env file in nextjs_space/ with:');
  console.log('   EMAIL_USER=your-email@gmail.com');
  console.log('   EMAIL_PASSWORD=your-app-password');
  console.log('   EMAIL_HOST=smtp.gmail.com');
  console.log('   EMAIL_PORT=587');
  process.exit(1);
}

console.log('\n📋 Environment Variables Status:\n');

const requiredVars = [
  { name: 'EMAIL_USER', description: 'Your Gmail address' },
  { name: 'EMAIL_PASSWORD', description: 'Gmail App Password (16 chars, no spaces)' },
  { name: 'EMAIL_HOST', description: 'SMTP host (default: smtp.gmail.com)' },
  { name: 'EMAIL_PORT', description: 'SMTP port (default: 587)' },
];

let allOk = true;

requiredVars.forEach(({ name, description }) => {
  const value = process.env[name];
  if (value) {
    // Mask password
    if (name === 'EMAIL_PASSWORD') {
      const masked = value.length > 4 
        ? '***' + value.slice(-4) 
        : '***';
      console.log(`✅ ${name}: ${masked} (${value.length} chars)`);
    } else {
      console.log(`✅ ${name}: ${value}`);
    }
  } else {
    console.log(`❌ ${name}: NOT SET`);
    console.log(`   ${description}`);
    allOk = false;
  }
});

console.log('\n' + '='.repeat(50));

if (allOk) {
  console.log('\n✅ All email environment variables are configured!');
  console.log('   Your email system should work correctly.');
} else {
  console.log('\n❌ Some environment variables are missing!');
  console.log('\n🔧 To fix:');
  console.log('   1. Create or edit nextjs_space/.env');
  console.log('   2. Add the missing variables');
  console.log('   3. Restart your dev server (yarn dev)');
  console.log('\n📝 Example .env file:');
  console.log('   EMAIL_USER=franklin.tejadag@gmail.com');
  console.log('   EMAIL_PASSWORD=abcdefghijklmnop');
  console.log('   EMAIL_HOST=smtp.gmail.com');
  console.log('   EMAIL_PORT=587');
  process.exit(1);
}

console.log('\n💡 Note: Variables in .env.local override .env');
console.log('   Next.js automatically loads .env files in development\n');

