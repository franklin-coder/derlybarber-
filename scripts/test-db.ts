import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testConnection() {
  try {
    console.log('Testing database connection...')
    
    const result = await prisma.$queryRaw`SELECT current_database(), current_user, version()`
    console.log('✅ Database connection successful!')
    console.log('Connection details:', result)
    
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `
    console.log('\n📋 Tables in database:', tables)
    
  } catch (error) {
    console.error('❌ Database connection failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()
