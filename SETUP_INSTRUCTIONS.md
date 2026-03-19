# Complete Setup Instructions for Marvelone-3D Backend Integration

Follow these steps **exactly** to set up and run your backend with the frontend.

## Step 1: Navigate to Backend Directory

```bash
cd C:\Users\Welcome\Desktop\demoplotray\backend_demoMarvelone-3D\backend_marvelone-3d
```

## Step 2: Install Backend Dependencies

```bash
npm install
```

This will install:
- express
- nodemailer
- cors
- dotenv
- express-validator

## Step 3: Set Up Gmail App Password

### 3.1 Enable 2-Step Verification
1. Go to https://myaccount.google.com/
2. Click on **Security** in the left sidebar
3. Under "Signing in to Google", find **2-Step Verification**
4. If not enabled, click it and follow the setup process

### 3.2 Generate App Password
1. Still in **Security** settings
2. Scroll down to **App passwords** (you'll only see this if 2-Step Verification is enabled)
3. Click **App passwords**
4. Select:
   - **App**: Mail
   - **Device**: Other (Custom name)
   - Enter: `Marvelone-3D Backend`
5. Click **Generate**
6. **Copy the 16-character password** (it will look like: `abcd efgh ijkl mnop`)
   - Remove spaces when using it (it becomes: `abcdefghijklmnop`)

## Step 4: Create .env File

1. In the backend folder, create a new file named `.env` (no extension)
2. Copy the content below and fill in your details:

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
GMAIL_APP_PASSWORD=abcdefghijklmnop

# Recipient Email (where contact form emails will be sent)
RECIPIENT_EMAIL=sudharsandeveloper26@gmail.com
```

**Important:**
- Replace `your-email@gmail.com` with your actual Gmail address
- Replace `abcdefghijklmnop` with the 16-character App Password (no spaces)
- Keep `RECIPIENT_EMAIL` as `sudharsandeveloper26@gmail.com` (or change if needed)

## Step 5: Start the Backend Server

```bash
npm run dev
```

You should see:
```
[timestamp] [INFO] Server running on port 3000
[timestamp] [INFO] Environment: development
```

**Keep this terminal window open!** The server needs to keep running.

## Step 6: Configure Frontend (Optional - for custom API URL)

If your backend runs on a different port or URL, create a `.env` file in the frontend root:

1. Navigate to: `C:\Users\Welcome\Desktop\demoplotray\marvelone-3d-main`
2. Create `.env` file with:
```env
VITE_API_URL=http://localhost:3000/api
```

**Note:** By default, the frontend is already configured to use `http://localhost:3000/api`, so this step is only needed if you change the backend port.

## Step 7: Start the Frontend

Open a **new terminal window** and run:

```bash
cd C:\Users\Welcome\Desktop\demoplotray\marvelone-3d-main
npm run dev
```

The frontend will start on `http://localhost:8080`

## Step 8: Test the Integration

1. Open your browser and go to: `http://localhost:8080/contact`
2. Fill out the contact form:
   - First Name: Test
   - Last Name: User
   - Email: test@example.com
   - Phone: +1234567890 (optional)
   - Subject: Test Subject
   - Message: This is a test message
3. Click **Send Message**
4. You should see a success toast notification
5. Check the email inbox for `sudharsandeveloper26@gmail.com` - you should receive the email!

## Troubleshooting

### Backend won't start
- **Error: "Cannot find module"**: Run `npm install` again
- **Error: "Port 3000 already in use"**: Change `PORT=3001` in `.env` and update frontend `.env` accordingly

### Email not sending
- **"Gmail credentials not configured"**: Check your `.env` file - make sure `GMAIL_USER` and `GMAIL_APP_PASSWORD` are set
- **"Invalid login"**: You're using your regular password instead of App Password. Generate a new App Password.
- **"Less secure app access"**: Make sure you're using an App Password, not your regular password

### CORS errors in browser console
- Make sure `FRONTEND_URL` in backend `.env` matches your frontend URL exactly
- Local dev default: `FRONTEND_URL=http://localhost:8080`
- Hosted example: `FRONTEND_URL=https://marvelone3d.com,https://www.marvelone3d.com`

### Form submission fails
- Check that backend is running (you should see logs in the backend terminal)
- Check browser console for errors
- Verify the API URL in `contactService.ts` matches your backend URL

### Network errors
- Ensure both frontend and backend are running
- Check that backend is on port 3000 (or the port you configured)
- Verify no firewall is blocking the connection

## File Structure Summary

```
demoplotray/
├── marvelone-3d-main/               # Frontend
│   ├── src/
│   │   ├── services/
│   │   │   └── contactService.ts   # API service (✅ Created)
│   │   └── pages/
│   │       └── Contact.tsx         # Contact form (✅ Updated)
│   └── .env                        # Optional: API URL config
│
└── backend_demoMarvelone-3D/
    └── backend_marvelone-3d/        # Backend
        ├── controllers/
        │   └── contactController.js
        ├── middleware/
        │   ├── errorHandler.js
        │   └── validation.js
        ├── routes/
        │   └── contactRoutes.js
        ├── services/
        │   └── emailService.js
        ├── utils/
        │   └── logger.js
        ├── server.js
        ├── package.json
        ├── .env                     # ⚠️ Create this with your credentials
        └── README.md
```

## Quick Reference Commands

**Backend:**
```bash
cd C:\Users\Welcome\Desktop\demoplotray\backend_demoMarvelone-3D\backend_marvelone-3d
npm install
npm run dev
```

**Frontend:**
```bash
cd C:\Users\Welcome\Desktop\demoplotray\marvelone-3d-main
npm run dev
```

## Next Steps (Optional Improvements)

1. **Rate Limiting**: Add rate limiting to prevent spam
2. **Email Templates**: Use HTML email templates for better formatting
3. **Database**: Store submissions in a database
4. **Environment-specific configs**: Separate dev/prod configurations
5. **Deployment**: Deploy to services like Heroku, Railway, or Vercel

## Support

If you encounter issues:
1. Check the backend terminal for error logs
2. Check browser console (F12) for frontend errors
3. Verify all environment variables are set correctly
4. Ensure both servers are running
