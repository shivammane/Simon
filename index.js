"use strict";

//Global variables

const btns = document.querySelectorAll("div.btn");
let randomClick = [];
let userClick = [];
let isGameStart = true;
let level = 0;
let j = 0;

//Functions

function buttonSounds(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function buttonAnimation(colorNumber) {
    btns[colorNumber].style.opacity = "0.5";
    setTimeout(() => {
        btns[colorNumber].style.opacity = "1";
    }, 100);
}

function headingAnimation() {
    setInterval(() => {
        document.querySelector("h1").style.visibility = "hidden";
        setTimeout(() => {
            document.querySelector("h1").style.visibility = "visible";
        }, 500);
    }, 1000);
}

function randomColorClick() {
    let randomColor = Math.floor(Math.random() * 4);
    btns[randomColor].click();
    let pickedColor = btns[randomColor].classList[1];
    buttonAnimation(randomColor);
    buttonSounds(pickedColor);
    randomClick.push(pickedColor);
    console.log(randomClick);
}

function userColorClick() {
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("mousedown", function () {
            buttonAnimation(i);
            buttonSounds(this.classList[1]);
            userClick.push(this.classList[1]);
            console.log(userClick);
            winningCondition();
        });
    }
}

function reset() {
    randomClick = [];
    userClick = [];
    isGameStart = true;
    level = 0;
    j = 0;
}

function startGame() {
    document.addEventListener("keydown", function (event) {
        if (event.key && isGameStart) {
            $("h1").css("color", "violet");
            $("h1").html("Level  " + level);
            isGameStart = false;
            setTimeout(() => {
                randomColorClick();
            }, 1000);
        }
    });
}

function gameOver() {
    $("h1").html("You Fail!!!<br>Press any key to restart");
    document.querySelector("body").classList.add("gameOver");
    $("h1").css("color", "red");
    setTimeout(() => {
        document.querySelector("body").classList.remove("gameOver");
    }, 200);
    buttonSounds("wrong");
}

function winningCondition() {
    if (userClick[j] == randomClick[j]) {
        j++;
        if (userClick.length == randomClick.length) {
            $("h1").html("Level  " + (level = level + 1));
            setTimeout(() => {
                randomColorClick();
            }, 1000);
            userClick = [];
            j = 0;
        }
    } else {
        gameOver();
        reset();
    }
}

//Others

startGame();
userColorClick();
