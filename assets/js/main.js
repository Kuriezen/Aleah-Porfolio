// Entry point: load the section files, then start each feature.
import { loadIncludes } from "./include.js";
import { initPauseButton } from "./pause.js";
import { initReveal } from "./reveal.js";
import { initCounters } from "./counters.js";
import { initTilt } from "./tilt.js";
import { initScrollLine } from "./scroll-line.js";

await loadIncludes();

initPauseButton();
initReveal();
initCounters();
initTilt();
initScrollLine();

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
