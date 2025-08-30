'use strict';

/* ===============================
   1. Screen Change Logic
================================= */

const startScreen = document.querySelector("#start-screen");
const gameScreen = document.querySelector("#game-screen");
// const winScreen = document.querySelector("#win-screen");
// const loseScreen = document.querySelector("#lose-screen");

function changeScreen(prevScreen, newScreen) {
    prevScreen.style.display = "none";
    newScreen.style.display = "flex";
}

/* ===============================
   2. Start Screen
================================= */

const startBtn = document.querySelector("#startBtn");

startBtn.addEventListener('click', () => {
    changeScreen(startScreen, gameScreen);
    typeText(`A wild opponent appears. Prepare for battle, first to ${roundsCount}! Rock, Paper, or Scissors?`);
})

/* ===============================
   3A. Game Elements & Dialogue
================================= */

// CONSTANT
const roundsCount = 5;

// VARIABLES
let humanScore = 0;
let computerScore = 0;
let playerHP = 100;
let computerHP = 100;

// FLAGS
let gameOver = false;
let isTyping = false;

let dialogueBox = document.querySelector(".dialogue-box");
const choices = document.querySelector(".choice-box");
const playerHPBar = document.querySelector("#playerHP");
const computerHPBar = document.querySelector("#computerHP");

const prompt = [
    `What will you throw next? Rock, Paper, or Scissors?`,
    `The battle rages on… Choose your next move!`,
    `Prepare your next throw!`,
    `I'ts your turn again — Rock, Paper, or Scissors?`,
    `The fight continues! What's your next choice?`,
];

const winRound = [
    `It's super effective! Opponent takes 20 damage.`,
    `A clean hit! Opponent takes 20 damage.`,
    `Critical strike! Opponent takes 20 damage.`,
];

const loseRound = [
    `It's super effective! You take 20 damage.`,
    `Ouch! You take 20 damage.`,
    `A crushing blow! You take 20 damage.`,
];

const winMatch = [
    `You win the battle! Your rival is defeated.`,
    `Victory! Rock, Paper, Scissors master!`,
    `You prevailed this time — well played!`,
];

const loseMatch = [
    `Defeat… Your rival bested you in Rock, Paper, Scissors.`,
    `You lose the match. Better luck next time!`,
    `The battle is over. Your rival stands victorious.`,
];

/* ===============================
   3B. Game Logic Functions
================================= */

function getRandomDialogue(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getDrawDialogue(choice) {
    switch(choice) {
        case 'Rock':
            return `The clash ends in a stalemate!`
        case 'Paper':
            return `The sheets flutter to the ground… It's a tie!`
        case 'Scissors':
            return `The blades spark, but no one wins!`
    }
}

function typeText(text, speed = 30) {
    if (isTyping) return;
    isTyping = true;

    dialogueBox.textContent = "";
    let i = 0;

    const typeChar = () => {
        if (i < text.length) {
            dialogueBox.textContent += text.charAt(i);
            i++;
            setTimeout(typeChar, speed);
        } else {
            isTyping = false;
        }
    };

    typeChar();
}

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

function inflictDamage(loser){

    if (loser === 'computer') {
        computerHP = Math.max(0, computerHP - 20); 
        computerHPBar.style.width = `${computerHP}%`
    }
    else {
        playerHP = Math.max(0, playerHP - 20); 
        playerHPBar.style.width = `${playerHP}%`
    }
}

function playRound(humanChoice, computerChoice){

    const winsAgainst = {
        Rock: 'Scissors',
        Paper: 'Rock',
        Scissors: 'Paper'
    };
    
    // dialogueBox.textContent = "";
    if (humanChoice === computerChoice) {
        typeText(`You both chose ${humanChoice}. ` + getDrawDialogue(humanChoice))
        // dialogueBox.textContent = `You both chose ${humanChoice}. ` + getDrawDialogue(humanChoice);
        return;
    } else if (winsAgainst[humanChoice] === computerChoice) {
        humanScore++;
        inflictDamage('computer');
        typeText(`You chose ${humanChoice}. Opponent chose ${computerChoice}. ` + getRandomDialogue(winRound))
        // dialogueBox.textContent = `You chose ${humanChoice}. Opponent chose ${computerChoice}. ` + getRandomDialogue(winRound);
    } else {
        computerScore++; 
        inflictDamage('player');
        typeText(`You chose ${humanChoice}. Opponent chose ${computerChoice}. ` + getRandomDialogue(loseRound))
        // dialogueBox.textContent = `You chose ${humanChoice}. Opponent chose ${computerChoice}. ` + getRandomDialogue(loseRound);
    }
}

function checkWinner(humanScore, computerScore) {
    // dialogueBox.textContent = ""
    const gameOver = humanScore > computerScore ? getRandomDialogue(winMatch) : getRandomDialogue(loseMatch);
    typeText(gameOver);
}

/* ===============================
   5. Event Listeners
================================= */

choices.addEventListener('click', (event) => {
    if (gameOver) return; // temp until gameover screen
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

    if (humanScore === roundsCount || computerScore === roundsCount) {
        gameOver = true;
        checkWinner(humanScore, computerScore);
        // TODO: redirect to a game over screen
    }
});

