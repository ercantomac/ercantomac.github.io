var newData, loadingIcon = document.createElement("div"), loadingInner = document.createElement("div");
loadingIcon.className = "loading", loadingInner.className = "innerDiv", loadingInner.innerHTML = "X";
loadingIcon.appendChild(loadingInner);
function multiplayerSetup() {
    playerWinCount = 0;
    cpuWinCount = 0;
    resultScreen.innerHTML = "<br><br>";
    buttonHolder.style = "display: flex; display: -webkit-flex; align-items: center; justify-content: center;";
    buttonHolder.innerHTML = "";
    resultScreen.appendChild(nameInput);
    resultScreen.insertAdjacentHTML("beforeend", "<br>");
    buttonHolder.appendChild(submitButton);
    buttonHolder.insertAdjacentHTML("beforeend", "&nbsp;&nbsp;&nbsp;&nbsp;");
    cancel.innerHTML = "BACK";
    buttonHolder.appendChild(cancel);
    resultScreen.appendChild(buttonHolder);
    cancel.onclick = function () {
        clickSound.play();
        opacityAnimation(nameInput, "0", 0, 600);
        opacityAnimation(buttonHolder, "0", 0, 600);
        setTimeout(() => {
            playModeSelection();
            cancel.setAttribute("onclick", "clickSound.play(); playModeSelection();");
            cancel.innerHTML = "CANCEL";
            buttonHolder.style = "";
        }, 600);
    }
    submitButton.onclick = function () {
        clickSound.play();
        if (nameInput.value != "") {
            opacityAnimation(nameInput, "0", 0, 600);
            opacityAnimation(buttonHolder, "0", 0, 600);
            setTimeout(() => {
                theName = nameInput.value;
                newData = {
                    userName: theName,
                    ready: "0"
                };
                setPlayers();
                buttonHolder.style = "";
            }, 600);
        }
    }
    nameInput.animate([
        { transform: "scale(0)" },
        { transform: "scale(1)" }
    ], {
        duration: 1000,
        easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
        fill: "forwards"
    });
    opacityAnimation(nameInput, ".1", 0, 1000);
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

function setPlayers() {
    turnLabel.style.display = "inline-block";
    if (turnLabel.style.opacity != "1" && gameCount != 0) {
        turnLabel.animate([
            { transform: "scale(1)" }
        ], {
            fill: "forwards"
        });
        turnLabel.animate([
            { opacity: "1" }
        ], {
            fill: "forwards"
        });
    }
    player_1.child("userName").get().then(function (snapshot) {
        if (snapshot.val().toString() == "null") {
            player_1.update(newData);
            player_1.child("id").get().then(function (snapshot) {
                myPlayerNo = snapshot.val().toString();
            });
            waitingScreen();
            player_2.once("child_changed", changed2 => {
                beginningScreen("player_2", 0, 0, 0, 0, 0);
            });
        }
        else {
            player_2.child("userName").get().then(function (snapshot) {
                if (snapshot.val().toString() == "null") {
                    player_2.update(newData);
                    player_2.child("id").get().then(function (snapshot) {
                        myPlayerNo = snapshot.val().toString();
                    });
                    beginningScreen("player_1", 0, 0, 0, 0, 0);
                }
            });
        }
    });
}

function databaseCleaner() {
    var clear = {
        cellNo: "null",
        userName: "null",
        ready: "1"
    }
    if (myPlayerNo == "player_1") {
        player_1.update(clear);
        player_2.off();
    }
    else if (myPlayerNo == "player_2") {
        player_2.update(clear);
        player_1.off();
    }
    myPlayerNo = 0;
}

function waitingScreen() {
    resultScreen.style.animation = "waiting 2.7s ease 0s infinite alternate forwards";
    resultScreen.style.webkitAnimation = "waiting 2.7s ease 0s infinite alternate forwards";
    resultScreen.innerHTML = "<br><br>Waiting for an opponent...<br><br>";
    resultScreen.appendChild(loadingIcon);
    resultScreen.insertAdjacentHTML("beforeend", "<br><br>");
    cancel.setAttribute("onclick", "clickSound.play(); playModeSelection();");
    cancel.innerHTML = "CANCEL";
    resultScreen.appendChild(cancel);
    resultScreen.style.transition = "color .7s ease, text-shadow .7s ease";
    resultScreen.style.color = "rgba(0, 0, 0, .72)";
    resultScreen.style.textShadow = ".15vh .3vh .3vh rgba(0, 0, 0, .36)";
    cancel.animate([
        { transform: "scale(0)" },
        { transform: "scale(1)" }
    ], {
        duration: 700,
        easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
        fill: "forwards"
    });
    opacityAnimation(cancel, ".1", 0, 700);
}

function beginningScreen(playerName, a, b, c, winner, theType) {
    var thePlayer = ((playerName == "player_1") ? player_1 : player_2), opponentPlayer = ((playerName == "player_1") ? player_2 : player_1);
    /*if (theType == 0) {
        opponentPlayer.child("id").get().then(function (snapshot) {
            myPlayerNo = snapshot.val().toString();
        });
    }*/
    currentPlayer = ((playerName == "player_1") ? "cpu" : "player");
    turnLabelInner.innerHTML = ((playerName == "player_2") ? "YOUR TURN" : "OPPONENT'S TURN");
    turnLabel.animate([
        { backgroundColor: ((playerName == "player_2") ? "rgba(0, 0, 0, .36)" : "rgba(255, 255, 255, .16)") }
    ], {
        fill: "forwards"
    });
    turnLabelInner.style.color = ((playerName == "player_2") ? "rgba(255, 255, 255, .64)" : "rgba(0, 0, 0, .72)");
    turnLabel.style.boxShadow = ((playerName == "player_2") ? "inset .1875vw .1875vw .3125vw rgba(0, 0, 0, .72)" : "inset -.1875vw -.1875vw .1875vw rgba(255, 255, 255, .21), inset .1875vw .1875vw .3125vw rgba(0, 0, 0, .72)");
    thePlayer.on("child_changed", changed => {
        thePlayer.child("cellNo").get().then(function (snapshot) {
            if (snapshot.val().toString() != "null") opponentMoveSimulator(snapshot.val());
        });
        opponentLeft(thePlayer);
    });
    resultScreen.style.animation = "none";
    resultScreen.style.webkitAnimation = "none";
    resultScreen.style.transition = "color .7s ease, text-shadow .7s ease";
    thePlayer.child("userName").get().then(function (snapshot) {
        player_2_name = snapshot.val().toString();
        document.getElementById("header").innerHTML = "TIC-TAC-TOE<br><span style='font-size: 2vh; font-weight: 500;'>" + player_2_name + "</span>";
        resultScreen.innerHTML = "<br><br>GAME IS BEGINNING.<br><br>Opponent: " + snapshot.val().toString();
        resultScreen.style.color = "rgba(0, 0, 0, .72)";
        resultScreen.style.textShadow = ".15vh .3vh .3vh rgba(0, 0, 0, .36)";
    });
    opacityAnimation(resultScreen, "0", 1400, 600);
    setTimeout(() => {
        document.body.removeChild(resultScreen);
        if (theType == 1) {
            opponentPlayer.update({ ready: "0" });
            thePlayer.off();
            thePlayer.on("child_changed", changed => {
                thePlayer.child("cellNo").get().then(function (snapshot) {
                    if (snapshot.val().toString() != "null") opponentMoveSimulator(snapshot.val());
                });
                opponentLeft(thePlayer);
            });
            if (winner == "win") {
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
            }
            tmp = [[0, 1, 2], [3, 4, 5], [6, 7, 8]], myCounter = 0;
            setTimeout(() => {
                for (var i = 0; i < 9; i++) {
                    myInnerDivs[i].innerHTML = "&nbsp;";
                }
            }, ((winner == "win") ? 600 : 0));
        }
        else {
            if (gameCount == 0) onloadAnimation();
        }
    }, 2000);
}

function multiPlayAgain(a, b, c, winner) {
    if (myPlayerNo == "player_1") {
        player_1.update({ ready: "1", cellNo: "null" });
        player_2.child("ready").get().then(function (snapshot) {
            if (snapshot.val().toString() != "1") {
                waitingScreen();
                player_2.on("child_changed", changed => {
                    player_2.child("ready").get().then(function (snapshot) {
                        if (snapshot.val().toString() == "1") {
                            beginningScreen("player_2", a, b, c, winner, 1);
                        }
                    });
                });
            }
            else {
                beginningScreen("player_2", a, b, c, winner, 1);
            }
        });
    }
    else {
        player_2.update({ ready: "1", cellNo: "null" });
        player_1.child("ready").get().then(function (snapshot) {
            if (snapshot.val().toString() != "1") {
                waitingScreen();
                player_1.on("child_changed", changed => {
                    player_1.child("ready").get().then(function (snapshot) {
                        if (snapshot.val().toString() == "1") {
                            beginningScreen("player_1", a, b, c, winner, 1);
                        }
                    });
                });
            }
            else {
                beginningScreen("player_1", a, b, c, winner, 1);
            }
        });
    }
}

function opponentLeft(thePlayer) {
    thePlayer.child("userName").get().then(function (snapshot) {
        if (snapshot.val().toString() == "null") {
            resultScreen.style.transition = "none";
            resultScreen.style.color = "transparent";
            resultScreen.style.textShadow = ".15vh .3vh .3vh rgba(0, 0, 0, 0)";
            resultScreen.style.transition = "color .7s ease, text-shadow .7s ease";
            changeMode.animate([
                { opacity: "0" }
            ], {
                fill: "forwards"
            });
            resultScreen.innerHTML = "<br><br><br>OPPONENT LEFT THE GAME.<br><br>";
            resultScreen.appendChild(changeMode);
            changeMode.onclick = function () {
                clickSound.play();
                resultScreen.style.color = "transparent";
                resultScreen.style.textShadow = ".15vh .3vh .3vh rgba(0, 0, 0, 0)";
                opacityAnimation(changeMode, "0", 0, 700);
                tmp = [[0, 1, 2], [3, 4, 5], [6, 7, 8]], currentPlayer = "player", myCounter = 0;
                setTimeout(() => {
                    for (var i = 0; i < 9; i++) {
                        myInnerDivs[i].innerHTML = "&nbsp;";
                    }
                    playModeSelection();
                    changeMode.animate([
                        { opacity: "1" }
                    ], {
                        fill: "forwards"
                    });
                }, 700);
            }
            document.body.appendChild(resultScreen);
            opacityAnimation(resultScreen, "1", 0, 600);
            setTimeout(() => {
                resultScreen.style.color = "rgba(0, 0, 0, .72)";
                resultScreen.style.textShadow = ".15vh .3vh .3vh rgba(0, 0, 0, .36)";
                opacityAnimation(changeMode, "1", 0, 700);
            }, 600);
        }
    });
}
