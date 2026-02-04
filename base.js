import Reasons from "./data/Reasons.js";

let offset = 2; // offset 1 because reason 0 is pre-release, offset +1 for bonus reason at 20
let count = 0;
const startDate = new Date(2025, 7, 10);
const d = new Date();
const msPerDay = 86400000;
const rl = Reasons.length;
let currentlyWatching = 0;
let slicedArr = [];
let pins = [];
const week = [
  "Sunday (dimanche)",
  "Monday (lundi)",
  "Tuesday (mardi)",
  "Wednesday (mercredi)",
  "Thursday (jeudi)",
  "Friday (vendredi)",
  "Saturday (samedi)",
];

init();

function init() {
  if (!localStorage.getItem("pins")) {
    localStorage.setItem("pins", [0]);
  }

  getData();
  checkNew();
  addEventListeners();
  displayItem(currentlyWatching);
  // pinAll()
}

function getData() {
  currentlyWatching = Math.floor(checkDate()) + offset;
  count = currentlyWatching + 1;
  slicedArr = Reasons.slice(0, count);
}

function checkDate() {
  const midnightNow = d;
  const startMidnight = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );
  const timezoneOffset = midnightNow.getTimezoneOffset() * 60000;

  const diff = Math.floor(
    (midnightNow.getTime() - startMidnight.getTime() + timezoneOffset) /
      msPerDay
  );
  return diff;
}

function renderButtons() {
  if (currentlyWatching <= 0) {
    document.getElementById("prev").classList.add("dispNone");
  } else {
    document.getElementById("prev").classList.remove("dispNone");
  }
  if (currentlyWatching == count - 1) {
    document.getElementById("next").classList.add("dispNone");
  } else {
    document.getElementById("next").classList.remove("dispNone");
  }

  // if(pins.includes(currentlyWatching)){
  //     document.getElementById('pin').classList.add('rot');
  // } else{
  //     document.getElementById('pin').classList.remove('rot');
  // }

  // pinAll();
}

function pinAll() {
  document.getElementById("innerPin").innerHTML = "";
  pins.forEach(makePin);
  //TODO finish pinning function with localstorage
}

function makePin(i) {
  document.getElementById(
    "innerPin"
  ).innerHTML += `<div   class="pinnedItem" id='${i}'>${i}</div>`;

  document.getElementById(i).addEventListener("click", function () {
    currentlyWatching = i;
    displayItem(currentlyWatching);
  });
}

function addEventListeners() {
  // document.getElementById('pin').addEventListener('click', function(){
  //     if(pins.includes(currentlyWatching)){
  //         pins = pins.filter(i => i !==currentlyWatching);
  //         localStorage.setItem('pins', pins);
  //         document.getElementById('pin').classList.remove('rot');
  //         pinAll();

  //     } else{
  //         pins.push(currentlyWatching);
  //         localStorage.setItem('pins', pins);
  //         document.getElementById('pin').classList.add('rot');
  //         pinAll();

  //     }
  //     console.log(pins);
  // })

  document.getElementById("prev").addEventListener("click", function () {
    if (currentlyWatching > 0) {
      currentlyWatching -= 1;
      displayItem(currentlyWatching);
    }
  });
  document.getElementById("next").addEventListener("click", function () {
    if (currentlyWatching < count - 1) {
      currentlyWatching += 1;
      displayItem(currentlyWatching);
    }
  });
  document.getElementById("rng").addEventListener("click", function () {
    let pick = Math.floor(Math.random() * count);
    currentlyWatching = pick;
    displayItem(currentlyWatching);
  });
}

function displayItem(i) {
  renderButtons();
  document.getElementById("reason").innerHTML = slicedArr[i];
  document.getElementById("nr").innerHTML =
    i + 1 + ` out of ${count} currently available reasons`;
  document.getElementById("total").innerHTML = rl;

  let displayDate = new Date(
    startDate.getTime() + currentlyWatching * 86400000
  );
  if (i > 19) {
    displayDate = new Date(displayDate - 86400000);
  }

  document.getElementById("release").innerHTML = `the reason of ${
    week[displayDate.getDay()]
  }, ${displayDate.toLocaleDateString()}`;

  if (!slicedArr[i]) {
    document.getElementById(
      "reason"
    ).innerHTML = `you're too early 😘<br> I love you, cutie`;
    document.getElementById(
      "nr"
    ).innerHTML = `You can see the first one in ${Math.abs(count)} days`;
    document.getElementById("total").innerHTML = rl;
  }
  pinAll();
}

function checkNew() {
  let lastCount = localStorage.getItem("lastCount");
  if (!lastCount) {
    localStorage.setItem("lastCount", rl);
  } else {
    const last = Number(lastCount);
    if (last < rl) {
      document.getElementById("new").innerHTML = rl - last;
      localStorage.setItem("lastCount", rl);
    }
  }
}
