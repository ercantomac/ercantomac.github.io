var myCells = [], myInnerDivs = [], myMainDiv = document.getElementById("mainDiv"), myHeader = document.getElementById("header"), backgroundButton = document.getElementById("backgroundButton"), resultScreen = document.createElement("div"), normal = document.createElement("button"), impossible = document.createElement("button"), playAgain = document.createElement("button"), changeDifficulty = document.createElement("button"), singlePlayer = document.createElement("button"), multiPlayer = document.createElement("button"), changeMode = document.createElement("button"), cancel = document.createElement("button"), submitButton = document.createElement("button"), buttonHolder = document.createElement("div"), scoreBoard = document.createElement("div"), nameInput = document.createElement("input"), turnLabel = document.getElementById("turnLabel"), turnLabelInner = document.getElementById("turnLabelInner"), difficulty, myCounter, playerWinCount = 0, cpuWinCount = 0, gameCount = 0, playMode;
var chalkSound = new Audio("chalk.wav"), winSound = new Audio("winning.mp3"), loseSound = new Audio("losing.mp3"), drawSound = new Audio("draw.mp3"), clickSound = new Audio("click.mp3");
var backgrounds = ["linear-gradient(135deg, #A445B2 0%, #D41872 50%, #FF0066 100%)", "linear-gradient(135deg, #7742B2 0%, #F180FF 50%, #FD8BD9 100%)", "linear-gradient(135deg, #b3ffab 0%, #12fff7 100%)", "linear-gradient(135deg, #FAD961 0%, #F76B1C 100%)", "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", "linear-gradient(135deg, #00bf8f, #001510)", "linear-gradient(135deg, #D4FFEC 0%, #57F2CC 50%, #4596FB 100%)"], bckgrndCnt;
var tmp = [[0, 1, 2], [3, 4, 5], [6, 7, 8]], cpuCell, whoStarted = 'E', currentPlayer = "player", playerSign = "X", cpuSign = "O";
var myPlayerNo = 0, theName, player_2_name;
for (var i = 0; i < 9; i++) {
    myCells[i] = document.getElementById("cell_" + i);
    myInnerDivs[i] = document.createElement("div");
    myInnerDivs[i].className = "myInnerDivs";
    myInnerDivs[i].innerHTML = "&nbsp;";
    myCells[i].appendChild(myInnerDivs[i]);
}
resultScreen.className = "resultScreen", scoreBoard.className = "scoreBoard";
normal.innerHTML = "NORMAL", normal.className = "backgroundButton";
impossible.innerHTML = "IMPOSSIBLE", impossible.className = "backgroundButton";
playAgain.innerHTML = "PLAY AGAIN", playAgain.className = "backgroundButton";
changeDifficulty.innerHTML = "CHANGE DIFFICULTY", changeDifficulty.className = "backgroundButton";
singlePlayer.innerHTML = "SINGLE PLAYER", singlePlayer.className = "backgroundButton";
multiPlayer.innerHTML = "MULTIPLAYER", multiPlayer.className = "backgroundButton";
changeMode.innerHTML = "CHANGE MODE", changeMode.className = "backgroundButton";
cancel.innerHTML = "CANCEL", cancel.className = "backgroundButton";
cancel.setAttribute("onclick", "clickSound.play(); playModeSelection();");
submitButton.innerHTML = "SUBMIT", submitButton.className = "backgroundButton";
nameInput.type = "text", nameInput.placeholder = "Enter your name.", nameInput.className = "nameInput";
backgroundButton.style.transform = "scale(0)", backgroundButton.style.opacity = ".1";
singlePlayer.onclick = function () {
    clickSound.play();
    playMode = "single";
    multiPlayer.animate([
        { transform: "scale(1)" },
        { transform: "scale(0)" }
    ], {
        duration: 600,
        easing: "ease",
        fill: "forwards"
    });
    opacityAnimation(singlePlayer, "0", 600, 600);
    setTimeout(() => {
        difficultySelection();
        multiPlayer.animate([
            { transform: "scale(1)" }
        ], {
            fill: "forwards"
        });
        singlePlayer.animate([
            { opacity: "1" }
        ], {
            fill: "forwards"
        });
    }, 1200);
}
multiPlayer.onclick = function () {
    clickSound.play();
    playMode = "multi";
    singlePlayer.animate([
        { transform: "scale(1)" },
        { transform: "scale(0)" }
    ], {
        duration: 600,
        easing: "ease",
        fill: "forwards"
    });
    opacityAnimation(multiPlayer, "0", 600, 600);
    setTimeout(() => {
        resultScreen.innerHTML = "";
        multiplayerSetup();
        singlePlayer.animate([
            { transform: "scale(1)" }
        ], {
            fill: "forwards"
        });
        multiPlayer.animate([
            { opacity: "1" }
        ], {
            fill: "forwards"
        });
    }, 1200);
}
normal.onclick = function () {
    clickSound.play();
    difficulty = "normal";
    document.getElementById("header").innerHTML = "TIC-TAC-TOE<br><span style='font-size: 2vh; font-weight: 500;'>NORMAL</span>";
    impossible.animate([
        { transform: "scale(1)" },
        { transform: "scale(0)" }
    ], {
        duration: 600,
        easing: "ease",
        fill: "forwards"
    });
    cancel.animate([
        { transform: "scale(1)" },
        { transform: "scale(0)" }
    ], {
        duration: 600,
        easing: "ease",
        fill: "forwards"
    });
    opacityAnimation(normal, "0", 600, 600);
    setTimeout(() => {
        signSelection();
        buttonHolder.animate([
            { transform: "scale(1)" }
        ], {
            fill: "forwards"
        });
        impossible.animate([
            { transform: "scale(1)" }
        ], {
            fill: "forwards"
        });
        cancel.animate([
            { transform: "scale(1)" }
        ], {
            fill: "forwards"
        });
        normal.animate([
            { opacity: "1" }
        ], {
            fill: "forwards"
        });
    }, 1200);
}
impossible.onclick = function () {
    clickSound.play();
    difficulty = "impossible";
    document.getElementById("header").innerHTML = "TIC-TAC-TOE<br><span style='font-size: 2vh; font-weight: 500;'>IMPOSSIBLE</span>";
    normal.animate([
        { transform: "scale(1)" },
        { transform: "scale(0)" }
    ], {
        duration: 600,
        easing: "ease",
        fill: "forwards"
    });
    cancel.animate([
        { transform: "scale(1)" },
        { transform: "scale(0)" }
    ], {
        duration: 600,
        easing: "ease",
        fill: "forwards"
    });
    opacityAnimation(impossible, "0", 600, 600);
    setTimeout(() => {
        signSelection();
        buttonHolder.animate([
            { transform: "scale(1)" }
        ], {
            fill: "forwards"
        });
        normal.animate([
            { transform: "scale(1)" }
        ], {
            fill: "forwards"
        });
        cancel.animate([
            { transform: "scale(1)" }
        ], {
            fill: "forwards"
        });
        impossible.animate([
            { opacity: "1" }
        ], {
            fill: "forwards"
        });
    }, 1200);
}

