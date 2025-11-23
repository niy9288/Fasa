(function(){
  const list = document.getElementById('blog-list');
  const mediaList = document.getElementById('media-posts');
  
  // Load regular blog posts
  if(list){
    fetch('data/blog.json').then(r=>r.json()).then(data=>{
      // Handle both array format (old) and object format (new)
      let posts = [];
      if(Array.isArray(data)){
        posts = data.filter(p => !p.type || p.type === 'post');
      } else {
        posts = data.posts || [];
      }
      
      list.innerHTML = '';
      posts.sort((a,b)=>new Date(b.date)-new Date(a.date)).forEach(p=>{
        const el = document.createElement('article');
        el.className = 'card';
        el.innerHTML = '<h3>'+p.title+'</h3>'+
          '<div class="muted">'+ new Date(p.date).toLocaleDateString() +'</div>'+
          '<p>'+p.excerpt+'</p>'+
          '<details><summary>Read more</summary><p class="muted">'+ p.content +'</p></details>';
        list.appendChild(el);
      });
    });
  }

  // Load YouTube and social media posts
  if(mediaList){
    fetch('data/blog.json').then(r=>r.json()).then(data=>{
      // Handle both array format (old) and object format (new)
      let mediaPosts = [];
      if(Array.isArray(data)){
        mediaPosts = data.filter(p => p.type === 'youtube' || p.type === 'social');
      } else {
        mediaPosts = data.media || [];
      }
      
      mediaList.innerHTML = '';
      
      if(mediaPosts.length === 0){
        mediaList.innerHTML = '<p class="muted" style="text-align:center;padding:40px">No media posts yet. Check back soon!</p>';
        return;
      }

      mediaPosts.sort((a,b)=>new Date(b.date || b.added || 0)-new Date(a.date || a.added || 0)).forEach(post=>{
        const card = document.createElement('article');
        card.className = 'media-card';
        
        let embedHTML = '';
        let title = post.title || 'Media Post';
        let description = post.description || post.caption || '';
        let date = post.date || post.added || '';

        if(post.type === 'youtube' || post.youtube){
          // YouTube embed
          const videoId = post.youtube || extractYouTubeId(post.url || post.embed);
          if(videoId){
            embedHTML = `<div class="media-embed">
              <iframe src="https://www.youtube.com/embed/${videoId}" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
              </iframe>
            </div>`;
          } else if(post.url){
            // YouTube channel link - show as clickable link
            embedHTML = `<div style="padding:60px 40px;text-align:center;background:linear-gradient(135deg,var(--color-primary),var(--color-olive));border-radius:14px;">
              <div style="color:#fff;margin-bottom:20px;font-size:48px;">▶</div>
              <a href="${post.url}" target="_blank" rel="noopener noreferrer" class="cta" style="background:#fff;color:var(--color-primary);display:inline-block;">Visit Our YouTube Channel</a>
            </div>`;
          }
        } else if(post.type === 'social' || post.instagram || post.facebook || post.twitter || post.platform === 'TikTok'){
          // Social media embed
          const embedCode = post.embed || post.iframe || '';
          if(embedCode){
            embedHTML = `<div class="social-embed">${embedCode}</div>`;
          } else if(post.url){
            // Fallback: show link with platform-specific styling
            const platformName = post.platform || 'Social Media';
            const platformIcon = post.platform === 'TikTok' ? '🎵' : '📱';
            embedHTML = `<div style="padding:60px 40px;text-align:center;background:linear-gradient(135deg,var(--color-secondary),var(--color-accent));border-radius:14px;">
              <div style="color:#fff;margin-bottom:20px;font-size:48px;">${platformIcon}</div>
              <a href="${post.url}" target="_blank" rel="noopener noreferrer" class="cta" style="background:#fff;color:var(--color-olive);display:inline-block;">Follow us on ${platformName}</a>
            </div>`;
          }
        } else if(post.embed){
          // Generic embed code
          embedHTML = `<div class="media-embed">${post.embed}</div>`;
        }

        card.innerHTML = embedHTML + 
          `<div class="media-content">
            <h3>${title}</h3>
            ${date ? `<div class="muted">${new Date(date).toLocaleDateString()}</div>` : ''}
            ${description ? `<p class="muted">${description}</p>` : ''}
          </div>`;
        
        mediaList.appendChild(card);
      });
    }).catch(err => {
      if(mediaList) {
        mediaList.innerHTML = '<p class="muted" style="text-align:center;padding:40px">No media posts available.</p>';
      }
    });
  }

  // Helper function to extract YouTube video ID
  function extractYouTubeId(url){
    if(!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }
})();

