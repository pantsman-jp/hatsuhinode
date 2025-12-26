const sun = document.getElementById("sun");
const sky = document.getElementById("sky");
const startBtn = document.getElementById("startBtn");
const secondsInput = document.getElementById("seconds");
const controls = document.getElementById("controls");
const horizon = document.getElementById("horizon");

const riseDurationSec = 180;
let startTime = 0;
let animating = false;

function mix(a, b, t) {
  return a + Math.floor((b - a) * t);
}

function setSkyColor(p) {
  const t = Math.sqrt(Math.max(p, 0));
  const hR = mix(0, 255, t);
  const hG = mix(0, 140, t);
  const hB = mix(20, 60, t);
  const tR = mix(0, 255, t);
  const tG = mix(0, 180, t);
  const tB = mix(40, 80, t);
  sky.style.background =
    `linear-gradient(to top,rgb(${hR},${hG},${hB}),rgb(${tR},${tG},${tB}))`;
}

function animate(time) {
  const elapsed = time - startTime;
  const progress = elapsed / (riseDurationSec * 1000);
  const height = sky.clientHeight - 70;
  sun.style.bottom = `${-120 + height * Math.min(progress, 1)}px`;
  setSkyColor(progress);
  if (progress < 1) requestAnimationFrame(animate);
  else animating = false;
}

function prepDawn(endTime, spanSec) {
  const now = performance.now();
  const remain = endTime - now;
  if (remain <= 0) return;
  const t = 1 - remain / (spanSec * 1000);
  setSkyColor(t * 0.2);
  requestAnimationFrame(() => prepDawn(endTime, spanSec));
}

function startSunriseAfterDelay() {
  if (animating) return;
  const delaySec = parseFloat(secondsInput.value);
  if (isNaN(delaySec) || delaySec < 0) return;
  controls.style.display = "none";
  animating = true;
  const dawnSec = 5;
  const dawnStart = performance.now() + (delaySec - dawnSec) * 1000;
  if (delaySec >= dawnSec) prepDawn(dawnStart, dawnSec);
  setTimeout(() => {
    startTime = performance.now();
    requestAnimationFrame(animate);
  }, delaySec * 1000);
}

startBtn.addEventListener("click", startSunriseAfterDelay);
