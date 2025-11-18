import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testConnection() {
  try {
    console.log('🔄 Testing Supabase connection...')
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Set' : '❌ Not set')
    
    // Test connection
    await prisma.$connect()
    console.log('✅ Database connection successful!')
    
    // Test query
    const result = await prisma.$queryRaw`SELECT current_database(), current_user, version()`
    console.log('📊 Connection details:', result)
    
    // Check if tables exist
    const tables = await prisma.$queryRaw<Array<{ table_name: string }>>`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `
    
    console.log('\n📋 Tables in database:')
    console.table(tables.map(t => ({ name: t.table_name })))
    
    // Check for required tables
    const requiredTables = ['appointments', 'contact_submissions']
    const existingTables = tables.map(t => t.table_name)
    
    console.log('\n✅ Required tables check:')
    requiredTables.forEach(table => {
      if (existingTables.includes(table)) {
        console.log(`  ✅ ${table} exists`)
      } else {
        console.log(`  ❌ ${table} MISSING - Run: yarn prisma db push`)
      }
    })
    
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    if (error instanceof Error) {
      console.error('   Error message:', error.message)
      
      if (error.message.includes('P1001')) {
        console.error('   🔧 Solution: Check your DATABASE_URL in .env')
        console.error('      - Verify the password is URL-encoded')
        console.error('      - Check that the host is correct')
        console.error('      - Ensure Supabase is running')
      } else if (error.message.includes('P1000')) {
        console.error('   🔧 Solution: Authentication failed')
        console.error('      - Check your database password')
        console.error('      - Verify the username is correct')
      }
    }
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()