function opacityAnimation(theElement, a, theDelay, theDuration) {
    theElement.animate([
        { opacity: ((a == ".1") ? ".1" : ((a == "0") ? "1" : "0")) },
        { opacity: ((a == "0") ? "0" : "1") }
    ], {
        duration: theDuration,
        easing: ((a == ".1") ? "linear" : "ease"),
        fill: "forwards",
        delay: theDelay
    });
}

function playModeSelection() {
    tmp = [[0, 1, 2], [3, 4, 5], [6, 7, 8]], currentPlayer = "player", myCounter = 0;
    for (var i = 0; i < 9; i++) {
        myInnerDivs[i].animate([
            { transform: "scale(0)" }
        ], {
            fill: "forwards"
        });
        myInnerDivs[i].innerHTML = "&nbsp;";
    }
    if (playMode == "multi") databaseCleaner();
    resultScreen.style.color = "transparent";
    resultScreen.style.textShadow = ".15vh .3vh .3vh rgba(0, 0, 0, 0)";
    document.body.style.backgroundImage = ((localStorage.getItem("currentBackground") == null) ? backgrounds[0] : localStorage.getItem("currentBackground"));
    bckgrndCnt = ((localStorage.getItem("bckgrndCnt") == null) ? 0 : localStorage.getItem("bckgrndCnt"));
    myCounter = 0;
    resultScreen.innerHTML = "<br><br><br><br><br><br>";
    buttonHolder.innerHTML = "";
    buttonHolder.appendChild(singlePlayer);
    buttonHolder.insertAdjacentHTML("beforeend", "<br><br>");
    buttonHolder.appendChild(multiPlayer);
    buttonHolder.animate([
        { transform: "scale(0)" }
    ], {
        fill: "forwards"
    });
    buttonHolder.animate([
        { opacity: "0" }
    ], {
        fill: "forwards"
    });
    resultScreen.appendChild(buttonHolder);
    document.body.appendChild(resultScreen);
    buttonHolder.animate([
        { transform: "scale(0)" },
        { transform: "scale(1)" }
    ], {
        duration: 1000,
        easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
        fill: "forwards"
    });
    opacityAnimation(buttonHolder, ".1", 0, 1000);
}

