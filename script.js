const progress=document.querySelector('.scroll-progress');
const menu=document.querySelector('.menu-btn');
const nav=document.querySelector('.nav');
const lightbox=document.querySelector('.lightbox');
const lightboxImg=lightbox.querySelector('img');
const closeBtn=document.querySelector('.lightbox-close');

function updateProgress(){
  const max=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=(max>0?Math.min(100,window.scrollY/max*100):0)+'%';
}
window.addEventListener('scroll',updateProgress,{passive:true}); updateProgress();

menu?.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menu.setAttribute('aria-expanded',String(open));
});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const observer=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

function openLightbox(src,alt=''){
  lightboxImg.src=src; lightboxImg.alt=alt;
  lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}
function closeLightbox(){
  lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden','true');
  lightboxImg.src=''; document.body.style.overflow='';
}
document.querySelectorAll('[data-lightbox]').forEach(el=>{
  el.addEventListener('click',()=>openLightbox(el.dataset.lightbox,el.querySelector('img')?.alt||'Portfolio image'));
});
closeBtn.addEventListener('click',closeLightbox);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox()});
