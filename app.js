(()=>{ 
  const params=new URLSearchParams(location.search);
  const campaign={
    source:params.get('utm_source')||'',
    medium:params.get('utm_medium')||'',
    campaign:params.get('utm_campaign')||'',
    content:params.get('utm_content')||'',
    term:params.get('utm_term')||''
  };

  const track=(name,extra={})=>{
    const detail={event:name,...campaign,...extra};
    window.dispatchEvent(new CustomEvent('bgm:conversion',{detail}));
    window.dataLayer=window.dataLayer||[];
    window.dataLayer.push(detail);
  };

  document.querySelectorAll('[data-event]').forEach(el=>{
    el.addEventListener('click',()=>track(el.dataset.event,{href:el.href||''}));
  });

  const menu=document.querySelector('[data-menu]');
  const toggle=document.querySelector('[data-menu-toggle]');
  if(menu&&toggle){
    const closeMenu=()=>{
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
      document.body.classList.remove('menu-open');
    };
    toggle.addEventListener('click',()=>{
      const opening=!menu.classList.contains('open');
      menu.classList.toggle('open',opening);
      toggle.setAttribute('aria-expanded',String(opening));
      document.body.classList.toggle('menu-open',opening);
    });
    menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
    window.addEventListener('resize',()=>{if(innerWidth>760)closeMenu();});
    document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
  }

  document.querySelectorAll('[data-year]').forEach(node=>{node.textContent=String(new Date().getFullYear());});

  let sent50=false;
  let sent90=false;
  const onScroll=()=>{
    const max=document.documentElement.scrollHeight-innerHeight;
    if(max<=0)return;
    const pct=(scrollY/max)*100;
    if(!sent50&&pct>=50){sent50=true;track('scroll_50');}
    if(!sent90&&pct>=90){sent90=true;track('scroll_90');window.removeEventListener('scroll',onScroll);}
  };
  window.addEventListener('scroll',onScroll,{passive:true});
})();