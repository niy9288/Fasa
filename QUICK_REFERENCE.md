# Content Manager - Quick Reference Card

## 🎯 Login
```
Open: admin.html
Password: change-me-123
```

## ✏️ Change Password
```
File: js/admin.js
Line: 6
Change: const ADMIN_PASSWORD = "change-me-123";
To: const ADMIN_PASSWORD = "your-password";
Save file → Password is active immediately
```

---

## 📝 BLOG POSTS

### Add New Post
1. Click: 📝 Blog Posts tab
2. Fill:
   - Title: Post heading
   - URL Slug: reading-tips (no spaces)
   - Date: YYYY-MM-DD format
   - Excerpt: Short summary (1-2 sentences)
   - Content: Full article text
3. Click: Add Blog Post

### View Where
- Appears on: `blog.html`
- Sorted by: Most recent first

### Edit/Delete
- Edit: Click "Edit" button → Fill form → Add (replaces old)
- Delete: Click "Delete" → Confirm

---

## 📅 EVENTS

### Add New Event
1. Click: 📅 Events tab
2. Fill:
   - Title: Event name
   - Category: Select from dropdown
   - Date & Time: Pick date and time
   - Age Group: 3-6, 7+, All ages, Adults, etc.
   - Materials: What to bring
   - Description: What happens at event
   - Outcomes: Skills learned (comma-separated)
3. Click: Add Event

### View Where
- Appears on: `events.html` (in list)
- Appears on: `index.html` (countdown timer)
- Note: Only shows upcoming events

### Edit/Delete
- Edit: Click "Edit" → Update form → Add
- Delete: Click "Delete" → Confirm

---

## 🖼️ GALLERY

### Before Adding Item
1. Upload image to `images/` folder
2. Note exact filename (e.g., photo-1.jpg)

### Add Gallery Item
1. Click: 🖼️ Gallery tab
2. Fill:
   - Title: Name of artwork/photo
   - Artist: Who created it
   - Category: Select from dropdown
   - Medium: Type (Photography, Painting, Textile, etc.)
   - Story: Describe the artwork
   - Image Path: images/filename.jpg
3. Click: Add Gallery Item

### View Where
- Appears on: `gallery.html`
- In: Slideshow and grid layout
- Sorted by: Order added

### Image Tips
- Upload to: `images/` folder
- Formats: JPG, PNG, GIF
- Path format: `images/myimage.jpg`
- Use compressed images (< 1MB)

### Edit/Delete
- Edit: Click "Edit" → Fix path → Add
- Delete: Click "Delete" → Confirm

---

## 📱 SOCIAL MEDIA

