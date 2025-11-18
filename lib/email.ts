
import nodemailer from 'nodemailer';

// Email configuration
const getEmailConfig = () => {
  // For Gmail, you'll need to:
  // 1. Enable 2-factor authentication in your Google account
  // 2. Generate an "App Password" in Google Account settings
  // 3. Use that app password as EMAIL_PASSWORD
  
  // Clean password - remove any spaces (Gmail app passwords sometimes have spaces)
  const emailPassword = (process.env.EMAIL_PASSWORD || '').trim().replace(/\s+/g, '');
  const emailUser = (process.env.EMAIL_USER || 'franklin.tejadag@gmail.com').trim();
  const emailHost = process.env.EMAIL_HOST || 'smtp.gmail.com';
  const emailPort = parseInt(process.env.EMAIL_PORT || '587');
  
  return {
    host: emailHost,
    port: emailPort,
    secure: emailPort === 465, // true for 465, false for other ports
    requireTLS: emailPort === 587, // Require TLS for port 587
    auth: {
      user: emailUser,
      pass: emailPassword // App password from Gmail (spaces removed)
    },
    tls: {
      // Do not fail on invalid certificates
      rejectUnauthorized: false
    }
  };
};

// Create reusable transporter
const createTransporter = () => {
  try {
    const config = getEmailConfig();
    
    // Validate configuration
    if (!config.auth.user) {
      console.error('❌ EMAIL_USER not configured. Please set EMAIL_USER in .env');
      return null;
    }
    
    if (!config.auth.pass) {
      console.warn('⚠️ EMAIL_PASSWORD not configured. Emails will not be sent.');
      console.warn('   To fix: Generate an App Password from Gmail and set EMAIL_PASSWORD in .env');
      return null;
    }
    
    // Log configuration (without password)
    console.log('📧 Email configuration:');
    console.log('   Host:', config.host);
    console.log('   Port:', config.port);
    console.log('   User:', config.auth.user);
    console.log('   Password:', config.auth.pass ? '***' + config.auth.pass.slice(-4) : 'NOT SET');
    
    const transporter = nodemailer.createTransport(config);
    
    // Verify connection
    transporter.verify((error, success) => {
      if (error) {
        console.error('❌ Email transporter verification failed:', error.message);
        console.error('   Common issues:');
        console.error('   1. Invalid App Password - Generate a new one from Gmail');
        console.error('   2. 2FA not enabled - Enable it in Google Account settings');
        console.error('   3. Spaces in password - Should be removed automatically');
        console.error('   4. Wrong email address - Check EMAIL_USER in .env');
      } else {
        console.log('✅ Email transporter verified successfully');
      }
    });
    
    return transporter;
  } catch (error) {
    console.error('❌ Error creating email transporter:', error);
    if (error instanceof Error) {
      console.error('   Error message:', error.message);
    }
    return null;
  }
};

