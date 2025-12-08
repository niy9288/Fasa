# 🚀 Admin Dashboard - Quick Start Guide

## Welcome to Your Content Manager!

This guide will help you get started managing your website content in **5 minutes or less**.

---

## ⚡ Step 1: Access the Admin Dashboard

### Option A: From Any Website Page
1. Look for the **🔒 Login** link in the navigation menu (at the top of any page)
2. Click it to go to the admin dashboard

### Option B: Direct Access
Open this URL in your browser:
```
admin.html
```

---

## 🔑 Step 2: Login

You'll see a login form:

```
Password: _________________________ [Login]
```

**Default Password:** `change-me-123`

Type the password and click **Login**.

> ⚠️ **Important:** Change this password immediately for security!

---

## 🔐 Step 3: Change Your Password (CRITICAL!)

1. Open the file: `js/admin.js`
2. Find **line 6**:
   ```javascript
   const ADMIN_PASSWORD = "change-me-123";
   ```
3. Replace `"change-me-123"` with your own secure password:
   ```javascript
   const ADMIN_PASSWORD = "my-super-secure-password-2024";
   ```
4. Save the file
5. Your new password is active immediately! 🎉

**Password Tips:**
- Use at least 10 characters
- Mix letters, numbers, and symbols
- Don't use simple words
- Make it unique and strong

---

## 📝 Step 4: Add Your First Content

Once logged in, you'll see 4 tabs at the top:

### **📝 Blog Posts Tab**
Perfect for articles, tips, and updates

**What to fill:**
- **Title:** Post heading (e.g., "Reading Tips for Parents")
- **URL Slug:** URL-friendly version (e.g., "reading-tips-parents")
- **Date:** When published (YYYY-MM-DD format, like 2025-12-08)
- **Excerpt:** Short preview (1-2 sentences)
- **Full Content:** Complete article text

**Then click:** Add Blog Post ✅

---

### **📅 Events Tab**
For classes, workshops, story hours, etc.

**What to fill:**
- **Title:** Event name (e.g., "Story Hour: The Little Fox")
- **Category:** Pick from dropdown (Story Hours, Art Workshops, Movie Nights, etc.)
- **Date & Time:** When it happens (date + time selector)
- **Age Group:** Who it's for (e.g., "3-6", "7+", "All ages")
- **Materials:** What to bring (e.g., "None" or "Watercolors provided")
- **Description:** What happens at the event
- **Learning Outcomes:** Skills learned (separate with commas)

**Then click:** Add Event ✅

---

### **🖼️ Gallery Tab**
For photos, artwork, and images

**Before you start:**
- Upload your image to the `images/` folder first
- Remember the exact filename

**What to fill:**
- **Title:** Name of artwork/photo
- **Artist/Creator:** Who made it
- **Category:** Type (Current Exhibits, Clothes, Photography, etc.)
- **Medium:** Art type (Photography, Textile, Painting, etc.)
- **Story:** Tell the story behind it
- **Image Path:** Where the file is (e.g., `images/photo-1.jpg`)

**Then click:** Add Gallery Item ✅

---

### **📱 Social Media Tab**
For YouTube, TikTok, Instagram, Facebook links

**What to fill:**
- **Title:** Post name
- **Type:** Platform (YouTube, TikTok, Instagram, Facebook)
- **URL:** Full link (must start with `https://`)
- **Date:** When posted (YYYY-MM-DD)
- **Description:** What the post is about

**Then click:** Add Social Post ✅

---

## ✨ Your Content Appears Automatically!

After adding content:
1. ✅ You see a green success message
2. ✅ Content appears in the list below the form
3. ✅ **Visit the website pages** - your content is there!

**Where your content shows:**
- **Blog Posts** → `blog.html`
- **Events** → `events.html` + homepage countdown timer
- **Gallery Items** → `gallery.html` slideshows
- **Social Links** → `blog.html` media section

---

## ✏️ Edit or Delete Content

Found a typo or want to change something?

**To Edit:**
1. Click the blue **Edit** button next to any item
2. Form fields fill with the current content
3. Make your changes
4. Click **Add [Content Type]** again to save
5. Done! ✅

**To Delete:**
1. Click the red **Delete** button
2. Confirm in the popup
3. Item is removed ✅

---

## 🚪 Logout When Done

Click the red **Logout** button in the top right when you're finished.

This clears your session and keeps your dashboard secure.

---

## 📋 Quick Checklist

- [ ] Accessed admin.html
- [ ] Logged in with password
- [ ] Changed password in `js/admin.js` line 6
- [ ] Added a test blog post
- [ ] Visited website to see it appear
- [ ] Tried adding an event
- [ ] Tried adding a gallery item
- [ ] Tried adding a social media link

---

## 🎯 Common Questions

**Q: How do I access the admin dashboard?**
A: Click "🔒 Login" in the top navigation of any page, or open `admin.html`

**Q: What's the default password?**
A: `change-me-123` (but change it immediately!)

**Q: Where do I change the password?**
A: Edit `js/admin.js` line 6

**Q: Does content appear immediately?**
A: Yes! Refresh the website page and you'll see it.

**Q: Can I edit content I've already added?**
A: Yes! Click the Edit button next to any item.

**Q: I forgot my password - what do I do?**
A: Edit `js/admin.js` line 6 and set a new password.

**Q: What if I accidentally delete something?**
A: You'll have to re-add it. Be careful with delete!

**Q: Can multiple people use the admin dashboard?**
A: Yes, they all use the same password.

**Q: Is my data safe?**
A: Yes! It's stored privately in your browser. No external server.

---

## 📸 Date Format Reminder

Always use this format for dates: **YYYY-MM-DD**

Examples:
- December 8, 2025 = `2025-12-08` ✅
- January 1, 2026 = `2026-01-01` ✅
- March 15, 2025 = `2025-03-15` ✅

**NOT these:**
- `12-08-2025` ❌
- `12/8/25` ❌
- `December 8` ❌

---

## ⏰ Time Format Reminder

Use **24-hour time** (military time):

Examples:
- 10:00 AM = `10:00` ✅
- 2:30 PM = `14:30` ✅
- 6:00 PM = `18:00` ✅
- Midnight = `00:00` ✅

---

## 🎓 Next Steps

1. **Explore all features** - Try each tab
2. **Add your real content** - Start with blog posts
3. **Test on the website** - Visit pages to see changes
4. **Invite others** - Share the password (safely)
5. **Update regularly** - Keep content fresh

---

## 📚 Need More Help?

For detailed instructions on each feature, see:
- **CONTENT_MANAGER_GUIDE.md** - Full manual for each feature
- **QUICK_REFERENCE.md** - 1-page cheat sheet
- **TROUBLESHOOTING.md** - Solutions for problems

---

## 🎉 You're Ready!

You now have everything you need to manage your website content without any coding!

**Questions?** Check the documentation or try the feature - you can't break anything!

---

**Happy content managing! 🚀**

*Last updated: December 8, 2025*
