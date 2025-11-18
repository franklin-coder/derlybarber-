import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function setupDatabase() {
  try {
    console.log('🔄 Setting up database...')
    
    // Test connection
    await prisma.$connect()
    console.log('✅ Database connection successful!')
    
    // Check existing tables
    const tables = await prisma.$queryRaw<Array<{ table_name: string }>>`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `
    
    console.log('\n📋 Existing tables:')
    console.table(tables.map(t => ({ name: t.table_name })))
    
    // Check if contact_submissions exists
    const hasContactTable = tables.some(t => t.table_name === 'contact_submissions')
    
    if (!hasContactTable) {
      console.log('\n⚠️  Table "contact_submissions" does not exist!')
      console.log('🔧 Run this command to create it:')
      console.log('   yarn prisma db push')
      console.log('\n   Or:')
      console.log('   npx prisma db push')
    } else {
      console.log('\n✅ Table "contact_submissions" exists!')
    }
    
    // Check if appointments exists
    const hasAppointmentsTable = tables.some(t => t.table_name === 'appointments')
    
    if (!hasAppointmentsTable) {
      console.log('\n⚠️  Table "appointments" does not exist!')
    } else {
      console.log('✅ Table "appointments" exists!')
    }
    
    console.log('\n📝 To create all missing tables, run:')
    console.log('   yarn prisma db push')
    
  } catch (error) {
    console.error('❌ Database setup error:', error)
    if (error instanceof Error) {
      console.error('   Error message:', error.message)
    }
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

setupDatabase()

