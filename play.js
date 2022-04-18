var historyList = document.querySelector(".history");
var lastSoundName = document.querySelector("#last-sound-name");
function playSound(sound) {
    var noise = document.querySelector("audio[data-sound='".concat(sound, "']"));
    noise.currentTime = 0;
    noise.play();
    lastSoundName.textContent = sound;
}
document.addEventListener("keydown", function (event) {
    if (event.repeat)
        return;
    var elm = document.querySelector(".drum[data-key='".concat(event.key, "']"));
    if (event.key == "/")
        historyList.classList.toggle("hidden");
    if (event.key == "?")
        document.querySelectorAll("li").forEach(function (elm) {
            elm.remove();
        });
    if (!elm)
        return;
    elm.classList.add("playing");
    playSound(elm.dataset.sound);
    addToHistory(elm);
});
document.addEventListener("keyup", function (event) {
    var elm = document.querySelector(".drum[data-key='".concat(event.key, "']"));
    if (!elm)
        return;
    elm.classList.remove("playing");
});
function handleClickDrum(event) {
    var clickedElm = event.currentTarget;
    playSound(clickedElm.dataset.sound);
    addToHistory(clickedElm);
}
document.querySelectorAll(".drum").forEach(function (elm) {
    elm.addEventListener("click", handleClickDrum);
});
function addToHistory(drum) {
    var listElm = document.createElement("li");
    listElm.textContent = drum.dataset.key;
    historyList.appendChild(listElm);
    listElm.addEventListener("click", function (event) {
        playSound(drum.dataset.sound);
    });
}
