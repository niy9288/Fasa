# Troubleshooting Guide

## Common Issues & Solutions

### 🔴 Login Issues

#### "Incorrect password" message keeps appearing

**Solution:**
1. Check if Caps Lock is ON - turn it off
2. Re-type the password carefully
3. Make sure you changed the password in `js/admin.js` line 6
4. If you forgot the new password:
   - Open `js/admin.js`
   - Find `const ADMIN_PASSWORD = "..."`
   - Change it to a password you remember
   - Save and refresh admin.html

#### Can't access admin.html at all

**Solutions:**
1. Make sure file is in the correct location: `admin.html` in root folder
2. Try opening it directly: `C:\Users\user\OneDrive\Documents\...palm-tree-library-static\admin.html`
3. Use Live Server in VS Code instead
4. Try a different browser (Chrome, Firefox, Edge)
5. Clear browser cache: Ctrl+Shift+Delete

---

### 🔴 Content Not Appearing

#### Added a blog post but it's not showing on blog.html

**Checklist:**
- [ ] Did you see the green "✅ Blog post added!" message?
- [ ] Did you refresh blog.html after adding?
- [ ] Check browser console (F12) for JavaScript errors
- [ ] Make sure you're logged in when viewing admin

**Solution:**
1. Open admin.html
2. Login
3. Click "📝 Blog Posts" tab
4. Verify post is in the list
5. Go to blog.html and refresh (Ctrl+R or Cmd+R)
6. Check if post appears

#### Added event but countdown doesn't show

**Solutions:**
1. Make sure event date is in the FUTURE
2. Event date format must be: `YYYY-MM-DD HH:MM` (24-hour format)
3. Refresh index.html after adding
4. Check that event is on the "📅 Events" list

#### Gallery items not showing in slideshow

**Solutions:**
1. Verify image file exists in images/ folder
2. Check image path in gallery form matches actual path
3. Image path should look like: `images/IMG-20251011-WA0030.png`
4. Refresh gallery.html after adding
5. Try a different image to test

#### Social media links not displaying

