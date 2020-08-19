const btn = document.querySelector("button");
const header = document.querySelector(".header");
const area = document.querySelector(".area");
const computerArea = document.querySelector(".computerArea");
const computerAreaSelections = document.querySelectorAll(".computerArea>img");
const selections = document.querySelectorAll(".area>img");
const scoreEl = document.querySelector(".score");
const userScoreEl = document.querySelector(".userScore");
const computerScoreEl = document.querySelector(".computerScore");
const winScoreEl = document.querySelector(".winScore");
const roundsInput = document.querySelector("input");
const message = document.querySelector(".message");

let gameStarted = false;
let userSelection;
let computerSelection;
let userScore = 0;
let computerScore = 0;

let winScore = 3;

const possibilities = ['rock', 'paper', 'scissors'];


btn.addEventListener("click", startGame);
selections.forEach(function (el) {
    el.addEventListener("click", function () {
        userSelection = el.getAttribute('alt').toLowerCase();
        const activeEl = document.querySelector(".area>img.active");
        if (activeEl) {
            activeEl.classList.remove('active');
        }
        el.classList.add('active');
        computerSelection = selectRandom();
        const activeCompEl = document.querySelector(".computerArea>img.active");
        if (activeCompEl) {
            activeCompEl.classList.remove('active');
        }
        computerAreaSelections.forEach(function (item) {
            if (item.getAttribute('alt') === computerSelection) {
                item.classList.add("active");
            }
        });
        showWinner();
    })
});

function startGame() {
    if (!gameStarted) {
        if (roundsInput.value !== '') {
            winScore = roundsInput.value;
            roundsInput.value = '';
        }
        winScoreEl.innerHTML = winScore;
        updateScore();
        gameStarted = true;
        btn.classList.add("hide");
        area.classList.remove("hide");
        computerArea.classList.remove("hide");
        scoreEl.classList.remove("hide");
        roundsInput.classList.add("hide");
        message.classList.remove("hide");
        header.innerHTML = "Make your move.";
    }
}

function selectRandom() {
    return possibilities[Math.floor(Math.random() * possibilities.length)];
}

function showWinner() {
    let userWin = false;
    let msg;
    if (userSelection !== computerSelection) {
        if (userSelection == 'rock') {
            userWin = computerSelection == 'scissors';
        }
        if (userSelection == 'paper') {
            userWin = computerSelection == 'rock';
        }
        if (userSelection == 'scissors') {
            userWin = computerSelection == 'paper';
        }
        if (userWin) {
            userScore++;
        } else {
            computerScore++;
        }
    }
    updateScore();
    if (userScore == winScore || computerScore == winScore) {
        restartGame();
    }

}

function restartGame() {
    gameStarted = false;
    area.classList.add("hide");
    computerArea.classList.add("hide");
    header.innerHTML = userScore == winScore ? 'You won, play again!' : 'You lost, try again!';
    btn.innerHTML = 'Restart';
    btn.classList.remove("hide");
    roundsInput.classList.remove('hide');
    message.classList.add("hide");
    document.querySelector(".area>img.active").classList.remove('active');
    document.querySelector(".computerArea>img.active").classList.remove('active');
    userScore = 0;
    computerScore = 0;
}

function updateScore() {
    userScoreEl.innerHTML = userScore;
    computerScoreEl.innerHTML = computerScore;
}