function difficultySelection() {
    resultScreen.style.animation = "none";
    resultScreen.style.webkitAnimation = "none";
    turnLabel.style.display = "none";
    myCounter = 0;
    resultScreen.innerHTML = "<br><br><br><br><br><br>";
    buttonHolder.innerHTML = "";
    buttonHolder.appendChild(normal);
    buttonHolder.insertAdjacentHTML("beforeend", "<br><br>");
    buttonHolder.appendChild(impossible);
    cancel.innerHTML = "BACK";
    buttonHolder.insertAdjacentHTML("beforeend", "<br><br><br><br>");
    buttonHolder.appendChild(cancel);
    cancel.onclick = function () {
        clickSound.play();
        opacityAnimation(buttonHolder, "0", 0, 600);
        setTimeout(() => {
            playModeSelection();
            cancel.setAttribute("onclick", "clickSound.play(); playModeSelection();");
            cancel.innerHTML = "CANCEL";
        }, 600);
    }
    buttonHolder.animate([
        { transform: "scale(0)" }
    ], {
        fill: "forwards"
    });
    buttonHolder.animate([
        { opacity: "0" }
    ], {
        fill: "forwards"
    });
    resultScreen.appendChild(buttonHolder);
    buttonHolder.animate([
        { transform: "scale(0)" },
        { transform: "scale(1)" }
    ], {
        duration: 1000,
        easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
        fill: "forwards"
    });
    opacityAnimation(buttonHolder, ".1", 0, 1000);
}

function onloadAnimation() {
    gameCount++;
    resultScreen.innerHTML = "";
    resultScreen.style.backdropFilter = "blur(8px)";
    resultScreen.style.webkitBackdropFilter = "blur(8px)";
    myMainDiv.animate([
        { transform: "scale(0)" },
        { transform: "scale(1)" }
    ], {
        duration: 1200,
        easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
        fill: "forwards"
    });
    opacityAnimation(myMainDiv, ".1", 0, 1200);
    myHeader.animate([
        { transform: "scale(0)" },
        { transform: "scale(1)" }
    ], {
        duration: 1000,
        easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
        fill: "forwards",
        delay: 1200
    });
    opacityAnimation(myHeader, ".1", 1200, 1000);
    backgroundButton.animate([
        { transform: "scale(0)" },
        { transform: "scale(1)" }
    ], {
        duration: 1000,
        easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
        fill: "forwards",
        delay: 1200
    });
    opacityAnimation(backgroundButton, ".1", 1200, 1000);
    if (turnLabel.style.display != "none") {
        turnLabel.animate([
            { transform: "scale(0)" },
            { transform: "scale(1)" }
        ], {
            duration: 1000,
            easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
            fill: "forwards",
            delay: 1200
        });
        opacityAnimation(turnLabel, ".1", 1200, 1000);
    }
}

