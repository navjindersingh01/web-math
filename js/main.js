/* ══════════════════════════════════════
   WEB MATH — main.js
   Navbar · Mobile drawer · Scroll reveal
   Toggle · Areas · Patterns · Series
   Toast · Copy · Scroll-to-top
══════════════════════════════════════ */

/* ══════════════════════════════════════
   NAVBAR SCROLL SHRINK
══════════════════════════════════════ */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (nav) nav.classList.toggle('shrink', window.scrollY > 30);

  const btn = document.getElementById('scrollTopBtn');
  if (btn) btn.classList.toggle('show', window.scrollY > 320);
}, { passive: true });

/* ══════════════════════════════════════
   MOBILE MENU
══════════════════════════════════════ */
function toggleMenu() {
  const toggle  = document.getElementById('menuToggle');
  const drawer  = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('navOverlay');
  if (!drawer) return;
  const open = drawer.classList.contains('active');
  drawer.classList.toggle('active', !open);
  overlay.classList.toggle('active', !open);
  toggle.classList.toggle('open', !open);
}

function closeMenu() {
  const toggle  = document.getElementById('menuToggle');
  const drawer  = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('navOverlay');
  if (!drawer) return;
  drawer.classList.remove('active');
  overlay.classList.remove('active');
  toggle.classList.remove('open');
}

/* ══════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════ */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });
  els.forEach(el => obs.observe(el));
}

/* ══════════════════════════════════════
   CARD TOGGLES
══════════════════════════════════════ */

/* Areas / Series — independent open/close */
function toggleCalc(card) {
  const header = card.querySelector('.card-header');
  const calc   = card.querySelector('.calculator');
  if (!calc) return;
  const isOpen = !calc.classList.contains('hidden');
  calc.classList.toggle('hidden', isOpen);
  if (header) header.classList.toggle('open', !isOpen);
}

/* Series alias */
function toggleSeries(card) { toggleCalc(card); }

/* Patterns — accordion: one open at a time */
function togglePattern(card) {
  document.querySelectorAll('.card').forEach(c => {
    if (c !== card) {
      const calc   = c.querySelector('.calculator');
      const header = c.querySelector('.card-header');
      if (calc)   calc.classList.add('hidden');
      if (header) header.classList.remove('open');
    }
  });
  const calc   = card.querySelector('.calculator');
  const header = card.querySelector('.card-header');
  if (!calc) return;
  const isOpen = !calc.classList.contains('hidden');
  calc.classList.toggle('hidden', isOpen);
  if (header) header.classList.toggle('open', !isOpen);
}

/* ══════════════════════════════════════
   TOAST
══════════════════════════════════════ */
let _tt;
function showToast(msg) {
  const t = document.getElementById('toast');
  const m = document.getElementById('toastMsg');
  if (!t || !m) return;
  m.textContent = msg || 'Done!';
  t.classList.add('show');
  clearTimeout(_tt);
  _tt = setTimeout(() => t.classList.remove('show'), 2000);
}

/* ══════════════════════════════════════
   COPY OUTPUT
══════════════════════════════════════ */
function copyOutput(e, btn) {
  if (e) e.stopPropagation();
  const card = btn.closest('.card');
  const out  = card.querySelector('.output') || card.querySelector('.result');
  const txt  = out ? out.textContent.trim() : '';
  if (!txt) { showToast('Nothing to copy'); return; }
  navigator.clipboard.writeText(txt).then(() => showToast('Copied to clipboard ✓'));
}

/* ══════════════════════════════════════
   RESET CARD
══════════════════════════════════════ */
function resetCard(e, btn) {
  if (e) e.stopPropagation();
  const card = btn.closest('.card');
  card.querySelectorAll('input[type="number"]').forEach(i => { i.value = ''; });
  const out = card.querySelector('.output') || card.querySelector('.result');
  if (out) out.textContent = '';
}

/* ══════════════════════════════════════
   HELPERS
══════════════════════════════════════ */
function getCard(btn) { return btn.closest('.card'); }
function setResult(card, t) { const e = card.querySelector('.result'); if (e) e.textContent = t; }
function setOutput(card, t) { const e = card.querySelector('.output'); if (e) e.textContent = t; }
function gv(card, cls) { const e = card.querySelector(cls); return e ? parseFloat(e.value) : NaN; }
function ok(v) { return !isNaN(v) && isFinite(v); }

/* ══════════════════════════════════════
   AREA CALCULATORS
══════════════════════════════════════ */
function calcCircle(e, btn) {
  e.stopPropagation();
  const card = getCard(btn), r = gv(card, '.input-r');
  if (!ok(r) || r < 0) { setResult(card, '⚠ Enter a valid radius (≥ 0)'); return; }
  setResult(card, `Area = ${(Math.PI*r*r).toFixed(4)} sq units\n\nA = π × r²\n  = π × ${r}²\n  = ${Math.PI.toFixed(6)} × ${(r*r).toFixed(4)}`);
}

