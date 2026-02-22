// Admin Panel Logic - Content Management System
// Change the ADMIN_PASSWORD to something secure!

const ADMIN_PASSWORD = "change-me-123"; // ⚠️ CHANGE THIS PASSWORD!
let isLoggedIn = false;

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  const loginContainer = document.getElementById("login-container");
  const adminPanel = document.getElementById("admin-panel");

  // Check if already logged in (using session storage)
  if (sessionStorage.getItem("adminLoggedIn") === "true") {
    isLoggedIn = true;
    loginContainer.style.display = "none";
    adminPanel.style.display = "block";
    loadAllData();
  } else {
    isLoggedIn = false;
    loginContainer.style.display = "block";
    adminPanel.style.display = "none";
  }

  // Focus on password field
  const passwordInput = document.getElementById("password");
  if (passwordInput) {
    passwordInput.focus();
  }

  // Allow Enter key to login
  if (passwordInput) {
    passwordInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        login();
      }
    });
  }
  // Initialize image picker UI
  if (typeof setupImagePicker === "function") setupImagePicker();
});

// Login function
function login() {
  const passwordInput = document.getElementById("password");
  const password = passwordInput.value;

  if (password === ADMIN_PASSWORD) {
    isLoggedIn = true;
    sessionStorage.setItem("adminLoggedIn", "true");
    document.getElementById("login-container").style.display = "none";
    document.getElementById("admin-panel").style.display = "block";
    loadAllData();
    showSuccess("Login successful!");
  } else {
    alert("❌ Incorrect password. Try again.");
    passwordInput.value = "";
    passwordInput.focus();
  }
}

// Logout function
function logout() {
  if (confirm("Are you sure you want to logout?")) {
    isLoggedIn = false;
    sessionStorage.removeItem("adminLoggedIn");
    document.getElementById("login-container").style.display = "block";
    document.getElementById("admin-panel").style.display = "none";
    document.getElementById("password").value = "";
    document.getElementById("password").focus();
  }
}

// Check if user is logged in
function checkAuth() {
  if (!isLoggedIn) {
    alert("Please login first.");
    return false;
  }
  return true;
}

// ============ TAB SWITCHING ============
function switchTab(tabName) {
  // Hide all tab contents
  const tabContents = document.querySelectorAll(".tab-content");
  tabContents.forEach((tab) => {
    tab.classList.remove("active");
  });

  // Remove active class from all tab buttons
  const tabBtns = document.querySelectorAll(".tab-btn");
  tabBtns.forEach((btn) => {
    btn.classList.remove("active");
  });

  // Show selected tab and highlight button
  document.getElementById(tabName).classList.add("active");
  event.target.classList.add("active");
}

// ============ SUCCESS MESSAGE ============
function showSuccess(message) {
  const successMsg = document.getElementById("success-message");
  successMsg.textContent = "✅ " + message;
  successMsg.classList.add("show");
  setTimeout(() => {
    successMsg.classList.remove("show");
  }, 3000);
}

// ============ BLOG POSTS ============
function addBlogPost(event) {
  if (!checkAuth()) return;
  event.preventDefault();

  const title = document.getElementById("blog-title").value;
  const slug = document.getElementById("blog-slug").value;
  const date = document.getElementById("blog-date").value;
  const excerpt = document.getElementById("blog-excerpt").value;
  const content = document.getElementById("blog-content").value;

  // Load existing blog data
  let blogData = loadBlogData();

  // Create new post
  const newPost = {
    slug: slug,
    title: title,
    date: date,
    excerpt: excerpt,
    content: content,
  };

  // Add to array
  blogData.posts.push(newPost);

  // Save back to localStorage
  localStorage.setItem("blog_data", JSON.stringify(blogData));

  // Clear form
  event.target.reset();

  // Reload list
  loadBlogList();
  showSuccess("Blog post added!");
}

function loadBlogData() {
  const stored = localStorage.getItem("blog_data");
  if (stored) {
    return JSON.parse(stored);
  }
  // Return default structure if nothing stored
  return { posts: [], media: [] };
}