function signSelection() {
    var xSign = document.createElement("div"), oSign = document.createElement("div");
    xSign.style = "font-size: 12vh; font-weight: normal; -webkit-text-stroke: 1px rgba(0, 0, 0, .72); color: rgba(0, 0, 0, .36); transform: scale(0); opacity: .1;", xSign.innerHTML = "X", oSign.style = "font-size: 12vh; font-weight: normal; -webkit-text-stroke: 1px rgba(255, 255, 255, .72); color: rgba(255, 255, 255, .36); transform: scale(0); opacity: .1;", oSign.innerHTML = "O";
    xSign.onclick = function () {
        clickSound.play();
        playerSign = "X"; cpuSign = "O";
        oSign.animate([
            { transform: "scale(1)" },
            { transform: "scale(0)" }
        ], {
            duration: 600,
            easing: "ease",
            fill: "forwards"
        });
        opacityAnimation(resultScreen, "0", 600, 600);
        setTimeout(() => {
            oSign.animate([
                { transform: "scale(1)" }
            ], {
                fill: "forwards"
            });
            document.body.removeChild(resultScreen);
            if (gameCount == 0) onloadAnimation();
        }, 1200);
    }
    oSign.onclick = function () {
        clickSound.play();
        playerSign = "O"; cpuSign = "X";
        xSign.animate([
            { transform: "scale(1)" },
            { transform: "scale(0)" }
        ], {
            duration: 600,
            easing: "ease",
            fill: "forwards"
        });
        opacityAnimation(resultScreen, "0", 600, 600);
        setTimeout(() => {
            oSign.animate([
                { transform: "scale(1)" }
            ], {
                fill: "forwards"
            });
            document.body.removeChild(resultScreen);
            if (gameCount == 0) onloadAnimation();
        }, 1200);
    }
    resultScreen.innerHTML = "<br><br><br><br><br><br>";
    resultScreen.appendChild(xSign);
    resultScreen.appendChild(oSign);
    xSign.animate([
        { transform: "scale(0)" },
        { transform: "scale(1)" }
    ], {
        duration: 1000,
        easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
        fill: "forwards"
    });
    opacityAnimation(xSign, ".1", 0, 1000);
    oSign.animate([
        { transform: "scale(0)" },
        { transform: "scale(1)" }
    ], {
        duration: 1000,
        easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
        fill: "forwards"
    });
    opacityAnimation(oSign, ".1", 0, 1000);
}

function buttonHandler(a) {
    if (myInnerDivs[a].innerHTML == "&nbsp;" && currentPlayer == "player") {
        currentPlayer = "cpu";
        myCounter++;
        if (playMode == "single") {
            myInnerDivs[a].innerHTML = playerSign;
            myInnerDivs[a].style.webkitTextStroke = ((playerSign == "O") ? "1px rgba(255, 255, 255, .72)" : "1px rgba(0, 0, 0, .72)");
        }
        else {
            myInnerDivs[a].innerHTML = "O";
            myInnerDivs[a].style.webkitTextStroke = "1px rgba(255, 255, 255, .72)";
        }
        myInnerDivs[a].animate([
            { color: "transparent" },
            { color: ((playMode == "single") ? ((playerSign == "O") ? "rgba(255, 255, 255, .36)" : "rgba(0, 0, 0, .36)") : "rgba(255, 255, 255, .36)") }
        ], {
            duration: 600,
            easing: "linear",
            fill: "forwards"
        });
        myInnerDivs[a].animate([
            { transform: "scale(0)" },
            { transform: "scale(1)" }
        ], {
            duration: 600,
            easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
            fill: "forwards"
        });
        tmp[((a > 5) ? 2 : ((a > 2 && a <= 5) ? 1 : 0))][(a % 3)] = 'X';
        setTimeout(() => {
            winner('X');
        }, 500);
        if (playMode == "multi") {
            if (myPlayerNo == "player_1") player_1.update({ cellNo: a });
            else if (myPlayerNo == "player_2") player_2.update({ cellNo: a });
        }
    }
    else {
        myInnerDivs[a].animate([
            { transform: "translateX(0)" },
            { transform: "translateX(2px)" },
            { transform: "translateX(-2px)" },
            { transform: "translateX(2px)" },
            { transform: "translateX(-2px)" },
            { transform: "translateX(2px)" },
            { transform: "translateX(0)" }
        ], {
            duration: 500,
            easing: "linear",
            fill: "forwards"
        });
        window.navigator.vibrate(60);
    }
}

