import Reasons from "./data/Reasons.js";

let count = 0;
const startDate = '2025-07-01'; // 2025-08-10 doublecheck date before reveal
const start = new Date(startDate);
let currentlyWatching = 0;
let slicedArr = []

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
    if (currentlyWatching == 0){
        document.getElementById('prev').classList.add('dispNone');
    } else {
        document.getElementById('prev').classList.remove('dispNone');
    }
        if (currentlyWatching == count -1){
        document.getElementById('next').classList.add('dispNone');
    } else {
        document.getElementById('next').classList.remove('dispNone');
    }
}

function addEventListeners(){
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

function displayItem(i){
    renderButtons();
    document.getElementById('reason').innerHTML = slicedArr[i];
    document.getElementById("nr").innerHTML = currentlyWatching + 1 + ` out of ${count} currently available reasons`;
    document.getElementById('total').innerHTML = Reasons.length;
}