# Marvelone-3D Backend API

Backend server for handling Marvelone-3D contact form submissions.

## Features

- ✅ POST endpoint `/api/contact` for contact form submissions
- ✅ Input validation (name, email, message)
- ✅ Email sending via Nodemailer (Gmail)
- ✅ Google Sheets integration (automatically saves submissions)
- ✅ CORS configuration for frontend integration
- ✅ Error handling and logging
- ✅ Environment variable configuration

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security** → **2-Step Verification** (enable it if not already enabled)
3. Scroll down to **App passwords**
4. Select **Mail** and **Other (Custom name)**
5. Enter "Marvelone-3D Backend" as the name
6. Click **Generate**
7. Copy the 16-character password (spaces will be removed automatically)

### 3. Create `.env` File

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` and fill in your credentials:

```env
PORT=3000
NODE_ENV=development
# Frontend URL(s) for CORS (comma-separated)
# Local dev:
# FRONTEND_URL=http://localhost:8080
# Hosted:
# FRONTEND_URL=https://marvelone3d.com,https://www.marvelone3d.com
FRONTEND_URL=http://localhost:8080
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
RECIPIENT_EMAIL=sudharsandeveloper26@gmail.com
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfycbwnuHWW2iQtPzrFJ13SKaWZ18ZkGhE9XA7V6Qbxn6IIG2EmZyXOictAZGIFVXn7m1-RMQ/exec
```

**Important:** 
- Use your Gmail address for `GMAIL_USER`
- Use the App Password (not your regular Gmail password) for `GMAIL_APP_PASSWORD`
- The App Password is 16 characters without spaces

### 4. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in `.env`).

### 5. Test the API

You can test the endpoint using curl:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "phone": "9344673962",
    "projectType": "Product animation",
    "budgetRange": "$1,000 - $3,000",
    "timeline": "2 weeks",
    "projectDetails": "This is a test submission"
  }'
```

Production (hosted) example:

```bash
curl -X POST https://api.marvelone3d.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "phone": "9344673962",
    "projectType": "Product animation",
    "budgetRange": "$1,000 - $3,000",
    "timeline": "2 weeks",
    "projectDetails": "This is a test submission"
  }'
```

Or check the health endpoint:

```bash
curl http://localhost:3000/health
```

## API Endpoints

### POST `/api/contact`

Submit a contact form.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "phone": "9344673962",
  "projectType": "Product animation",
  "budgetRange": "$1,000 - $3,000",
  "timeline": "2 weeks",
  "projectDetails": "I would like to create a 3D product animation for my new product launch."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Your message has been sent successfully! We will get back to you soon."
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```

### GET `/health`

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "Backend is running"
}
```

## Project Structure

```
backend_marvelone-3d/
├── controllers/
│   └── contactController.js    # Contact form controller
├── middleware/
│   ├── errorHandler.js         # Global error handler
│   └── validation.js           # Input validation middleware
├── routes/
│   └── contactRoutes.js        # Contact form routes
├── services/
│   ├── emailService.js         # Email service (Nodemailer)
│   └── googleSheetsService.js  # Google Sheets integration
├── utils/
│   └── logger.js               # Logging utility
├── .env                        # Environment variables (create from .env.example)
├── .env.example                # Example environment variables
├── .gitignore
├── package.json
├── README.md
└── server.js                   # Main server file
```

## Troubleshooting

### Email Not Sending

1. **Check Gmail App Password:** Make sure you're using the App Password, not your regular password
2. **Verify 2-Step Verification:** App passwords require 2-Step Verification to be enabled
3. **Check .env file:** Ensure all variables are set correctly
4. **Check logs:** The server logs will show detailed error messages

### CORS Errors

- Ensure `FRONTEND_URL` in `.env` matches your frontend URL exactly
- If frontend runs on a different port, update `FRONTEND_URL`

### Port Already in Use

- Change `PORT` in `.env` to a different port (e.g., 3001)
- Update frontend API URL accordingly

## Security Notes

- Never commit `.env` file to version control
- Keep your App Password secure
- In production, use environment variables from your hosting platform
- Consider rate limiting for production deployments
