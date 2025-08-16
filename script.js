'use strict';

let humanScore = 0;
let computerScore = 0;

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

function getHumanChoice() {
    let humanChoice = prompt('Rock, Paper, or Scissors?');
    return humanChoice.at(0).toUpperCase() + humanChoice.slice(1).toLowerCase();
}

function playRound(humanChoice, computerChoice){

    if (humanChoice === computerChoice) {
        console.log(`It's a tie! Both chose ${humanChoice}. No score.`);
        return;
    } else if (humanChoice === 'scissors' && computerChoice === 'paper') {
        humanScore += 1;
        console.log(`You win this round! ${humanChoice} beats ${computerChoice}`)
    } else if (humanChoice === 'paper' && computerChoice === 'rock') {
        humanScore += 1;
        console.log(`You win this round! ${humanChoice} beats ${computerChoice}`)
    } else if (humanChoice === 'rock' && computerChoice === 'scissors') {
        humanScore += 1;
        console.log(`You win this round! ${humanChoice} beats ${computerChoice}`)
    } else {
        computerScore += 1;
        console.log(`You lose this round! ${computerChoice} beats ${humanChoice}`)
    }

}

function playGame(numberRounds) {

    for (let round = 0; round < numberRounds; round++) {
        const humanSelection = getHumanChoice();
        const computerSelection = getComputerChoice();
        playRound(humanSelection, computerSelection)
    }
    const finalResults = humanScore > computerScore ? 'You win!' : 'You lose!';
    console.log('The game is over.');
    console.log(finalResults);
}

const numberRounds = 5;
playGame(numberRounds);

