const filesInput = document.querySelector("input");
const filesArea = document.querySelector(".filesArea");
const fileName = document.querySelector(".fileName p");
const preview = document.querySelector(".preview");
const stopAudio = document.querySelector(".stop");
const next = document.querySelector(".next");
const alertContainer = document.querySelector(".alertContainer");

let audioIndex = 0;

function setAudio() {
  if (!filesInput.files[audioIndex]) return;
  audio.src = URL.createObjectURL(filesInput.files[audioIndex]);
  fileName.textContent = filesInput.files[audioIndex].name;
  audio.play();
}
setInterval(() => alertContainer.remove(), 6000);
alertContainer.addEventListener("click", function () {
  this.remove();
});
filesArea.addEventListener("click", function () {
  filesInput.click();
  audio.pause();
});
let audio = new Audio();
filesInput.addEventListener("change", () => {
  setAudio();
});
preview.addEventListener("click", () => {
  audioIndex <= 0 ? (audioIndex = filesInput.files.length - 1) : audioIndex--;
  setAudio();
});
stopAudio.addEventListener("click", () => {
  console.log(audio);
  audio.paused ? audio.play() : audio.pause();
  stopAudio.textContent === "پلی" ? "مکث" : "پلی";
});
next.addEventListener("click", () => {
  audioIndex >= filesInput.files.length - 1 ? (audioIndex = 0) : audioIndex++;
  setAudio();
});
