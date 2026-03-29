/* ============================================
   WEB MATH  |  main.js
   All interactivity — no dependencies
   ============================================ */

/* ---- Navbar shrink on scroll ---- */
window.addEventListener('scroll', function () {
  var nb  = document.querySelector('.navbar');
  var s2t = document.getElementById('s2t');
  if (nb)  nb.classList.toggle('scrolled', window.scrollY > 28);
  if (s2t) s2t.classList.toggle('show', window.scrollY > 300);
}, { passive: true });

/* ---- Mobile hamburger ---- */
function toggleMenu() {
  var ham = document.getElementById('ham');
  var drw = document.getElementById('drawer');
  var ovl = document.getElementById('overlay');
  if (!ham || !drw) return;
  var open = drw.classList.contains('open');
  drw.classList.toggle('open', !open);
  ovl.classList.toggle('show', !open);
  ham.classList.toggle('open', !open);
}
function closeMenu() {
  var ham = document.getElementById('ham');
  var drw = document.getElementById('drawer');
  var ovl = document.getElementById('overlay');
  if (drw) drw.classList.remove('open');
  if (ovl) ovl.classList.remove('show');
  if (ham) ham.classList.remove('open');
}

/* ---- Scroll reveal ---- */
function initReveal() {
  var els = document.querySelectorAll('.reveal');
  if (!els.length || typeof IntersectionObserver === 'undefined') {
    els.forEach(function(el) { el.classList.add('in'); });
    return;
  }
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -32px 0px' });
  els.forEach(function(el) { obs.observe(el); });
}

/* ---- Card toggle — Areas (independent) ---- */
function toggleCalc(card) {
  var hdr  = card.querySelector('.cheader');
  var body = card.querySelector('.cbody');
  if (!body) return;
  var open = body.classList.contains('open');
  body.classList.toggle('open', !open);
  if (hdr) hdr.classList.toggle('open', !open);
}

/* ---- Card toggle — Patterns (accordion) ---- */
function togglePattern(card) {
  document.querySelectorAll('.ccard').forEach(function(c) {
    if (c === card) return;
    var b = c.querySelector('.cbody'), h = c.querySelector('.cheader');
    if (b) b.classList.remove('open');
    if (h) h.classList.remove('open');
  });
  toggleCalc(card);
}

/* ---- Card toggle — Series (independent) ---- */
function toggleSeries(card) { toggleCalc(card); }

/* ---- Toast ---- */
var _tt;
function toast(msg) {
  var t = document.getElementById('toast');
  var m = document.getElementById('tmsg');
  if (!t || !m) return;
  m.textContent = msg;
  t.classList.add('show');
  clearTimeout(_tt);
  _tt = setTimeout(function() { t.classList.remove('show'); }, 2000);
}

/* ---- Copy output ---- */
function copyOut(e, btn) {
  e.stopPropagation();
  var card = btn.closest('.ccard');
  var el   = card.querySelector('.output') || card.querySelector('.result');
  var txt  = el ? el.textContent.trim() : '';
  if (!txt) { toast('Nothing to copy'); return; }
  if (navigator.clipboard) {
    navigator.clipboard.writeText(txt).then(function() { toast('Copied to clipboard ✓'); });
  } else {
    var ta = document.createElement('textarea');
    ta.value = txt; document.body.appendChild(ta);
    ta.select(); document.execCommand('copy');
    document.body.removeChild(ta); toast('Copied ✓');
  }
}

/* ---- Reset card ---- */
function resetCard(e, btn) {
  e.stopPropagation();
  var card = btn.closest('.ccard');
  card.querySelectorAll('input[type="number"]').forEach(function(i) { i.value = ''; });
  var el = card.querySelector('.output') || card.querySelector('.result');
  if (el) el.textContent = '';
}

/* ---- Helpers ---- */
function gc(btn)    { return btn.closest('.ccard'); }
function gv(c, sel) { var el = c.querySelector(sel); return el ? parseFloat(el.value) : NaN; }
function ok(v)      { return typeof v === 'number' && isFinite(v) && !isNaN(v); }
function sr(c, t)   { var el = c.querySelector('.result'); if (el) el.textContent = t; }
function so(c, t)   { var el = c.querySelector('.output'); if (el) el.textContent = t; }

/* ============================================
   AREA CALCULATORS
   ============================================ */