### Add Social Post
1. Click: 📱 Social Media tab
2. Fill:
   - Title: Post name
   - Type: Select platform (YouTube, TikTok, Instagram, etc.)
   - URL: Full link (starts with https://)
   - Date: YYYY-MM-DD when posted
   - Description: What the post is about
3. Click: Add Social Post

### View Where
- Appears on: `blog.html` (media section)
- Shows: Platform icon + title + link

### Platform Examples
- YouTube: `https://www.youtube.com/channel/UCxxxxx`
- TikTok: `https://www.tiktok.com/@username`
- Instagram: `https://www.instagram.com/username`
- Facebook: `https://www.facebook.com/page`

### Edit/Delete
- Edit: Click "Edit" → Change fields → Add
- Delete: Click "Delete" → Confirm

---

## 🎨 FORM TIPS

### Required Fields (marked with *)
- Must fill to save
- Form won't submit if empty

### Date Format
- Use: YYYY-MM-DD (e.g., 2025-12-08)
- Not: MM/DD/YYYY or 12-8-25

### Time Format
- 24-hour: 14:30 (2:30 PM)
- 00:00 = Midnight
- 12:00 = Noon
- 23:59 = 11:59 PM

### URL Format
- Must start: https://
- Not: http:// (unless specified)
- Full link: include www if needed

### Comma-Separated Lists
- For: Learning outcomes, tags
- Use: "item1, item2, item3"
- Not: "item1; item2"

---

## ✅ PUBLISHING CHECKLIST

Before adding content, verify:

**Blog Posts:**
- [ ] Title is clear
- [ ] Date is correct
- [ ] Excerpt is 1-2 sentences max
- [ ] Content is proofread
- [ ] No typos or grammar issues

**Events:**
- [ ] Title is specific
- [ ] Date is in future
- [ ] Time is correct (24-hour format)
- [ ] Age group is accurate
- [ ] Description is clear
- [ ] Outcomes are listed

**Gallery:**
- [ ] Image uploaded to images/
- [ ] Image path matches filename
- [ ] Title describes the work
- [ ] Artist/creator named
- [ ] Story is engaging
- [ ] Medium/category chosen

**Social Media:**
- [ ] URL is correct and starts with https://
- [ ] Title describes content
- [ ] Platform type is selected
- [ ] Date is accurate
- [ ] Link works when tested

---

## ⚡ KEYBOARD SHORTCUTS

| Action | Shortcut |
|--------|----------|
| Submit form | Tab to button + Enter |
| Login | Enter password + Enter |
| Clear form | Click "Clear Form" button |
| Logout | Click "Logout" button |

---

## 🆘 QUICK FIXES

### Content not appearing?
1. Refresh page (Ctrl+R)
2. Make sure logged in
3. Check item appears in list below form
4. Check image paths (for gallery)

### Forgot password?
1. Edit `js/admin.js`
2. Change line 6 to new password
3. Save file
4. Refresh admin.html

### Lost all content?
1. Cleared browser cache?
2. Can't recover once deleted
3. Keep backups of important content

### Form won't submit?
1. Fill all required fields (*)
2. Check date format (YYYY-MM-DD)
3. Check URL starts with https://
4. Try different browser

---

## 📊 DATA LOCATIONS

### Where Content Goes
```
📝 Blog Posts → localStorage['blog_data']
📅 Events → localStorage['events_data']
🖼️ Gallery → localStorage['gallery_data']
📱 Social → localStorage['social_data']
```

### Where Images Go
```
🖼️ Images → images/ folder
Example: images/photo-1.jpg
```

---

## 🎯 VIEWING RESULTS

After adding content, visit:

| Content Type | View At | Notes |
|-------------|---------|-------|
| Blog Posts | blog.html | Sorted newest first |
| Events | events.html | Filtered by category/age |
| Events | index.html | Shows countdown timer |
| Gallery | gallery.html | Grid + slideshow |
| Social | blog.html | Media section |

---

## 🔐 SECURITY REMINDERS

- ✅ Change password from default
- ✅ Use strong password (10+ chars)
- ✅ Don't share password
- ✅ Logout when done
- ✅ Backup important content
- ✅ Don't clear cache without backup

---

## 📞 NEED HELP?

| Question | Answer |
|----------|--------|
| Can't login? | Check password spelling, try different browser |
| Content missing? | Refresh page, check it's in the list |
| Password forgotten? | Edit js/admin.js line 6 |
| Image not showing? | Check path format and file exists |
| Something broken? | Check browser console (F12) for errors |

---

## 🚀 30-SECOND TUTORIAL

```
1. Open admin.html
2. Login (change-me-123)
3. Click any tab
4. Fill form
5. Click "Add [item]"
6. Visit website page
7. See your content!
```

---

## 📋 FILE LOCATIONS

```
Root Folder:
├── admin.html ← Admin dashboard
├── blog.html ← Blog posts appear here
├── events.html ← Events appear here
├── gallery.html ← Gallery appears here
│
├── js/
│  ├── admin.js ← Change password here (line 6)
│  └── (other JS files)
│
└── images/
   └── [upload images here]
```

---

## 💡 PRO TIPS

1. Write titles like you'd say them aloud
2. Use descriptive image names (workshop-1.jpg)
3. Keep excerpts punchy and engaging
4. Add events a week before date
5. Update gallery with recent photos
6. Share social links regularly
7. Proofread before publishing
8. Test on website after adding
9. Backup content periodically
10. Change password every few months

---

## ✨ FEATURES AT A GLANCE

- ✅ No coding required
- ✅ Real-time updates
- ✅ Password protected
- ✅ Mobile friendly
- ✅ Easy edit/delete
- ✅ Form validation
- ✅ Success notifications
- ✅ Organized interface
- ✅ All browsers supported
- ✅ Automatic saving

---

**Print this card and keep it handy!** 📋

*For more details, see CONTENT_MANAGER_GUIDE.md*
