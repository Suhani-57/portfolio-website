(function(){
  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var usingTouch = false;
  window.addEventListener('touchstart', function(){ usingTouch = true; }, {once:true, passive:true});

  // ---------- scroll progress bar ----------
  var progressBar = document.getElementById('scrollProgress');
  function updateProgress(){
    var h = document.documentElement;
    var scrolled = h.scrollTop;
    var max = h.scrollHeight - h.clientHeight;
    var pct = max > 0 ? (scrolled / max) * 100 : 0;
    if(progressBar) progressBar.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, {passive:true});
  updateProgress();

  // ---------- button ripple ----------
  document.querySelectorAll('.btn, .btn-light, .other-works-pill').forEach(function(btn){
    btn.addEventListener('click', function(e){
      if(prefersReduced) return;
      var r = btn.getBoundingClientRect();
      var ripple = document.createElement('span');
      var size = Math.max(r.width, r.height) * 1.2;
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - r.left - size/2) + 'px';
      ripple.style.top = (e.clientY - r.top - size/2) + 'px';
      btn.appendChild(ripple);
      setTimeout(function(){ ripple.remove(); }, 650);
    });
  });

  // ---------- hero parallax ----------
  var heroSection = document.getElementById('about');
  var charWrap = document.querySelector('.hero-art');
  if(heroSection && charWrap && !prefersReduced && window.matchMedia('(min-width:981px)').matches){
    heroSection.addEventListener('mousemove', function(e){
      var r = heroSection.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      charWrap.style.transform = 'translate('+(px*16)+'px,'+(py*14)+'px) rotate('+(px*3)+'deg)';
    });
    heroSection.addEventListener('mouseleave', function(){
      charWrap.style.transform = '';
    });
  }

  // ---------- draggable hobby notes ----------
  document.querySelectorAll('.note').forEach(function(note){
    var startX, startY, startLeft, startTop, activePointerId = null;

    function onMove(e){
      if(activePointerId === null || e.pointerId !== activePointerId) return;
      var dx = e.clientX - startX;
      var dy = e.clientY - startY;
      note.style.left = (startLeft + dx) + 'px';
      note.style.top = (startTop + dy) + 'px';
    }

    function onUp(e){
      if(activePointerId === null || e.pointerId !== activePointerId) return;
      activePointerId = null;
      note.classList.remove('dragging');
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointercancel', onUp);
    }

    note.addEventListener('pointerdown', function(e){
      activePointerId = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      startLeft = note.offsetLeft;
      startTop = note.offsetTop;
      note.style.left = startLeft + 'px';
      note.style.top = startTop + 'px';
      note.style.right = 'auto';
      note.classList.add('dragging');
      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup', onUp);
      document.addEventListener('pointercancel', onUp);
      e.preventDefault();
    });
  });

  // ---------- data ----------
  var projects = [
    { name:"Music Artworks", tag:"Illustration series", icon:"M", c1:"#F7C873", c2:"#EFA33D",
      desc:"A collection of album-inspired fan art blending expressive linework with color moods.",
      chips:["Illustration","Fan Art"] },
    { name:"Fluence", tag:"Branding", icon:"F", c1:"#FF9FC0", c2:"#E4568F",
      desc:"Visual identity for a creator-led brand — logo system, palette, and social templates.",
      chips:["Branding","Logo System"], url:"fluence.html" },
    { name:"Unseen", tag:"UI/UX case study", icon:"U", c1:"#8C87D9", c2:"#4F49A8",
      desc:"Redesigning a hidden-gem discovery app end to end, from user flows to final UI.",
      chips:["UI/UX","Case Study"] },
    { name:"Dor", tag:"Digital experience", icon:"D", c1:"#E98C7B", c2:"#B94836",
      desc:"An interactive, story-driven microsite built around a single evocative idea.",
      chips:["Interactive","Story-driven"] }
  ];

  var list = document.getElementById('projectList');
  var stage = document.getElementById('previewStage');
  var front = document.getElementById('previewFront');
  var wrap = document.getElementById('previewWrap');
  var pIcon = document.getElementById('pIcon');
  var pTag = document.getElementById('pTag');
  var pTitle = document.getElementById('pTitle');
  var pDesc = document.getElementById('pDesc');
  var chipAText = document.getElementById('chipAText');
  var chipBText = document.getElementById('chipBText');

  function renderPreview(p){
    wrap.style.setProperty('--proj-c1', p.c1);
    wrap.style.setProperty('--proj-c2', p.c2);
    pIcon.textContent = p.icon;
    pTag.textContent = p.tag;
    pTitle.textContent = p.name;
    pDesc.textContent = p.desc;
    if(p.chips){
      chipAText.textContent = p.chips[0];
      chipBText.textContent = p.chips[1];
    }
    wrap.style.transform = 'scale(0.97)';
    wrap.style.opacity = '0.6';
    requestAnimationFrame(function(){
      wrap.style.transition = 'transform .35s cubic-bezier(.22,1,.36,1), opacity .35s ease';
      wrap.style.transform = 'scale(1)';
      wrap.style.opacity = '1';
    });
  }

  function showStage(){ stage.classList.add('active'); }
  function hideStage(){ stage.classList.remove('active'); }

  // ---------- magnetic SUHANI badge ----------
  var suhaniBadge = document.getElementById('suhaniBadge');
  var suhaniImg = document.querySelector('.suhani-badge-img');
  var desktopPointer = window.matchMedia('(min-width:1200px)');
  if(suhaniBadge && suhaniImg && !prefersReduced){
    document.addEventListener('mousemove', function(e){
      // desktop only — below 1200px the badge sits on the card edge and the
      // magnetic pull would drag it past the viewport. Checked per move so it
      // keeps working when the window is resized.
      if(!desktopPointer.matches){
        if(suhaniImg.style.transform) suhaniImg.style.transform = '';
        return;
      }
      var r = suhaniBadge.getBoundingClientRect();
      var cx = r.left + r.width/2;
      var cy = r.top + r.height/2;
      var dx = e.clientX - cx;
      var dy = e.clientY - cy;
      var dist = Math.sqrt(dx*dx + dy*dy);
      var radius = 170;
      if(dist < radius){
        var strength = (1 - dist/radius) * 0.4;
        suhaniImg.style.transform = 'translate('+(dx*strength)+'px,'+(dy*strength)+'px)';
      } else {
        suhaniImg.style.transform = '';
      }
    });
  }

  projects.forEach(function(p, i){
    // Projects with a `url` render as a real anchor so keyboard, middle-click
    // and open-in-new-tab all work. The class is unchanged, so styling, hover,
    // tilt and preview behaviour are identical to the <div> cards.
    var item = document.createElement(p.url ? 'a' : 'div');
    if(p.url) item.href = p.url;
    item.className = 'project-item';
    item.innerHTML =
      '<span class="pname">'+p.name+'</span>';
    item.addEventListener('mouseenter', function(){
      document.querySelectorAll('.project-item').forEach(function(el){ el.classList.remove('active'); });
      item.classList.add('active');
      renderPreview(p);
      showStage();
    });
    item.addEventListener('mouseleave', function(){
      if(usingTouch) return;
      item.classList.remove('active');
      hideStage();
    });
    item.addEventListener('click', function(){
      document.querySelectorAll('.project-item').forEach(function(el){ el.classList.remove('active'); });
      item.classList.add('active');
      renderPreview(p);
      showStage();
    });
    if(!prefersReduced){
      item.addEventListener('mousemove', function(e){
        var r = item.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        item.style.transform = 'translateX(6px) rotateX('+(py*-6)+'deg) rotateY('+(px*8)+'deg)';
      });
      item.addEventListener('mouseleave', function(){
        item.style.transform = '';
      });
    }
    list.appendChild(item);
  });
  var otherWorksPill = document.getElementById('otherWorksPill');
  if(otherWorksPill){ list.appendChild(otherWorksPill); }
  renderPreview(projects[0]);

  // ---------- smooth scroll + active nav ----------
  document.querySelectorAll('[data-target]').forEach(function(el){
    el.addEventListener('click', function(e){
      e.preventDefault();
      var target = document.querySelector(el.getAttribute('data-target'));
      if(target){ target.scrollIntoView({behavior:'smooth', block:'start'}); }
      closeMobile();
    });
  });

  var sections = ['about','work','about-me','contact'].map(function(id){ return document.getElementById(id); });
  var navLinksEls = document.querySelectorAll('.nav-link');
  function onScroll(){
    var pos = window.scrollY + window.innerHeight/3;
    var current = sections[0];
    sections.forEach(function(sec){ if(sec && sec.offsetTop <= pos) current = sec; });
    navLinksEls.forEach(function(a){
      a.classList.toggle('active', a.getAttribute('data-target') === '#'+current.id);
    });
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // ---------- mobile menu ----------
  var mobileMenu = document.getElementById('mobileMenu');
  var navToggle = document.getElementById('navToggle');
  var mobileClose = document.getElementById('mobileClose');
  function openMobile(){ mobileMenu.classList.add('open'); }
  function closeMobile(){ mobileMenu.classList.remove('open'); }
  navToggle.addEventListener('click', openMobile);
  mobileClose.addEventListener('click', closeMobile);
  mobileMenu.addEventListener('click', function(e){ if(e.target === mobileMenu) closeMobile(); });

  // ---------- copy email ----------
  var toast = document.getElementById('toast');
  var toastTimer;
  document.querySelectorAll('.copy-email').forEach(function(btn){
    btn.addEventListener('click', function(){
      var text = btn.getAttribute('data-copy');
      var showToast = function(msg){
        toast.textContent = msg;
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function(){ toast.classList.remove('show'); }, 2200);
      };
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(text).then(function(){ showToast('Email copied ✦'); }).catch(function(){ showToast(text); });
      } else {
        showToast(text);
      }
    });
  });

  // ---------- reveal on scroll ----------
  // one-shot reveal for everything except the "Making ideas worth remembering"
  // block, which is handled below so it can replay
  var revealEls = document.querySelectorAll('.reveal:not(.mr-title):not(.mr-sub)');
  var mrEls = document.querySelectorAll('.mr-title.reveal, .mr-sub.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, {threshold:0.15});
    revealEls.forEach(function(el){ io.observe(el); });

    // Replays every time the block is scrolled down to. Revealing and resetting
    // are separate observers on purpose: the reset only runs once the element is
    // completely below the viewport, so the text never animates out while it is
    // still on screen (which looked like a glitch when scrolling past it).
    var mrReveal = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting) entry.target.classList.add('in');
      });
    }, {threshold:0.2, rootMargin:'0px 0px -12% 0px'});
    var mrReset = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting && entry.boundingClientRect.top > 0){
          entry.target.classList.remove('in');
        }
      });
    }, {threshold:0});
    mrEls.forEach(function(el){ mrReveal.observe(el); mrReset.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
    mrEls.forEach(function(el){ el.classList.add('in'); });
  }
})();
