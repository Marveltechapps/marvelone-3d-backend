import nodemailer from 'nodemailer';
import { logger } from '../utils/logger.js';

// Create reusable transporter
const createTransporter = () => {
  // Get and clean credentials
  const gmailUser = process.env.GMAIL_USER?.trim();
  let gmailPassword = process.env.GMAIL_APP_PASSWORD?.trim() || '';
  
  // Remove all spaces from App Password (Gmail App Passwords sometimes have spaces)
  gmailPassword = gmailPassword.replace(/\s+/g, '');

  // Validate credentials
  if (!gmailUser || !gmailPassword) {
    throw new Error('Gmail credentials not configured. Please check your .env file.');
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(gmailUser)) {
    throw new Error('GMAIL_USER must be a valid email address.');
  }

  // Validate App Password format (should be 16 characters after removing spaces)
  if (gmailPassword.length !== 16) {
    logger.warn('Gmail App Password length is not 16 characters. Make sure you are using an App Password, not your regular password.');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailPassword
    }
  });
};

export const emailService = {
  async sendEmail({ to, subject, html, text }) {
    try {
      // Validate required environment variables
      if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        const errorMsg = 'Gmail credentials not configured. Please check your .env file.';
        logger.error(errorMsg, {
          hasGmailUser: !!process.env.GMAIL_USER,
          hasGmailPassword: !!process.env.GMAIL_APP_PASSWORD
        });
        throw new Error(errorMsg);
      }

      const transporter = createTransporter();

      // Verify transporter configuration
      await transporter.verify();
      logger.info('Email transporter verified successfully');

      // Send email
      const info = await transporter.sendMail({
        from: `"Marvelone-3D Contact Form" <${process.env.GMAIL_USER.trim()}>`,
        to,
        subject,
        html,
        text
      });

      logger.info('Email sent successfully', { 
        messageId: info.messageId,
        to 
      });

      return info;
    } catch (error) {
      // Provide more helpful error messages
      let errorMessage = error.message;
      
      if (error.code === 'EAUTH' || error.message.includes('Invalid login') || error.message.includes('BadCredentials')) {
        errorMessage = 'Gmail authentication failed. Please check:\n' +
          '1. You are using a Gmail App Password (not your regular password)\n' +
          '2. 2-Step Verification is enabled on your Google account\n' +
          '3. The App Password is correct (16 characters, no spaces)\n' +
          '4. Your Gmail address is correct\n' +
          'Get App Password from: https://myaccount.google.com/apppasswords';
      } else if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
        errorMessage = 'Cannot connect to Gmail servers. Please check your internet connection.';
      }

      logger.error('Error sending email', { 
        error: errorMessage,
        code: error.code,
        command: error.command,
        response: error.response
      });
      
      throw new Error(`Failed to send email: ${errorMessage}`);
    }
  }
};
