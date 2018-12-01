'use strict';
//Start Game
function StartGame() {
    // Main Variables
    var output = document.getElementById('output');
    var result = document.getElementById('result');
    var outputRounds = document.getElementById('rounds');
    var winner;
    var winPlayer = 0;
    var winComputer = 0;
    var rounds;
    var gameEnd = false;
    // Buttons
    var buttonPaper = document.getElementById('paper');
    var buttonStone = document.getElementById('stone');
    var buttonShears = document.getElementById('shears');
    var buttonNewGame = document.getElementById('new-game');


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
    buttonNewGame.addEventListener('click', function () {
        var number = prompt('How many rounds?');
        var numberRounds = parseFloat(number);
        if (numberRounds < 0) {
            output.innerHTML = '';
            output.innerHTML = 'Please, enter positive number!';
        } else if (isNaN(numberRounds)) {
            output.innerHTML = '';
            output.innerHTML = 'Please, enter number!';
        } else {
            output.innerHTML = '';
            newGame(numberRounds);
            buttonPaper.style.visibility = 'visible';
            buttonStone.style.visibility = 'visible';
            buttonShears.style.visibility = 'visible';
        }
    });

    // Function RandomNumber
    function randomNumber() {
        return Math.floor(Math.random() * 3 + 1);
    };
    // Function WinnerGame
    function winnerGame(playerMove, computerMove, winnerStatus) {
        var playerMove = playerMove;
        var computerMove = computerMove;
        var winnerStatus = winnerStatus;
        if (winnerStatus === 'lost') {
            return 'YOU LOST: you played ' + playerMove + ', computer played ' + computerMove;
        } else if (winnerStatus === 'win') {
            return 'YOU WON: you played ' + playerMove + ', computer played ' + computerMove;
        } else if (winnerStatus === 'remis') {
            return 'REMIS: you played ' + playerMove + ', computer played ' + computerMove;
        }
    };
    // Function ResultGame
    function resultGame(playerMove, random) {
        var playerMove = playerMove;
        var random = random;
        // Check end game
        if (gameEnd === false) {
            switch (random) {
                // computerMove = paper
                case 1:
                    var computerMove = 'paper';
                    switch (playerMove) {
                        // playerMove = stone
                        case 'stone':
                            var winnerStatus = 'lost';
                            output.innerHTML = winnerGame(playerMove, computerMove, winnerStatus);
                            winner = 'Computer';
                            break;
                            // playerMove = shears   
                        case 'shears':
                            var winnerStatus = 'win';
                            output.innerHTML = winnerGame(playerMove, computerMove, winnerStatus);
                            winner = 'Player';
                            break;
                            // playerMove = paper 
                        case 'paper':
                            var winnerStatus = 'remis';
                            output.innerHTML = winnerGame(playerMove, computerMove, winnerStatus);
                            winner = 'Remis';
                            break;
                    }
                    break;
                    // computerMove = stone
                case 2:
                    var computerMove = 'stone';
                    switch (playerMove) {
                        // playerMove = shears
                        case 'shears':
                            var winnerStatus = 'lost';
                            output.innerHTML = winnerGame(playerMove, computerMove, winnerStatus);
                            winner = 'Computer';
                            break;
                            // playerMove = paper    
                        case 'paper':
                            var winnerStatus = 'win';
                            output.innerHTML = winnerGame(playerMove, computerMove, winnerStatus);
                            winner = 'Player';
                            break;
                            // playerMove = stone
                        case 'stone':
                            var winnerStatus = 'remis';
                            output.innerHTML = winnerGame(playerMove, computerMove, winnerStatus);
                            winner = 'Remis';
                            break;
                    }
                    break;
                    // computerMove = shears
                case 3:
                    var computerMove = 'shears';
                    switch (playerMove) {
                        // playerMove = paper
                        case 'paper':
                            var winnerStatus = 'lost';
                            output.innerHTML = winnerGame(playerMove, computerMove, winnerStatus);
                            winner = 'Computer';
                            break;
                            // playerMove = stone
                        case 'stone':
                            var winnerStatus = 'win';
                            output.innerHTML = winnerGame(playerMove, computerMove, winnerStatus);
                            winner = 'Player';
                            break;
                            // playerMove = shears
                        case 'shears':
                            var winnerStatus = 'remis';
                            output.innerHTML = winnerGame(playerMove, computerMove, winnerStatus);
                            winner = 'Remis';
                            break;
                    }
                    break;
            }
        } else if (gameEnd === true) {
            output.innerHTML = 'Game over, please press the new game button!';
            winPlayer = 0;
            winComputer = 0;
        }
    };
    // Function whoWin
    function whoWin() {
        if (winner === 'Player') {
            return 'Player: ' + (++winPlayer) + ' - Computer: ' + winComputer;
        } else if (winner === 'Computer') {
            return 'Player: ' + winPlayer + ' - Computer: ' + (++winComputer);
            // Remis
        } else if (winner === 'Remis') {
            return 'Player: ' + winPlayer + ' - Computer ' + winComputer;
        }
    }

    function incrementOff() {
        return 'Player: ' + winPlayer + ' - Computer: ' + winComputer;
    }
    //Function WonRounds
    function wonRounds() {
        if (gameEnd === false) {

            switch (winner) {
                // Player Win
                case 'Player':
                    result.innerHTML = whoWin();
                    break;
                    // Computer Win
                case 'Computer':
                    result.innerHTML = whoWin();
                    break;
                    // Remis
                case 'Remis':
                    result.innerHTML = whoWin();
                    break;
            }
        } else if (gameEnd === true) {
            switch (winner) {
                // Player Win
                case 'Player':
                    result.innerHTML = incrementOff()
                    break;
                    // Computer Win
                case 'Computer':
                    result.innerHTML = incrementOff()
                    break;
                    // Remis
                case 'Remis':
                    result.innerHTML = incrementOff()
                    break;
            }
        }
    };
    // Function NewGame 
    function newGame(numberRounds) {
        rounds = numberRounds;
        outputRounds.innerHTML = 'Number of rounds: ' + rounds;
    };
    // Function EndGame
    function endGame() {
        if (winPlayer === rounds) {
            output.innerHTML = '<br><br>' + 'YOU WON THE ENTIRE GAME';
            gameEnd = true;
        } else if (winComputer === rounds) {
            output.innerHTML = '<br><br>' + 'COMPUTER WON THE ENTIRE GAME';
            gameEnd = true;
        }
    };
    // Function resetGame
    function resetGame() {
        buttonNewGame.onclick = function () {
            winPlayer = 0;
            winComputer = 0;
            gameEnd = false;
            result.innerHTML = '';
        }
    }
    // Function PlayerMove 
    function playerMove(move) {
        var random = randomNumber();
        var playerMove = move;
        resultGame(playerMove, random);
        wonRounds();
        endGame();
        resetGame();

    };
};
StartGame();