function loadBlogList() {
  const blogData = loadBlogData();
  const blogItems = document.getElementById("blog-items");

  if (blogData.posts.length === 0) {
    blogItems.innerHTML =
      '<div class="empty-state">No blog posts yet. Add one above!</div>';
    return;
  }

  let html = "";
  blogData.posts.forEach((post, index) => {
    html += `
      <div class="item-card">
        <div class="item-info">
          <h3 class="item-title">${post.title}</h3>
          <div class="item-meta">📅 ${post.date}</div>
          <div class="item-meta">🔗 ${post.slug}</div>
          <p class="item-preview">${post.excerpt}</p>
        </div>
        <div class="item-actions">
          <button class="btn-edit" onclick="editBlogPost(${index})">Edit</button>
          <button class="btn-danger" onclick="deleteBlogPost(${index})">Delete</button>
        </div>
      </div>
    `;
  });

  blogItems.innerHTML = html;
}

function deleteBlogPost(index) {
  if (!checkAuth()) return;
  if (!confirm("Are you sure you want to delete this blog post?")) return;

  let blogData = loadBlogData();
  blogData.posts.splice(index, 1);
  localStorage.setItem("blog_data", JSON.stringify(blogData));
  loadBlogList();
  showSuccess("Blog post deleted!");
}

function editBlogPost(index) {
  if (!checkAuth()) return;
  const blogData = loadBlogData();
  const post = blogData.posts[index];

  document.getElementById("blog-title").value = post.title;
  document.getElementById("blog-slug").value = post.slug;
  document.getElementById("blog-date").value = post.date;
  document.getElementById("blog-excerpt").value = post.excerpt;
  document.getElementById("blog-content").value = post.content;

  // Delete the old one (will be re-added with updated data)
  blogData.posts.splice(index, 1);
  localStorage.setItem("blog_data", JSON.stringify(blogData));
  loadBlogList();

  // Scroll to form
  document.getElementById("blog-title").focus();
  document.querySelector("#blog form").scrollIntoView({ behavior: "smooth" });
}

// ============ EVENTS ============
function addEvent(event) {
  if (!checkAuth()) return;
  event.preventDefault();

  const title = document.getElementById("event-title").value;
  const category = document.getElementById("event-category").value;
  const datetime = document.getElementById("event-datetime").value;
  const age = document.getElementById("event-age").value;
  const materials = document.getElementById("event-materials").value;
  const description = document.getElementById("event-description").value;
  const outcomesStr = document.getElementById("event-outcomes").value;

  // Parse outcomes
  const outcomes = outcomesStr
    .split(",")
    .map((o) => o.trim())
    .filter((o) => o);

  // Load existing events
  let eventsData = loadEventsData();

  // Generate ID
  const id = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .substring(0, 20);

  // Create new event
  const newEvent = {
    id: id,
    title: title,
    category: category,
    start: datetime,
    age: age,
    materials: materials,
    outcomes: outcomes,
    description: description,
  };

  // Add to array
  eventsData.push(newEvent);

  // Save back
  localStorage.setItem("events_data", JSON.stringify(eventsData));

  // Clear form
  event.target.reset();

  // Reload list
  loadEventsList();
  showSuccess("Event added!");
}

function loadEventsData() {
  const stored = localStorage.getItem("events_data");
  if (stored) {
    return JSON.parse(stored);
  }
  return [];
}

function loadEventsList() {
  const eventsData = loadEventsData();
  const eventsItems = document.getElementById("events-items");

  if (eventsData.length === 0) {
    eventsItems.innerHTML =
      '<div class="empty-state">No events yet. Add one above!</div>';
    return;
  }

  let html = "";
  eventsData.forEach((evt, index) => {
    const eventDate = new Date(evt.start);
    const formattedDate = eventDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    html += `
      <div class="item-card">
        <div class="item-info">
          <h3 class="item-title">${evt.title}</h3>
          <div class="item-meta">📅 ${formattedDate}</div>
          <div class="item-meta">👥 Age: ${evt.age}</div>
          <div class="item-meta">📌 ${evt.category}</div>
          <p class="item-preview">${evt.description}</p>
        </div>
        <div class="item-actions">
          <button class="btn-edit" onclick="editEvent(${index})">Edit</button>
          <button class="btn-danger" onclick="deleteEvent(${index})">Delete</button>
        </div>
      </div>
    `;
  });

  eventsItems.innerHTML = html;
}

function deleteEvent(index) {
  if (!checkAuth()) return;
  if (!confirm("Are you sure you want to delete this event?")) return;

  let eventsData = loadEventsData();
  eventsData.splice(index, 1);
  localStorage.setItem("events_data", JSON.stringify(eventsData));
  loadEventsList();
  showSuccess("Event deleted!");
}

