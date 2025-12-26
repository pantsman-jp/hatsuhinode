const sun = document.getElementById("sun");
const sky = document.getElementById("sky");
const startBtn = document.getElementById("startBtn");
const secondsInput = document.getElementById("seconds");
const controls = document.getElementById("controls");
const riseDurationSec = 10; // 180
let startTime = 0;
let animating = false;

function updateSunAnimation(time) {
  const elapsed = time - startTime;
  let progress = Math.min(elapsed / (riseDurationSec * 1000), 1);
  const sunRiseHeight = sky.clientHeight - 50;
  sun.style.bottom = `${-100 + sunRiseHeight * progress}px`;
  if (progress <= 0) sky.style.background = "linear-gradient(to top, #001, #002244)";
  else {
    let easeProgress = Math.sqrt(progress);
    const horizonR = Math.floor(255 * easeProgress * 0.9);
    const horizonG = Math.floor(100 * easeProgress);
    const horizonB = Math.floor(50 * easeProgress);
    const topR = Math.floor(255 * easeProgress);
    const topG = Math.floor(140 * easeProgress);
    const topB = Math.floor(60 * easeProgress);
    sky.style.background = `linear-gradient(to top, rgb(${horizonR},${horizonG},${horizonB}), rgb(${topR},${topG},${topB}))`;
  }
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
