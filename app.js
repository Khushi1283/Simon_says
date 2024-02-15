let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "blue"];

let h2 = document.querySelector("h2");
let started = false;
let level = 0;
let highscore = [];
document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game has started");
    started = true;

    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 350);
}
function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 350);
}
function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `level ${level}`;
  let randInd = Math.floor(Math.random() * 4);
  let randColor = btns[randInd];
  let randBtn = document.querySelector(`.${randColor}`);

  // console.log(randInd);
  // console.log(randColor);
  // console.log(randBtn);
  gameSeq.push(randColor);
  // console.log(userSeq);
  gameFlash(randBtn);
}

function checkAns(ind) {
  // console.log("curr level: ", level);
  // let ind = level - 1;
  if (userSeq[ind] == gameSeq[ind]) {
    // console.log("same value");
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    let hscore = (level - 1) * 10;
    highscore.push(hscore);
    h2.innerHTML = `Game over! Your score was <b>${hscore}.</b> <br>Your highest score is <b>${printhscr()}.</b> <br>Press any key to start`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 450);
    // printhscr();
    reset();
  }
}

function btnPress() {
  // console.log(this);
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  // console.log(userColor);
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

function printhscr() {
  let max = highscore[0];
  for (let i = 0; i < highscore.length; i++) {
    if (max < highscore[i]) {
      max = highscore[i];
    }
  }
  return max;
}
