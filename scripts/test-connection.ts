import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testConnection() {
  try {
    console.log('🔄 Testing database connection...')
    
    await prisma.$connect()
    console.log('✅ Database connection successful!')
    
    const result = await prisma.$queryRaw`SELECT current_database(), current_user, version()`
    console.log('📊 Connection details:', result)
    
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `
    console.log('\n📋 Tables in database:')
    console.table(tables)
    
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()
