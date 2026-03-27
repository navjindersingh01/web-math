function calculateCircle() {
    let r = document.getElementById("radius").value;
    let area = Math.PI * r * r;

    document.getElementById("circleResult").innerText =
        "Area = " + area.toFixed(2);
}

function calculateRectangle() {
    let l = document.getElementById("length").value;
    let b = document.getElementById("breadth").value;

    let area = l * b;

    document.getElementById("rectResult").innerText =
        "Area = " + area;
}

function calculateAP() {
    let a = parseFloat(document.getElementById("a").value);
    let d = parseFloat(document.getElementById("d").value);
    let n = parseFloat(document.getElementById("n").value);

    let sum = (n / 2) * (2 * a + (n - 1) * d);

    document.getElementById("apResult").innerText =
        "Sum = " + sum;
}

function toggleCalc(card) {
    let calc = card.querySelector(".calculator");
    calc.classList.toggle("hidden");
}

function calcCircle(event, btn) {
    event.stopPropagation();

    let card = btn.closest(".card");
    let r = card.querySelector(".input-r").value;

    let area = Math.PI * r * r;

    card.querySelector(".result").innerText =
        `Area = ${area.toFixed(2)} 
        (Using formula π × ${r}²)`;
}

function calcRectangle(event, btn) {
    event.stopPropagation();

    let card = btn.closest(".card");
    let l = parseFloat(card.querySelector(".input-l").value);
    let b = parseFloat(card.querySelector(".input-b").value);

    let area = l * b;

    card.querySelector(".result").innerText =
        `Area = ${area} ( ${l} × ${b} )`;
}

function calcCircle(event, btn) {
    event.stopPropagation(); // keep this

    let card = btn.closest(".card");
    let r = card.querySelector(".input-r").value;

    let area = Math.PI * r * r;

    card.querySelector(".result").innerText =
        `Area = ${area.toFixed(2)} (π × ${r}²)`;
}

function calcTriangle(event, btn) {
    event.stopPropagation();

    let card = btn.closest(".card");
    let b = parseFloat(card.querySelector(".input-b").value);
    let h = parseFloat(card.querySelector(".input-h").value);

    let area = 0.5 * b * h;

    card.querySelector(".result").innerText =
        `Area = ${area} (½ × ${b} × ${h})`;
}

function calcPara(event, btn) {
    event.stopPropagation();

    let card = btn.closest(".card");
    let b = parseFloat(card.querySelector(".input-b").value);
    let h = parseFloat(card.querySelector(".input-h").value);

    let area = b * h;

    card.querySelector(".result").innerText =
        `Area = ${area} (${b} × ${h})`;
}

function calcTrap(event, btn) {
    event.stopPropagation();

    let card = btn.closest(".card");
    let a = parseFloat(card.querySelector(".input-a").value);
    let b = parseFloat(card.querySelector(".input-b").value);
    let h = parseFloat(card.querySelector(".input-h").value);

    let area = 0.5 * (a + b) * h;

    card.querySelector(".result").innerText =
        `Area = ${area} (½ × (${a}+${b}) × ${h})`;
}

function calcSquare(event, btn) {
    event.stopPropagation();

    let card = btn.closest(".card");
    let a = parseFloat(card.querySelector(".input-a").value);

    let area = a * a;

    card.querySelector(".result").innerText =
        `Area = ${area} (${a}²)`;
}

function calcEllipse(event, btn) {
    event.stopPropagation();

    let card = btn.closest(".card");
    let a = parseFloat(card.querySelector(".input-a").value);
    let b = parseFloat(card.querySelector(".input-b").value);

    let area = Math.PI * a * b;

    card.querySelector(".result").innerText =
        `Area = ${area.toFixed(2)} (π × ${a} × ${b})`;
}

function calcSphere(event, btn) {
    event.stopPropagation();

    let card = btn.closest(".card");
    let r = parseFloat(card.querySelector(".input-r").value);

    let area = 4 * Math.PI * r * r;

    card.querySelector(".result").innerText =
        `Surface Area = ${area.toFixed(2)} (4π × ${r}²)`;
}

function toggleSeries(card) {
    let calc = card.querySelector(".calculator");

    calc.classList.toggle("hidden");
}

function calcAP(event, btn) {
    event.stopPropagation();

    let card = btn.closest(".card");

    let a = parseFloat(card.querySelector(".input-a").value);
    let d = parseFloat(card.querySelector(".input-d").value);
    let n = parseFloat(card.querySelector(".input-n").value);

    let sum = (n / 2) * (2 * a + (n - 1) * d);

    card.querySelector(".result").innerText =
        `Sum = ${sum}

Explanation:
You added ${n} terms starting from ${a} with difference ${d}.

Interpretation:
Total of the sequence = ${sum}`;
}

