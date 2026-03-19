import { logger } from '../utils/logger.js';

/**
 * Google Sheets Service
 * Sends contact form data to Google Sheets via webhook
 */
export const googleSheetsService = {
  /**
   * Add contact form submission to Google Sheet
   * @param {Object} data - Contact form data
   * @param {string} data.fullName - Full name
   * @param {string} data.email - Email address
   * @param {string} data.phone - Phone number (optional)
   * @param {string} data.projectType - Project type (optional)
   * @param {string} data.budgetRange - Budget range (optional)
   * @param {string} data.timeline - Timeline (optional)
   * @param {string} data.projectDetails - Project details
   * @returns {Promise<Object>} Response from Google Sheets webhook
   */
  async addToSheet(data) {
    try {
      const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

      if (!webhookUrl) {
        logger.warn('Google Sheets webhook URL not configured. Skipping sheet update.');
        return { success: false, message: 'Webhook URL not configured' };
      }

      // Prepare data for Google Sheets
      // Format: timestamp, fullName, email, phone, projectType, budgetRange, timeline, projectDetails
      // IMPORTANT: Google Apps Script expects data wrapped in "fields" property
      // Format timestamp as YYYY-MM-DD (date only, no time or timezone)
      const timestamp = new Date().toISOString().split('T')[0];
      const sheetData = {
        timestamp: timestamp,
        fullName: data.fullName || '',
        email: data.email || '',
        phone: data.phone || '',
        projectType: data.projectType || '',
        budgetRange: data.budgetRange || '',
        timeline: data.timeline || '',
        projectDetails: data.projectDetails || ''
      };

      logger.info('Sending data to Google Sheets', { email: data.email });

      // Send POST request to Google Apps Script webhook
      // Wrap data in "fields" property as expected by the Google Apps Script
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields: sheetData }),
        // Google Apps Script webhooks may require mode: 'no-cors' in some cases
        // but let's try with CORS first
      });

      // Check if response is ok
      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 403) {
          throw new Error(
            'Google Sheets webhook returned 403 (Access denied). ' +
              'This usually means your Google Apps Script Web App is not deployed with public access. ' +
              'In Apps Script, Deploy → Manage deployments → edit your Web app deployment and set ' +
              '"Execute as: Me" and "Who has access: Anyone" (or "Anyone with the link"), then copy the new /exec URL into GOOGLE_SHEETS_WEBHOOK_URL. ' +
              `Raw response: ${errorText}`
          );
        }
        throw new Error(`Google Sheets webhook returned status ${response.status}: ${errorText}`);
      }

      // Try to parse response (Google Apps Script may return text or JSON)
      let result;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        result = { success: true, message: 'Data sent to Google Sheets' };
      }

      logger.info('Data successfully added to Google Sheets', { 
        email: data.email,
        response: result 
      });

      return { success: true, ...result };

    } catch (error) {
      // Log error but don't throw - we don't want Google Sheets failures to break email sending
      logger.error('Error adding data to Google Sheets', {
        error: error.message,
        stack: error.stack,
        email: data.email
      });

      return { 
        success: false, 
        message: error.message || 'Failed to add data to Google Sheets',
        error: error.message
      };
    }
  }
};
