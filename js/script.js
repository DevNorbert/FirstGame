'use strict';

// Main Variables
var output = document.getElementById('output');
var result = document.getElementById('result');
var winner;
var winPlayer = 0;
var winComputer = 0;
// Buttons
var buttonPaper = document.getElementById('paper');
var buttonStone = document.getElementById('stone');
var buttonShears = document.getElementById('shears');

buttonPaper.addEventListener('click', function () {
    var move = 'paper';
    playerMove(move);
});
buttonStone.addEventListener('click', function () {
    var move = 'stone';
    playerMove(move);
});
buttonShears.addEventListener('click', function () {
    var move = 'shears';
    playerMove(move);
});

// Function RandomNumber
function randomNumber() {
    var random = Math.floor(Math.random() * 3 + 1);
    return random;
};

// Function ResultGame
function resultGame(playerMove, random) {
    var playerMove = playerMove;
    var random = random;

    // computerMove = paper
    if (random === 1) {
        var computerMove = 'paper';
        // playerMove = stone
        if (playerMove === 'stone') {
            output.innerHTML = 'YOU LOST: you played ' + playerMove + ', computer played ' + computerMove;
            winner = 'Computer';
            // playerMove = shears
        } else if (playerMove === 'shears') {
            output.innerHTML = 'YOU WON: you played ' + playerMove + ', computer played ' + computerMove;
            winner = 'Player';
            // playerMove = paper
        } else {
            output.innerHTML = 'REMIS: you played ' + playerMove + ', computer played ' + computerMove;
            winner = 'Remis';
        }
        // computerMove = stone
    } else if (random === 2) {
        var computerMove = 'stone';
        // playerMove = shears
        if (playerMove === 'shears') {
            output.innerHTML = 'YOU LOST: you played ' + playerMove + ', computer played ' + computerMove;
            winner = 'Computer';
            // playerMove = paper
        } else if (playerMove === 'paper') {
            output.innerHTML = 'YOU WON: you played ' + playerMove + ', computer played ' + computerMove;
            winner = 'Player';
            // playerMove = stone 
        } else {
            output.innerHTML = 'REMIS: you played ' + playerMove + ', computer played ' + computerMove;
            winner = 'Remis';
        }
    } else {
        var computerMove = 'shears';
        // playerMove = paper
        if (playerMove === 'paper') {
            output.innerHTML = 'YOU LOST: you played ' + playerMove + ', computer played ' + computerMove;
            winner = 'Computer';
            // playerMove = stone
        } else if (playerMove === 'stone') {
            output.innerHTML = 'YOU WON: you played ' + playerMove + ', computer played ' + computerMove;
            winner = 'Player';
            // playerMove = shears
        } else {
            output.innerHTML = 'REMIS: you played ' + playerMove + ', computer played ' + computerMove;
            winner = 'Remis';
        }
    }
}
//Function WonRounds
function wonRounds() {
    // Player Win
    if (winner === 'Player') {
        result.innerHTML = 'Player: ' + ++winPlayer + ' - Computer: ' + winComputer;
        // Computer Win
    } else if (winner === 'Computer') {
        result.innerHTML = 'Player: ' + winPlayer + ' - Computer: ' + ++winComputer;
        // Remis
    } else {
        result.innerHTML = 'Player: ' + winPlayer + ' - Computer ' + winComputer;
    }
}


// Function PlayerMove 
function playerMove(move) {
    var random = randomNumber();
    var playerMove = move;
    resultGame(playerMove, random);
    wonRounds();
};