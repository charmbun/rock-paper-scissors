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
    typeText(`A wild opponent appears. Prepare for battle! Rock, Paper, or Scissors?`);
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
   3B. Game Logic Functions
================================= */


function typeText(text, speed = 30) {

    dialogueBox.textContent = "";
    dialogueBox.dataset.fullText = text; // stores the full text
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
    const resultText = humanScore > computerScore 
        ? getRandomDialogue(winMatch) 
        : getRandomDialogue(loseMatch);

    console.log(resultText);        // TEMP
    // typeText(resultText);
}

/* ===============================
   5. Event Listeners
================================= */

choices.addEventListener('click', (event) => {
    if (gameOver) return; // temp until gameover screen
    if (!event.target.matches('button')) return;
    // If currently typing → finish instantly before new line

    if (isTyping) {
        clearTimeout(typingTimeout); // stop the current loop
        dialogueBox.textContent = dialogueBox.dataset.fullText; // reveal full line
        isTyping = false;
        return;
    } 
    
    if (humanScore === roundsCount || computerScore === roundsCount) {
        // ADD GAMEOVER SCREEN
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
});