function opponentMoveSimulator(a) {
    tmp[((a > 5) ? 2 : ((a > 2 && a <= 5) ? 1 : 0))][(a % 3)] = 'O';
    myCounter++;
    myInnerDivs[a].innerHTML = "X";
    myInnerDivs[a].style.webkitTextStroke = "1px rgba(0, 0, 0, .72)";
    myInnerDivs[a].animate([
        { color: "transparent" },
        { color: "rgba(0, 0, 0, .36)" }
    ], {
        duration: 600,
        easing: "linear",
        fill: "forwards"
    });
    myInnerDivs[a].animate([
        { transform: "scale(0)" },
        { transform: "scale(1)" }
    ], {
        duration: 600,
        easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
        fill: "forwards"
    });
    chalkSound.play();
    setTimeout(() => {
        winner('O');
    }, 500);
}

function winningAnimation(a, b, c, winner) {
    resultScreen.style.transition = "none";
    resultScreen.style.color = "transparent";
    resultScreen.style.textShadow = ".15vh .3vh .3vh rgba(0, 0, 0, 0)";
    resultScreen.style.transition = "color .7s ease, text-shadow .7s ease";
    if (winner == 'X') playerWinCount++;
    else cpuWinCount++;
    scoreBoard.innerHTML = ((playMode == "single") ? "COMPUTER" : player_2_name) + ": <span style='font-weight: 700;'>" + cpuWinCount + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;YOU: <span style='font-weight: 700;'>" + playerWinCount + "</span>";
    resultScreen.innerHTML = ((winner == 'X') ? "<br><br><br>CONGRATULATIONS!<br>YOU WON.<br><br>" : ((playMode == "single") ? "<br><br><br>COMPUTER WON.<br><br>" : "<br><br><br>" + player_2_name + " WON.<br><br>"));
    scoreBoard.animate([
        { opacity: "0" }
    ], {
        fill: "forwards"
    });
    buttonHolder.animate([
        { opacity: "0" }
    ], {
        fill: "forwards"
    });
    buttonHolder.innerHTML = "";
    buttonHolder.appendChild(playAgain);
    buttonHolder.insertAdjacentHTML("beforeend", "<br><br>");
    if (playMode == "single") {
        buttonHolder.appendChild(changeDifficulty);
        buttonHolder.insertAdjacentHTML("beforeend", "<br><br>");
    }
    buttonHolder.appendChild(changeMode);
    resultScreen.appendChild(scoreBoard);
    resultScreen.insertAdjacentHTML("beforeend", "<br><br>");
    resultScreen.appendChild(buttonHolder);
    document.body.appendChild(resultScreen);
    if (playMode == "multi") {
        if (myPlayerNo == "player_1") player_2.off();
        else if (myPlayerNo == "player_2") player_1.off();
    }
    setTimeout(() => {
        for (var i = 0; i < 9; i++) {
            if (i != a && i != b && i != c) {
                myInnerDivs[i].animate([
                    { transform: "scale(1)" },
                    { transform: "scale(0)" }
                ], {
                    duration: 600,
                    easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
                    fill: "forwards"
                });
            }
        }
        setTimeout(() => {
            if (winner == 'X') winSound.play();
            else loseSound.play();
            for (var i = 0; i < 9; i++) {
                if (i == a || i == b || i == c) {
                    myInnerDivs[i].animate([
                        { transform: "scale(1)" },
                        { transform: "scale(1.25)" }
                    ], {
                        duration: 600,
                        easing: "ease",
                        fill: "forwards"
                    });
                    myInnerDivs[i].animate([
                        { color: ((playMode == "single") ? ((winner == 'X') ? ((playerSign == "O") ? "rgba(255, 255, 255, .36)" : "rgba(0, 0, 0, .36)") : ((playerSign == "O") ? "rgba(0, 0, 0, .36)" : "rgba(255, 255, 255, .36)")) : ((winner == 'X') ? "rgba(255, 255, 255, .36)" : "rgba(0, 0, 0, .36)")) },
                        { color: ((playMode == "single") ? ((winner == 'X') ? ((playerSign == "O") ? "rgba(255, 255, 255, .54)" : "rgba(0, 0, 0, .54)") : ((playerSign == "O") ? "rgba(0, 0, 0, .54)" : "rgba(255, 255, 255, .54)")) : ((winner == 'X') ? "rgba(255, 255, 255, .54)" : "rgba(0, 0, 0, .54)")) }
                    ], {
                        duration: 600,
                        easing: "linear",
                        fill: "forwards"
                    });
                    myInnerDivs[i].animate([
                        { transform: "scale(1.25) translateX(0)" },
                        { transform: "scale(1.25) translateX(2px)" },
                        { transform: "scale(1.25) translateX(-2px)" },
                        { transform: "scale(1.25) translateX(2px)" },
                        { transform: "scale(1.25) translateX(-2px)" },
                        { transform: "scale(1.25) translateX(2px)" },
                        { transform: "scale(1.25) translateX(0)" }
                    ], {
                        duration: 500,
                        easing: "linear",
                        fill: "forwards",
                        delay: 500
                    });
                }
            }
            opacityAnimation(resultScreen, "1", 1100, 600);
            setTimeout(() => {
                resultScreen.style.color = "rgba(0, 0, 0, .72)";
                resultScreen.style.textShadow = ".15vh .3vh .3vh rgba(0, 0, 0, .36)";
                opacityAnimation(scoreBoard, "1", 0, 700);
                opacityAnimation(buttonHolder, "1", 0, 700);
                playAgain.onclick = function () {
                    clickSound.play();
                    if (playMode == "multi") {
                        resultScreen.style.color = "transparent";
                        resultScreen.style.textShadow = ".15vh .3vh .3vh rgba(0, 0, 0, 0)";
                        opacityAnimation(scoreBoard, "0", 0, 700);
                        opacityAnimation(buttonHolder, "0", 0, 700);
                        setTimeout(() => {
                            multiPlayAgain(a, b, c, "win");
                        }, 700);
                    }
                    else {
                        opacityAnimation(resultScreen, "0", 0, 600);
                        setTimeout(() => {
                            document.body.removeChild(resultScreen);
                            for (var i = 0; i < 9; i++) {
                                if (i == a || i == b || i == c) {
                                    myInnerDivs[i].animate([
                                        { transform: "scale(1.25)" },
                                        { transform: "scale(0)" }
                                    ], {
                                        duration: 600,
                                        easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
                                        fill: "forwards"
                                    });
                                }
                            }
                            tmp = [[0, 1, 2], [3, 4, 5], [6, 7, 8]], currentPlayer = "player", myCounter = 0;
                            setTimeout(() => {
                                for (var i = 0; i < 9; i++) {
                                    myInnerDivs[i].innerHTML = "&nbsp;";
                                }
                            }, 600);
                        }, 600);
                    }
                }
                changeDifficulty.onclick = function () {
                    for (var i = 0; i < 9; i++) {
                        if (i == a || i == b || i == c) {
                            myInnerDivs[i].animate([
                                { transform: "scale(1.25)" },
                                { transform: "scale(0)" }
                            ], {
                                duration: 600,
                                easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
                                fill: "forwards"
                            });
                        }
                    }
                    changeDifficultyButtonClick();
                }
                changeMode.onclick = function () {
                    for (var i = 0; i < 9; i++) {
                        if (i == a || i == b || i == c) {
                            myInnerDivs[i].animate([
                                { transform: "scale(1.25)" },
                                { transform: "scale(0)" }
                            ], {
                                duration: 600,
                                easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
                                fill: "forwards"
                            });
                        }
                    }
                    changeModeButtonClick();
                }
            }, 1700);
        }, 500);
    }, ((winner == 'X') ? 0 : 500));
}