function editEvent(index) {
  if (!checkAuth()) return;
  const eventsData = loadEventsData();
  const evt = eventsData[index];

  document.getElementById("event-title").value = evt.title;
  document.getElementById("event-category").value = evt.category;
  document.getElementById("event-datetime").value = evt.start;
  document.getElementById("event-age").value = evt.age;
  document.getElementById("event-materials").value = evt.materials;
  document.getElementById("event-description").value = evt.description;
  document.getElementById("event-outcomes").value = evt.outcomes.join(", ");

  eventsData.splice(index, 1);
  localStorage.setItem("events_data", JSON.stringify(eventsData));
  loadEventsList();

  document.getElementById("event-title").focus();
  document.querySelector("#events form").scrollIntoView({ behavior: "smooth" });
}

// ============ GALLERY ============
function addGalleryItem(event) {
  if (!checkAuth()) return;
  event.preventDefault();

  const title = document.getElementById("gallery-title").value;
  const artist = document.getElementById("gallery-artist").value;
  const category = document.getElementById("gallery-category").value;
  const medium = document.getElementById("gallery-medium").value;
  const story = document.getElementById("gallery-story").value;
  const image = document.getElementById("gallery-image").value;

  // Load existing gallery
  let galleryData = loadGalleryData();

  // Generate ID
  const id = title.toLowerCase().replace(/\s+/g, "-").substring(0, 20);

  // Create new item
  const newItem = {
    id: id,
    title: title,
    artist: artist,
    category: category,
    medium: medium,
    story: story,
    image: image,
  };

  // Add to array
  galleryData.push(newItem);

  // Save back
  localStorage.setItem("gallery_data", JSON.stringify(galleryData));

  // Clear form
  event.target.reset();

  // Reload list
  loadGalleryList();
  showSuccess("Gallery item added!");
}

function loadGalleryData() {
  const stored = localStorage.getItem("gallery_data");
  if (stored) {
    return JSON.parse(stored);
  }
  return [];
}

function loadGalleryList() {
  const galleryData = loadGalleryData();
  const galleryItems = document.getElementById("gallery-items");

  if (galleryData.length === 0) {
    galleryItems.innerHTML =
      '<div class="empty-state">No gallery items yet. Add one above!</div>';
    return;
  }

  let html = "";
  galleryData.forEach((item, index) => {
    html += `
      <div class="item-card">
        <div class="item-info">
          <h3 class="item-title">${item.title}</h3>
          <div class="item-meta">👤 ${item.artist}</div>
          <div class="item-meta">📂 ${item.category}</div>
          <div class="item-meta">🎨 ${item.medium}</div>
          <p class="item-preview">${item.story}</p>
        </div>
        <div class="item-actions">
          <button class="btn-edit" onclick="editGalleryItem(${index})">Edit</button>
          <button class="btn-danger" onclick="deleteGalleryItem(${index})">Delete</button>
        </div>
      </div>
    `;
  });

  galleryItems.innerHTML = html;
}

function deleteGalleryItem(index) {
  if (!checkAuth()) return;
  if (!confirm("Are you sure you want to delete this gallery item?")) return;

  let galleryData = loadGalleryData();
  galleryData.splice(index, 1);
  localStorage.setItem("gallery_data", JSON.stringify(galleryData));
  loadGalleryList();
  showSuccess("Gallery item deleted!");
}

function editGalleryItem(index) {
  if (!checkAuth()) return;
  const galleryData = loadGalleryData();
  const item = galleryData[index];

  document.getElementById("gallery-title").value = item.title;
  document.getElementById("gallery-artist").value = item.artist;
  document.getElementById("gallery-category").value = item.category;
  document.getElementById("gallery-medium").value = item.medium;
  document.getElementById("gallery-story").value = item.story;
  document.getElementById("gallery-image").value = item.image;

  galleryData.splice(index, 1);
  localStorage.setItem("gallery_data", JSON.stringify(galleryData));
  loadGalleryList();

  document.getElementById("gallery-title").focus();
  document
    .querySelector("#gallery form")
    .scrollIntoView({ behavior: "smooth" });
}

