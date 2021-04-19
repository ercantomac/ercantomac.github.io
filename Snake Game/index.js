const sizeOfGame = 22;
var squareArea, pointLabel, upButton, leftButton, downButton, rightButton, table, rows = new Array(sizeOfGame), cols = Array.from(Array(sizeOfGame), () => new Array(sizeOfGame)), subSquares = Array.from(Array(sizeOfGame), () => new Array(sizeOfGame));
var points, theFood, currentPosition = new Array(2), currentMovement, previousMovement, snakeArea = [], level;
var eatSound_1 = new Audio("Minecraft-eat1.mp3"), eatSound_2 = new Audio("Minecraft-eat2.mp3"), ouhSound = new Audio("classic_hurt.mp3"), levelUpSound = new Audio("minecraft_level_up_sound.mp3"), gameWonSound = new Audio("Anime wow sound effect.mp3");
var myInterval, myInterval2, finishingPoint = (sizeOfGame * sizeOfGame);
var gameOverDiv = document.createElement("div"), message = document.createElement("div"), playAgainButton = document.createElement("button");
gameOverDiv.align = "center", gameOverDiv.className = "gameOver";
message.style = "color: rgb(20, 172, 172);";
playAgainButton.setAttribute("onclick", "window.location.reload();"), playAgainButton.innerHTML = "<b>Play Again</b>";
playAgainButton.style = "background-color: rgb(204, 204, 204); color: rgb(32, 33, 37); border: 0px; width: 80px; height: 36px; border-radius: 10px;";
gameOverDiv.appendChild(message), gameOverDiv.appendChild(playAgainButton);
function setScreen() {
    squareArea = document.getElementById("square");
    pointLabel = document.getElementById("pointLabel");
    upButton = document.getElementById("upButton");
    leftButton = document.getElementById("leftButton");
    downButton = document.getElementById("downButton");
    rightButton = document.getElementById("rightButton");
    squareArea.innerHTML = "";
    points = 5, currentPosition = [0, 0], currentMovement = "start", snakeArea = [];
    table = document.createElement("table");
    table.setAttribute("cellspacing", "0");
    squareArea.appendChild(table);
    upButton.style.borderRadius = "2vh 2vh 0px 0px";
    leftButton.style.borderRadius = "2vh 0px 0px 2vh";
    rightButton.style.borderRadius = "0px 2vh 2vh 0px";
    downButton.style.border = "none";
    downButton.style.borderTop = "1px solid rgb(9, 9, 11)";
    downButton.style.borderBottom = "1px solid rgb(32, 33, 37)";
    upButton.style.borderBottom = "none";
    leftButton.style.borderRight = "none";
    rightButton.style.borderLeft = "none";
    for (var i = 0; i < sizeOfGame; i++) {
        rows[i] = document.createElement("tr");
        table.appendChild(rows[i]);
        for (var j = 0; j < sizeOfGame; j++) {
            subSquares[i][j] = document.createElement("td");
            subSquares[i][j].className = "subSquares";
            subSquares[i][j].align = "center";
            rows[i].appendChild(subSquares[i][j]);
        }
    }
    setFood();
}
function setDirection(event) {
    if (currentMovement != "gameover") {
        switch (event.key) {
            case "w": case "W": case "ArrowUp": if (currentMovement != "down" && currentMovement != "up") {
                clearInterval(myInterval);
                clearInterval(myInterval2);
                if (currentMovement == "start") currentPosition = [(sizeOfGame - 1), 0];
                upMovement();
            }
                break;
            case "a": case "A": case "ArrowLeft": if (currentMovement != "right" && currentMovement != "left") {
                clearInterval(myInterval);
                clearInterval(myInterval2);
                if (currentMovement == "start") currentPosition = [0, (sizeOfGame - 1)];
                leftMovement();
            }
                break;
            case "s": case "S": case "ArrowDown": if (currentMovement != "up" && currentMovement != "down") {
                clearInterval(myInterval);
                clearInterval(myInterval2);
                downMovement();
            }
                break;
            case "d": case "D": case "ArrowRight": if (currentMovement != "left" && currentMovement != "right") {
                clearInterval(myInterval);
                clearInterval(myInterval2);
                rightMovement();
            }
                break;
        }
    }
}
function simulateKeyDown(buttonClickID) {
    if (currentMovement != "gameover") {
        switch (buttonClickID) {
            case 1: if (currentMovement != "down" && currentMovement != "up") {
                clearInterval(myInterval);
                clearInterval(myInterval2);
                if (currentMovement == "start") currentPosition = [(sizeOfGame - 1), 0];
                upMovement();
            }
                break;
            case 2: if (currentMovement != "left" && currentMovement != "right") {
                clearInterval(myInterval);
                clearInterval(myInterval2);
                rightMovement();
            }
                break;
            case 3: if (currentMovement != "right" && currentMovement != "left") {
                clearInterval(myInterval);
                clearInterval(myInterval2);
                if (currentMovement == "start") currentPosition = [0, (sizeOfGame - 1)];
                leftMovement();
            }
                break;
            case 4: if (currentMovement != "up" && currentMovement != "down") {
                clearInterval(myInterval);
                clearInterval(myInterval2);
                downMovement();
            }
                break;
        }
    }
}
function assignments(i, j) {
    subSquares[i][j].style.backgroundColor = "rgb(9, 9, 11)";
    subSquares[i][j].innerHTML = ":";
    currentPosition[0] = i;
    currentPosition[1] = j;
    var l = snakeArea.length;
    snakeArea[l] = subSquares[i][j];
    if (l > points) {
        snakeArea[0].style.backgroundColor = "transparent";
        snakeArea[0].innerHTML = "";
        snakeArea.shift();
    }
    if (subSquares[i][j] == theFood) {
        points % 2 == 0 ? (eatSound_2.play()) : (eatSound_1.play());
        points++;
        theFood.style.borderRadius = "0";
        if (points == finishingPoint) gameWon();
        else setFood();
    }
}
function rightMovement() {
    var i = currentPosition[0], j = currentPosition[1];
    subSquares[i][j].style.backgroundColor = "rgb(204, 204, 204)";
    assignments(i, j);
    j++;
    myInterval = setInterval(() => {
        if (j < sizeOfGame) {
            if (subSquares[i][j].style.backgroundColor == "rgb(204, 204, 204)") gameOver();
            subSquares[i][(j - 1)].style.backgroundColor = "rgb(204, 204, 204)";
            assignments(i, j);
            if (currentMovement != "right") {
                previousMovement = currentMovement;
                currentMovement = "right";
            }
            j++;
        }
        if (j == sizeOfGame) {
            clearInterval(myInterval);
            j = 0;
            myInterval2 = setInterval(() => {
                if (subSquares[i][j].style.backgroundColor == "rgb(204, 204, 204)") gameOver();
                subSquares[i][((j > 0) ? (j - 1) : (sizeOfGame - 1))].style.backgroundColor = "rgb(204, 204, 204)";
                assignments(i, j);
                if (currentMovement != "right") {
                    previousMovement = currentMovement;
                    currentMovement = "right";
                }
                j++;
                if (j == sizeOfGame) j = 0;
            }, 96);
        }
    }, 96);
}
function leftMovement() {
    var i = currentPosition[0], j = currentPosition[1];
    subSquares[i][j].style.backgroundColor = "rgb(204, 204, 204)";
    assignments(i, j);
    j--;
    myInterval = setInterval(() => {
        if (j >= 0) {
            if (subSquares[i][j].style.backgroundColor == "rgb(204, 204, 204)") gameOver();
            subSquares[i][(j + 1)].style.backgroundColor = "rgb(204, 204, 204)";
            assignments(i, j);
            if (currentMovement != "left") {
                previousMovement = currentMovement;
                currentMovement = "left";
            }
            j--;
        }
        if (j < 0) {
            clearInterval(myInterval);
            j = (sizeOfGame - 1);
            myInterval2 = setInterval(() => {
                if (subSquares[i][j].style.backgroundColor == "rgb(204, 204, 204)") gameOver();
                subSquares[i][((j < (sizeOfGame - 1)) ? (j + 1) : 0)].style.backgroundColor = "rgb(204, 204, 204)";
                assignments(i, j);
                if (currentMovement != "left") {
                    previousMovement = currentMovement;
                    currentMovement = "left";
                }
                j--;
                if (j < 0) j = (sizeOfGame - 1);
            }, 96);
        }
    }, 96);
}
function upMovement() {
    var j = currentPosition[1], i = currentPosition[0];
    subSquares[i][j].style.backgroundColor = "rgb(204, 204, 204)";
    assignments(i, j);
    i--;
    myInterval = setInterval(() => {
        if (i >= 0) {
            if (subSquares[i][j].style.backgroundColor == "rgb(204, 204, 204)") gameOver();
            subSquares[(i + 1)][j].style.backgroundColor = "rgb(204, 204, 204)";
            assignments(i, j);
            if (currentMovement != "up") {
                previousMovement = currentMovement;
                currentMovement = "up";
            }
            i--;
        }
        if (i < 0) {
            clearInterval(myInterval);
            i = (sizeOfGame - 1);
            myInterval2 = setInterval(() => {
                if (subSquares[i][j].style.backgroundColor == "rgb(204, 204, 204)") gameOver();
                subSquares[((i < (sizeOfGame - 1)) ? (i + 1) : 0)][j].style.backgroundColor = "rgb(204, 204, 204)";
                assignments(i, j);
                if (currentMovement != "up") {
                    previousMovement = currentMovement;
                    currentMovement = "up";
                }
                i--;
                if (i < 0) i = (sizeOfGame - 1);
            }, 96);
        }
    }, 96);
}
function downMovement() {
    var j = currentPosition[1], i = currentPosition[0];
    subSquares[i][j].style.backgroundColor = "rgb(204, 204, 204)";
    assignments(i, j);
    i++;
    myInterval = setInterval(() => {
        if (i < sizeOfGame) {
            if (subSquares[i][j].style.backgroundColor == "rgb(204, 204, 204)") gameOver();
            subSquares[(i - 1)][j].style.backgroundColor = "rgb(204, 204, 204)";
            assignments(i, j);
            if (currentMovement != "down") {
                previousMovement = currentMovement;
                currentMovement = "down";
            }
            i++;
        }
        if (i == sizeOfGame) {
            clearInterval(myInterval);
            i = 0;
            myInterval2 = setInterval(() => {
                if (subSquares[i][j].style.backgroundColor == "rgb(204, 204, 204)") gameOver();
                subSquares[((i > 0) ? (i - 1) : (sizeOfGame - 1))][j].style.backgroundColor = "rgb(204, 204, 204)";
                assignments(i, j);
                if (currentMovement != "down") {
                    previousMovement = currentMovement;
                    currentMovement = "down";
                }
                i++;
                if (i == sizeOfGame) i = 0;
            }, 96);
        }
    }, 96);
}
function setFood() {
    level = parseInt(points / sizeOfGame) + 1;
    if (points % sizeOfGame == 0 && points != finishingPoint) levelUpSound.play();
    var cnt;
    pointLabel.innerHTML = "Score: <span style='color: crimson; font-weight: bold; text-shadow: 0 0 6px rgba(220, 20, 60, .64);'>" + points + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Level: <span style='color: rgb(20, 172, 172); font-weight: bold; text-shadow: 0 0 6px rgba(20, 172, 172, .64);'>" + level + "</span><br><br>";
    while (true) {
        cnt = 0, l = snakeArea.length;
        theFood = subSquares[Math.floor(Math.random() * sizeOfGame)][Math.floor(Math.random() * sizeOfGame)];
        for (var n = 0; n < l; n++) {
            if (snakeArea[n] == theFood) {
                cnt++;
                break;
            }
        }
        if (cnt == 0) {
            theFood.style.backgroundColor = "crimson";
            theFood.style.borderRadius = "50%";
            break;
        }
    }
}
function gameWon() {
    currentMovement = "gameover";
    gameWonSound.play();
    clearInterval(myInterval);
    clearInterval(myInterval2);
    if (localStorage.getItem("bestScore") != null) {
        message.innerHTML = "<h1>CONGRATULATIONS! YOU WON!</h1><h2><span style='color: rgb(204, 204, 204);'>Score:</span> " + points + ".</h2><span style='color: rgb(204, 204, 204);'>Previous best score: <b>" + localStorage.getItem("bestScore") + ".</b></span><br><br>";
        localStorage.removeItem("bestScore");
        localStorage.setItem("bestScore", points);
    }
    else {
        message.innerHTML = "<h1>CONGRATULATIONS! YOU WON!</h1><h2><span style='color: rgb(204, 204, 204);'>Score:</span> " + points + ".</h2><span style='color: rgb(204, 204, 204);'>There is no previous best score.</span><br><br>";
        localStorage.setItem("bestScore", points);
    }
    var i = snakeArea.length - 1;
    var gameWonInterval = setInterval(() => {
        snakeArea[i].style.backgroundColor = "crimson";
        i--;
        if (i < 0) {
            clearInterval(gameWonInterval);
            document.body.appendChild(gameOverDiv);
        }
    }, (i / 8));
}
function gameOver() {
    currentMovement = "gameover";
    ouhSound.play();
    clearInterval(myInterval);
    clearInterval(myInterval2);
    if (localStorage.getItem("bestScore") != null) {
        if (localStorage.getItem("bestScore") < points) {
            message.innerHTML = "<h1>NEW BEST SCORE!</h1><h2><span style='color: rgb(204, 204, 204);'>Score:</span> " + points + ".</h2><span style='color: rgb(204, 204, 204);'>Previous best score: <b>" + localStorage.getItem("bestScore") + ".</b></span><br><br>";
            localStorage.removeItem("bestScore");
            localStorage.setItem("bestScore", points);
        }
        else message.innerHTML = "<h1>GAME OVER</h1><h2><span style='color: rgb(204, 204, 204);'>Score:</span> " + points + ".</h2><span style='color: rgb(204, 204, 204);'>Best score: <b>" + localStorage.getItem("bestScore") + ".</b></span><br><br>";
    }
    else {
        message.innerHTML = "<h1>GAME OVER</h1><h2><span style='color: rgb(204, 204, 204);'>Score:</span> " + points + ".</h2><span style='color: rgb(204, 204, 204);'>There is no previous best score.</span><br><br>";
        localStorage.setItem("bestScore", points);
    }
    var i = snakeArea.length - 1;
    var gameOverInterval = setInterval(() => {
        snakeArea[i].style.backgroundColor = "transparent";
        snakeArea[i].innerHTML = "";
        i--;
        if (i < 0) {
            clearInterval(gameOverInterval);
            theFood.style.backgroundColor = "transparent";
            document.body.appendChild(gameOverDiv);
        }
    }, i);
}