function winner(a) {
    resultScreen.style.transition = "none";
    resultScreen.style.color = "transparent";
    resultScreen.style.textShadow = ".15vh .3vh .3vh rgba(0, 0, 0, 0)";
    resultScreen.style.transition = "color .7s ease, text-shadow .7s ease";
    if (tmp[0][0] == a && tmp[0][1] == a && tmp[0][2] == a) winningAnimation(0, 1, 2, a);
    else if (tmp[0][0] == a && tmp[1][0] == a && tmp[2][0] == a) winningAnimation(0, 3, 6, a);
    else if (tmp[0][0] == a && tmp[1][1] == a && tmp[2][2] == a) winningAnimation(0, 4, 8, a);
    else if (tmp[0][2] == a && tmp[1][1] == a && tmp[2][0] == a) winningAnimation(2, 4, 6, a);
    else if (tmp[1][0] == a && tmp[1][1] == a && tmp[1][2] == a) winningAnimation(3, 4, 5, a);
    else if (tmp[0][1] == a && tmp[1][1] == a && tmp[2][1] == a) winningAnimation(1, 4, 7, a);
    else if (tmp[2][0] == a && tmp[2][1] == a && tmp[2][2] == a) winningAnimation(6, 7, 8, a);
    else if (tmp[0][2] == a && tmp[1][2] == a && tmp[2][2] == a) winningAnimation(2, 5, 8, a);
    else {
        if (myCounter == 9) {
            drawSound.play();
            scoreBoard.innerHTML = ((playMode == "single") ? "COMPUTER" : player_2_name) + ": <span style='font-weight: 700;'>" + cpuWinCount + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;YOU: <span style='font-weight: 700;'>" + playerWinCount + "</span>";
            resultScreen.innerHTML = "<br><br><br>DRAW.<br><br>";
            scoreBoard.animate([
                { opacity: "0" }
            ], {
                fill: "forwards"
            });
            buttonHolder.animate([
                { opacity: "0" }
            ], {
                fill: "forwards"
            });
            buttonHolder.innerHTML = "";
            buttonHolder.appendChild(playAgain);
            buttonHolder.insertAdjacentHTML("beforeend", "<br><br>");
            if (playMode == "single") {
                buttonHolder.appendChild(changeDifficulty);
                buttonHolder.insertAdjacentHTML("beforeend", "<br><br>");
            }
            buttonHolder.appendChild(changeMode);
            resultScreen.appendChild(scoreBoard);
            resultScreen.insertAdjacentHTML("beforeend", "<br><br>");
            resultScreen.appendChild(buttonHolder);
            document.body.appendChild(resultScreen);
            if (playMode == "multi") {
                if (myPlayerNo == "player_1") player_2.off();
                else if (myPlayerNo == "player_2") player_1.off();
            }
            for (var i = 0; i < 9; i++) {
                myInnerDivs[i].animate([
                    { transform: "scale(1)" },
                    { transform: "scale(0)" }
                ], {
                    duration: 600,
                    easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
                    fill: "forwards",
                    delay: 200
                });
            }
            opacityAnimation(resultScreen, "1", 700, 600);
            setTimeout(() => {
                resultScreen.style.color = "rgba(0, 0, 0, .72)";
                resultScreen.style.textShadow = ".15vh .3vh .3vh rgba(0, 0, 0, .36)";
                opacityAnimation(scoreBoard, "1", 0, 700);
                opacityAnimation(buttonHolder, "1", 0, 700);
                playAgain.onclick = function () {
                    clickSound.play();
                    if (playMode == "multi") {
                        resultScreen.style.color = "transparent";
                        resultScreen.style.textShadow = ".15vh .3vh .3vh rgba(0, 0, 0, 0)";
                        opacityAnimation(scoreBoard, "0", 0, 700);
                        opacityAnimation(buttonHolder, "0", 0, 700);
                        setTimeout(() => {
                            multiPlayAgain(0, 0, 0, "draw");
                        }, 700);
                    }
                    else {
                        opacityAnimation(resultScreen, "0", 0, 600);
                        setTimeout(() => {
                            document.body.removeChild(resultScreen);
                            tmp = [[0, 1, 2], [3, 4, 5], [6, 7, 8]], currentPlayer = "player", myCounter = 0;
                            for (var i = 0; i < 9; i++) {
                                myInnerDivs[i].innerHTML = "&nbsp;";
                            }
                        }, 600);
                    }
                }
                changeDifficulty.setAttribute("onclick", "changeDifficultyButtonClick();");
                changeMode.setAttribute("onclick", "changeModeButtonClick();");
            }, 1300);
        }
        else {
            if (a == 'O') {
                setTimeout(() => {
                    currentPlayer = "player";
                    turnLabel.animate([
                        { backgroundColor: "rgba(255, 255, 255, .16)" },
                        { backgroundColor: "rgba(0, 0, 0, .36)" }
                    ], {
                        duration: 800,
                        easing: "ease",
                        fill: "forwards"
                    });
                    turnLabelInner.animate([
                        { transform: "translateY(0)" },
                        { transform: "translateY(-150%)" }
                    ], {
                        duration: 400,
                        easing: "ease-in",
                        fill: "forwards"
                    });
                    turnLabelInner.animate([
                        { transform: "translateY(150%)" },
                        { transform: "translateY(0)" }
                    ], {
                        duration: 400,
                        easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
                        fill: "forwards",
                        delay: 400
                    });
                    setTimeout(() => {
                        turnLabelInner.innerHTML = "YOUR TURN";
                        turnLabelInner.style.color = "rgba(255, 255, 255, .64)";
                        turnLabel.style.boxShadow = "inset .1875vw .1875vw .3125vw rgba(0, 0, 0, .72)";
                    }, 400);
                }, 300);
            }
            else {
                if (playMode == "single") ai();
                else {
                    currentPlayer = "cpu";
                    turnLabel.animate([
                        { backgroundColor: "rgba(0, 0, 0, .36)" },
                        { backgroundColor: "rgba(255, 255, 255, .16)" }
                    ], {
                        duration: 800,
                        easing: "ease",
                        fill: "forwards"
                    });
                    turnLabelInner.animate([
                        { transform: "translateY(0)" },
                        { transform: "translateY(-150%)" }
                    ], {
                        duration: 400,
                        easing: "ease-in",
                        fill: "forwards"
                    });
                    turnLabelInner.animate([
                        { transform: "translateY(150%)" },
                        { transform: "translateY(0)" }
                    ], {
                        duration: 400,
                        easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
                        fill: "forwards",
                        delay: 400
                    });
                    setTimeout(() => {
                        turnLabelInner.innerHTML = "OPPONENT'S TURN";
                        turnLabelInner.style.color = "rgba(0, 0, 0, .72)";
                        turnLabel.style.boxShadow = "inset -.1875vw -.1875vw .1875vw rgba(255, 255, 255, .21), inset .1875vw .1875vw .3125vw rgba(0, 0, 0, .72)";
                    }, 400);
                }
            }
        }
    }
}

