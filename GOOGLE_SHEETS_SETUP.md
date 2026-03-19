# Google Sheets Integration Setup

## Overview

The backend automatically saves all contact form submissions to a Google Sheet using a Google Apps Script webhook.

## How It Works

1. User submits contact form
2. Backend sends email notification
3. Backend sends data to Google Sheets webhook (non-blocking)
4. Google Apps Script adds the data to the sheet

## Configuration

Add the following to your `.env` file:

```env
# Google Sheets Integration
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfycbwnuHWW2iQtPzrFJ13SKaWZ18ZkGhE9XA7V6Qbxn6IIG2EmZyXOictAZGIFVXn7m1-RMQ/exec

# Google Sheet URL (for reference only)
GOOGLE_SHEETS_URL=https://docs.google.com/spreadsheets/d/1GIfNAvhn2SK_J_OBFpbtEM_s9rdWNuqvdUDlrCT7BCA/edit?gid=0#gid=0
```

## Data Format

The following data is sent to Google Sheets:

- **timestamp** - ISO timestamp of submission
- **fullName** - Full name
- **email** - Email address
- **phone** - Phone number (optional)
- **projectType** - Project type (optional)
- **budgetRange** - Budget range (optional)
- **timeline** - Timeline (optional)
- **projectDetails** - Project details

## Google Apps Script Setup

Your Google Apps Script should be configured to:

1. Receive POST requests with JSON data
2. Parse the JSON data
3. Append a new row to the Google Sheet with the received data

### Example Google Apps Script Code

```javascript
function doPost(e) {
  try {
    const SHEET_ID = "YOUR_SHEET_ID_HERE";
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    const body = JSON.parse(e.postData.contents);
    const data = body.fields || {};
    
    // Add headers if this is the first row
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Full Name',
        'Email',
        'Phone',
        'Project Type',
        'Budget Range',
        'Timeline',
        'Project Details'
      ]);
    }
    
    // Append the data
    sheet.appendRow([
      data.timestamp,
      data.fullName,
      data.email,
      data.phone || '',
      data.projectType || '',
      data.budgetRange || '',
      data.timeline || '',
      data.projectDetails
    ]);
    
    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Error Handling

- If Google Sheets webhook fails, the email will still be sent
- Errors are logged but don't break the contact form submission
- Check server logs for Google Sheets errors

## Testing

1. Submit a contact form from the frontend
2. Check the Google Sheet - a new row should appear
3. Check server logs for confirmation messages

## Troubleshooting

### Data Not Appearing in Sheet

1. **Check webhook URL**: Verify `GOOGLE_SHEETS_WEBHOOK_URL` is correct in `.env`
2. **Check Google Apps Script**: Ensure the script is deployed as a web app
3. **Check permissions**: Google Apps Script needs permission to edit the sheet
4. **Check server logs**: Look for Google Sheets errors in the backend logs

### Webhook Returns Error

1. **Check script deployment**: Make sure the Google Apps Script is deployed as a web app
2. **Check execution permissions**: Set to "Anyone" or "Anyone with Google account"
3. **Check script code**: Verify the `doPost` function handles JSON correctly

### Common Issues

- **CORS errors**: Google Apps Script webhooks should handle CORS automatically
- **Timeout**: If the script takes too long, consider optimizing it
- **Format errors**: Ensure the script expects JSON format

## Notes

- The Google Sheets integration is **non-blocking** - if it fails, email sending still succeeds
- Data is sent asynchronously after email is sent
- All submissions are logged in the backend for debugging
