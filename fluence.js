/* Fluence case-study page — minimal interaction only.
   Deliberately standalone: script.js is homepage-coupled and would throw here. */
(function(){
  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // marks JS as available so .fl-reveal can start hidden without risking
  // invisible content when JS fails to load
  document.body.classList.add('fl-js');

  // ---------- mobile menu ----------
  var menu = document.getElementById('flMobileMenu');
  var toggle = document.getElementById('flNavToggle');
  var close = document.getElementById('flMobileClose');
  if(menu && toggle && close){
    toggle.addEventListener('click', function(){ menu.classList.add('open'); });
    close.addEventListener('click', function(){ menu.classList.remove('open'); });
    menu.addEventListener('click', function(e){ if(e.target === menu) menu.classList.remove('open'); });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') menu.classList.remove('open');
    });
  }

  // ---------- copy email ----------
  var toast = document.getElementById('flToast');
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

  // ---------- scroll reveal ----------
  var revealEls = document.querySelectorAll('.fl-reveal');

  function revealAll(){
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }
  // safety net: reveal anything already within the viewport without relying on
  // the observer, so the page can never be left blank if it does not fire
  function revealInView(){
    var vh = window.innerHeight || document.documentElement.clientHeight;
    revealEls.forEach(function(el){
      if(el.classList.contains('in')) return;
      var r = el.getBoundingClientRect();
      if(r.top < vh * 0.95 && r.bottom > 0) el.classList.add('in');
    });
  }

  if(prefersReduced || !('IntersectionObserver' in window)){
    revealAll();
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, {threshold:0.08, rootMargin:'0px 0px -5% 0px'});
    revealEls.forEach(function(el){ io.observe(el); });

    revealInView();
    window.addEventListener('load', revealInView);
    // observers are suspended while a tab is hidden — catch up on return
    document.addEventListener('visibilitychange', function(){
      if(!document.hidden) revealInView();
    });
  }
})();
