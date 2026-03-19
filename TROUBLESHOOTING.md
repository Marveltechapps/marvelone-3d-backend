# Troubleshooting Gmail Authentication Error

## Error: "Invalid login: Username and Password not accepted"

This error means Gmail is rejecting your credentials. Follow these steps:

### Step 1: Verify Your .env File

Make sure your `.env` file exists and has the correct format:

```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
```

**Important:**
- `GMAIL_USER` should be your full Gmail address (e.g., `john@gmail.com`)
- `GMAIL_APP_PASSWORD` should be 16 characters with NO spaces
- Do NOT use your regular Gmail password

### Step 2: Generate a New Gmail App Password

1. **Enable 2-Step Verification** (if not already enabled):
   - Go to https://myaccount.google.com/security
   - Click "2-Step Verification"
   - Follow the setup process

2. **Generate App Password**:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" as the app
   - Select "Other (Custom name)" as device
   - Enter: `Marvelone-3D Backend`
   - Click "Generate"
   - **Copy the 16-character password** (it looks like: `abcd efgh ijkl mnop`)

3. **Update .env file**:
   - Remove ALL spaces from the App Password
   - Example: `abcd efgh ijkl mnop` becomes `abcdefghijklmnop`
   - Save the `.env` file

### Step 3: Restart the Server

After updating `.env`, restart your backend server:

```bash
# Stop the server (Ctrl+C)
# Then start again:
npm run dev
```

### Step 4: Common Issues

#### Issue: "App passwords not available"
**Solution:** You must enable 2-Step Verification first. App passwords are only available after 2-Step Verification is enabled.

#### Issue: "Still getting authentication error"
**Try these:**
1. Double-check there are NO spaces in `GMAIL_APP_PASSWORD`
2. Make sure you're using the App Password, NOT your regular password
3. Verify your Gmail address is correct (no typos)
4. Generate a NEW App Password and try again
5. Make sure `.env` file is in the same folder as `server.js`

#### Issue: "Cannot find .env file"
**Solution:** 
1. Create `.env` file in `backend_marvelone-3d/` folder
2. Copy from `.env.example` if it exists
3. Make sure the file is named exactly `.env` (not `.env.txt`)

### Step 5: Test Your Credentials

You can test if your credentials work by checking the server logs when it starts. The server will try to verify the email connection.

If you see:
- ✅ `Email transporter verified successfully` - Credentials are correct!
- ❌ `Invalid login` - Check your credentials again

### Quick Checklist

- [ ] 2-Step Verification is enabled on Google account
- [ ] App Password is generated (16 characters)
- [ ] `.env` file exists in `backend_marvelone-3d/` folder
- [ ] `GMAIL_USER` is your full email address
- [ ] `GMAIL_APP_PASSWORD` has NO spaces (16 characters)
- [ ] Server was restarted after updating `.env`

### Still Having Issues?

1. **Double-check your .env file:**
   ```bash
   # Make sure these are set (without quotes):
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your16charpassword
   ```

2. **Verify App Password format:**
   - Should be exactly 16 characters
   - No spaces, dashes, or special characters
   - Only letters and numbers

3. **Generate a fresh App Password:**
   - Delete the old one
   - Generate a new one
   - Update `.env` with the new password

4. **Check server logs:**
   - Look for detailed error messages
   - The updated code now provides more helpful error messages
