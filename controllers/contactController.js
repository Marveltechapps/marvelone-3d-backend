import { emailService } from '../services/emailService.js';
import { googleSheetsService } from '../services/googleSheetsService.js';
import { logger } from '../utils/logger.js';

export const contactController = {
  async submitContact(req, res, next) {
    try {
      const {
        fullName,
        email,
        phone,
        projectType,
        budgetRange,
        timeline,
        projectDetails
      } = req.body;

      // Prepare email content
      const emailContent = {
        to: process.env.RECIPIENT_EMAIL,
        subject: `New Project Inquiry${projectType ? `: ${projectType}` : ''}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #166534;">New Contact Form Submission</h2>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-top: 20px;">
              <p><strong>Full Name:</strong> ${fullName}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
              ${projectType ? `<p><strong>Project Type:</strong> ${projectType}</p>` : ''}
              ${budgetRange ? `<p><strong>Budget Range:</strong> ${budgetRange}</p>` : ''}
              ${timeline ? `<p><strong>Timeline:</strong> ${timeline}</p>` : ''}
              <p><strong>Project Details:</strong></p>
              <p style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
                ${String(projectDetails).replace(/\n/g, '<br>')}
              </p>
            </div>
            <p style="color: #666; font-size: 12px; margin-top: 20px;">
              This email was sent from the Marvelone-3D contact form.
            </p>
          </div>
        `,
        text: `
New Contact Form Submission

Full Name: ${fullName}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
${projectType ? `Project Type: ${projectType}` : ''}
${budgetRange ? `Budget Range: ${budgetRange}` : ''}
${timeline ? `Timeline: ${timeline}` : ''}

Project Details:
${projectDetails}
        `.trim()
      };

      // Send email
      await emailService.sendEmail(emailContent);
      logger.info('Email sent successfully', { email, projectType });

      // Add to Google Sheets (non-blocking - don't fail if this errors)
      const sheetData = { fullName, email, phone, projectType, budgetRange, timeline, projectDetails };
      const sheetResult = await googleSheetsService.addToSheet(sheetData);
      
      if (sheetResult.success) {
        logger.info('Data added to Google Sheets successfully', { email });
      } else {
        logger.warn('Failed to add data to Google Sheets (non-critical)', { 
          email, 
          error: sheetResult.message 
        });
      }

      logger.info('Contact form submitted successfully', { email, projectType });

      res.status(200).json({
        success: true,
        message: 'Your message has been sent successfully! We will get back to you soon.',
        emailSent: true,
        sheetUpdated: !!sheetResult?.success
      });

    } catch (error) {
      logger.error('Error submitting contact form', { 
        error: error.message, 
        stack: error.stack 
      });
      
      // Provide user-friendly error message
      const statusCode = error.message.includes('authentication') || error.message.includes('BadCredentials') ? 500 : 500;
      const userMessage = error.message.includes('authentication') || error.message.includes('BadCredentials')
        ? 'Email service configuration error. Please contact the administrator.'
        : error.message || 'An error occurred while sending your message. Please try again later.';
      
      res.status(statusCode).json({
        success: false,
        message: userMessage
      });
    }
  }
};