// ============ SOCIAL MEDIA ============
function addSocialMedia(event) {
  if (!checkAuth()) return;
  event.preventDefault();

  const title = document.getElementById("social-title").value;
  const type = document.getElementById("social-type").value;
  const url = document.getElementById("social-url").value;
  const date = document.getElementById("social-date").value;
  const description = document.getElementById("social-description").value;

  // Load existing social data
  let socialData = loadSocialData();

  // Create new post
  const newPost = {
    type: type,
    title: title,
    description: description,
    url: url,
    date: date,
  };

  // Add to array
  socialData.push(newPost);

  // Save back
  localStorage.setItem("social_data", JSON.stringify(socialData));

  // Clear form
  event.target.reset();

  // Reload list
  loadSocialList();
  showSuccess("Social media post added!");
}

function loadSocialData() {
  const stored = localStorage.getItem("social_data");
  if (stored) {
    return JSON.parse(stored);
  }
  return [];
}

function loadSocialList() {
  const socialData = loadSocialData();
  const socialItems = document.getElementById("social-items");

  if (socialData.length === 0) {
    socialItems.innerHTML =
      '<div class="empty-state">No social media posts yet. Add one above!</div>';
    return;
  }

  let html = "";
  socialData.forEach((post, index) => {
    const typeEmoji = {
      youtube: "📺",
      tiktok: "👍",
      instagram: "📷",
      facebook: "👥",
      social: "📱",
    };

    html += `
      <div class="item-card">
        <div class="item-info">
          <h3 class="item-title">${typeEmoji[post.type] || "📱"} ${post.title}</h3>
          <div class="item-meta">📅 ${post.date}</div>
          <div class="item-meta">🔗 ${post.type.toUpperCase()}</div>
          <p class="item-preview">${post.description || "No description"}</p>
          <div class="item-meta"><a href="${post.url}" target="_blank" style="color: var(--color-primary); text-decoration: none;">View Post →</a></div>
        </div>
        <div class="item-actions">
          <button class="btn-edit" onclick="editSocialMedia(${index})">Edit</button>
          <button class="btn-danger" onclick="deleteSocialMedia(${index})">Delete</button>
        </div>
      </div>
    `;
  });

  socialItems.innerHTML = html;
}

function deleteSocialMedia(index) {
  if (!checkAuth()) return;
  if (!confirm("Are you sure you want to delete this post?")) return;

  let socialData = loadSocialData();
  socialData.splice(index, 1);
  localStorage.setItem("social_data", JSON.stringify(socialData));
  loadSocialList();
  showSuccess("Post deleted!");
}

function editSocialMedia(index) {
  if (!checkAuth()) return;
  const socialData = loadSocialData();
  const post = socialData[index];

  document.getElementById("social-title").value = post.title;
  document.getElementById("social-type").value = post.type;
  document.getElementById("social-url").value = post.url;
  document.getElementById("social-date").value = post.date;
  document.getElementById("social-description").value = post.description || "";

  socialData.splice(index, 1);
  localStorage.setItem("social_data", JSON.stringify(socialData));
  loadSocialList();

  document.getElementById("social-title").focus();
  document.querySelector("#social form").scrollIntoView({ behavior: "smooth" });
}

// ============ LOAD ALL DATA ============
function loadAllData() {
  loadBlogList();
  loadEventsList();
  loadGalleryList();
  loadSocialList();
}

// ============ EXPORT/IMPORT DATA ============
function exportData() {
  if (!checkAuth()) return;

  const allData = {
    blog: loadBlogData(),
    events: loadEventsData(),
    gallery: loadGalleryData(),
    social: loadSocialData(),
    exportDate: new Date().toISOString(),
  };

  const dataStr = JSON.stringify(allData, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `fasa-content-backup-${new Date().toISOString().split("T")[0]}.json`;
  link.click();

  showSuccess("Data exported!");
}

function importData() {
  if (!checkAuth()) return;

  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";

  input.onchange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);

        if (
          data.blog &&
          data.events &&
          data.gallery &&
          data.social
        ) {
          localStorage.setItem("blog_data", JSON.stringify(data.blog));
          localStorage.setItem("events_data", JSON.stringify(data.events));
          localStorage.setItem("gallery_data", JSON.stringify(data.gallery));
          localStorage.setItem("social_data", JSON.stringify(data.social));

          loadAllData();
          showSuccess("Data imported successfully!");
        } else {
          alert("Invalid backup file format.");
        }
      } catch (error) {
        alert("Error reading file: " + error.message);
      }
    };

    reader.readAsText(file);
  };

  input.click();
}