// Email templates
const getAppointmentEmailTemplate = (data: {
  clientName: string;
  service: string;
  date: string;
  time: string;
  clientEmail: string;
  clientPhone?: string;
  notes?: string;
  language: string;
}) => {
  const messages = {
    en: {
      subject: '✅ Appointment Confirmed - Derly Barbershop',
      greeting: 'Hello',
      confirmed: 'Your appointment has been confirmed!',
      details: 'Appointment Details:',
      service: 'Service',
      date: 'Date',
      time: 'Time',
      notes: 'Notes',
      contact: 'If you need to reschedule or cancel, please contact us',
      thanks: 'We look forward to seeing you!',
      signature: 'Derly - Barbería Latina'
    },
    es: {
      subject: '✅ Cita Confirmada - Derly Barbershop',
      greeting: 'Hola',
      confirmed: '¡Tu cita ha sido confirmada!',
      details: 'Detalles de la Cita:',
      service: 'Servicio',
      date: 'Fecha',
      time: 'Hora',
      notes: 'Notas',
      contact: 'Si necesitas reprogramar o cancelar, por favor contáctanos',
      thanks: '¡Esperamos verte pronto!',
      signature: 'Derly - Barbería Latina'
    },
    fr: {
      subject: '✅ Rendez-vous Confirmé - Derly Barbershop',
      greeting: 'Bonjour',
      confirmed: 'Votre rendez-vous a été confirmé!',
      details: 'Détails du Rendez-vous:',
      service: 'Service',
      date: 'Date',
      time: 'Heure',
      notes: 'Notes',
      contact: 'Si vous devez reporter ou annuler, veuillez nous contacter',
      thanks: 'Nous avons hâte de vous voir!',
      signature: 'Derly - Barbería Latina'
    }
  };

  const lang = data.language as keyof typeof messages;
  const t = messages[lang] || messages.en;

  return {
    subject: t.subject,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316; }
          .detail-row { margin: 10px 0; }
          .label { font-weight: bold; color: #f97316; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Derly</h1>
            <p style="margin: 0; opacity: 0.9;">Barbería Latina</p>
          </div>
          <div class="content">
            <h2>${t.greeting} ${data.clientName},</h2>
            <p style="font-size: 18px; color: #059669;">✅ ${t.confirmed}</p>
            
            <div class="details">
              <h3>${t.details}</h3>
              <div class="detail-row">
                <span class="label">${t.service}:</span> ${data.service}
              </div>
              <div class="detail-row">
                <span class="label">${t.date}:</span> ${data.date}
              </div>
              <div class="detail-row">
                <span class="label">${t.time}:</span> ${data.time}
              </div>
              ${data.notes ? `
              <div class="detail-row">
                <span class="label">${t.notes}:</span> ${data.notes}
              </div>
              ` : ''}
            </div>
            
            <p>${t.contact}:</p>
            <p style="margin: 5px 0;">📧 franklin.tejadag@gmail.com</p>
            <p style="margin: 5px 0;">📱 ${data.clientPhone || '+1 (514) XXX-XXXX'}</p>
            
            <p style="margin-top: 30px;">${t.thanks}</p>
            
            <div class="footer">
              <strong>${t.signature}</strong><br>
              Montreal, Quebec
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  };
};

