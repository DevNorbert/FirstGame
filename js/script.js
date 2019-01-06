'use strict';
//Start Game
function StartGame() {
    // Main Variables
    var output = document.getElementById('output');
    var result = document.getElementById('result');
    var outputRounds = document.getElementById('rounds');

    var params = {
        winner: '',
        winPlayer: 0,
        winComputer: 0,
        rounds: '',
        gameEnd: false,
    }

    // Buttons
    var buttonNewGame = document.getElementById('new-game');
    var buttonsMove = document.querySelectorAll('.player-move');

    for (var i = 0; i < buttonsMove.length; i++) {
        buttonsMove[i].addEventListener('click', function () {
            var move = this.getAttribute('data-move');
            playerMove(move)
        });
    };

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

            for(var i = 0; i < buttonsMove.length; i++){
            buttonsMove[i].style.visibility = 'visible';
            }
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
    // Function resultRound 
    function resultRound(playerMove, computerMove) {
        switch (computerMove + "-" + playerMove) {
            // Player Lost
            case 'paper-stone':
            case 'stone-shears':
            case 'shears-paper':
                var winnerStatus = 'lost';
                output.innerHTML = winnerGame(playerMove, computerMove, winnerStatus);
                params.winner = 'Computer';
                break;
                // Player Win
            case 'paper-shears':
            case 'stone-paper':
            case 'shears-stone':
                var winnerStatus = 'win';
                output.innerHTML = winnerGame(playerMove, computerMove, winnerStatus);
                params.winner = 'Player';
                break;
                // Remis
            default:
                var winnerStatus = 'remis';
                output.innerHTML = winnerGame(playerMove, computerMove, winnerStatus);
                params.winner = 'Remis';
                break;
        }
    };
    // Function ResultGame
    function resultGame(playerMove, random) {
        var playerMove = playerMove;
        var random = random;
        var computerMove;
        if (random === 1) {
            computerMove = 'paper';
        } else if (random === 2) {
            computerMove = 'stone'
        } else {
            computerMove = 'shears'
        }
        // Check end game
        if (!params.gameEnd) {
            resultRound(playerMove, computerMove);
        } else {
            output.innerHTML = 'Game over, please press the new game button!';
            params.winPlayer = 0;
            params.winComputer = 0;
        }
    };
    //Function WonRounds
    function wonRounds() {
        if (!params.gameEnd) {
            switch (params.winner) {
                // Player Win
                case 'Player':
                    result.innerHTML = 'Player: ' + (++params.winPlayer) + ' - Computer: ' + params.winComputer;
                    break;
                    // Computer Win
                case 'Computer':
                    result.innerHTML = 'Player: ' + params.winPlayer + ' - Computer: ' + (++params.winComputer);
                    break;
                    // Remis
                case 'Remis':
                    result.innerHTML = 'Player: ' + params.winPlayer + ' - Computer ' + params.winComputer;
                    break;
            }
        } else {
            result.innerHTML = 'Player: ' + params.winPlayer + ' - Computer: ' + params.winComputer;
        }
    };
    // Function NewGame 
    function newGame(numberRounds) {
        params.rounds = numberRounds;
        outputRounds.innerHTML = 'Number of rounds: ' + params.rounds;
    };
    // Function EndGame
    function ifEndGame() {
        if (params.winPlayer === params.rounds) {
            output.innerHTML = '<br><br>' + 'YOU WON THE ENTIRE GAME';
            params.gameEnd = true;
        } else if (params.winComputer === params.rounds) {
            output.innerHTML = '<br><br>' + 'COMPUTER WON THE ENTIRE GAME';
            params.gameEnd = true;
        }
    };
    // Function resetGame
    function resetGame() {
        buttonNewGame.onclick = function () {
            params.winPlayer = 0;
            params.winComputer = 0;
            params.gameEnd = false;
            result.innerHTML = '';
        }
    }
    // Function PlayerMove 
    function playerMove(move) {
        var random = randomNumber();
        var playerMove = move;
        resultGame(playerMove, random);
        wonRounds();
        ifEndGame();
        resetGame();

    };
};
StartGame();