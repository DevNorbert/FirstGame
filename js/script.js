'use strict';
//Start Game
function StartGame() {
    // Main Variables
    var output = document.getElementById('output');
    var result = document.getElementById('result');
    var outputRounds = document.getElementById('rounds');
    var outputTable = document.getElementById('output-table');
    var overlay = document.getElementById('modal-overlay');
    var modalEndGame = document.getElementById('modal-endgame');
    var modalContentEndGame = modalEndGame.querySelector(".modal-content");
    var params = {
        winnerRound: '',
        winnerGame: '',
        winPlayer: 0,
        winComputer: 0,
        playerMove: '',
        computerMove: '',
        winnerStatus: '',
        random: '',
        rounds: '',
        gameEnd: false,
        progress: []
    };

    // Buttons
    var buttonNewGame = document.getElementById('new-game');
    var buttonsMove = document.querySelectorAll('.player-move');

    for (var i = 0; i < buttonsMove.length; i++) {
        buttonsMove[i].addEventListener('click', function () {
            params.playerMove = this.getAttribute('data-move');
            playerMove();
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

            for (var i = 0; i < buttonsMove.length; i++) {
                buttonsMove[i].style.visibility = 'visible';
            }
        }
    });

    // Function RandomNumber
    function randomNumber() {
        return Math.floor(Math.random() * 3 + 1);
    };

    // Function resultRound 
    function resultRound() {
        switch (params.computerMove + "-" + params.playerMove) {
            // Player Lost
            case 'paper-stone':
            case 'stone-shears':
            case 'shears-paper':
                params.winnerStatus = 'lost';
                params.winner = 'Computer';
                params.winnerGame = 'YOU LOST';
                break;
                // Player Win
            case 'paper-shears':
            case 'stone-paper':
            case 'shears-stone':
                params.winnerStatus = 'win';
                params.winner = 'Player';
                params.winnerGame = 'YOU WON';
                break;
                // Remis
            default:
                params.winnerStatus = 'remis';
                params.winner = 'Remis';
                params.winnerGame = 'REMIS';
                break;
        }
    };
    // Function ResultGame
    function resultGame() {
        if (params.random === 1) {
            params.computerMove = 'paper';
        } else if (params.random === 2) {
            params.computerMove = 'stone'
        } else {
            params.computerMove = 'shears'
        }

        // Check end game
        if (!params.gameEnd) {
            resultRound();
        } else {
            overlay.classList.add('show');
            modalEndGame.classList.add('show');
            modalContentEndGame.innerHTML = 'Game over, please press the new game button!';
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
                    params.winnerRound = 'Player: ' + (++params.winPlayer) + ' - Computer: ' + params.winComputer;
                    break;
                    // Computer Win
                case 'Computer':
                    params.winnerRound = 'Player: ' + params.winPlayer + ' - Computer: ' + (++params.winComputer);
                    break;
                    // Remis
                case 'Remis':
                    params.winnerRound  = 'Player: ' + params.winPlayer + ' - Computer ' + params.winComputer;
                    break;
            }
        } else {
            params.winnerRound = 'Player: ' + params.winPlayer + ' - Computer: ' + params.winComputer;
        }
    };
    // Function NewGame 
    function newGame(numberRounds) {
        outputTable.innerHTML = '';
        params.progress = [];
        params.rounds = numberRounds;
    };
    // Function EndGame
    function ifEndGame() {
        if (params.winPlayer === params.rounds) {
            overlay.classList.add('show');
            modalEndGame.classList.add('show');
            modalContentEndGame.innerHTML = 'YOU WON THE ENTIRE GAME';
            params.gameEnd = true;
        } else if (params.winComputer === params.rounds) {
            overlay.classList.add('show');
            modalEndGame.classList.add('show');
            modalContentEndGame.innerHTML = 'COMPUTER WON THE ENTIRE GAME';
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
    function playerMove() {
        params.random = randomNumber();
        resultGame();
        wonRounds();
        ifEndGame();
        resetGame();

        params.progress = [];
        params.progress.push({
            'playerMove': params.playerMove,
            'computerMove': params.computerMove,
            'rounds': params.rounds,
            'winnerGame': params.winnerGame,
            'winnerRound': params.winnerRound,
            'scorePlayer': params.winPlayer,
            'scoreComputer': params.winComputer,

        });
        scoreTable();
    };
    // Function Generate Score Table 
    function scoreTable() {
        var tableNumberRounds = '<tr><th>Liczba Rund</th><th>' + params.progress[0].rounds + '</th></tr>';
        var tablePlayerMove = '<tr><th>Ruch Gracza</th><th>' + params.progress[0].playerMove + '</th></tr>';
        var tableComputerMove = '<tr><th>Ruch Komputera</th><th>' + params.progress[0].computerMove + '</th></tr>';
        var tableScoreRound = '<tr><th>Wynik Rundy</th><th>' + params.progress[0].winnerGame+ '</th></tr>';
        var tableScoreThisRound = '<tr><th>Wynik gry po tej rundzie</th><th>' + params.progress[0].winnerRound + '</th></tr>';

        var table = '<table class="table-game"><tbody>' + tableNumberRounds + tablePlayerMove + tableComputerMove + tableScoreRound + tableScoreThisRound + '</tbody></table>';
        outputTable.innerHTML = table;

        if(params.gameEnd === true){
            modalContentEndGame.innerHTML += table;
        }
    }

    // Function Modal Hide
    var hideModal = function (event) {
        event.preventDefault();
        document.querySelector('#modal-overlay').classList.remove('show');
    }

    var closeButtons = document.querySelectorAll(".modal .close");

    for (var i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener('click', hideModal);
    }
    // Function Overlay Hide 
    function hideOverlay() {

        document.querySelector('#modal-overlay').addEventListener('click', hideModal);

        var modals = document.querySelectorAll('.modal');

        for (var i = 0; i < modals.length; i++) {
            modals[i].addEventListener('click', function (event) {
                event.stopPropagation();
            });
        };
    };
    hideOverlay();

};
StartGame();