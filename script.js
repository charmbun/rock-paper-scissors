'use strict';

/* ===============================
   1. Screen Change Logic
================================= */

const startScreen = document.querySelector("#start-screen");
const gameScreen = document.querySelector("#game-screen");
const winScreen = document.querySelector("#win-screen");
const loseScreen = document.querySelector("#lose-screen");

function changeScreen(prevScreen, newScreen) {
    prevScreen.style.display = "none";
    newScreen.style.display = "flex";
}


/* ===============================
   2. Start Screen
================================= */

const startBtn = document.querySelector(".btn.start");

startBtn.addEventListener('click', () => {
    changeScreen(startScreen, gameScreen);
})

let dialogueBox = document.querySelector(".dialogue-box");
dialogueBox.textContent = `A wild opponent appears. Prepare for battle! Rock, Paper, or Scissors?`;

/* ===============================
   3. Game State & Elements
================================= */

let humanScore = 0;
let computerScore = 0;

const choices = document.querySelector(".choices");
const results = document.querySelector(".results");

const roundResults = document.createElement("p");
const humanScoreCount = document.createElement("p");
const computerScoreCount = document.createElement("p");
const gameResults = document.createElement("p");

results.appendChild(roundResults);
results.appendChild(humanScoreCount);
results.appendChild(computerScoreCount);
results.appendChild(gameResults);

/* ===============================
   4. Game Logic Functions
================================= */

function getComputerChoice() {
    let randomNumber = Math.floor(Math.random() * 3)
    switch(randomNumber) {
        case 0:
            return 'Rock';
        case 1:
            return 'Paper';
        case 2:
            return 'Scissors';
    }
}

function playRound(humanChoice, computerChoice){

    const winsAgainst = {
        Rock: 'Scissors',
        Paper: 'Rock',
        Scissors: 'Paper'
    };

    console.log(`Player: ${humanChoice}`)
    console.log(`Computer: ${computerChoice}`)
    
    if (humanChoice === computerChoice) {
        roundResults.textContent = `It's a tie! Both chose ${humanChoice}. No score.`;
        return;
    } else if (winsAgainst[humanChoice] === computerChoice) {
        humanScore++;
        roundResults.textContent = `You win this round! ${humanChoice} beats ${computerChoice}`;
    } else {
        computerScore++;
        roundResults.textContent = `You lose this round! ${computerChoice} beats ${humanChoice}`;
    }
}

/* ===============================
   5. Event Listeners
================================= */

choices.addEventListener('click', (event) => {
    if (!event.target.matches('button')) return;
    let button = event.target;
    let humanChoice;

    switch(button.id) {
        case 'rockBtn':
            humanChoice = "Rock";
            break;
        case 'paperBtn':
            humanChoice = "Paper";
            break;
        case 'scissorsBtn':
            humanChoice = "Scissors";
            break;
    }

    const computerChoice = getComputerChoice();    
    playRound(humanChoice, computerChoice);
    
    // Display the running score
    humanScoreCount.textContent = `Player Score: ${humanScore}`;
    computerScoreCount.textContent = `Computer Score: ${computerScore}`;
    
    // Announce winner of the game
    if (humanScore === 5 || computerScore === 5) {
        gameResults.textContent = humanScore > computerScore ? 'You won the game!' : 'You lose! Better luck next time.';
    }
});

