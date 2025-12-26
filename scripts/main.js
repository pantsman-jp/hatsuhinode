const sun = document.getElementById("sun");
const sky = document.getElementById("sky");

let progress = 0;

function animateSun() {
  progress += 0.2;
  if (progress > 100) progress = 100;
  sun.style.transform = `translateX(-50%) translateY(${100 - progress}%)`;

  // 背景色の変化（夜→朝）
  const r = Math.min(255, Math.floor(0 + progress * 1.5));
  const g = Math.min(255, Math.floor(136 + progress * 0.5));
  const b = Math.min(255, Math.floor(221 + progress * 0.3));
  sky.style.background = `linear-gradient(to top, rgb(0,0,${r}), rgb(${r},${g},${b}))`;

  if (progress < 100) requestAnimationFrame(animateSun);
}

animateSun();
