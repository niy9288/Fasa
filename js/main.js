// Utilities and shared behaviors
(function(){
  const yearEl = document.getElementById('year');
  if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const nav = document.querySelector('.nav');
  
  if(mobileMenuBtn && nav){
    // Clone desktop nav to mobile nav
    if(mobileNav){
      mobileNav.innerHTML = nav.innerHTML;
      // Update mobile nav links to close menu on click
      mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenuBtn.classList.remove('active');
          mobileNav.classList.remove('active');
        });
      });
    }
    
    mobileMenuBtn.addEventListener('click', function(){
      const isActive = this.classList.toggle('active');
      this.setAttribute('aria-expanded', isActive);
      if(mobileNav){
        mobileNav.classList.toggle('active');
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e){
      if(mobileNav && mobileNav.classList.contains('active')){
        if(!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)){
          mobileMenuBtn.classList.remove('active');
          mobileNav.classList.remove('active');
        }
      }
    });
  }

  // Newsletter form handler with EmailJS
  const form = document.getElementById('newsletter-form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const formEl = this;
      const emailInput = document.getElementById('newsletter-email');
      const email = emailInput?.value || '';
      const submitButton = formEl.querySelector('button[type="submit"]');
      const originalText = submitButton?.textContent || 'Get updates on new events!';
      
      // Disable button and show loading state
      if(submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Subscribing...';
      }
      
      // Check if EmailJS is configured and available
      if (typeof emailjs !== 'undefined' && typeof EMAILJS_CONFIG !== 'undefined' && 
          EMAILJS_CONFIG && EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY_HERE') {
        const formData = {
          email: email,
          to_email: EMAILJS_CONFIG.recipientEmail
        };
        
        emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templates.newsletter,
          formData
        ).then(function() {
          alert('Thanks! We\'ll keep you posted at ' + email);
          formEl.reset();
          if(submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
          }
        }, function(error) {
          alert('Thanks! We\'ll keep you posted at ' + email);
          console.error('EmailJS error:', error);
          formEl.reset();
          if(submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
          }
        });
      } else {
        // Fallback if EmailJS not configured
        alert('Thanks! We\'ll keep you posted at ' + email);
        formEl.reset();
        if(submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        }
      }
    });
  }
})();