function changeDifficultyButtonClick() {
    clickSound.play();
    resultScreen.style.color = "transparent";
    resultScreen.style.textShadow = ".15vh .3vh .3vh rgba(0, 0, 0, 0)";
    opacityAnimation(scoreBoard, "0", 0, 700);
    opacityAnimation(buttonHolder, "0", 0, 700);
    tmp = [[0, 1, 2], [3, 4, 5], [6, 7, 8]], currentPlayer = "player", myCounter = 0;
    setTimeout(() => {
        for (var i = 0; i < 9; i++) {
            myInnerDivs[i].innerHTML = "&nbsp;";
        }
        difficultySelection();
    }, 700);
}

function changeModeButtonClick() {
    clickSound.play();
    resultScreen.style.color = "transparent";
    resultScreen.style.textShadow = ".15vh .3vh .3vh rgba(0, 0, 0, 0)";
    opacityAnimation(scoreBoard, "0", 0, 700);
    opacityAnimation(buttonHolder, "0", 0, 700);
    tmp = [[0, 1, 2], [3, 4, 5], [6, 7, 8]], currentPlayer = "player", myCounter = 0;
    setTimeout(() => {
        for (var i = 0; i < 9; i++) {
            myInnerDivs[i].innerHTML = "&nbsp;";
        }
        playModeSelection();
    }, 700);
}

function backgroundChanger() {
    clickSound.play();
    if (bckgrndCnt < 6) bckgrndCnt++;
    else bckgrndCnt = 0;
    document.body.style.backgroundImage = backgrounds[bckgrndCnt];
    localStorage.setItem("currentBackground", backgrounds[bckgrndCnt]);
    localStorage.setItem("bckgrndCnt", bckgrndCnt);
}