const getContactNotificationTemplate = (data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) => {
  return {
    subject: `📩 New Contact Form Submission - ${data.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1f2937; color: white; padding: 20px; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6; }
          .message-box { background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b; }
          .label { font-weight: bold; color: #3b82f6; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>📩 New Contact Form Submission</h2>
          </div>
          <div class="content">
            <div class="info-box">
              <p><span class="label">From:</span> ${data.name}</p>
              <p><span class="label">Email:</span> <a href="mailto:${data.email}">${data.email}</a></p>
              ${data.phone ? `<p><span class="label">Phone:</span> ${data.phone}</p>` : ''}
              ${data.subject ? `<p><span class="label">Subject:</span> ${data.subject}</p>` : ''}
            </div>
            
            <div class="message-box">
              <p><strong>Message:</strong></p>
              <p>${data.message.replace(/\n/g, '<br>')}</p>
            </div>
            
            <p style="margin-top: 30px; font-size: 12px; color: #666;">
              This notification was sent from your Derly Barbershop website contact form.
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  };
};

// Send appointment confirmation email
export async function sendAppointmentConfirmation(appointmentData: {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
  language?: string;
}) {
  const transporter = createTransporter();
  
  if (!transporter) {
    console.log('📧 Email not sent (transporter not configured)');
    return { success: false, message: 'Email configuration missing' };
  }

  const emailTemplate = getAppointmentEmailTemplate({
    ...appointmentData,
    language: appointmentData.language || 'en'
  });

  try {
    const emailUser = (process.env.EMAIL_USER || '').trim();
    
    if (!emailUser) {
      throw new Error('EMAIL_USER is not configured');
    }
    
    // Send to client
    console.log(`📤 Sending appointment confirmation to: ${appointmentData.clientEmail}`);
    await transporter.sendMail({
      from: `"Derly Barbería Latina" <${emailUser}>`,
      to: appointmentData.clientEmail,
      subject: emailTemplate.subject,
      html: emailTemplate.html
    });
    console.log('✅ Client confirmation email sent');

    // Send notification to owner
    console.log(`📤 Sending appointment notification to: ${emailUser}`);
    await transporter.sendMail({
      from: `"Derly Website" <${emailUser}>`,
      to: emailUser,
      subject: `🗓️ New Appointment - ${appointmentData.clientName}`,
      html: `
        <h2>New Appointment Booked</h2>
        <p><strong>Client:</strong> ${appointmentData.clientName}</p>
        <p><strong>Email:</strong> ${appointmentData.clientEmail}</p>
        <p><strong>Phone:</strong> ${appointmentData.clientPhone || 'Not provided'}</p>
        <p><strong>Service:</strong> ${appointmentData.service}</p>
        <p><strong>Date:</strong> ${appointmentData.date}</p>
        <p><strong>Time:</strong> ${appointmentData.time}</p>
        ${appointmentData.notes ? `<p><strong>Notes:</strong> ${appointmentData.notes}</p>` : ''}
      `
    });
    console.log('✅ Owner notification email sent');

    console.log('✅ All appointment confirmation emails sent successfully');
    return { success: true, message: 'Emails sent successfully' };
  } catch (error) {
    console.error('❌ Error sending appointment email:', error);
    
    // Provide detailed error information
    let errorMessage = 'Failed to send email';
    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Common error messages and solutions
      if (errorMessage.includes('Invalid login') || errorMessage.includes('535')) {
        console.error('   🔧 Solution: Check your EMAIL_PASSWORD (App Password) in .env');
        console.error('      - Make sure you generated a new App Password from Gmail');
        console.error('      - Ensure 2FA is enabled in your Google account');
        console.error('      - Remove any spaces from the password');
      } else if (errorMessage.includes('Connection timeout') || errorMessage.includes('ETIMEDOUT')) {
        console.error('   🔧 Solution: Check your internet connection and firewall settings');
      } else if (errorMessage.includes('ENOTFOUND') || errorMessage.includes('ECONNREFUSED')) {
        console.error('   🔧 Solution: Check EMAIL_HOST and EMAIL_PORT in .env');
        console.error('      - For Gmail: EMAIL_HOST=smtp.gmail.com, EMAIL_PORT=587');
      }
    }
    
    return { 
      success: false, 
      message: errorMessage,
      error: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : error
    };
  }
}

// Send contact form notification
export async function sendContactNotification(contactData: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  console.log('📧 Attempting to send contact notification...');
  
  const transporter = createTransporter();
  
  if (!transporter) {
    console.log('❌ Email not sent (transporter not configured)');
    return { success: false, message: 'Email configuration missing' };
  }

  const emailTemplate = getContactNotificationTemplate(contactData);

  try {
    const emailUser = (process.env.EMAIL_USER || '').trim();
    
    if (!emailUser) {
      throw new Error('EMAIL_USER is not configured');
    }
    
    console.log(`📤 Sending contact notification to: ${emailUser}`);
    
    // Send notification to owner
    const info = await transporter.sendMail({
      from: `"Derly Website" <${emailUser}>`,
      to: emailUser,
      replyTo: contactData.email,
      subject: emailTemplate.subject,
      html: emailTemplate.html
    });

    console.log('✅ Contact notification email sent successfully');
    console.log('   Message ID:', info.messageId);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('❌ Error sending contact email:', error);
    
    // Provide detailed error information
    let errorMessage = 'Failed to send email';
    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Common error messages and solutions
      if (errorMessage.includes('Invalid login') || errorMessage.includes('535')) {
        console.error('   🔧 Solution: Check your EMAIL_PASSWORD (App Password) in .env');
        console.error('      - Make sure you generated a new App Password from Gmail');
        console.error('      - Ensure 2FA is enabled in your Google account');
        console.error('      - Remove any spaces from the password');
        console.error('      - The password should be 16 characters without spaces');
      } else if (errorMessage.includes('Connection timeout') || errorMessage.includes('ETIMEDOUT')) {
        console.error('   🔧 Solution: Check your internet connection and firewall settings');
      } else if (errorMessage.includes('ENOTFOUND') || errorMessage.includes('ECONNREFUSED')) {
        console.error('   🔧 Solution: Check EMAIL_HOST and EMAIL_PORT in .env');
        console.error('      - For Gmail: EMAIL_HOST=smtp.gmail.com, EMAIL_PORT=587');
      } else if (errorMessage.includes('550') || errorMessage.includes('553')) {
        console.error('   🔧 Solution: Check EMAIL_USER - the email address may be invalid');
      }
    }
    
    const errorDetails = error instanceof Error ? {
      message: error.message,
      stack: error.stack,
      name: error.name
    } : { message: 'Unknown error' };
    
    console.error('   Full error details:', errorDetails);
    return { success: false, message: errorMessage, error: errorDetails };
  }
}