function calcRectangle(e, btn) {
  e.stopPropagation();
  const card = getCard(btn), l = gv(card,'.input-l'), b = gv(card,'.input-b');
  if (!ok(l)||!ok(b)||l<0||b<0) { setResult(card,'⚠ Enter valid length and breadth'); return; }
  setResult(card, `Area = ${(l*b).toFixed(4)} sq units\n\nA = l × b = ${l} × ${b}`);
}

function calcTriangle(e, btn) {
  e.stopPropagation();
  const card = getCard(btn), b = gv(card,'.input-b'), h = gv(card,'.input-h');
  if (!ok(b)||!ok(h)||b<0||h<0) { setResult(card,'⚠ Enter valid base and height'); return; }
  setResult(card, `Area = ${(0.5*b*h).toFixed(4)} sq units\n\nA = ½ × b × h = ½ × ${b} × ${h}`);
}

function calcPara(e, btn) {
  e.stopPropagation();
  const card = getCard(btn), b = gv(card,'.input-b'), h = gv(card,'.input-h');
  if (!ok(b)||!ok(h)||b<0||h<0) { setResult(card,'⚠ Enter valid base and height'); return; }
  setResult(card, `Area = ${(b*h).toFixed(4)} sq units\n\nA = b × h = ${b} × ${h}`);
}

function calcTrap(e, btn) {
  e.stopPropagation();
  const card = getCard(btn), a = gv(card,'.input-a'), b = gv(card,'.input-b'), h = gv(card,'.input-h');
  if (!ok(a)||!ok(b)||!ok(h)||a<0||b<0||h<0) { setResult(card,'⚠ Enter valid a, b and height'); return; }
  setResult(card, `Area = ${(0.5*(a+b)*h).toFixed(4)} sq units\n\nA = ½(a + b) × h\n  = ½(${a} + ${b}) × ${h}\n  = ½ × ${a+b} × ${h}`);
}

function calcSquare(e, btn) {
  e.stopPropagation();
  const card = getCard(btn), a = gv(card,'.input-a');
  if (!ok(a)||a<0) { setResult(card,'⚠ Enter a valid side length'); return; }
  setResult(card, `Area = ${(a*a).toFixed(4)} sq units\n\nA = a² = ${a}² = ${a*a}`);
}

function calcEllipse(e, btn) {
  e.stopPropagation();
  const card = getCard(btn), a = gv(card,'.input-a'), b = gv(card,'.input-b');
  if (!ok(a)||!ok(b)||a<0||b<0) { setResult(card,'⚠ Enter valid semi-axes'); return; }
  setResult(card, `Area = ${(Math.PI*a*b).toFixed(4)} sq units\n\nA = π × a × b = π × ${a} × ${b}`);
}

function calcSphere(e, btn) {
  e.stopPropagation();
  const card = getCard(btn), r = gv(card,'.input-r');
  if (!ok(r)||r<0) { setResult(card,'⚠ Enter a valid radius'); return; }
  setResult(card, `Surface Area = ${(4*Math.PI*r*r).toFixed(4)} sq units\n\nSA = 4 × π × r²\n   = 4 × π × ${r}²`);
}

/* ══════════════════════════════════════
   SERIES CALCULATORS
══════════════════════════════════════ */
function calcAP(e, btn) {
  e.stopPropagation();
  const card = getCard(btn), a = gv(card,'.input-a'), d = gv(card,'.input-d'), n = gv(card,'.input-n');
  if (!ok(a)||!ok(d)||!ok(n)||n<1) { setResult(card,'⚠ Enter valid a, d and n ≥ 1'); return; }
  const S = (n/2)*(2*a+(n-1)*d), last = a+(n-1)*d;
  setResult(card, `Sum Sₙ = ${S}\n\nSₙ = n/2 · (2a + (n−1)d)\n   = ${n}/2 · (2×${a} + ${n-1}×${d})\n\nFirst: ${a}   Last: ${last}   Terms: ${n}`);
}

function calcGP(e, btn) {
  e.stopPropagation();
  const card = getCard(btn), a = gv(card,'.input-a'), r = gv(card,'.input-r'), n = gv(card,'.input-n');
  if (!ok(a)||!ok(r)||!ok(n)||n<1) { setResult(card,'⚠ Enter valid a, r and n ≥ 1'); return; }
  const S = r===1 ? a*n : a*(1-Math.pow(r,n))/(1-r);
  setResult(card, `Sum Sₙ = ${S.toFixed(6)}\n\nSₙ = a(1 − rⁿ) / (1 − r)\n   = ${a}(1 − ${r}^${n}) / (1 − ${r})\n\nTerms: ${n}   Ratio: ${r}`);
}