function calcGP(event, btn) {
    event.stopPropagation();

    let card = btn.closest(".card");

    let a = parseFloat(card.querySelector(".input-a").value);
    let r = parseFloat(card.querySelector(".input-r").value);
    let n = parseFloat(card.querySelector(".input-n").value);

    let sum = a * (1 - Math.pow(r, n)) / (1 - r);

    card.querySelector(".result").innerText =
        `Sum = ${sum}

Explanation:
Sequence grows by multiplying ${r} each step.

Interpretation:
Total sum after ${n} terms = ${sum}`;
}

function calcInfiniteGP(event, btn) {
    event.stopPropagation();

    let card = btn.closest(".card");

    let a = parseFloat(card.querySelector(".input-a").value);
    let r = parseFloat(card.querySelector(".input-r").value);

    if (Math.abs(r) >= 1) {
        card.querySelector(".result").innerText =
            "This series does not converge (|r| must be < 1)";
        return;
    }

    let sum = a / (1 - r);

    card.querySelector(".result").innerText =
        `Sum = ${sum}

Interpretation:
Infinite series converges to ${sum}`;
}

function calcHarmonic(event, btn) {
    event.stopPropagation();

    let card = btn.closest(".card");
    let n = parseInt(card.querySelector(".input-n").value);

    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += 1 / i;
    }

    card.querySelector(".result").innerText =
        `Partial Sum = ${sum.toFixed(3)}

Interpretation:
Even though sum increases slowly, it keeps growing.
Harmonic series does NOT converge.`;
}

function togglePattern(card) {

    // STEP 1: close all other cards
    let allCards = document.querySelectorAll(".card");

    allCards.forEach(c => {
        if (c !== card) {
            let calc = c.querySelector(".calculator");
            if (calc) {
                calc.classList.add("hidden");
            }
        }
    });

    // STEP 2: toggle current card
    let currentCalc = card.querySelector(".calculator");
    currentCalc.classList.toggle("hidden");
}

function setOutput(card, text) {
    let output = card.querySelector(".output");
    output.innerText = text;
}

function resetCard(event, btn) {
    event.stopPropagation();

    let card = btn.closest(".card");

    card.querySelectorAll("input").forEach(i => i.value = "");
    card.querySelector(".output").innerText = "";
}

function copyOutput(event, btn) {
    event.stopPropagation();

    let card = btn.closest(".card");
    let text = card.querySelector(".output").innerText;

    navigator.clipboard.writeText(text);
}

function genAP(event, btn) {
    event.stopPropagation();

    let card = btn.closest(".card");

    let a = +card.querySelector(".input-a").value;
    let d = +card.querySelector(".input-d").value;
    let n = +card.querySelector(".input-n").value;

    let res = [];

    for (let i = 0; i < n; i++) {
        res.push(a + i * d);
    }

    setOutput(card, res.join(", "));
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".calculator").forEach(c => {
        c.classList.add("hidden");
    });
});

function genGP(event, btn) {
    event.stopPropagation();

    let card = btn.closest(".card");

    let a = parseFloat(card.querySelector(".input-a").value);
    let r = parseFloat(card.querySelector(".input-r").value);
    let n = parseInt(card.querySelector(".input-n").value);

    if (!a || !r || !n) {
        setOutput(card, "Please enter valid inputs");
        return;
    }

    let result = [];

    for (let i = 0; i < n; i++) {
        result.push(a * Math.pow(r, i));
    }

    setOutput(card, result.join(", "));
}

function genSquare(event, btn) {
    event.stopPropagation();

    let card = btn.closest(".card");

    let n = parseInt(card.querySelector(".input-n").value);

    if (!n) {
        setOutput(card, "Enter valid number of terms");
        return;
    }

    let result = [];

    for (let i = 1; i <= n; i++) {
        result.push(i * i);
    }

    setOutput(card, result.join(", "));
}

function genTriangular(event, btn) {
    event.stopPropagation();

    let card = btn.closest(".card");

    let n = parseInt(card.querySelector(".input-n").value);

    if (!n) {
        setOutput(card, "Enter valid number of terms");
        return;
    }

    let result = [];

    for (let i = 1; i <= n; i++) {
        result.push((i * (i + 1)) / 2);
    }

    setOutput(card, result.join(", "));
}

function genFibo(event, btn) {
    event.stopPropagation();

    let card = btn.closest(".card");

    let n = parseInt(card.querySelector(".input-n").value);

    if (!n || n <= 0) {
        setOutput(card, "Enter valid number of terms");
        return;
    }

    let result = [0, 1];

    for (let i = 2; i < n; i++) {
        result.push(result[i - 1] + result[i - 2]);
    }

    setOutput(card, result.slice(0, n).join(", "));
}

function genDots(event, btn) {
    event.stopPropagation();

    let card = btn.closest(".card");

    let n = parseInt(card.querySelector(".input-n").value);

    if (!n) {
        setOutput(card, "Enter valid number of rows");
        return;
    }

    let result = "";

    for (let i = 1; i <= n; i++) {
        result += "* ".repeat(i).trim() + "\n";
    }

    setOutput(card, result);
}

