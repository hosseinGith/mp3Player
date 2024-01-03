const container = document.querySelector(".container");
const filesInput = document.querySelector(".fileInput");
const filesArea = document.querySelector(".filesArea");
const fileName = document.querySelector(".fileName p");
const preview = document.querySelector(".preview");
const stopAudio = document.querySelector(".stop");
const next = document.querySelector(".next");
const alertContainer = document.querySelector(".alertContainer");
const volume = document.querySelector(".volume");
const audioTime = document.querySelector(".audioTime");

let audioIndex = 0;
let audio = new Audio();
let isLetPause = true;
let isMouseDown = false;
let width = 0;
let interval = null;
let widthAudioTimeCont = audioTime.children[0].clientWidth;
let mouseX = {
  xOld: 0,
  x: 0,
};
console.log(widthAudioTimeCont);
function setAudio() {
  if (!filesInput.files[audioIndex]) return;
  audio.src = URL.createObjectURL(filesInput.files[audioIndex]);
  fileName.textContent = filesInput.files[audioIndex].name;
  audio.play();
}
function changeAudioTime(X) {
  if (!isMouseDown) return;
  mouseX.x = X;
  console.log(X);
  mouseX.x = (mouseX.x / widthAudioTimeCont) * 100;
  width = mouseX.x;
  if (width >= 100) width = 100;
  else if (width <= 0) width = 0;
  audioTime.children[0].style.width = `${width}%`;
  audio.currentTime = (width * audio.buffered.end(0)) / 100;
}
setTimeout(() => alertContainer.remove(), 6000);
audioTime.addEventListener("mousedown", () => (isMouseDown = true));
audioTime.children[0].addEventListener("mousedown", () => (isMouseDown = true));
window.addEventListener("mouseup", () => (isMouseDown = false));
audioTime.addEventListener("touchstart", () => (isMouseDown = true));
audioTime.children[0].addEventListener(
  "touchstart",
  () => (isMouseDown = true)
);
window.addEventListener("touchend", () => {
  isMouseDown = false;
});
container.addEventListener("mousemove", (e) => {
  changeAudioTime(e.offsetX);
});
container.addEventListener("touchmove", (e) => {
  changeAudioTime(e.touches[0].clientX - 10);
});
alertContainer.addEventListener("click", () => alertContainer.remove());
audio.addEventListener("pause", () => {
  if (audio.currentTime !== audio.buffered.end(0)) return;
  next.click();
});
audio.addEventListener("play", () => (isLetPause = true));
filesArea.addEventListener("click", function () {
  filesInput.click();
  audio.pause();
});
volume.oninput = () => {
  console.log();
  audio.volume = volume.value / 100;
  console.log(volume.value / 100);
};
volume.addEventListener("", () => {});
filesInput.addEventListener("change", () => {
  interval ? (interval = null) : [];
  isLetPause = false;
  setAudio();
  interval = setInterval(() => {
    mouseX.x = (audio.currentTime / audio.buffered.end(0)) * 100;
    audioTime.children[0].style.width = `${mouseX.x}%`;
  }, 400);
});
preview.addEventListener("click", () => {
  audioIndex <= 0 ? (audioIndex = filesInput.files.length - 1) : audioIndex--;
  setAudio();
});
stopAudio.addEventListener("click", () => {
  audio.paused ? audio.play() : audio.pause();
  stopAudio.textContent === "پلی" ? "مکث" : "پلی";
  console.log(audio.buffered.end(0));
});
next.addEventListener("click", () => {
  audioIndex >= filesInput.files.length - 1 ? (audioIndex = 0) : audioIndex++;
  console.log(audio.currentTime);
  setAudio();
});
