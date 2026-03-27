/* ================= NAVBAR ================= */

function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("active");
}

// Auto close menu on click
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            document.querySelector(".nav-links").classList.remove("active");
        });
    });

    // Hide all calculators initially
    document.querySelectorAll(".calculator").forEach(c => {
        c.classList.add("hidden");
    });
});

// Navbar shrink
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("shrink", window.scrollY > 50);
});


/* ================= COMMON HELPERS ================= */

function getCard(btn) {
    return btn.closest(".card");
}

function setResult(card, text) {
    let el = card.querySelector(".result");
    if (el) el.innerText = text;
}

function setOutput(card, text) {
    let el = card.querySelector(".output");
    if (el) el.innerText = text;
}


/* ================= TOGGLE ================= */

function toggleCalc(card) {
    card.querySelector(".calculator").classList.toggle("hidden");
}

function toggleSeries(card) {
    card.querySelector(".calculator").classList.toggle("hidden");
}

function togglePattern(card) {
    document.querySelectorAll(".card").forEach(c => {
        if (c !== card) {
            let calc = c.querySelector(".calculator");
            if (calc) calc.classList.add("hidden");
        }
    });

    card.querySelector(".calculator").classList.toggle("hidden");
}


/* ================= AREA FUNCTIONS ================= */

function calcCircle(e, btn) {
    e.stopPropagation();
    let card = getCard(btn);
    let r = +card.querySelector(".input-r").value;

    let area = Math.PI * r * r;
    setResult(card, `Area = ${area.toFixed(2)} (π × ${r}²)`);
}

function calcRectangle(e, btn) {
    e.stopPropagation();
    let card = getCard(btn);

    let l = +card.querySelector(".input-l").value;
    let b = +card.querySelector(".input-b").value;

    setResult(card, `Area = ${l * b} (${l} × ${b})`);
}

function calcTriangle(e, btn) {
    e.stopPropagation();
    let card = getCard(btn);

    let b = +card.querySelector(".input-b").value;
    let h = +card.querySelector(".input-h").value;

    setResult(card, `Area = ${0.5 * b * h} (½ × ${b} × ${h})`);
}

function calcPara(e, btn) {
    e.stopPropagation();
    let card = getCard(btn);

    let b = +card.querySelector(".input-b").value;
    let h = +card.querySelector(".input-h").value;

    setResult(card, `Area = ${b * h} (${b} × ${h})`);
}

function calcTrap(e, btn) {
    e.stopPropagation();
    let card = getCard(btn);

    let a = +card.querySelector(".input-a").value;
    let b = +card.querySelector(".input-b").value;
    let h = +card.querySelector(".input-h").value;

    setResult(card, `Area = ${(0.5 * (a + b) * h)} (½ × (${a}+${b}) × ${h})`);
}

function calcSquare(e, btn) {
    e.stopPropagation();
    let card = getCard(btn);

    let a = +card.querySelector(".input-a").value;

    setResult(card, `Area = ${a * a} (${a}²)`);
}

function calcEllipse(e, btn) {
    e.stopPropagation();
    let card = getCard(btn);

    let a = +card.querySelector(".input-a").value;
    let b = +card.querySelector(".input-b").value;

    setResult(card, `Area = ${(Math.PI * a * b).toFixed(2)} (π × ${a} × ${b})`);
}

function calcSphere(e, btn) {
    e.stopPropagation();
    let card = getCard(btn);

    let r = +card.querySelector(".input-r").value;

    setResult(card, `Surface Area = ${(4 * Math.PI * r * r).toFixed(2)} (4π × ${r}²)`);
}


/* ================= SERIES ================= */

function calcAP(e, btn) {
    e.stopPropagation();
    let card = getCard(btn);

    let a = +card.querySelector(".input-a").value;
    let d = +card.querySelector(".input-d").value;
    let n = +card.querySelector(".input-n").value;

    let sum = (n / 2) * (2 * a + (n - 1) * d);

    setResult(card, `Sum = ${sum}

Explanation:
You added ${n} terms starting from ${a} with difference ${d}.

Interpretation:
Total = ${sum}`);
}

function calcGP(e, btn) {
    e.stopPropagation();
    let card = getCard(btn);

    let a = +card.querySelector(".input-a").value;
    let r = +card.querySelector(".input-r").value;
    let n = +card.querySelector(".input-n").value;

    let sum = a * (1 - Math.pow(r, n)) / (1 - r);

    setResult(card, `Sum = ${sum}

Interpretation:
Total after ${n} terms = ${sum}`);
}

function calcInfiniteGP(e, btn) {
    e.stopPropagation();
    let card = getCard(btn);

    let a = +card.querySelector(".input-a").value;
    let r = +card.querySelector(".input-r").value;

    if (Math.abs(r) >= 1) {
        setResult(card, "Series does not converge (|r| < 1 required)");
        return;
    }

    let sum = a / (1 - r);

    setResult(card, `Sum = ${sum}

Infinite series converges.`);
}

function calcHarmonic(e, btn) {
    e.stopPropagation();
    let card = getCard(btn);

    let n = +card.querySelector(".input-n").value;

    let sum = 0;
    for (let i = 1; i <= n; i++) sum += 1 / i;

    setResult(card, `Partial Sum = ${sum.toFixed(3)}

Harmonic series diverges.`);
}


/* ================= PATTERNS ================= */

function resetCard(e, btn) {
    e.stopPropagation();
    let card = getCard(btn);

    card.querySelectorAll("input").forEach(i => i.value = "");
    setOutput(card, "");
}

function copyOutput(e, btn) {
    e.stopPropagation();
    let card = getCard(btn);

    let text = card.querySelector(".output").innerText;
    navigator.clipboard.writeText(text);
}

function genAP(e, btn) {
    e.stopPropagation();
    let card = getCard(btn);

    let a = +card.querySelector(".input-a").value;
    let d = +card.querySelector(".input-d").value;
    let n = +card.querySelector(".input-n").value;

    let res = [];
    for (let i = 0; i < n; i++) res.push(a + i * d);

    setOutput(card, res.join(", "));
}

function genGP(e, btn) {
    e.stopPropagation();
    let card = getCard(btn);

    let a = +card.querySelector(".input-a").value;
    let r = +card.querySelector(".input-r").value;
    let n = +card.querySelector(".input-n").value;

    let res = [];
    for (let i = 0; i < n; i++) res.push(a * Math.pow(r, i));

    setOutput(card, res.join(", "));
}

function genSquare(e, btn) {
    e.stopPropagation();
    let card = getCard(btn);

    let n = +card.querySelector(".input-n").value;

    let res = [];
    for (let i = 1; i <= n; i++) res.push(i * i);

    setOutput(card, res.join(", "));
}

function genTriangular(e, btn) {
    e.stopPropagation();
    let card = getCard(btn);

    let n = +card.querySelector(".input-n").value;

    let res = [];
    for (let i = 1; i <= n; i++) res.push((i * (i + 1)) / 2);

    setOutput(card, res.join(", "));
}

function genFibo(e, btn) {
    e.stopPropagation();
    let card = getCard(btn);

    let n = +card.querySelector(".input-n").value;

    let res = [0, 1];
    for (let i = 2; i < n; i++) res.push(res[i - 1] + res[i - 2]);

    setOutput(card, res.slice(0, n).join(", "));
}

function genDots(e, btn) {
    e.stopPropagation();
    let card = getCard(btn);

    let n = +card.querySelector(".input-n").value;

    let res = "";
    for (let i = 1; i <= n; i++) {
        res += "* ".repeat(i).trim() + "\n";
    }

    setOutput(card, res);
}