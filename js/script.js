'use strict';
//Start Game
function StartGame() {
    // Main Variables
    var outputTable = document.getElementById('output-table');
    var overlay = document.getElementById('modal-overlay');
    var modalEndGame = document.getElementById('modal-endgame');
    var modalContentEndGame = modalEndGame.querySelector(".modal-content");
    var modalNewGame = document.getElementById('modal-newgame');
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
        namePlayer: '',
        progress: []
    };

    // Buttons
    var buttonNewGame = document.getElementById('new-game');
    var buttonStartGame = document.getElementById('start-game');
    var buttonCancelGame = document.getElementById('cancel-game');
    var buttonsMove = document.querySelectorAll('.player-move');
    for (var i = 0; i < buttonsMove.length; i++) {
        buttonsMove[i].addEventListener('click', function () {
            params.playerMove = this.getAttribute('data-move');
            playerMove();
        });
    };

    buttonNewGame.addEventListener('click', function () {
        modalEndGame.classList.remove('show');
        overlay.classList.add('show');
        modalNewGame.classList.add('show');
        params.progress = [];
    });
    // Start Game Button
    buttonStartGame.addEventListener('click', function () {
        var number = document.getElementById('number-rounds').value;
        var numberRounds = parseFloat(number);
        params.namePlayer = document.getElementById('name-player').value;
        var alertName = document.getElementById('alert-name');
        var alertRounds = document.getElementById('alert-rounds');
        if (params.namePlayer === '') {
            alertName.innerHTML = 'Podaj imię';
        } else if (isNaN(numberRounds)) {
            alertRounds.innerHTML = 'Podaj ilość rund';
        } else {

            newGame(numberRounds);
            overlay.classList.remove('show');
            modalNewGame.classList.remove('show');
            for (var i = 0; i < buttonsMove.length; i++) {
                buttonsMove[i].style.visibility = 'visible';
            }
        }
    });
    // Cancel Button 
    buttonCancelGame.addEventListener('click', function(){
        overlay.classList.remove('show');
        modalNewGame.classList.remove('show');
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
                params.winnerGame = params.namePlayer + ' LOST';
                break;
                // Player Win
            case 'paper-shears':
            case 'stone-paper':
            case 'shears-stone':
                params.winnerStatus = 'win';
                params.winner = 'Player';
                params.winnerGame = params.namePlayer + ' WON';
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
                    params.winnerRound = params.namePlayer + ' ' + (++params.winPlayer) + ' - Computer: ' + params.winComputer;
                    break;
                    // Computer Win
                case 'Computer':
                    params.winnerRound = params.namePlayer + ' ' + params.winPlayer + ' - Computer: ' + (++params.winComputer);
                    break;
                    // Remis
                case 'Remis':
                    params.winnerRound = params.namePlayer + ' ' + params.winPlayer + ' - Computer ' + params.winComputer;
                    break;
            }
        } else {
            params.winnerRound = params.namePlayer + ' ' + params.winPlayer + ' - Computer: ' + params.winComputer;
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
            modalContentEndGame.innerHTML = params.namePlayer + ' won the entire game';
            params.gameEnd = true;
        } else if (params.winComputer === params.rounds) {
            overlay.classList.add('show');
            modalEndGame.classList.add('show');
            modalContentEndGame.innerHTML = 'Computer won the entire game';
            params.gameEnd = true;
        }
    };
    // Function resetGame
    function resetGame() {
        buttonNewGame.onclick = function () {
            params.winPlayer = 0;
            params.winComputer = 0;
            params.gameEnd = false;
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
        var tableScoreRound = '<tr><th>Wynik Rundy</th><th>' + params.progress[0].winnerGame + '</th></tr>';
        var tableScoreThisRound = '<tr><th>Wynik gry po tej rundzie</th><th>' + params.progress[0].winnerRound + '</th></tr>';

        var table = '<table class="table-game"><tbody>' + tableNumberRounds + tablePlayerMove + tableComputerMove + tableScoreRound + tableScoreThisRound + '</tbody></table>';
        outputTable.innerHTML = table;

        if (params.gameEnd === true) {
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