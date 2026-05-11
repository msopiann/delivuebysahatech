/* ── Animated mesh / orb background ── */
const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
let W, H, orbs;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

function initOrbs() {
  orbs = [
    {
      x: W * 0.15,
      y: H * 0.3,
      r: Math.min(W, H) * 0.38,
      color: "#00e87a",
      vx: 0.18,
      vy: 0.1,
    },
    {
      x: W * 0.75,
      y: H * 0.55,
      r: Math.min(W, H) * 0.32,
      color: "#00d4f5",
      vx: -0.14,
      vy: 0.16,
    },
    {
      x: W * 0.5,
      y: H * 0.8,
      r: Math.min(W, H) * 0.22,
      color: "#00e87a",
      vx: 0.1,
      vy: -0.18,
    },
  ];
}

function draw() {
  ctx.clearRect(0, 0, W, H);
  for (const o of orbs) {
    const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
    g.addColorStop(0, o.color + "28");
    g.addColorStop(1, o.color + "00");
    ctx.beginPath();
    ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();

    o.x += o.vx;
    o.y += o.vy;
    if (o.x < -o.r || o.x > W + o.r) o.vx *= -1;
    if (o.y < -o.r || o.y > H + o.r) o.vy *= -1;
  }
  requestAnimationFrame(draw);
}

window.addEventListener("resize", () => {
  resize();
  initOrbs();
});
resize();
initOrbs();
draw();

/* ── Countdown ── */
// Launch date: 30 days from now
const launch = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

function pad(n) {
  return String(n).padStart(2, "0");
}

function tick() {
  const diff = launch - Date.now();
  if (diff <= 0) {
    ["d", "h", "m", "s"].forEach(
      (k) => (document.getElementById("cd-" + k).textContent = "00"),
    );
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById("cd-d").textContent = pad(d);
  document.getElementById("cd-h").textContent = pad(h);
  document.getElementById("cd-m").textContent = pad(m);
  document.getElementById("cd-s").textContent = pad(s);
}
tick();
setInterval(tick, 1000);
