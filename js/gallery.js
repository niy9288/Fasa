(function(){
  const grid = document.getElementById('gallery-grid');
  const filter = document.getElementById('gallery-filter');
  let items = [];

  // Slideshow functionality
  function initSlideshow(slideshowId, trackId, indicatorsId, slideshowItems, autoPlay = true, interval = 5000){
    const slideshow = document.getElementById(slideshowId);
    const track = document.getElementById(trackId);
    const indicators = document.getElementById(indicatorsId);
    if(!slideshow || !track || !indicators || slideshowItems.length === 0) return null;

    let currentIndex = 0;
    let autoPlayTimer = null;

    function renderSlideshow(){
      track.innerHTML = '';
      indicators.innerHTML = '';
      
      slideshowItems.forEach((item, index) => {
        const slide = document.createElement('div');
        slide.className = 'slideshow-slide' + (index === currentIndex ? ' active' : '');
        slide.innerHTML = `
          <img src="${item.image}" alt="${item.title}" />
          <div class="slide-info">
            <h3>${item.title}</h3>
            <p>${item.story || item.artist}</p>
          </div>
        `;
        slide.addEventListener('click', () => openLightbox(item));
        track.appendChild(slide);

        const indicator = document.createElement('button');
        indicator.className = 'slideshow-indicator' + (index === currentIndex ? ' active' : '');
        indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
        indicator.addEventListener('click', () => goToSlide(index));
        indicators.appendChild(indicator);
      });
    }

    function goToSlide(index){
      if(index < 0) index = slideshowItems.length - 1;
      if(index >= slideshowItems.length) index = 0;
      currentIndex = index;
      renderSlideshow();
      resetAutoPlay();
    }

    function nextSlide(){
      goToSlide(currentIndex + 1);
    }

    function prevSlide(){
      goToSlide(currentIndex - 1);
    }

    function startAutoPlay(){
      if(!autoPlay || slideshowItems.length <= 1) return;
      autoPlayTimer = setInterval(nextSlide, interval);
    }

    function stopAutoPlay(){
      if(autoPlayTimer){
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    }

    function resetAutoPlay(){
      stopAutoPlay();
      if(autoPlay) startAutoPlay();
    }

    // Navigation buttons
    const prevBtn = slideshow.querySelector('.prev');
    const nextBtn = slideshow.querySelector('.next');
    if(prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); stopAutoPlay(); });
    if(nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); stopAutoPlay(); });

    // Pause on hover
    slideshow.addEventListener('mouseenter', stopAutoPlay);
    slideshow.addEventListener('mouseleave', () => { if(autoPlay) startAutoPlay(); });

    // Initialize
    renderSlideshow();
    if(autoPlay && slideshowItems.length > 1) startAutoPlay();

    return { goToSlide, nextSlide, prevSlide };
  }

  // Gallery grid rendering
  function render(){
    if(!grid) return;
    const cat = filter?.value || '';
    const list = items.filter(i => !cat || i.category === cat);
    grid.innerHTML = '';
    list.forEach(i => {
      const card = document.createElement('article');
      card.className = 'tile';
      card.innerHTML = '<img src="'+i.image+'" alt="'+i.title+' by '+i.artist+'" />'
        + '<div style="padding:12px"><strong>'+i.title+'</strong><div class="muted">'+i.artist+' · '+i.medium+'</div></div>';
      card.addEventListener('click', ()=> openLightbox(i));
      grid.appendChild(card);
    });
  }

  function openLightbox(i){
    const lb = document.getElementById('lightbox');
    if(!lb) return;
    document.getElementById('lb-title').textContent = i.title + ' — ' + i.artist;
    const im = document.getElementById('lb-image'); im.src = i.image; im.alt = i.title;
    document.getElementById('lb-meta').textContent = i.category + ' · ' + i.medium;
    document.getElementById('lb-story').textContent = i.story;
    lb.style.display = 'flex';
  }
  function closeLightbox(){ 
    const lb = document.getElementById('lightbox');
    if(lb) lb.style.display = 'none';
  }

  // Lightbox handlers
  document.getElementById('lb-close')?.addEventListener('click', closeLightbox);
  document.getElementById('lightbox')?.addEventListener('click', function(e){ if(e.target.id==='lightbox') closeLightbox(); });
  filter?.addEventListener('change', render);

  // Initialize slideshows and gallery
  fetch('data/gallery.json').then(r=>r.json()).then(jsonList=>{ 
    items = [...jsonList];
    
    // Add items from localStorage
    try {
      const stored = localStorage.getItem('gallery_data');
      if(stored){
        const storedItems = JSON.parse(stored);
        if(Array.isArray(storedItems)){
          items = [...items, ...storedItems];
        }
      }
    } catch(e) {
      console.log('Could not load gallery from localStorage');
    }
    
    render();
    
    // Library slideshow - first 4 images
    const libraryItems = items.slice(0, 4);
    initSlideshow(
      'library-slideshow',
      'library-track',
      'library-indicators',
      libraryItems,
      true,
      5000
    );
    
    // Clothes slideshow - rest of the images (from index 4 onwards)
    const clothesItems = items.slice(4);
    initSlideshow(
      'clothes-slideshow',
      'clothes-track',
      'clothes-indicators',
      clothesItems,
      true,
      5000
    );
  }).catch(err => {
    // If fetch fails, try localStorage only
    try {
      const stored = localStorage.getItem('gallery_data');
      if(stored){
        items = JSON.parse(stored);
        render();
        
        const libraryItems = items.slice(0, 4);
        initSlideshow(
          'library-slideshow',
          'library-track',
          'library-indicators',
          libraryItems,
          true,
          5000
        );
        
        const clothesItems = items.slice(4);
        initSlideshow(
          'clothes-slideshow',
          'clothes-track',
          'clothes-indicators',
          clothesItems,
          true,
          5000
        );
      }
    } catch(e) {
      console.log('Could not load gallery');
    }
  });
})();

