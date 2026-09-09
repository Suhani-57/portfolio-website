/* Fresh case study — page-local behaviour only.
   Deliberately standalone: script.js drives the homepage's project list and
   preview card and would throw here. This is the same page chrome the About,
   Fluence, Hoopr and Unseen pages use — mobile menu, copy-email toast and the
   shared .reveal system — so the footer copied from index.html animates in
   exactly as it does there. */
(function(){
  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- mobile menu ----------
  var menu = document.getElementById('frMobileMenu');
  var toggle = document.getElementById('frNavToggle');
  var close = document.getElementById('frMobileClose');
  if(menu && toggle && close){
    toggle.addEventListener('click', function(){ menu.classList.add('open'); });
    close.addEventListener('click', function(){ menu.classList.remove('open'); });
    menu.addEventListener('click', function(e){ if(e.target === menu) menu.classList.remove('open'); });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') menu.classList.remove('open');
    });
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
      } else {
        show(text);
      }
    });
  });

  // ---------- reveal on scroll ----------
  var revealEls = document.querySelectorAll('.reveal');
  if(prefersReduced){
    revealEls.forEach(function(el){ el.classList.add('in'); });
    return;
  }
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:0.12, rootMargin:'0px 0px -8% 0px'});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }

  // safety net: anything already on screen is revealed without waiting for the
  // observer, so a failed callback can never leave the page half blank
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
