// get day, render item of current day
// figure out how to move back and forth between past items up till the current one
// no peeking into the next ones

let count = 0;
const startDate = '2025-07-07';
const start = new Date(startDate);

init();

function init(){
    getCount();
}

function getCount(){
    let d = new Date();
    const timeDiff = d - start;
    count = 1 + Math.floor(timeDiff/(1000 * 3600 *24));
    document.getElementById("nr").innerHTML = count;
}