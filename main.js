
// highlight active nav on scroll
const links = document.querySelectorAll('.links a[href^="#"]');
const ids = Array.from(links).map(a => document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);

function onScroll(){
  const y = window.scrollY + 120;
  for (const [i,sec] of ids.entries()){
    const next = ids[i+1];
    if (y >= sec.offsetTop && (!next || y < next.offsetTop)) {
      links.forEach(a => a.classList.remove('active'));
      document.querySelector('.links a[href="#'+sec.id+'"]').classList.add('active');
      break;
    }
  }
}
document.addEventListener('scroll', onScroll);
window.addEventListener('load', onScroll);

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth'}); }
  });
});

// contact form: mailto fallback + localStorage
const form = document.getElementById('contact-form');
if (form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    try { localStorage.setItem('zzaks_form', JSON.stringify(data)); } catch {}
    const subject = encodeURIComponent('Заявка с сайта ZZAKS');
    const body = encodeURIComponent(`Имя: ${data.name}\nТелефон: ${data.phone}\nEmail: ${data.email}\nСообщение: ${data.message}`);
    window.location.href = `mailto:kirigov32@gmail.com?subject=${subject}&body=${body}`;
    alert('Готово: сформировано письмо через ваш e-mail клиент.');
    form.reset();
  });
}
