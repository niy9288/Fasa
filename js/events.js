// Home page dynamic: next event and countdown
(function(){
  const nextEventCard = document.getElementById('next-event-card');
  const countdownEl = document.getElementById('countdown');
  const summaryEl = document.getElementById('next-event-summary');
  if(!nextEventCard) return;

  fetch('data/events.json').then(r=>r.json()).then(list=>{
    const upcoming = list
      .map(e=>({ ...e, dateObj:new Date(e.start) }))
      .filter(e=>e.dateObj.getTime() > Date.now())
      .sort((a,b)=>a.dateObj - b.dateObj)[0];
    if(!upcoming){
      summaryEl.textContent = 'No upcoming events. Check back soon!';
      return;
    }
    summaryEl.innerHTML = '<strong>'+upcoming.title+'</strong><br><span class="muted">'+ new Date(upcoming.start).toLocaleString() +'</span>';

    const tick = () => {
      const diff = new Date(upcoming.start).getTime() - Date.now();
      if(diff <= 0){ countdownEl.textContent = '00:00:00'; return; }
      const h = Math.floor(diff/3_600_000).toString().padStart(2,'0');
      const m = Math.floor(diff%3_600_000/60_000).toString().padStart(2,'0');
      const s = Math.floor(diff%60_000/1_000).toString().padStart(2,'0');
      countdownEl.textContent = h+':'+m+':'+s;
    };
    tick();
    setInterval(tick, 1000);
  }).catch(()=>{
    summaryEl.textContent = 'Unable to load events.';
  });
})();

// Home: testimonials and new arrivals placeholder
(function(){
  const t = document.getElementById('testimonials');
  if(t){
    const quotes = [
      { q:'My friends and I ask to come every weekend!', a:'— Paccy, volunteer' },
      { q:'A magical blend of art and books.', a:'— Aime, volunteer' },
      { q:'Workshops are fun and educational.', a:'— Ragvax, volunteer' }
    ];
    quotes.forEach(item=>{
      const el = document.createElement('div');
      el.className = 'item';
      el.innerHTML = '<p style="font-family:var(--font-accent);font-size:22px">“'+item.q+'”</p><div class="muted">'+item.a+'</div>';
      t.appendChild(el);
    });
  }

  const arrivals = document.getElementById('new-arrivals');
  if(arrivals){
    const books = [
      { title:'Sunlit Tales', cover:'assets/book1.jpg' },
      { title:'Colors of the Garden', cover:'assets/book2.jpg' },
      { title:'Little Explorers', cover:'assets/book3.jpg' }
    ];
    books.forEach(b=>{
      const wrap = document.createElement('div');
      wrap.style.borderRadius = '10px';
      wrap.style.overflow = 'hidden';
      wrap.style.boxShadow = 'var(--shadow-sm)';
      wrap.style.transition = 'transform .2s, box-shadow .2s';
      wrap.onmouseenter = ()=>{ wrap.style.transform='translateY(-3px)'; wrap.style.boxShadow='var(--shadow-md)'; };
      wrap.onmouseleave = ()=>{ wrap.style.transform=''; wrap.style.boxShadow='var(--shadow-sm)'; };
      const img = document.createElement('img');
      img.alt = b.title;
      img.src = b.cover;
      wrap.appendChild(img);
      arrivals.appendChild(wrap);
    });
  }
})();

// Events page: list rendering, filters, RSVP modal
(function(){
  const listEl = document.getElementById('events-list');
  if(!listEl) return;
  const categorySelect = document.getElementById('category-filter');
  const ageSelect = document.getElementById('age-filter');
  let events = [];

  function render(){
    const cat = categorySelect.value;
    const age = ageSelect.value;
    const filtered = events.filter(e => (
      (!cat || e.category === cat) && (!age || e.age === age)
    ));
    listEl.innerHTML = '';
    filtered.sort((a,b)=> new Date(a.start) - new Date(b.start)).forEach(e=>{
      const el = document.createElement('article');
      el.className = 'card';
      el.innerHTML = [
        '<div style="display:flex;gap:14px;align-items:center">',
        e.cover ? '<img src="'+e.cover+'" alt="'+e.title+'" style="width:88px;height:88px;object-fit:cover;border-radius:10px" />' : '',
        '<div>',
        '<h3>'+e.title+'</h3>',
        '<div class="muted">'+ new Date(e.start).toLocaleString() +' · '+ e.category +' · Age '+ e.age +'</div>',
        '<p class="muted">'+ e.description +'</p>',
        '<div style="display:flex;gap:10px;flex-wrap:wrap">',
        (e.outcomes||[]).map(o=>'<span class="pill">'+o+'</span>').join(''),
        '</div>',
        '<div style="margin-top:10px;display:flex;gap:10px">',
        '<button class="cta" data-rsvp="'+e.id+'">RSVP</button>',
        '</div>',
        '</div>',
        '</div>'
      ].join('');
      listEl.appendChild(el);
    });
  }

  function openRsvp(id){
    const modal = document.getElementById('rsvp-modal');
    const hidden = document.getElementById('rsvp-event-id');
    hidden.value = id;
    modal.style.display = 'flex';
  }
  function closeRsvp(){
    document.getElementById('rsvp-modal').style.display = 'none';
  }

  document.addEventListener('click', function(e){
    const btn = e.target.closest('[data-rsvp]');
    if(btn){ openRsvp(btn.getAttribute('data-rsvp')); }
  });
  document.getElementById('rsvp-cancel')?.addEventListener('click', closeRsvp);
  document.getElementById('rsvp-modal')?.addEventListener('click', function(e){ if(e.target.id==='rsvp-modal') closeRsvp(); });

  const rsvpForm = document.getElementById('rsvp-form');
  if(rsvpForm){
    rsvpForm.addEventListener('submit', function(e){
      e.preventDefault();
      const id = document.getElementById('rsvp-event-id').value;
      const name = document.getElementById('rsvp-name').value;
      const email = document.getElementById('rsvp-email').value;
      const count = document.getElementById('rsvp-count').value;
      alert('RSVP received for '+ id +' — '+ name +' ('+ email +'), #'+ count);
      rsvpForm.reset();
      closeRsvp();
    });
  }

  categorySelect?.addEventListener('change', render);
  ageSelect?.addEventListener('change', render);

  fetch('data/events.json').then(r=>r.json()).then(list=>{ events = list; render(); });
})();

