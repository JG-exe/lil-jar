import Reasons from "./data/Reasons.js";

let count = 0;
const startDate = '2025-08-10';
const start = new Date(startDate);
let currentlyWatching = 0;
let slicedArr = []

// get day, render item of current day
// figure out how to move back and forth between past items up till the current one
// no peeking into the next ones
// change id="time" to fit message if it is one from the past?

init();

function init(){
    getData();
}

function getData(){
    let d = new Date();
    const timeDiff = d - start;
    count = 1 + Math.floor(timeDiff/(1000 * 3600 *24));
    document.getElementById("nr").innerHTML = count;
    
    SlicedArr = Reasons.slice(0, count);
}

function renderButtons(){
    // if currentlyWatching == 0 => no next button
    // uif currently watching item 0 => no previous button
    // add rrandom button to pick between day 0 and current day
}

function addEventListeners(){
    // add eventListeners to buttons
}

function rngItem(){
    // pick random item to display
}