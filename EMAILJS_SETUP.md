# EmailJS Setup Guide

This guide will help you configure EmailJS to receive form submissions via email.

## Step 1: Sign Up for EmailJS

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Create a free account (200 emails/month on free tier)
3. Verify your email address

## Step 2: Add Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the connection instructions for your provider
5. **Copy the Service ID** (you'll need this)

## Step 3: Create Email Templates

You need to create templates for each form type:

### Private Session Template
1. Go to **Email Templates** → **Create New Template**
2. Template name: "Private Session Request"
3. Subject: `New Private Session Request from {{name}}`
4. Content:
   ```
   New Private Session Request
   
   Name: {{name}}
   Email: {{email}}
   Preferred Date: {{date}}
   
   This request was sent from the FAZA GAZELLES website.
   ```
5. **Copy the Template ID**

### Field Trip Template
1. Create New Template
2. Template name: "Field Trip Request"
3. Subject: `Field Trip Request from {{school}}`
4. Content:
   ```
   Field Trip Request
   
   School: {{school}}
   Contact Email: {{email}}
   Number of Students: {{students}}
   
   This request was sent from the FAZA GAZELLES website.
   ```
5. **Copy the Template ID**

### Newsletter Template
1. Create New Template
2. Template name: "Newsletter Subscription"
3. Subject: `New Newsletter Subscription`
4. Content:
   ```
   New Newsletter Subscription
   
   Email: {{email}}
   
   This subscription was sent from the FAZA GAZELLES website.
   ```
5. **Copy the Template ID**

## Step 4: Get Your Public Key

1. Go to **Account** → **General** → **API Keys**
2. Copy your **Public Key**

## Step 5: Configure the Website

1. Open `js/emailjs-config.js`
2. Replace the placeholder values with your actual credentials:

```javascript
const EMAILJS_CONFIG = {
  publicKey: 'YOUR_PUBLIC_KEY_HERE',  // ← Replace with your Public Key
  serviceId: 'YOUR_SERVICE_ID_HERE',  // ← Replace with your Service ID
  templates: {
    privateSession: 'YOUR_PRIVATE_SESSION_TEMPLATE_ID',  // ← Replace with Template ID
    fieldTrip: 'YOUR_FIELD_TRIP_TEMPLATE_ID',           // ← Replace with Template ID
    newsletter: 'YOUR_NEWSLETTER_TEMPLATE_ID'           // ← Replace with Template ID
  },
  recipientEmail: 'hello@fazagazelles.org'  // ← Update if needed
};
```

## Step 6: Test

1. Open your website in a browser
2. Fill out and submit a form
3. Check your email inbox for the submission

## Notes

- The free tier allows 200 emails per month
- All form submissions will be sent to the email address configured in your EmailJS service
- Make sure the variable names in your templates match the form data ({{name}}, {{email}}, etc.)
- If you get errors, check the browser console (F12) for detailed error messages

## Troubleshooting

- **"Email service not configured"**: Make sure you've updated `emailjs-config.js` with your credentials
- **Email not received**: Check your EmailJS dashboard → Logs to see if emails were sent
- **Template errors**: Verify that template variable names match exactly (case-sensitive)

