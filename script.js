'use strict';

/* ===============================
   1. Screen Change Logic
================================= */

const startScreen = document.querySelector("#start-screen");
const gameScreen = document.querySelector("#game-screen");
const winScreen = document.querySelector("#win-screen");
const loseScreen = document.querySelector("#lose-screen");
const frame = document.querySelector(".frame-inside");

function changeScreen(prevScreen, newScreen) {
    prevScreen.style.display = "none";
    newScreen.style.display = "flex";

    if (newScreen === winScreen) {
        frame.style["background-color"] = "#90B78F"
    } else if (newScreen === loseScreen) {
        frame.style["background-color"] = "#B06F78"
    }
}

/* ===============================
   2. Start Screen
================================= */

const startBtn = document.querySelector("#startBtn");

startBtn.addEventListener('click', () => {
    changeScreen(startScreen, gameScreen);
    typeText(`A wild opponent appears. Prepare for battle! Rock, Paper, or Scissors?`);
})

/* ===============================
   3A. Game Screen: Game Elements & Dialogue
================================= */

// CONSTANT
const roundsCount = 5;

// VARIABLES
let humanScore = 0;
let computerScore = 0;
let playerHP = 100;
let computerHP = 100;
let typingTimeout; 

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
   3B. Game Screen: Game Logic Functions
================================= */

function typeText(text, speed = 30) {

    dialogueBox.textContent = "";
    dialogueBox.dataset.fullText = text; 
    let i = 0;
    isTyping = true;

    const typeChar = () => {
        if (i < text.length) {
            dialogueBox.textContent += text.charAt(i);
            i++;
            typingTimeout = setTimeout(typeChar, speed);
        } else {
            isTyping = false;
        }
    };

    typeChar();
}

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
    
    if (humanChoice === computerChoice) {
        typeText(`You both chose ${humanChoice}. ` + getDrawDialogue(humanChoice))
        return;
    } else if (winsAgainst[humanChoice] === computerChoice) {
        humanScore++;
        typeText(`You chose ${humanChoice}. Opponent chose ${computerChoice}. ` + getRandomDialogue(winRound));
        inflictDamage('computer');
    } else {
        computerScore++; 
        typeText(`You chose ${humanChoice}. Opponent chose ${computerChoice}. ` + getRandomDialogue(loseRound));
        inflictDamage('player');
    }
}

function checkWinner(humanScore, computerScore) {
    if (humanScore > computerScore) {
        changeScreen(gameScreen, winScreen);

    } else {
        changeScreen(gameScreen, loseScreen);
    }
}

function startNewGame () {
    humanScore = 0;
    computerScore = 0;
    playerHP = 100;
    playerHPBar.style.width = "100%"
    computerHP = 100;
    computerHPBar.style.width = "100%"
}

/* ===============================
   5. Game Screen: Event Listeners
================================= */

choices.addEventListener('click', (event) => {
    if (gameOver) return;
    if (!event.target.matches('button')) return;
    if (isTyping) {
        clearTimeout(typingTimeout); 
        dialogueBox.textContent = dialogueBox.dataset.fullText; 
        isTyping = false;
        return;
    } 

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
        setTimeout(() => {
            checkWinner(humanScore, computerScore);
        }, 3000); 
    }
});

/* ===============================
   6. GameOver Screen
================================= */

const winBtn = document.querySelector("#winBtn");
const loseBtn = document.querySelector("#loseBtn");

winBtn.addEventListener('click', (event) => {
    // clear the variables
    startNewGame();
    // change screen
    changeScreen(winScreen, startScreen);
    frame.style["background-color"] = "#f3f3f3"
})

loseBtn.addEventListener('click', (event) => {
    // clear the variables
    startNewGame();
    // change screen
    changeScreen(loseScreen, startScreen);
    frame.style["background-color"] = "#f3f3f3"
})