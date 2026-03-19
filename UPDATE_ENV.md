# Update Your .env File

## Add Google Sheets Webhook URL

Add these lines to your `.env` file:

```env
# Google Sheets Integration
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfycbwnuHWW2iQtPzrFJ13SKaWZ18ZkGhE9XA7V6Qbxn6IIG2EmZyXOictAZGIFVXn7m1-RMQ/exec

# Google Sheet URL (for reference only)
GOOGLE_SHEETS_URL=https://docs.google.com/spreadsheets/d/1GIfNAvhn2SK_J_OBFpbtEM_s9rdWNuqvdUDlrCT7BCA/edit?gid=0#gid=0
```

## Complete .env File Example

Your `.env` file should look like this:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Frontend URL(s) for CORS (comma-separated)
# Local dev:
# FRONTEND_URL=http://localhost:8080
# Hosted:
# FRONTEND_URL=https://marvelone3d.com,https://www.marvelone3d.com
FRONTEND_URL=http://localhost:8080

# Gmail Configuration
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
RECIPIENT_EMAIL=sudharsandeveloper26@gmail.com

# Google Sheets Integration
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfycbwnuHWW2iQtPzrFJ13SKaWZ18ZkGhE9XA7V6Qbxn6IIG2EmZyXOictAZGIFVXn7m1-RMQ/exec
GOOGLE_SHEETS_URL=https://docs.google.com/spreadsheets/d/1GIfNAvhn2SK_J_OBFpbtEM_s9rdWNuqvdUDlrCT7BCA/edit?gid=0#gid=0
```

## After Updating

1. Save the `.env` file
2. Restart your backend server:
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

## Test It

1. Submit a contact form from the frontend
2. Check your Google Sheet - a new row should appear automatically
3. Check server logs for confirmation