function calcInfiniteGP(e, btn) {
  e.stopPropagation();
  const card = getCard(btn), a = gv(card,'.input-a'), r = gv(card,'.input-r');
  if (!ok(a)||!ok(r)) { setResult(card,'⚠ Enter valid a and r'); return; }
  if (Math.abs(r) >= 1) {
    setResult(card, `⚠ |r| must be less than 1 for convergence.\n|r| = ${Math.abs(r).toFixed(4)} ≥ 1 — series diverges.`);
    return;
  }
  setResult(card, `Sum S∞ = ${(a/(1-r)).toFixed(6)}\n\nS∞ = a / (1 − r)\n   = ${a} / (1 − ${r})\n\n✓ Converges because |${r}| < 1`);
}

function calcHarmonic(e, btn) {
  e.stopPropagation();
  const card = getCard(btn), n = gv(card,'.input-n');
  if (!ok(n)||n<1) { setResult(card,'⚠ Enter n ≥ 1'); return; }
  let S = 0;
  for (let i = 1; i <= n; i++) S += 1/i;
  setResult(card, `Partial Sum Hₙ = ${S.toFixed(8)}\n\nHₙ = 1 + 1/2 + 1/3 + … + 1/${n}\n\nApprox: ln(${n}) + γ ≈ ${(Math.log(n)+0.5772156649).toFixed(6)}\n\n⚠ Full harmonic series diverges to ∞`);
}

/* ══════════════════════════════════════
   PATTERN GENERATORS
══════════════════════════════════════ */
function genAP(e, btn) {
  e.stopPropagation();
  const card = getCard(btn), a = gv(card,'.input-a'), d = gv(card,'.input-d'), n = gv(card,'.input-n');
  if (!ok(a)||!ok(d)||!ok(n)||n<1) { setOutput(card,'⚠ Enter valid a, d and n ≥ 1'); return; }
  setOutput(card, Array.from({length:Math.min(n,50)},(_,i)=>+(a+i*d).toFixed(8)).join(', '));
}

function genGP(e, btn) {
  e.stopPropagation();
  const card = getCard(btn), a = gv(card,'.input-a'), r = gv(card,'.input-r'), n = gv(card,'.input-n');
  if (!ok(a)||!ok(r)||!ok(n)||n<1) { setOutput(card,'⚠ Enter valid a, r and n ≥ 1'); return; }
  setOutput(card, Array.from({length:Math.min(n,20)},(_,i)=>+(a*Math.pow(r,i)).toFixed(6)).join(', '));
}

function genSquare(e, btn) {
  e.stopPropagation();
  const card = getCard(btn), n = gv(card,'.input-n');
  if (!ok(n)||n<1) { setOutput(card,'⚠ Enter n ≥ 1'); return; }
  setOutput(card, Array.from({length:Math.min(n,30)},(_,i)=>(i+1)*(i+1)).join(', '));
}

function genTriangular(e, btn) {
  e.stopPropagation();
  const card = getCard(btn), n = gv(card,'.input-n');
  if (!ok(n)||n<1) { setOutput(card,'⚠ Enter n ≥ 1'); return; }
  setOutput(card, Array.from({length:Math.min(n,30)},(_,i)=>((i+1)*(i+2)/2)).join(', '));
}

function genFibo(e, btn) {
  e.stopPropagation();
  const card = getCard(btn), n = gv(card,'.input-n');
  if (!ok(n)||n<2) { setOutput(card,'⚠ Enter n ≥ 2'); return; }
  const f = [0,1];
  for (let i=2; i<Math.min(n,40); i++) f.push(f[i-1]+f[i-2]);
  setOutput(card, f.slice(0,Math.min(n,40)).join(', '));
}

function genDots(e, btn) {
  e.stopPropagation();
  const card = getCard(btn), n = gv(card,'.input-n');
  if (!ok(n)||n<1) { setOutput(card,'⚠ Enter n ≥ 1'); return; }
  let out = '';
  for (let i=1; i<=Math.min(n,18); i++) out += '★ '.repeat(i).trim()+'\n';
  setOutput(card, out.trim());
}

/* ══════════════════════════════════════
   SCROLL TO TOP
══════════════════════════════════════ */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  /* Hide all calculators on load */
  document.querySelectorAll('.calculator').forEach(c => c.classList.add('hidden'));

  /* Start scroll reveal */
  initReveal();

  /* Close mobile menu on drawer link click */
  document.querySelectorAll('#mobileDrawer a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  /* Enter key inside an input triggers the primary button */
  document.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const f = document.activeElement;
    if (!f || f.tagName !== 'INPUT') return;
    const calc = f.closest('.calculator');
    if (!calc) return;
    const btn = calc.querySelector('button.btn-primary');
    if (btn) btn.click();
  });
});
