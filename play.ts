const historyList = document.querySelector(".history") as HTMLElement;
const lastSoundName = document.querySelector("#last-sound-name") as HTMLElement;

function playSound(sound : string): void {
  let noise = document.querySelector(`audio[data-sound='${sound}']`) as HTMLAudioElement;
  noise.currentTime = 0
  noise.play();

  lastSoundName.textContent = sound;
}

document.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.repeat)
    return;
  let elm = document.querySelector(`.drum[data-key='${event.key}']`) as HTMLElement | null;
  if (event.key == "/")
    historyList.classList.toggle("hidden")
  if (event.key == "?")
    document.querySelectorAll<HTMLElement>("li").forEach(function(elm) {
      elm.remove();
    });
  if (!elm)
    return ;
  elm.classList.add("playing");
  playSound(elm.dataset.sound);
  addToHistory(elm)
});

document.addEventListener("keyup", (event: KeyboardEvent) => {

  let elm = document.querySelector(`.drum[data-key='${event.key}']`) as HTMLElement | null;
  if (!elm)
      return ;
  elm.classList.remove("playing");
})

function handleClickDrum(event : MouseEvent): void {
  let clickedElm = event.currentTarget as HTMLElement;
  playSound(clickedElm.dataset.sound);
  addToHistory(clickedElm)    
}

document.querySelectorAll<HTMLElement>(".drum").forEach(function(elm){
  elm.addEventListener("click", handleClickDrum);
})

function addToHistory(drum : HTMLElement): void {
  let listElm : HTMLLIElement = document.createElement("li");
  listElm.textContent = drum.dataset.key;
  historyList.appendChild(listElm);
  listElm.addEventListener("click", function (event : MouseEvent) {
    playSound(drum.dataset.sound);
  })
}