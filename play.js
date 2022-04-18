var historyList = document.querySelector(".history");
var lastSoundName = document.querySelector("#last-sound-name");
// IMPORTANT: Do NOT add any more global variables. 
// TODO: Step 1a - Implement the function playSound.
// Make the audio element with the matching data-sound attribute play.
// Also, update the lastSoundName to display the name of the sound.
function playSound(sound) {
    var noise = document.querySelector("audio[data-sound='".concat(sound, "']"));
    noise.currentTime = 0;
    noise.play();
    lastSoundName.textContent = sound;
}
// TODO: Step 2a - Set up a listener for the "keydown" event. 
// Based on the key pressed, add the "playing" class 
// to the .drum element with matching data-key attribute.
// Then play the appropriate sound, based on its data-sound attribute.
// Ignore repeated key presses from held-down keys.
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
    // TODO: Step 6b - Add some code to the 'keydown' listener that causes
    // all the <li> elements to be removed, clearing the history.
    // HINT: Use the document.querySelectorAll and .forEach methods again!
    //elm.addEventListener("click", function (event : MouseEvent){
});
// TODO: Step 2b - Set up a listener for the "keyup" event. 
// Based on the key pressed, remove the "playing" class 
// from the .drum element with matching data-key attribute.
document.addEventListener("keyup", function (event) {
    var elm = document.querySelector(".drum[data-key='".concat(event.key, "']"));
    if (!elm)
        return;
    elm.classList.remove("playing");
});
// TODO: Step 3a - Implement the function handleClickDrum to be used for
// 'mousedown' events  on the .drum elements. Play the sound according 
// to the  data-sound attribute of clicked element.
function handleClickDrum(event) {
    var clickedElm = event.currentTarget;
    playSound(clickedElm.dataset.sound);
    addToHistory(clickedElm);
}
// TODO: Step 4 - Register handleClickDrum as the mousedown event listener
// for ALL .drum elements. Use the document.querySelectorAll() and .forEach() methods
// to do so with no repetitious code
document.querySelectorAll(".drum").forEach(function (elm) {
    elm.addEventListener("click", handleClickDrum);
});
// TODO: Step 5a - Implement addToHistory below.
// Add a new <li> element to the historyList
// The content of the <li> element should be the same as the given 
// drum's data-key attribute.
// Each <li> element should also have an anonymous click handler that plays 
// the drum's matching sound.
function addToHistory(drum) {
    var listElm = document.createElement("li");
    listElm.textContent = drum.dataset.key;
    historyList.appendChild(listElm);
    listElm.addEventListener("click", function (event) {
        playSound(drum.dataset.sound);
    });
}
// TODO: Step 5b - Add calls to addToHistory in both the 
// 'keydown' listener and handleClickDrum
// TODO: Step 6a - Add some code to the 'keydown' listener that
// toggles the class "hidden" for the historyList when "/" is typed.
// This should cause the history to become invisible/visible.
// HINT: Use the classList.toggle() method, rather than .add() or .remove()
// TODO: Step 6b - Add some code to the 'keydown' listener that causes
// all the <li> elements to be removed, clearing the history.
// HINT: Use the document.querySelectorAll and .forEach methods again!