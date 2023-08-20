/*ROCK PAPER SCISSORS*/

let playerScore = 0;
let computerScore = 0;

function getComputerChoice() {
    const choices = ['Rock', 'Paper', 'Scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();

    if (playerSelection === computerSelection) {
        return { result: 'draw', message: "It's a draw!" };
    }

    switch (playerSelection) {
        case 'rock':
            return (computerSelection === 'scissors')
                ? { result: 'win', message: "You Win! Rock beats Scissors" }
                : { result: 'lose', message: "You Lose! Paper beats Rock" };
        case 'paper':
            return (computerSelection === 'rock')
                ? { result: 'win', message: "You Win! Paper beats Rock" }
                : { result: 'lose', message: "You Lose! Scissors beats Paper" };
        case 'scissors':
            return (computerSelection === 'paper')
                ? { result: 'win', message: "You Win! Scissors beats Paper" }
                : { result: 'lose', message: "You Lose! Rock beats Scissors" };
        default:
            return { result: 'invalid', message: "Invalid choice" };
    }
}

function playGame(playerChoice) {
    const computerChoice = getComputerChoice();
    const roundResult = playRound(playerChoice, computerChoice);
    displayResult(roundResult.message + ". Computer chose " + computerChoice);

    if (roundResult.result === 'win') {
        playerScore++;
    } else if (roundResult.result === 'lose') {
        computerScore++;
    }

    updateScore(playerScore, computerScore);

    if (checkWinner(playerScore, computerScore)) {
        endGame();
    }
}

function updateScore(playerScore, computerScore) {
    const playerScoreDiv = document.getElementById('playerScore');
    const computerScoreDiv = document.getElementById('computerScore');

    playerScoreDiv.textContent = "Player Score: " + playerScore;
    computerScoreDiv.textContent = "Computer Score: " + computerScore;
}

function checkWinner(playerScore, computerScore) {
    if (playerScore >= 5) {
        displayResult("Congratulations! You reached 5 points first and won the game!");
        return true;
    } else if (computerScore >= 5) {
        displayResult("Sorry, the computer reached 5 points first and won the game.");
        return true;
    }
    return false;
}

function endGame() {
    document.getElementById('rock').disabled = true;
    document.getElementById('paper').disabled = true;
    document.getElementById('scissors').disabled = true;
    displayResult("Game Over! Refresh the page to play again.");
}

function displayResult(message) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.textContent = message;
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('rock').addEventListener('click', function () {
        playGame('rock');
    });
    document.getElementById('paper').addEventListener('click', function () {
        playGame('paper');
    });
    document.getElementById('scissors').addEventListener('click', function () {
        playGame('scissors');
    });
});