function calcCircle(e, btn) {
  e.stopPropagation();
  var c = gc(btn), r = gv(c, '.ir');
  if (!ok(r) || r < 0) { sr(c, '⚠  Enter a valid radius (≥ 0)'); return; }
  var A = Math.PI * r * r;
  sr(c, 'Area = ' + A.toFixed(4) + ' sq units\n\nA = π × r²\n  = π × ' + r + '²\n  = ' + A.toFixed(6));
}
function calcRect(e, btn) {
  e.stopPropagation();
  var c = gc(btn), l = gv(c, '.il'), b = gv(c, '.ib');
  if (!ok(l)||!ok(b)||l<0||b<0) { sr(c,'⚠  Enter valid length and breadth'); return; }
  sr(c, 'Area = ' + (l*b).toFixed(4) + ' sq units\n\nA = l × b = ' + l + ' × ' + b);
}
function calcTri(e, btn) {
  e.stopPropagation();
  var c = gc(btn), b = gv(c, '.ib'), h = gv(c, '.ih');
  if (!ok(b)||!ok(h)||b<0||h<0) { sr(c,'⚠  Enter valid base and height'); return; }
  sr(c, 'Area = ' + (0.5*b*h).toFixed(4) + ' sq units\n\nA = ½ × b × h\n  = ½ × ' + b + ' × ' + h);
}
function calcPara(e, btn) {
  e.stopPropagation();
  var c = gc(btn), b = gv(c, '.ib'), h = gv(c, '.ih');
  if (!ok(b)||!ok(h)||b<0||h<0) { sr(c,'⚠  Enter valid base and height'); return; }
  sr(c, 'Area = ' + (b*h).toFixed(4) + ' sq units\n\nA = b × h = ' + b + ' × ' + h);
}
function calcTrap(e, btn) {
  e.stopPropagation();
  var c = gc(btn), a = gv(c,'.ia'), b = gv(c,'.ib'), h = gv(c,'.ih');
  if (!ok(a)||!ok(b)||!ok(h)||a<0||b<0||h<0) { sr(c,'⚠  Enter valid a, b and height'); return; }
  var A = 0.5*(a+b)*h;
  sr(c,'Area = '+A.toFixed(4)+' sq units\n\nA = ½(a+b) × h\n  = ½('+a+'+'+b+') × '+h+'\n  = ½ × '+(a+b)+' × '+h);
}
function calcSq(e, btn) {
  e.stopPropagation();
  var c = gc(btn), a = gv(c, '.ia');
  if (!ok(a)||a<0) { sr(c,'⚠  Enter a valid side length'); return; }
  sr(c,'Area = '+(a*a).toFixed(4)+' sq units\n\nA = a² = '+a+'² = '+(a*a).toFixed(4));
}
function calcEllipse(e, btn) {
  e.stopPropagation();
  var c = gc(btn), a = gv(c,'.ia'), b = gv(c,'.ib');
  if (!ok(a)||!ok(b)||a<0||b<0) { sr(c,'⚠  Enter valid semi-axes'); return; }
  var A = Math.PI*a*b;
  sr(c,'Area = '+A.toFixed(4)+' sq units\n\nA = π × a × b = π × '+a+' × '+b);
}
function calcSphere(e, btn) {
  e.stopPropagation();
  var c = gc(btn), r = gv(c,'.ir');
  if (!ok(r)||r<0) { sr(c,'⚠  Enter a valid radius'); return; }
  var A = 4*Math.PI*r*r;
  sr(c,'Surface Area = '+A.toFixed(4)+' sq units\n\nSA = 4πr²\n   = 4 × π × '+r+'²\n   = '+A.toFixed(6));
}

/* ============================================
   SERIES CALCULATORS
   ============================================ */
function calcAP(e, btn) {
  e.stopPropagation();
  var c = gc(btn), a = gv(c,'.ia'), d = gv(c,'.id'), n = gv(c,'.in');
  if (!ok(a)||!ok(d)||!ok(n)||n<1) { sr(c,'⚠  Enter valid a, d and n ≥ 1'); return; }
  var S = (n/2)*(2*a+(n-1)*d), last = a+(n-1)*d;
  sr(c,'Sₙ = '+S+'\n\nSₙ = n/2 · (2a + (n−1)d)\n   = '+n+'/2 · (2×'+a+' + '+(n-1)+'×'+d+')\n\nFirst: '+a+'   Last: '+last+'   Terms: '+n);
}
function calcGP(e, btn) {
  e.stopPropagation();
  var c = gc(btn), a = gv(c,'.ia'), r = gv(c,'.ir'), n = gv(c,'.in');
  if (!ok(a)||!ok(r)||!ok(n)||n<1) { sr(c,'⚠  Enter valid a, r and n ≥ 1'); return; }
  var S = (r===1) ? a*n : a*(1-Math.pow(r,n))/(1-r);
  sr(c,'Sₙ = '+S.toFixed(6)+'\n\nSₙ = a(1−rⁿ)/(1−r)\n   = '+a+'(1−'+r+'^'+n+')/(1−'+r+')\n\nTerms: '+n+'   Ratio: '+r);
}
function calcInfGP(e, btn) {
  e.stopPropagation();
  var c = gc(btn), a = gv(c,'.ia'), r = gv(c,'.ir');
  if (!ok(a)||!ok(r)) { sr(c,'⚠  Enter valid a and r'); return; }
  if (Math.abs(r)>=1) { sr(c,'⚠  |r| must be < 1 for convergence.\n|r| = '+Math.abs(r).toFixed(4)+' ≥ 1 → series diverges'); return; }
  sr(c,'S∞ = '+(a/(1-r)).toFixed(6)+'\n\nS∞ = a/(1−r)\n   = '+a+'/(1−'+r+')\n\n✓ Converges since |'+r+'| < 1');
}
function calcHarm(e, btn) {
  e.stopPropagation();
  var c = gc(btn), n = gv(c,'.in');
  if (!ok(n)||n<1) { sr(c,'⚠  Enter n ≥ 1'); return; }
  var S=0; for (var i=1;i<=n;i++) S+=1/i;
  sr(c,'Hₙ = '+S.toFixed(8)+'\n\nHₙ = 1 + ½ + ⅓ + … + 1/'+n+'\n\nApprox: ln('+n+') + γ\n      ≈ '+(Math.log(n)+0.5772156649).toFixed(6)+'\n\n⚠  Full harmonic series diverges to ∞');
}

