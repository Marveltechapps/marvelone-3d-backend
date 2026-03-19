# Quick Start Guide

## 🚀 Get Running in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Create `.env` File
Copy this template and fill in your Gmail credentials:

```env
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:8080
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password
RECIPIENT_EMAIL=sudharsandeveloper26@gmail.com
```

Hosted CORS example:

```env
FRONTEND_URL=https://marvelone3d.com,https://www.marvelone3d.com
```

**Get Gmail App Password:**
1. Go to https://myaccount.google.com/apppasswords
2. Generate password for "Mail" → "Other (Marvelone-3D Backend)"
3. Copy the 16-character password (remove spaces)

### 3. Start Server
```bash
npm run dev
```

### 4. Test It
Visit: `http://localhost:8080/contact` and submit the form!

---

**Full instructions:** See `SETUP_INSTRUCTIONS.md`
