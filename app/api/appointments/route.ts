
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendAppointmentConfirmation } from '@/lib/email'

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { 
      clientName, 
      clientEmail, 
      clientPhone, 
      service, 
      date, 
      time, 
      duration = 60, 
      notes, 
      language = 'en' 
    } = body

    if (!clientName || !clientEmail || !service || !date || !time) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Parse date
    const appointmentDate = new Date(date)
    if (isNaN(appointmentDate.getTime())) {
      return NextResponse.json(
        { message: 'Invalid date format' },
        { status: 400 }
      )
    }

    // Check if slot is available - Derly can only attend one client at a time
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        date: appointmentDate,
        time: time,
        status: { not: 'cancelled' }
      }
    })

    if (existingAppointment) {
      // Multilingual error messages
      const errorMessages = {
        en: `Sorry, this time slot is already booked. Derly can only attend one client at a time. Please select a different time.`,
        es: `Lo sentimos, este horario ya está reservado. Derly solo puede atender un cliente a la vez. Por favor, selecciona otro horario.`,
        fr: `Désolé, ce créneau horaire est déjà réservé. Derly ne peut recevoir qu'un client à la fois. Veuillez choisir un autre horaire.`
      };
      
      const errorMessage = errorMessages[language as keyof typeof errorMessages] || errorMessages.es;
      
      return NextResponse.json(
        { 
          message: errorMessage,
          error: 'TIME_SLOT_TAKEN',
          suggestedAction: 'Please select a different time slot'
        },
        { status: 409 } // 409 Conflict - more appropriate than 400
      )
    }

    // Create appointment
    let appointment;
    let dbError: string | null = null;
    
    try {
      appointment = await prisma.appointment.create({
        data: {
          clientName,
          clientEmail,
          clientPhone: clientPhone || null,
          service,
          date: appointmentDate,
          time,
          duration,
          notes: notes || null,
          language,
          status: 'pending'
        }
      })
      console.log('✅ Appointment saved to database:', appointment.id);
    } catch (dbErr) {
      dbError = dbErr instanceof Error ? dbErr.message : 'Database error';
      console.warn('⚠️ Failed to save appointment to database (continuing anyway):', dbError);
      
      if (dbError.includes('does not exist')) {
        console.error('🔧 SOLUTION: Run "yarn prisma db push" to create the database tables');
      }
      
      // Create a temporary appointment object for email purposes
      appointment = {
        id: 'temp-' + Date.now(),
        clientName,
        clientEmail,
        clientPhone: clientPhone || null,
        service,
        date: appointmentDate,
        time,
        duration,
        notes: notes || null,
        language,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      } as any;
    }

    // ALWAYS try to send confirmation email (even if DB failed)
    const formattedDate = appointmentDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    console.log('📧 Attempting to send appointment confirmation emails...');
    const emailResult = await sendAppointmentConfirmation({
      clientName,
      clientEmail,
      clientPhone: clientPhone || undefined,
      service,
      date: formattedDate,
      time,
      notes: notes || undefined,
      language
    });

    console.log('📧 Email result:', emailResult);

    // Return success if email was sent, even if DB failed
    if (emailResult.success) {
      return NextResponse.json(
        { 
          message: 'Appointment booked successfully', 
          appointment,
          emailSent: true,
          dbSaved: !dbError,
          dbError: dbError || undefined
        },
        { status: 201 }
      )
    } else {
      // Email failed but appointment might be saved
      return NextResponse.json(
        { 
          message: dbError 
            ? 'Appointment received but email failed. Please check email configuration.' 
            : 'Appointment booked but email failed.',
          appointment,
          emailSent: false,
          emailMessage: emailResult.message,
          emailError: emailResult.error,
          dbSaved: !dbError,
          dbError: dbError || undefined
        },
        { status: 201 } // Still 201 because appointment was processed
      )
    }
  } catch (error) {
    console.error('❌ Appointment booking error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { message: 'Failed to book appointment', error: errorMessage },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: [
        { date: 'asc' },
        { time: 'asc' }
      ],
      take: 50
    })

    return NextResponse.json(appointments)
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json(
      { message: 'Failed to fetch appointments' },
      { status: 500 }
    )
  }
}
