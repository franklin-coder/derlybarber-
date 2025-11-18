
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendContactNotification } from '@/lib/email'

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let submissionId: string | null = null;
  let dbError: string | null = null;
  
  try {
    const body = await req.json()
    const { name, email, phone, subject, message, language = 'en' } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Try to save to database (but don't fail if it doesn't work)
    try {
      const submission = await prisma.contactSubmission.create({
        data: {
          name,
          email,
          phone: phone || null,
          subject: subject || null,
          message,
          language
        }
      })
      submissionId = submission.id;
      console.log('✅ Contact submission saved to database:', submissionId);
    } catch (dbErr) {
      dbError = dbErr instanceof Error ? dbErr.message : 'Database error';
      console.warn('⚠️ Failed to save to database (continuing anyway):', dbError);
      
      // If it's a table missing error, provide helpful message
      if (dbError.includes('does not exist')) {
        console.error('🔧 SOLUTION: Run "yarn prisma db push" to create the database tables');
      }
    }

    // ALWAYS try to send notification email (even if DB failed)
    console.log('📧 Attempting to send email notification...');
    const emailResult = await sendContactNotification({
      name,
      email,
      phone: phone || undefined,
      subject: subject || undefined,
      message
    });

    // Log email result
    console.log('📧 Email result:', emailResult);

    // Return success if email was sent, even if DB failed
    if (emailResult.success) {
      return NextResponse.json(
        { 
          message: 'Message sent successfully', 
          id: submissionId,
          emailSent: true,
          emailMessage: emailResult.message,
          dbSaved: !!submissionId,
          dbError: dbError || undefined
        },
        { status: 201 }
      )
    } else {
      // Email failed but we still tried
      return NextResponse.json(
        { 
          message: dbError ? 'Message received but email failed. Please check email configuration.' : 'Message received but email failed.',
          id: submissionId,
          emailSent: false,
          emailMessage: emailResult.message,
          dbSaved: !!submissionId,
          dbError: dbError || undefined,
          emailError: emailResult.error
        },
        { status: 201 } // Still 201 because we received the message
      )
    }
  } catch (error) {
    console.error('❌ Contact form error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { message: 'Failed to process message', error: errorMessage },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50
    })

    return NextResponse.json(submissions)
  } catch (error) {
    console.error('Error fetching contact submissions:', error)
    return NextResponse.json(
      { message: 'Failed to fetch submissions' },
      { status: 500 }
    )
  }
}
