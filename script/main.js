const sun = document.getElementById("sun");
const sky = document.getElementById("sky");
const startBtn = document.getElementById("startBtn");
const secondsInput = document.getElementById("seconds");
const controls = document.getElementById("controls");

const riseDurationSec = 180;
let startTime = 0;
let animating = false;

function updateSunAnimation(time) {
  const elapsed = time - startTime;
  const progress = Math.min(elapsed / (riseDurationSec * 1000), 1);
  const sunRiseHeight = sky.clientHeight - 50;
  sun.style.bottom = `${-100 + sunRiseHeight * progress}px`;
  const r = Math.min(255, Math.floor(0 + progress * 255));
  const g = Math.min(255, Math.floor(136 + progress * 119));
  const b = Math.min(255, Math.floor(221 + progress * 34));
  sky.style.background = `linear-gradient(to top, rgb(0,0,${r}), rgb(${r},${g},${b}))`;
  if (progress < 1) requestAnimationFrame(updateSunAnimation);
  else animating = false;
}

function startSunriseAfterDelay() {
  if (animating) return;
  const delaySec = parseFloat(secondsInput.value);
  if (isNaN(delaySec) || delaySec < 0) return;
  controls.style.display = "none";
  animating = true;
  setTimeout(() => {
    startTime = performance.now();
    requestAnimationFrame(updateSunAnimation);
  }, delaySec * 1000);
}

startBtn.addEventListener("click", startSunriseAfterDelay);
