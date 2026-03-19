# Postman Testing Guide

## API Endpoints

### Base URL
- **Local Development**: `http://localhost:3000`
- **Production (Hosted)**: `https://api.marvelone3d.com`

---

## 1. Health Check Endpoint

**GET** `/health`

### Request
- **Method**: `GET`
- **URL**: `http://localhost:3000/health`
- **Headers**: None required
- **Body**: None

### Response (200 OK)
```json
{
  "status": "ok",
  "message": "Backend is running"
}
```

---

## 2. Contact Form Submission

**POST** `/api/contact`

### Request
- **Method**: `POST`
- **URL**: `http://localhost:3000/api/contact`
- **Headers**:
  ```
  Content-Type: application/json
  ```
- **Body** (JSON):
  ```json
  {
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "projectType": "Product animation",
    "budgetRange": "$1,000 - $3,000",
    "timeline": "2 weeks",
    "projectDetails": "I would like to create a 3D product animation for my new product launch."
  }
  ```

### Required Fields
- `fullName` (string, 2-100 characters, letters/spaces/hyphens/apostrophes only)
- `email` (string, valid email format)
- `projectDetails` (string, 10-2000 characters)

### Optional Fields
- `phone` (string, valid phone format)
- `projectType` (string, max 100 characters)
- `budgetRange` (string, max 100 characters)
- `timeline` (string, max 100 characters)

### Success Response (200 OK)
```json
{
  "success": true,
  "message": "Your message has been sent successfully! We will get back to you soon.",
  "emailSent": true,
  "sheetUpdated": false
}
```

### Validation Error Response (400 Bad Request)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    },
    {
      "field": "fullName",
      "message": "Full name is required"
    }
  ]
}
```

### Server Error Response (500 Internal Server Error)
```json
{
  "success": false,
  "message": "An error occurred while sending your message. Please try again later."
}
```

---

## Postman Setup Instructions

### Step 1: Create a New Request
1. Open Postman
2. Click **New** → **HTTP Request**
3. Set method to **POST**

### Step 2: Configure the Request
1. **URL**: Enter `http://localhost:3000/api/contact`
   - For production testing: `https://api.marvelone3d.com/api/contact`
2. **Headers Tab**: 
   - Click **Add Header**
   - Key: `Content-Type`
   - Value: `application/json`

### Step 3: Add JSON Body
1. Go to **Body** tab
2. Select **raw**
3. Select **JSON** from the dropdown (on the right)
4. Paste this example JSON:
   ```json
   {
     "fullName": "John Doe",
     "email": "john.doe@example.com",
     "phone": "9344673962",
     "projectType": "Product animation",
     "budgetRange": "$1,000 - $3,000",
     "timeline": "2 weeks",
     "projectDetails": "This is a test message from Postman"
   }
   ```

### Step 4: Send Request
1. Click **Send** button
2. Check the response in the bottom panel

---

## Example Test Cases

### Test Case 1: Valid Request
```json
{
  "firstName": "Sudharsan",
  "lastName": "JS",
  "email": "dhana08@gmail.com",
  "phone": "9344673962",
  "subject": "Partnership",
  "message": "I am interested in partnership opportunities."
}
```
**Expected**: 200 OK with success message

### Test Case 2: Missing Required Field
```json
{
  "lastName": "Doe",
  "email": "test@example.com",
  "message": "Test message"
}
```
**Expected**: 400 Bad Request with validation errors

### Test Case 3: Invalid Email
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "invalid-email",
  "message": "Test message"
}
```
**Expected**: 400 Bad Request with email validation error

### Test Case 4: Message Too Short
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "test@example.com",
  "message": "Short"
}
```
**Expected**: 400 Bad Request with message length error

---

## Notes

- All requests use **JSON format** (Content-Type: application/json)
- The server uses CORS, so make sure your frontend URL is configured in `.env` if testing from browser
- The contact form endpoint sends an email AND saves to Google Sheets
- Google Sheets integration is non-blocking (won't fail the request if Sheets fails)