**Solutions:**
1. Verify URL starts with `https://` (http:// won't work)
2. Test the URL in a new browser tab
3. Refresh the page where link should appear
4. Check that platform type is selected correctly

---

### 🔴 Data Lost Issues

#### Cleared browser cache and all content is gone

**Prevention:**
- Always backup important content
- Don't clear browser cache without backing up first

**Recovery:**
- If you have a backup JSON file, use import function
- Unfortunately, localStorage data is permanent deleted with cache
- Re-add content through admin dashboard

#### Content disappears when I close browser

**Solution:**
This shouldn't happen! Check:
1. Make sure you saw "✅ Added!" message
2. Open admin.html again and login
3. Check that content is still in the list
4. If it's gone, it wasn't saved properly

**Fix if this keeps happening:**
1. Check browser console for errors (F12)
2. Try a different browser
3. Make sure JavaScript is enabled
4. Check that `js/admin.js` file exists and is valid

---

### 🔴 Forms Not Working

#### Form fields not saving anything

**Solutions:**
1. Check that all required fields (marked with *) are filled
2. Make sure you clicked "Add [Content]" button (not other buttons)
3. Check console (F12) for JavaScript errors
4. Try refreshing the page
5. Try a different browser
6. Clear cache and try again

#### Getting error messages in the form

**Solutions:**
1. Read the error message carefully
2. Common errors:
   - "Title is required" → Fill in the title field
   - "Date format invalid" → Use YYYY-MM-DD format
   - "URL invalid" → Make sure it starts with https://
3. Fix the error and try again

---

### 🔴 Performance Issues

#### Admin dashboard is slow or laggy

**Solutions:**
1. You might have added too much content
   - Try deleting some old content
   - Content list gets long after ~100 items
2. Clear browser cache
3. Close other browser tabs
4. Try a different browser
5. Use a newer/faster computer

#### Page takes forever to load

**Solutions:**
1. Check internet connection
2. Images might be too large
   - Use compressed images
   - Images should be < 1MB each
3. Refresh the page (Ctrl+R)
4. Check if images are actually loading

---

### 🔴 Security Issues

#### Suspect someone else accessed my admin dashboard

**Immediate Action:**
1. Change password in `js/admin.js` immediately
2. Set a strong password (letters, numbers, symbols)
3. Check the content list for any suspicious entries
4. Delete any unauthorized content
5. Consider adding multi-user authentication (advanced)

#### Want to make password more secure

**Best Practices:**
- ✅ Use at least 10 characters
- ✅ Mix letters, numbers, and symbols
- ✅ Don't use simple words
- ✅ Don't share the password
- ✅ Change it every few months

**Example strong passwords:**
- `MyLibrary2024!#Palm`
- `FASA.Gazelles.Admin$99`
- `ReadingIsFun@2024x`

---

### 🔴 Browser Compatibility Issues

#### Works in Chrome but not in Safari/Firefox

**Solutions:**
1. Check that JavaScript is enabled
2. Clear cache in that browser
3. Try incognito/private mode
4. Update the browser to latest version
5. Try a different browser to test

#### Website looks weird on mobile

**Solutions:**
1. Check that device isn't in landscape mode (rotate to portrait)
2. Zoom out to see full page (Ctrl+Minus or Cmd+Minus)
3. Try a different browser on mobile
4. Clear browser cache on mobile
5. Refresh the page

---

### 🔴 JavaScript/Console Errors

#### See red errors in console (F12)

**Common errors and fixes:**

**Error: "Cannot read property 'value' of null"**
- Fix: Make sure HTML element IDs match JavaScript
- Admin should have all correct IDs in admin.html

**Error: "Uncaught SyntaxError"**
- Fix: There's a typo in JavaScript code
- Check browser console for line number
- Look for missing brackets or semicolons

**Error: "Failed to fetch 'data/blog.json'"**
- Fix: JSON file might be missing or in wrong location
- This is OK - it will use localStorage instead
- Your admin-added content will still appear

**How to check console:**
1. Press F12 (or right-click → Inspect)
2. Click "Console" tab
3. Look for red error messages
4. Note the line number and error text
5. Search for that in the code

---

### 🔴 File/Folder Issues

#### Can't find admin.html

**Check:**
1. Is it in the root folder? (same level as index.html)
2. File path should be: `palm-tree-library-static/admin.html`
3. Try opening file directly in browser: `file:///C:/Users/.../admin.html`
4. If file doesn't exist, it needs to be created (it should be in the project)

#### Image paths not working in gallery

**Solutions:**
1. Upload image to `images/` folder first
2. Use correct path format: `images/filename.jpg`
3. Avoid spaces in image filenames
4. Use PNG, JPG, or GIF only
5. Test the image path by typing it in browser address bar

#### JavaScript files not loading

**Check:**
1. `js/admin.js` exists in `js/` folder
2. `admin.html` has correct script tag: `<script src="js/admin.js"></script>`
3. No typos in filename (case-sensitive on Linux/Mac)
4. File is not corrupted (open in text editor and check)

---

### 🔴 Specific Features Not Working

#### Can't edit existing content

**Solution:**
1. Click the "Edit" button next to any item
2. The form fields should fill with existing data
3. Edit the fields you want to change
4. When you "Add" it again, the old one is replaced
5. Refresh the page to see changes

#### Can't delete content

**Solution:**
1. Click the red "Delete" button
2. Confirm the popup message
3. Item should disappear from list immediately
4. Refresh the page to confirm

#### Filter/search not working on events page

**Solution:**
This is not an admin feature - it's on events.html page
1. Go to events.html
2. Use the Category and Age filters
3. Filters only work with events that are already loaded
4. Make sure your new events are there first

---

## 🆘 Still Having Problems?

### Debugging Checklist

- [ ] Close and reopen the browser
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Try incognito/private mode
- [ ] Try a different browser
- [ ] Check if JavaScript is enabled
- [ ] Open browser console (F12) and check for errors
- [ ] Make sure all files exist in correct locations
- [ ] Verify file permissions (files should be readable)
- [ ] Try the same action on a different computer
- [ ] Check internet connection

### If Nothing Works

1. **Take a screenshot** of the problem
2. **Copy any error messages** from console (F12)
3. **Note:**
   - What were you doing when error occurred?
   - What browser and version?
   - What operating system?
   - Which page/form were you using?

4. **Contact support** with this information

---

## 📚 Additional Resources

- See `ADMIN_SETUP.md` for quick start
- See `CONTENT_MANAGER_GUIDE.md` for detailed guide
- See `SYSTEM_OVERVIEW.md` for technical details
- Check browser console (F12) for error messages
- Search the code for the issue

---

## 💡 Pro Tips

1. **Always save your password** somewhere safe
2. **Backup important content** periodically
3. **Test changes** on a test site first
4. **Use clear, descriptive names** for content
5. **Add content in smaller chunks**, not all at once
6. **Refresh pages** after making changes
7. **Clear cache** if content looks wrong
8. **Use Firefox DevTools** for better debugging
9. **Check image paths** before adding gallery items
10. **Keep browser updated** for security and compatibility

---

## 🎯 When to Seek Help

You should ask for technical help if:
- You see JavaScript errors you can't fix
- Files are missing or corrupted
- Forms don't work at all
- Content never appears
- Admin panel won't load
- Password doesn't work (and you changed it correctly)
- Multiple features are broken

---

## ✅ Everything Working?

Great! Now you can:
- ✅ Add blog posts without coding
- ✅ Create events and see countdown
- ✅ Upload gallery items through forms
- ✅ Share social media links
- ✅ Edit and delete content anytime

**Happy content managing! 🚀**

---

*Last updated: December 2025*
*For additional help, consult the documentation files or browser console.*