// ============ IMAGE PICKER (Drag & Drop + File Upload) ============
let _pickedImage = null;

function setupImagePicker() {
  const openBtn = document.getElementById("open-image-picker");
  const modal = document.getElementById("image-picker-modal");
  const closeBtn = document.getElementById("close-image-picker");
  const cancelBtn = document.getElementById("cancel-image-picker");
  const confirmBtn = document.getElementById("confirm-image-picker");
  const dropArea = document.getElementById("drop-area");
  const fileInput = document.getElementById("image-file-input");

  if (!openBtn || !modal || !dropArea || !fileInput) return;

  openBtn.addEventListener("click", openImagePicker);
  closeBtn && closeBtn.addEventListener("click", closeImagePicker);
  cancelBtn && cancelBtn.addEventListener("click", closeImagePicker);
  confirmBtn && confirmBtn.addEventListener("click", confirmImageSelection);

  // Local upload button (outside modal)
  const localUploadBtn = document.getElementById("upload-image-local");
  const localFileInput = document.getElementById("gallery-image-local-input");
  if (localUploadBtn && localFileInput) {
    localUploadBtn.addEventListener("click", () => localFileInput.click());
    localFileInput.addEventListener("change", (e) => {
      const f = e.target.files && e.target.files[0];
      if (!f) return;
      if (!f.type || !f.type.startsWith("image/")) {
        alert("Please select an image file.");
        return;
      }
      const reader = new FileReader();
      reader.onload = function (ev) {
        const dataUrl = ev.target.result;
        const galleryInput = document.getElementById("gallery-image");
        if (galleryInput) {
          galleryInput.value = dataUrl;
          showSuccess("Image selected from device.");
        }
      };
      reader.onerror = function () {
        alert("Error reading file.");
      };
      reader.readAsDataURL(f);
    });
  }

  // Click drop area to open file dialog
  dropArea.addEventListener("click", () => fileInput.click());

  // Drag & drop events
  ["dragenter", "dragover"].forEach((ev) => {
    dropArea.addEventListener(ev, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropArea.style.borderColor = "#2d8a57";
    });
  });

  ["dragleave", "drop"].forEach((ev) => {
    dropArea.addEventListener(ev, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropArea.style.borderColor = "#ddd";
    });
  });

  dropArea.addEventListener("drop", (e) => {
    const dt = e.dataTransfer;
    if (!dt) return;
    const files = dt.files;
    if (files && files.length) {
      handleFile(files[0]);
    }
  });

  // File input change
  fileInput.addEventListener("change", (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) handleFile(f);
  });
}

function openImagePicker() {
  const modal = document.getElementById("image-picker-modal");
  if (!modal) return;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  // reset previous selection
  _pickedImage = null;
  const preview = document.getElementById("image-preview");
  if (preview) preview.style.display = "none";
}

function closeImagePicker() {
  const modal = document.getElementById("image-picker-modal");
  if (!modal) return;
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  _pickedImage = null;
}

function handleFile(file) {
  if (!file) return;
  if (!file.type || !file.type.startsWith("image/")) {
    alert("Please select an image file.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (ev) {
    const dataUrl = ev.target.result;
    _pickedImage = {
      name: file.name,
      size: file.size,
      type: file.type,
      dataUrl: dataUrl,
    };
    updateImagePreview(_pickedImage);
  };
  reader.onerror = function () {
    alert("Error reading file.");
  };
  reader.readAsDataURL(file);
}

function updateImagePreview(img) {
  const preview = document.getElementById("image-preview");
  const imgEl = document.getElementById("image-preview-img");
  const nameEl = document.getElementById("image-preview-name");
  const sizeEl = document.getElementById("image-preview-size");

  if (!img || !preview || !imgEl) return;
  imgEl.src = img.dataUrl;
  nameEl.textContent = img.name || "Selected image";
  sizeEl.textContent = img.size ? `${Math.round(img.size/1024)} KB` : "";
  preview.style.display = "flex";
}

function confirmImageSelection() {
  if (!_pickedImage || !_pickedImage.dataUrl) {
    alert("No image selected.");
    return;
  }
  const galleryInput = document.getElementById("gallery-image");
  if (!galleryInput) return;

  // Store the data URL so the gallery will display the chosen image
  galleryInput.value = _pickedImage.dataUrl;

  // Close modal
  closeImagePicker();
}
