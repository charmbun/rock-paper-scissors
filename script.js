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
})

/* ===============================
   3. Game Screen
================================= */

let dialogueBox = document.querySelector(".dialogue-box");
const choices = document.querySelector(".choice-box")

// TODO: ANIMATION TYPING TEXT
dialogueBox.textContent = `A wild opponent appears. Prepare for battle! Rock, Paper, or Scissors?`;

/* ===============================
   3A. Game Elements & Dialogue
================================= */

let humanScore = 0;
let computerScore = 0;

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
    
    dialogueBox.textContent = "";
    if (humanChoice === computerChoice) {
        dialogueBox.textContent = `You both chose ${humanChoice}. ` + getDrawDialogue(humanChoice);
        return;
    } else if (winsAgainst[humanChoice] === computerChoice) {
        humanScore++;
        dialogueBox.textContent = `You chose ${humanChoice}. Opponent chose ${computerChoice}. ` + getRandomDialogue(winRound);
    } else {
        computerScore++;
        dialogueBox.textContent = `You chose ${humanChoice}. Opponent chose ${computerChoice}. ` + getRandomDialogue(loseRound);
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
    
    console.log(`Player Score: ${humanScore}`)
    console.log(`Computer Score: ${computerScore}`)
    // Display the running score
    // humanScoreCount.textContent = `Player Score: ${humanScore}`;
    // computerScoreCount.textContent = `Computer Score: ${computerScore}`;

    // Announce winner of the game
    // if (humanScore === 5 || computerScore === 5) {
    //     gameResults.textContent = humanScore > computerScore ? 'You won the game!' : 'You lose! Better luck next time.';
    // }
});

