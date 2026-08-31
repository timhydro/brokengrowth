(()=>{
  const growthCss=document.createElement('link');
  growthCss.rel='stylesheet';
  growthCss.href='green-story.css';
  document.head.appendChild(growthCss);

  const heroCard=document.querySelector('.hero-card');
  if(heroCard){
    heroCard.className='hero-card generated-photo';
    heroCard.innerHTML='<img src="assets/generated-hero.webp" alt="Illustrative campaign image of a man facing a tiny-home community at sunset" loading="eager" decoding="async">';
  }

  const oldStory=document.querySelector('#about');
  if(oldStory){
    const founder=document.createElement('section');
    founder.id='founder-story';
    founder.className='section founder-story';
    founder.innerHTML=`
      <div class="wrap founder-layout">
        <div class="founder-copy">
          <p class="eyebrow dark">My story. Our mission.</p>
          <h2>I know what it means to need a second chance—because I needed one myself.</h2>
          <p class="opening">I fought through addiction, homelessness and incarceration. There were times when I had little more than the clothes on my back and no clear path forward.</p>
          <p>I know what it feels like to be at the bottom, to have people see the worst chapter of your life before they see the person still capable of becoming something more.</p>
          <p>But that was not the end of my story. <strong>I found God.</strong> Through faith, hard work, accountability and the people who helped me keep moving, I began rebuilding my life piece by piece.</p>
          <p>That struggle gave me a purpose bigger than simply surviving it. <strong>Broken Growth Ministries exists because I want to give back.</strong> I want people facing addiction, homelessness, incarceration and reentry to have access to housing, work, recovery support, mentorship, faith and a community willing to stand beside them while they rebuild.</p>
          <div class="founder-quote">I cannot change somebody's past. But I can help make sure their past does not have to determine their future.</div>
          <div class="journey-row" aria-label="Founder journey"><span>Addiction</span><span>Homelessness</span><span>Incarceration</span><span>Finding God</span><span>Giving back</span></div>
        </div>
        <div class="story-photo-wrap">
          <figure class="generated-photo"><img src="assets/generated-story.webp" alt="Illustrative campaign image representing rebuilding, second chances and transitional housing" loading="lazy" decoding="async"></figure>
          <p class="visual-note">Generated campaign imagery illustrates the mission and is not presented as a photograph of a current participant or facility.</p>
        </div>
      </div>`;
    oldStory.parentNode.insertBefore(founder,oldStory);

    const conversion=document.createElement('section');
    conversion.className='conversion-band';
    conversion.setAttribute('aria-label','Support call to action');
    conversion.innerHTML='<div class="wrap"><div><strong>Someone can be more than the worst chapter of their life.</strong><br><span>Help build the housing, work and support that make a real second chance possible.</span></div><a class="button primary" data-event="story_donate_click" href="https://www.paypal.com/donate/?hosted_button_id=7B33SKHE49TPA" target="_blank" rel="noopener noreferrer">Help someone rebuild</a></div>';
    founder.insertAdjacentElement('afterend',conversion);

    const aboutNav=document.querySelector('a[href="#about"]');
    if(aboutNav){aboutNav.href='#founder-story';aboutNav.textContent='Our Story';}
  }

  const params=new URLSearchParams(location.search);
  const campaign={source:params.get('utm_source')||'',medium:params.get('utm_medium')||'',campaign:params.get('utm_campaign')||'',content:params.get('utm_content')||'',term:params.get('utm_term')||''};
  const track=(name,extra={})=>{const detail={event:name,...campaign,...extra};window.dispatchEvent(new CustomEvent('bgm:conversion',{detail}));window.dataLayer=window.dataLayer||[];window.dataLayer.push(detail);};
  document.querySelectorAll('[data-event]').forEach(el=>el.addEventListener('click',()=>track(el.dataset.event,{href:el.href||''})));

  const menu=document.querySelector('[data-menu]');
  const toggle=document.querySelector('[data-menu-toggle]');
  if(menu&&toggle){
    const closeMenu=()=>{menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');};
    toggle.addEventListener('click',()=>{const opening=!menu.classList.contains('open');menu.classList.toggle('open',opening);toggle.setAttribute('aria-expanded',String(opening));document.body.classList.toggle('menu-open',opening);});
    menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
    window.addEventListener('resize',()=>{if(innerWidth>760)closeMenu();});
    document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
  }

  document.querySelectorAll('[data-year]').forEach(node=>{node.textContent=String(new Date().getFullYear());});
  let sent50=false,sent90=false;
  const onScroll=()=>{const max=document.documentElement.scrollHeight-innerHeight;if(max<=0)return;const pct=(scrollY/max)*100;if(!sent50&&pct>=50){sent50=true;track('scroll_50');}if(!sent90&&pct>=90){sent90=true;track('scroll_90');window.removeEventListener('scroll',onScroll);}};
  window.addEventListener('scroll',onScroll,{passive:true});
})();
