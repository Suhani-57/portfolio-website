/* Hoopr Music Artworks — page-local behaviour only.
   Deliberately standalone: script.js is homepage-coupled and would throw here.

   Everything on this page is driven by the ARTWORKS data below. There is one
   click handler, one expansion panel per playlist and one renderer — adding a
   track means adding a record, not writing more code. */
(function(){
  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- the five playlists, in page order ----------
  var PLAYLISTS = [
    { id:'indian-pop',   name:'Indian Pop',                header:'assets/images/hoopr/header-indian-pop.png' },
    { id:'indian-folk',  name:'Indian Folk & Devotional',  header:'assets/images/hoopr/header-indian-folk.png' },
    { id:'bhojpuri',     name:'Bhojpuri Beats',            header:'assets/images/hoopr/header-bhojpuri.png' },
    { id:'ambient',      name:'Ambient & Instrumental',    header:'assets/images/hoopr/header-ambient.png' },
    { id:'beyond',       name:'Beyond Music',              header:'assets/images/hoopr/header-beyond-music.png' }
  ];

  // ---------- every artwork, with the case study that opens when it is clicked ----------
  var ARTWORKS = [
    {
      list:'indian-pop', title:'Na Koi Tere Siva', art:'assets/images/hoopr/art/na-koi-tere-siva.jpg',
      brief:'Create the cover artwork with a strong romantic and intimate feel. The visual should focus on the connection between two people and create a soft, dreamlike atmosphere that complements the emotional tone of the song.',
      keywords:'Romantic · Intimate · Dreamy · Emotional · Soft · Contemporary',
      made:[
        'I generated the male and female characters in Midjourney and isolated them to build the composition from scratch. I brought the two figures together to create the central moment of intimacy.',
        'The pink and blue palette helped create the dreamy quality I was looking for, while the bright space between the figures became the focal point of the composition. I then integrated the expressive typography into the image so the title felt like part of the visual rather than a separate element.'
      ],
      tools:'Midjourney · Adobe Photoshop · Adobe Illustrator'
    },
    {
      list:'indian-pop', title:'Kudi Soni', art:'assets/images/hoopr/art/kudi-soni.jpg',
      brief:'Create a cover that brings out the upbeat Punjabi character of the track and its theme of admiration. The visual should feel lively, celebratory and rooted in a contemporary Indian setting.',
      keywords:'Punjabi · Joyful · Admiration · Vibrant · Celebratory · Contemporary',
      made:[
        'I used Midjourney to generate the main characters and background elements, then cut them out and edited the imagery to build the final scene.',
        'Rather than making it a straightforward portrait, I created a different elements around the main character. I kept the colours warm and the image slightly cinematic to give the feeling of a lively celebration.'
      ],
      tools:'Midjourney · Adobe Photoshop'
    },
    {
      list:'indian-pop', title:'Ye Nazaare', art:'assets/images/hoopr/art/ye-nazaare.jpg',
      brief:'Create a visually engaging cover that feels light, expressive and contemporary. The artwork should have a strong personality and work effectively as a small-format digital music thumbnail.',
      keywords:'Playful · Expressive · Youthful · Pop · Bold · Contemporary',
      made:[
        'I used a raw image that was provided to me by the company and then isolated and edited the image for the final composition.',
        'Since the red sunglasses gave a very playful vibe i used it as the main visual hook and built the rest of the artwork around them. The warm pixelated background and bright red accents give the cover a playful feel, while the oversized title makes it immediately recognisable at a smaller size.'
      ],
      tools:'Adobe Photoshop'
    },
    {
      list:'indian-pop', title:'Vaareya', art:'assets/images/hoopr/art/vaareya.webp',
      brief:'Create a cover artwork for Vaareya with a raw, intense and contemporary visual direction. The artwork should reflect the emotional weight of the track through a darker, textured visual treatment.',
      keywords:'Raw · Gritty · Dark · Intense · Contemporary · Strong emotions · Loneliness · Sadness',
      made:[
        'I used different visual elements and layered them together in Photoshop to build the final composition.',
        'I kept the imagery dark and heavily textured, with warm highlights cutting through the darker background to give the artwork a rough, almost distressed feel. Instead of using the artist as the main visual, I made the title the focal point and treated the typography almost like part of the image itself.',
        'The grainy treatment and high contrast help give the cover a more raw and underground feel while keeping the title readable at a small digital-cover size.'
      ],
      tools:'Midjourney · Adobe Photoshop'
    },
    {
      list:'indian-pop', title:'Khoya', art:'assets/images/hoopr/art/khoya.jpg',
      brief:'Create a cover that reflects the feeling of being emotionally lost and caught between memory and longing. The visual should feel introspective, atmospheric and slightly distant.',
      keywords:'Longing · Nostalgia · Introspective · Moody · Emotional · Dreamlike',
      made:[
        'I used online sources to get the figure and surrounding environment, then isolated and layered the imagery in Photoshop.',
        'I kept the character in silhouette and placed him against a muted, textured environment to create a sense of distance. The darker tones and layered imagery were used to make the artwork feel like a memory rather than a literal scene.'
      ],
      tools:'Midjourney · Adobe Photoshop'
    },

    {
      list:'indian-folk', title:'Noya Doman', art:'assets/images/hoopr/art/noya-doman.jpg',
      brief:"Create a digital cover that reflects the song's Indian cultural character and romantic narrative. The artwork should feel rooted in Indian visual culture while still working as a contemporary music release.",
      keywords:'Indian · Romantic · Cultural · Traditional · Warm · Storytelling',
      made:[
        'I used Midjourney to generate the characters and then isolated and edited them to build the composition.',
        'I wanted the artwork to feel like a scene from an old Indian story, so I brought the characters together with the book and traditional clothing to give the cover a narrative quality.',
        'I added the decorative border and layered background to push the cultural feel further, while keeping the title prominent at the top.'
      ],
      tools:'Midjourney · Adobe Photoshop · Adobe Illustrator'
    },
    {
      list:'indian-folk', title:'Mushkil Karo Aasaan', art:'assets/images/hoopr/art/mushkil-karo-aasaan.jpg',
      brief:'Create cover artwork for modern rendition of Mushkil Karo Aasaan. The visual should retain a connection to the original Indian musical character while presenting the new version through a contemporary, youthful lens.',
      keywords:'Indian · Contemporary · Modern Rendition · Traditional · Musical',
      made:[
        'I used Midjourney to generate the artist, setting and supporting imagery, then cut out and composited the elements to build the final artwork.',
        'I wanted the visual to sit between the old and the new. The Indian styling, jewellery and natural setting reference the traditional side of the song, while the headphones and keyboard bring in the modern music context.'
      ],
      tools:'Midjourney · Adobe Photoshop'
    },
    {
      list:'indian-folk', title:'He Gjanana', art:'assets/images/hoopr/art/he-gjanana.jpg',
      brief:'Create YouTube playlist artwork for He Gjanana that reflects the devotional and festive character of the music. The artwork should feel warm and culturally relevant while keeping the playlist information clear and easy to read.',
      keywords:'Devotional · Ganpati · Festive · Indian · Warm · Calm',
      made:[
        'I used online resources to get the Ganesha figure, found a background and the blur light elements and then developed the final composition around it.',
        'I kept Ganesha as the central visual focus and used the warm lighting and soft background to create a festive atmosphere. I also incorporated the tracklist directly into the artwork so the visual works as both a playlist cover and an information piece. In the artwork posted on YouTube the Ganesha figure has a blink animation as well.'
      ],
      tools:'Adobe Photoshop'
    },

    {
      list:'bhojpuri', title:'Bingo Tedhe Medhe', art:'assets/images/hoopr/art/bingo-tedhe-medhe.jpg',
      brief:"Develop a promotional visual for Bingo! Tedhe Medhe's Bhojpuri music campaign. The artwork should bring together the product's playful personality with the energy and cultural flavour of Bhojpuri music.",
      keywords:'Bhojpuri · Regional · Playful · Energetic · Youthful · Fun',
      made:[
        'I used Adobe Illustrator to create the illustrated characters and then edited and composed them around the campaign message.',
        'I went for a deliberately loud and playful treatment, using bright colours, exaggerated expressions and large typography. The characters became the main focus so the artwork would immediately communicate the fun and informal nature of the campaign.'
      ],
      tools:'Adobe Photoshop · Adobe Illustrator'
    },
    {
      list:'bhojpuri', title:'Chokha', art:'assets/images/hoopr/art/chokha.jpg',
      brief:'Create a cover for Chokha with a strong romantic and cinematic feel. The artwork should communicate intimacy and chemistry between the characters while giving the release a visually striking presence.',
      keywords:'Romantic · Cinematic · Intimate · Nightlife · Chemistry · Dramatic · Bhojpuri Cinema',
      made:[
        'I used Midjourney to generate the characters, then cut out and composited the imagery to create the final scene.',
        'I treated the artwork almost like a film still, bringing the two characters close together and using the warm lighting to create a more intimate atmosphere. The glowing title was designed to work with the lighting in the scene rather than sit separately from it. I tried to make the artwork feel more like how Bhojpuri songs covers are made.'
      ],
      tools:'Midjourney · Adobe Photoshop'
    },

    {
      list:'ambient', title:'Whispers Of Lanka', art:'assets/images/hoopr/art/whispers-of-lanka.jpg',
      brief:'Create artwork for a playlist cover that establishes a strong sense of place and captures the feeling of discovering a new landscape. The visual should feel peaceful, immersive and evocative of Sri Lanka.',
      keywords:'Sri Lanka · Travel · Nature · Escape · Exploration · Serene',
      made:[
        'I used Midjourney to generate the landscape and character imagery and then composited the elements to create the final scene.',
        'I placed the character in the foreground looking towards the landscape so the viewer experiences the location from her perspective also added some texture to give it some movement. The saturated greens and blues were used to make the environment feel expansive and inviting.'
      ],
      tools:'Midjourney · Adobe Photoshop'
    },
    {
      list:'ambient', title:'Fluteful Melodies', art:'assets/images/hoopr/art/fluteful-melodies.jpg',
      brief:'Create artwork for a playlist cover that visually communicates the calming and melodic quality of the instrumental track. The artwork should connect the flute with a sense of openness, movement and atmosphere.',
      keywords:'Instrumental · Calm · Melodic · Nature · Airy · Serene',
      made:[
        'I used Midjourney to create the hands holding the flute, then composited it to create the final scene.',
        'Instead of showing a musician playing the flute, I wanted to visualise the music itself. I placed the flute above the landscape to make it feel almost weightless and used the large amount of sky and negative space to keep the artwork calm.'
      ],
      tools:'Midjourney · Adobe Photoshop'
    },

    {
      list:'beyond', title:'Conversation with Nishant', art:'assets/images/hoopr/art/conversation-with-nishant.jpg',
      brief:"Develop a feature visual for hoopr's Conversation with Nishant content series. The artwork should introduce the guest and communicate the relaxed, personal nature of the conversation while fitting within Hoopr's digital content identity.",
      keywords:'Editorial · Personal · Conversational · Approachable · Contemporary',
      made:[
        'I used different sources to collect the supporting visual elements and worked with the provided portrait to build the final composition.',
        'I kept Nishant as the main focus and created a room-like setting around him. The framed artwork, lamp and plant were used to give the scene a relaxed, conversational feel, while the title treatment makes the interview immediately identifiable.'
      ],
      tools:'Midjourney · Adobe Photoshop · Adobe Illustrator'
    },
    {
      list:'beyond', title:'Himalaya Muskaan Campaign', art:'assets/images/hoopr/art/himalaya-muskaan.jpg',
      brief:"Create a digital campaign visual for Himalaya Lip Care's Muskaan initiative. The artwork should communicate the brand's contribution towards providing cleft treatment for children while keeping the message positive, accessible and closely connected to the Himalaya Lip Care product.",
      keywords:'Social Impact · Children · Hope · Smile · Positive · Brand-led',
      made:[
        'I used Adobe Illustrator to create the supporting floral and background elements, then composed the campaign visual around the Himalaya Lip Care product.',
        'I kept the background soft and minimal so the product and campaign message remained the focus. The pink palette and floral details were chosen according to the lip balm flavor, while the contribution message is given enough hierarchy to be understood quickly.'
      ],
      tools:'Midjourney · Adobe Photoshop · Adobe Illustrator'
    }
  ];

  // ---------- build the playlists ----------
  var host = document.getElementById('hpLists');
  if(!host) return;

  function el(tag, cls, html){
    var n = document.createElement(tag);
    if(cls) n.className = cls;
    if(html != null) n.innerHTML = html;
    return n;
  }

  var ARROW_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

  /* One scroller implementation, shared by the Featured Works bar and every
     playlist row: arrow, wheel-free drag, and native touch scrolling. The
     arrow hides itself when the row already fits, which is what the export
     shows on the two short playlists. */
  function wireScroller(row, arrow, gapPx){
    function sync(){
      var over = row.scrollWidth - row.clientWidth > 8;
      arrow.style.display = over ? '' : 'none';
      if(over) arrow.classList.toggle('at-end', row.scrollLeft + row.clientWidth >= row.scrollWidth - 8);
    }
    row.addEventListener('scroll', sync, {passive:true});
    window.addEventListener('resize', sync);
    window.addEventListener('load', sync);
    setTimeout(sync, 0);
    // thumbnails load lazily, so re-check once they have real widths
    row.querySelectorAll('img').forEach(function(i){ i.addEventListener('load', sync); });

    arrow.addEventListener('click', function(){
      var first = row.querySelector('.hp-thumb');
      var step = first ? first.getBoundingClientRect().width + (gapPx || 20) : row.clientWidth * 0.6;
      var atEnd = row.scrollLeft + row.clientWidth >= row.scrollWidth - 8;
      row.scrollTo({ left: atEnd ? 0 : row.scrollLeft + step, behavior: prefersReduced ? 'auto' : 'smooth' });
    });

    // drag to scroll, so the row is not arrow-only on a mouse
    var down = false, startX = 0, startLeft = 0, moved = 0;
    row.addEventListener('pointerdown', function(e){
      if(e.pointerType === 'touch') return;      // native touch scrolling is better
      down = true; moved = 0; startX = e.clientX; startLeft = row.scrollLeft;
    });
    row.addEventListener('pointermove', function(e){
      if(!down) return;
      var dx = e.clientX - startX;
      if(Math.abs(dx) > 3){ row.scrollLeft = startLeft - dx; moved = Math.abs(dx); row.classList.add('dragging'); }
    });
    ['pointerup','pointercancel','pointerleave'].forEach(function(ev){
      row.addEventListener(ev, function(){ down = false; row.classList.remove('dragging'); });
    });
    // a drag that ended on a thumbnail must not also open it
    row.addEventListener('click', function(e){
      if(moved > 4){ e.stopPropagation(); e.preventDefault(); moved = 0; }
    }, true);

    return sync;
  }

  function thumbButton(a, listId, index){
    var btn = el('button', 'hp-thumb');
    btn.type = 'button';
    btn.setAttribute('role', 'listitem');
    btn.setAttribute('aria-expanded', 'false');
    btn.dataset.list = listId;
    btn.dataset.index = String(index);
    var img = el('img');
    img.src = a.art;
    img.alt = a.title;
    img.loading = 'lazy';
    btn.appendChild(img);
    return btn;
  }

  PLAYLISTS.forEach(function(list){
    var items = ARTWORKS.filter(function(a){ return a.list === list.id; });

    var card = el('section', 'hp-card hp-card-' + list.id);
    card.setAttribute('aria-labelledby', 'hd-' + list.id);

    var head = el('img', 'hp-card-head');
    head.src = list.header;
    head.alt = list.name;
    head.id = 'hd-' + list.id;
    card.appendChild(head);

    var body = el('div', 'hp-card-body');

    // the scroller holds the thumbnails; the arrow is its visible affordance
    var scrollWrap = el('div', 'hp-scroll-wrap');
    var row = el('div', 'hp-row');
    row.setAttribute('role', 'list');

    items.forEach(function(a, i){ row.appendChild(thumbButton(a, list.id, i)); });

    scrollWrap.appendChild(row);

    // only rows that actually overflow get an arrow, matching the export
    var arrow = el('button', 'hp-arrow', ARROW_SVG);
    arrow.type = 'button';
    arrow.setAttribute('aria-label', 'Show more artwork in ' + list.name);
    scrollWrap.appendChild(arrow);

    body.appendChild(scrollWrap);

    // one panel per playlist — the expansion target
    var panel = el('div', 'hp-panel');
    panel.id = 'panel-' + list.id;
    panel.hidden = true;
    body.appendChild(panel);

    card.appendChild(body);
    host.appendChild(card);

    wireScroller(row, arrow, 20);
  });

  // ---------- the Featured Works carousel: every artwork, in page order ----------
  var featured = document.getElementById('hpFeatured');
  if(featured){
    var fWrap = el('div', 'hp-scroll-wrap');
    var fRow = el('div', 'hp-row hp-row-featured');
    fRow.setAttribute('role', 'list');
    ARTWORKS.forEach(function(a){
      // the index is resolved against the artwork's own playlist, so a
      // featured tile opens exactly what the playlist tile opens
      var items = ARTWORKS.filter(function(x){ return x.list === a.list; });
      fRow.appendChild(thumbButton(a, a.list, items.indexOf(a)));
    });
    var fArrow = el('button', 'hp-arrow', ARROW_SVG);
    fArrow.type = 'button';
    fArrow.setAttribute('aria-label', 'Show more featured artwork');
    fWrap.appendChild(fRow);
    fWrap.appendChild(fArrow);
    featured.appendChild(fWrap);
    wireScroller(fRow, fArrow, 8);
  }

  // ---------- one renderer, one open panel per playlist ----------
  function render(a){
    return '<article class="hp-detail">' +
      '<h3 class="hp-detail-title">' + a.title + '</h3>' +
      '<img class="hp-detail-art" src="' + a.art + '" alt="' + a.title + ' — final artwork">' +
      '<h4>CLIENT BRIEF</h4><p>' + a.brief + '</p>' +
      '<h4>Keywords</h4><p>' + a.keywords + '</p>' +
      '<h4>WHAT I MADE</h4>' + a.made.map(function(t){ return '<p>' + t + '</p>'; }).join('') +
      '<p class="hp-tools"><span>Tools:</span> ' + a.tools + '</p>' +
      '</article>';
  }

  var DUR = 450;   // must match the height transition in hoopr.css

  /* transitionend is not guaranteed — it never fires if the height does not
     actually change, if the element is off-screen, or if motion is reduced.
     Every settle is therefore also driven by a timer, and guarded so it can
     only run once. Without this a panel can be left permanently open. */
  function settle(panel, fn){
    if(panel._t) { clearTimeout(panel._t); panel._t = null; }
    var ran = false;
    var once = function(){
      if(ran) return; ran = true;
      panel.removeEventListener('transitionend', once);
      if(panel._t){ clearTimeout(panel._t); panel._t = null; }
      fn();
    };
    if(prefersReduced){ once(); return; }
    panel.addEventListener('transitionend', once);
    panel._t = setTimeout(once, DUR + 80);
  }

  function collapse(panel){
    if(panel.hidden) return;
    panel.style.height = panel.scrollHeight + 'px';
    void panel.offsetHeight;                       // commit the start height
    panel.classList.remove('open');
    panel.style.height = '0px';
    settle(panel, function(){
      panel.hidden = true; panel.innerHTML = ''; panel.style.height = '';
    });
  }

  function expand(panel, html){
    panel.innerHTML = html;
    panel.hidden = false;
    panel.style.height = 'auto';
    var target = panel.scrollHeight;
    panel.style.height = '0px';
    void panel.offsetHeight;
    panel.classList.add('open');
    panel.style.height = target + 'px';
    settle(panel, function(){ panel.style.height = 'auto'; });
  }

  var openKey = null;   // "listId:index" of whatever is currently showing

  /* One handler for every thumbnail on the page, playlist or featured. A
     featured tile opens the same case study its playlist tile opens, then
     brings that playlist into view so the user keeps the thread of
     which playlist -> which artwork -> which story. */
  document.addEventListener('click', function(e){
    var btn = e.target.closest('.hp-thumb');
    if(!btn) return;
    var fromFeatured = !!e.target.closest('.hp-row-featured');

    var listId = btn.dataset.list;
    var idx = parseInt(btn.dataset.index, 10);
    var items = ARTWORKS.filter(function(a){ return a.list === listId; });
    var panel = document.getElementById('panel-' + listId);
    var key = listId + ':' + idx;

    // clicking the open one closes it
    if(openKey === key){
      collapse(panel);
      document.querySelectorAll('.hp-thumb.is-open').forEach(function(b){
        b.classList.remove('is-open'); b.setAttribute('aria-expanded', 'false');
      });
      openKey = null;
      return;
    }

    // close whatever was open, wherever it was
    if(openKey){
      var prevList = openKey.split(':')[0];
      var prevPanel = document.getElementById('panel-' + prevList);
      if(prevPanel && prevList !== listId) collapse(prevPanel);
      document.querySelectorAll('.hp-thumb.is-open').forEach(function(b){
        b.classList.remove('is-open'); b.setAttribute('aria-expanded', 'false');
      });
    }

    expand(panel, render(items[idx]));
    openKey = key;

    // mark the matching tile in both places, so the featured bar and the
    // playlist agree about what is open
    host.querySelectorAll('.hp-thumb[data-list="' + listId + '"][data-index="' + idx + '"]')
      .forEach(function(b){ b.classList.add('is-open'); b.setAttribute('aria-expanded', 'true'); });
    btn.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');

    if(fromFeatured){
      var card = panel.closest('.hp-card');
      if(card) card.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
    }
  });

  // ---------- mobile menu ----------
  var menu = document.getElementById('hpMobileMenu');
  var toggle = document.getElementById('hpNavToggle');
  var close = document.getElementById('hpMobileClose');
  if(menu && toggle && close){
    toggle.addEventListener('click', function(){ menu.classList.add('open'); });
    close.addEventListener('click', function(){ menu.classList.remove('open'); });
    menu.addEventListener('click', function(e){ if(e.target === menu) menu.classList.remove('open'); });
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape') menu.classList.remove('open'); });
  }

  // ---------- copy email ----------
  var toast = document.getElementById('toast');
  var toastTimer;
  document.querySelectorAll('.copy-email').forEach(function(btn){
    btn.addEventListener('click', function(){
      var text = btn.getAttribute('data-copy');
      var show = function(msg){
        if(!toast) return;
        toast.textContent = msg;
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function(){ toast.classList.remove('show'); }, 2200);
      };
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(text).then(function(){ show('Email copied ✦'); }).catch(function(){ show(text); });
      } else { show(text); }
    });
  });

  // ---------- reveal on scroll (footer, same as the homepage) ----------
  var revealEls = document.querySelectorAll('.reveal');
  if(prefersReduced){
    revealEls.forEach(function(el){ el.classList.add('in'); });
  } else if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, {threshold:0.12, rootMargin:'0px 0px -8% 0px'});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }
  // safety net so a failed observer can never leave the page blank
  function revealInView(){
    var vh = window.innerHeight || document.documentElement.clientHeight;
    revealEls.forEach(function(el){
      if(el.classList.contains('in')) return;
      var r = el.getBoundingClientRect();
      if(r.top < vh * 0.95 && r.bottom > 0) el.classList.add('in');
    });
  }
  revealInView();
  window.addEventListener('load', revealInView);
})();
