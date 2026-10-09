// "pause animations" button in the hero: toggles body.paused (see base.css)
export function initPauseButton() {
  const pauseBtn = document.getElementById("pauseBtn");
  if (!pauseBtn) return;

  pauseBtn.addEventListener("click", () => {
    const paused = document.body.classList.toggle("paused");
    pauseBtn.innerHTML = paused
      ? '<i class="fa-solid fa-play"></i> <span>play animations</span>'
      : '<i class="fa-solid fa-pause"></i> <span>pause animations</span>';
  });
}
