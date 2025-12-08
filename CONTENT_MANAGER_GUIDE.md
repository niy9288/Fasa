# FASA GAZELLES Content Management System

## Quick Start Guide for Content Managers

This guide helps you manage all content (blog posts, events, gallery items, social media) without writing any code.

---

## 🚀 How to Access the Admin Dashboard

1. Open your browser and go to: `admin.html`
   - Example: `http://yoursite.com/admin.html`
   - Or locally: Open `admin.html` in VS Code with Live Server

2. **Login** with your admin password (default: `change-me-123`)
   - ⚠️ **IMPORTANT**: Change this password in `js/admin.js` for security

3. You're now in the Content Manager!

---

## 📋 Managing Content

### 📝 Blog Posts

**To add a new blog post:**
1. Click the **"📝 Blog Posts"** tab
2. Fill in the form fields:
   - **Title**: The main heading (e.g., "Reading Tips for Parents")
   - **URL Slug**: A URL-friendly version without spaces (e.g., "reading-tips-parents")
   - **Date**: When the post was published
   - **Excerpt**: A short summary for previews (1-2 sentences)
   - **Full Content**: The complete blog post text
3. Click **"Add Blog Post"**
4. Your post appears in the list below
5. To **edit** or **delete**, use the buttons next to each post

**Tips:**
- Keep excerpts concise (they appear on the blog page preview)
- Use clear, descriptive titles
- Dates should be in YYYY-MM-DD format

---

### 📅 Events

**To add a new event:**
1. Click the **"📅 Events"** tab
2. Fill in the event details:
   - **Event Title**: Full event name (e.g., "Art Workshop: Watercolor Gardens")
   - **Category**: Choose from predefined types (Story Hours, Art Workshops, Movie Nights, etc.)
   - **Date & Time**: When the event happens
   - **Age Group**: Target audience (e.g., "3-6", "7+", "All ages", "Adults")
   - **Materials Needed**: What participants should bring
   - **Description**: Detailed explanation of the event
   - **Learning Outcomes**: Skills/knowledge participants will gain (comma-separated)
3. Click **"Add Event"**
4. Manage existing events with Edit/Delete buttons

**Tips:**
- Be specific about age groups
- List learning outcomes to help parents understand the value
- Include material costs if applicable

---

### 🖼️ Gallery

**To add a gallery item:**
1. Click the **"🖼️ Gallery"** tab
2. Enter the artwork details:
   - **Title**: Name of the piece
   - **Artist/Creator**: Who made it
   - **Category**: Current Exhibits, Permanent Collection, Clothes, Children's Art, etc.
   - **Medium**: Type of art (Photography, Textile, Painting, Drawing, etc.)
   - **Story/Description**: Tell the story behind the work
   - **Image Path**: File location (e.g., `images/IMG-20251011-WA0030.png`)
3. Click **"Add Gallery Item"**

**Tips:**
- Use descriptive stories to engage visitors
- Keep image paths consistent with your folder structure
- Upload images to the `images/` folder first
- Organize items by category for better browsing

---

### 📱 Social Media

**To add a social media post or link:**
1. Click the **"📱 Social Media"** tab
2. Fill in the post details:
   - **Title**: Post title
   - **Type**: Platform (YouTube, TikTok, Instagram, Facebook, or General)
   - **URL/Link**: The full link to the post
   - **Date**: When you posted it
   - **Description**: What the post is about
3. Click **"Add Social Post"**

**Tips:**
- Include full URLs (starting with https://)
- Categorize by platform for easy organization
- Descriptions help viewers understand what to expect

---

## 🔐 Security & Passwords

### Change Your Admin Password

1. Open `js/admin.js` in a text editor
2. Find this line (near the top):
   ```javascript
   const ADMIN_PASSWORD = "change-me-123";
   ```
3. Replace `"change-me-123"` with a strong password:
   ```javascript
   const ADMIN_PASSWORD = "your-super-secret-password";
   ```
4. Save the file
5. Your new password will work immediately!

**Password Tips:**
- Use a mix of letters, numbers, and symbols
- Make it at least 10 characters long
- Don't share it publicly
- Write it down somewhere safe

---

## 💾 Backup & Export

Your content is saved in your browser's local storage. To backup:

1. **Browser Data**: Content is automatically saved in browser storage
2. **Manual Export** (coming soon): Feature to download data as JSON

To protect your content:
- Clear browser cache regularly
- Consider exporting data periodically
- Use the "Private Browsing" mode only for testing

---

## 🔧 Technical Details

### Where is data stored?

- All content is stored in **browser localStorage**
- Each category has its own storage key:
  - `blog_data` - Blog posts
  - `events_data` - Events
  - `gallery_data` - Gallery items
  - `social_data` - Social media posts

### Data Structure

**Blog Post:**
```json
{
  "slug": "reading-tips-parents",
  "title": "Reading Tips for Parents",
  "date": "2025-10-01",
  "excerpt": "Simple routines...",
  "content": "Full blog content..."
}
```

**Event:**
```json
{
  "id": "story-hour-fox",
  "title": "Story Hour: The Clever Little Fox",
  "category": "Story Hours",
  "start": "2026-12-05T10:00:00",
  "age": "3-6",
  "materials": "None",
  "outcomes": ["Listening", "Imagination"],
  "description": "A lively storytelling..."
}
```

**Gallery Item:**
```json
{
  "id": "library-view",
  "title": "Library View",
  "artist": "The Palm Tree",
  "category": "Current Exhibits",
  "medium": "Photography",
  "story": "A beautiful view...",
  "image": "images/IMG-20251011-WA0030.png"
}
```

**Social Media Post:**
```json
{
  "type": "youtube",
  "title": "Library Tour Video",
  "description": "Take a virtual tour...",
  "url": "https://www.youtube.com/watch?v=...",
  "date": "2025-10-15"
}
```

---

## ❓ Troubleshooting

### Forgotten Password?
Edit `js/admin.js` and change the password line to a new one you know.

### Content Not Appearing on Site?
Make sure the front-end pages are pulling from localStorage. Check that `blog.js`, `events.js`, and `gallery.js` are configured to read from localStorage.

### Lost All My Content?
If you cleared browser storage, your data is gone unless you have a backup. Always backup important content!

### Can't Login?
1. Check for typos in the password
2. Make sure Caps Lock is off
3. Try clearing browser cookies for the site
4. Check the `ADMIN_PASSWORD` value in `js/admin.js`

---

## 📞 Support

For technical issues:
- Check the browser console (F12) for error messages
- Ensure JavaScript is enabled
- Try a different browser to test
- Contact your web developer for help

---

## 🎯 Best Practices

1. **Regular Backups**: Periodically save/export your data
2. **Clear Descriptions**: Write engaging, clear content
3. **Consistent Naming**: Use similar naming conventions for slugs and IDs
4. **Date Formats**: Always use YYYY-MM-DD for dates
5. **Image Paths**: Double-check image paths match actual file locations
6. **Content Review**: Proofread before publishing
7. **Update Frequency**: Keep content fresh and relevant

---

## 📊 Content Checklist

Before publishing:
- [ ] Title is clear and engaging
- [ ] Date is correct
- [ ] All fields are filled out
- [ ] Spelling and grammar are correct
- [ ] Links are working (for social media)
- [ ] Image paths are correct (for gallery)
- [ ] Age groups are accurate (for events)

---

## 🚀 Next Steps

1. Change your admin password
2. Add your first piece of content
3. Test that it appears on the main website
4. Share the admin link with other content managers if needed
5. Keep the password safe!

---

**Happy content managing! 🎉**