/* ============================================
   PATTERN GENERATORS
   ============================================ */
function genAP(e, btn) {
  e.stopPropagation();
  var c = gc(btn), a = gv(c,'.ia'), d = gv(c,'.id'), n = gv(c,'.in');
  if (!ok(a)||!ok(d)||!ok(n)||n<1) { so(c,'⚠  Enter valid a, d and n ≥ 1'); return; }
  var out = [];
  for (var i=0;i<Math.min(n,50);i++) out.push(parseFloat((a+i*d).toFixed(8)));
  so(c, out.join(', '));
}
function genGP(e, btn) {
  e.stopPropagation();
  var c = gc(btn), a = gv(c,'.ia'), r = gv(c,'.ir'), n = gv(c,'.in');
  if (!ok(a)||!ok(r)||!ok(n)||n<1) { so(c,'⚠  Enter valid a, r and n ≥ 1'); return; }
  var out = [];
  for (var i=0;i<Math.min(n,20);i++) out.push(parseFloat((a*Math.pow(r,i)).toFixed(6)));
  so(c, out.join(', '));
}
function genSq(e, btn) {
  e.stopPropagation();
  var c = gc(btn), n = gv(c,'.in');
  if (!ok(n)||n<1) { so(c,'⚠  Enter n ≥ 1'); return; }
  var out = [];
  for (var i=1;i<=Math.min(n,30);i++) out.push(i*i);
  so(c, out.join(', '));
}
function genTri(e, btn) {
  e.stopPropagation();
  var c = gc(btn), n = gv(c,'.in');
  if (!ok(n)||n<1) { so(c,'⚠  Enter n ≥ 1'); return; }
  var out = [];
  for (var i=1;i<=Math.min(n,30);i++) out.push((i*(i+1))/2);
  so(c, out.join(', '));
}
function genFib(e, btn) {
  e.stopPropagation();
  var c = gc(btn), n = gv(c,'.in');
  if (!ok(n)||n<2) { so(c,'⚠  Enter n ≥ 2'); return; }
  var f=[0,1];
  for (var i=2;i<Math.min(n,40);i++) f.push(f[i-1]+f[i-2]);
  so(c, f.slice(0,Math.min(n,40)).join(', '));
}
function genDots(e, btn) {
  e.stopPropagation();
  var c = gc(btn), n = gv(c,'.in');
  if (!ok(n)||n<1) { so(c,'⚠  Enter n ≥ 1'); return; }
  var out='';
  for (var i=1;i<=Math.min(n,18);i++) out+='★ '.repeat(i).trim()+'\n';
  so(c, out.trim());
}

/* ---- Scroll to top ---- */
function scrollTop() { window.scrollTo({ top:0, behavior:'smooth' }); }

/* ============================================
   INIT
   ============================================ */
document.addEventListener('DOMContentLoaded', function () {
  /* Hide all calculator bodies */
  document.querySelectorAll('.cbody').forEach(function(b) { b.classList.remove('open'); });

  /* Start reveal */
  initReveal();

  /* Close drawer on drawer link click */
  document.querySelectorAll('#drawer a').forEach(function(a) {
    a.addEventListener('click', closeMenu);
  });

  /* Enter key triggers primary button inside a calc */
  document.addEventListener('keydown', function(e) {
    if (e.key !== 'Enter') return;
    var f = document.activeElement;
    if (!f || f.tagName !== 'INPUT') return;
    var body = f.closest('.cbody');
    if (!body) return;
    var btn = body.querySelector('.b-calc');
    if (btn) btn.click();
  });
});
