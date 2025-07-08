import Reasons from "./data/Reasons.js";

let count = 0;
const startDate = '2025-07-03'; //2025-08-10
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
    addEventListeners();
    displayItem(currentlyWatching);
}

function getData(){
    let d = new Date();
    const timeDiff = d - start;
    currentlyWatching = Math.floor(timeDiff/(1000 * 3600 *24));
    count = currentlyWatching + 1;
    
    slicedArr = Reasons.slice(0, count);
}

function renderButtons(){
    // if currentlyWatching == 0 => no next button
    // uif currently watching item 0 => no previous button
    // add rrandom button to pick between day 0 and current day
}

function addEventListeners(){
    // add eventListeners to buttons
    document.getElementById('prev').addEventListener('click', function(){
        if(currentlyWatching > 0){
            currentlyWatching -= 1;
            displayItem(currentlyWatching);
        }
    });
    document.getElementById('next').addEventListener('click', function(){
        if(currentlyWatching < count - 1){
            currentlyWatching += 1;
            displayItem(currentlyWatching);
        }
    })
    document.getElementById('rng').addEventListener('click', function(){
        let pick = Math.floor(Math.random() * count);
        currentlyWatching = pick;
        displayItem(currentlyWatching);
    })
}

function rngItem(){
    // pick random item to display
}

function displayItem(i){
    console.log(currentlyWatching);
    document.getElementById('reason').innerHTML = slicedArr[i];
    document.getElementById("nr").innerHTML = currentlyWatching + 1;
}