'use strict';

// Main Variables
var output = document.getElementById('output');

// Buttons
var buttonPaper = document.getElementById('paper');
var buttonStone = document.getElementById('stone');
var buttonShears = document.getElementById('shears');

buttonPaper.addEventListener('click', function(){
    var move = 'paper';
    playerMove(move);
});
buttonStone.addEventListener('click', function(){
    var move = 'stone';
    playerMove(move);
});
buttonShears.addEventListener('click', function(){
    var move = 'shears';
    playerMove(move);
});

// Function PlayerMove 
function playerMove(move){
    var random = Math.floor(Math.random() * 3 + 1);
    var playerMove = move;
    // computerMove = paper
    if (random === 1) {
        var computerMove = 'paper';
        // playerMove = stone
        if (playerMove === 'stone'){
            output.innerHTML = 'YOU LOST: you played ' + playerMove + ', computer played ' + computerMove;
        // playerMove = shears
        } else if (playerMove === 'shears'){
            output.innerHTML = 'YOU WON: you played ' + playerMove + ', computer played ' + computerMove;
        // playerMove = paper
        } else {
            output.innerHTML = 'REMIS: you played ' + playerMove + ', computer played ' + computerMove;
        }
    // computerMove = stone
    } else if (random === 2){
        var computerMove = 'stone';
        // playerMove = shears
        if (playerMove === 'shears'){
            output.innerHTML = 'YOU LOST: you played ' + playerMove + ', computer played ' + computerMove;
        // playerMove = paper
        } else if (playerMove === 'paper'){
            output.innerHTML = 'YOU WON: you played ' + playerMove + ', computer played ' + computerMove;
        // playerMove = stone 
        } else {
            output.innerHTML = 'REMIS: you played ' + playerMove + ', computer played ' + computerMove;
        }
    } else {
        var computerMove = 'shears';
        // playerMove = paper
        if (playerMove === 'paper'){
            output.innerHTML = 'YOU LOST: you played ' + playerMove + ', computer played ' + computerMove;
        // playerMove = stone
        } else if (playerMove === 'stone'){
            output.innerHTML = 'YOU WON: you played ' + playerMove + ', computer played ' + computerMove;
        // playerMove = shears
        } else {
            output.innerHTML = 'REMIS: you played ' + playerMove + ', computer played ' + computerMove;
        }
    }
};