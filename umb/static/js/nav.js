(function(){
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav-links');
  if(!toggle || !nav) return;

  function closeMenu(){
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded','false');
  }
  function openMenu(){
    nav.classList.add('open');
    toggle.setAttribute('aria-expanded','true');
  }

  toggle.addEventListener('click',()=>{
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    if(expanded){ closeMenu(); } else { openMenu(); }
  });

  nav.addEventListener('click', (e)=>{
    if(e.target.tagName === 'A' && window.matchMedia('(max-width:700px)').matches){
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){ closeMenu(); }
  });

  document.addEventListener('click', (e)=>{
    if(!nav.contains(e.target) && e.target !== toggle && nav.classList.contains('open')){
      closeMenu();
    }
  });
})();