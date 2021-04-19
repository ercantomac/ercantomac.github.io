var theBody, difficulty, accentColor, accentImage, main = new Array(9), myInputs = new Array(9), myButtons = new Array(9), currentButton = 0, n1, n2, n3, total, wrongs = 0, jokerCnt = 3, theValue, currentAccentColor;
var playAgain = document.createElement("button"), mistakeLabel = document.createElement("p"), jokerButton = document.createElement("div"), switchThemeButton = document.createElement("button");
var mainDivHolder = document.createElement("div"), myDivs = [document.createElement("div"), document.createElement("div"), document.createElement("div")];
var playAgainDiv = document.createElement("div"), confirmButton = document.createElement("button"), cancelButton = document.createElement("button");
var exitButton = document.createElement("button"), myErrorMessage = document.createElement("p"), errorWidth1, errorWidth2, correctSound = new Audio("correctSound.wav"), winSound = new Audio("AvengersTheme.mp3");
function generateSudoku() {
    var number, cnt, tryCounter = [];
    while (1) {
        total = 0;
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 3; j++) {
                for (var k = 0; k < 3; k++) main[i][j][k] = 10;
            }
        }
        for (var i = 0; i < 3; i++) {
            for (var n = 0; n < 3; n++) {
                for (var j = n; j < (n + 7); j += 3) {
                    for (var k = 0; k < 3; k++) {
                        tryCounter = [];
                        while (1) {
                            cnt = 0;
                            number = Math.floor(Math.random() * 9) + 1;
                            var l = tryCounter.length;
                            for (var a = 0; a < l; a++) {
                                if (number == tryCounter[a]) {
                                    cnt++;
                                    break;
                                }
                            }
                            if (cnt == 0) {
                                for (var a = 0; a < 3; a++) {
                                    for (var b = 0; b < 3; b++) {
                                        if (number == main[j][a][b]) {
                                            cnt++;
                                            tryCounter[tryCounter.length] = number;
                                            break;
                                        }
                                    }
                                    if (cnt != 0) break;
                                }
                                if (cnt == 0) {
                                    var x = ((n == 0) ? (j) : ((n == 1) ? (j - 1) : ((n == 2) ? (j - 2) : 0)));
                                    var z = ((n == 0) ? (j + 3) : ((n == 1) ? (j + 2) : ((n == 2) ? (j + 1) : 0)));
                                    for (var a = x; a < z; a++) {
                                        for (var b = 0; b < 3; b++) {
                                            if (number == main[a][k][b]) {
                                                cnt++;
                                                tryCounter[tryCounter.length] = number;
                                                break;
                                            }
                                        }
                                        if (cnt != 0) break;
                                    }
                                    if (cnt == 0) {
                                        for (var a = n; a < (n + 7); a += 3) {
                                            for (var b = 0; b < 3; b++) {
                                                if (number == main[a][b][i]) {
                                                    cnt++;
                                                    tryCounter[tryCounter.length] = number;
                                                    break;
                                                }
                                            }
                                            if (cnt != 0) break;
                                        }
                                        if (cnt == 0) {
                                            main[j][k][i] = number;
                                            total++;
                                            break;
                                        }
                                    }
                                }
                            }
                            if (tryCounter.length == 9) break;
                        }
                        if (tryCounter.length == 9) break;
                    }
                    if (tryCounter.length == 9) break;
                }
                if (tryCounter.length == 9) break;
            }
            if (tryCounter.length == 9) break;
        }
        if (total == 81) {
            total = difficulty;
            break;
        }
    }
}
function assignOnClick_1(a, b, c) {
    myInputs[a][b][c].onclick = function () {
        if (currentButton != 0) {
            myInputs[n1][n2][n3].style.opacity = "0";
            setTimeout(() => {
                myInputs[n1][n2][n3].style.backgroundImage = "none";
                myInputs[n1][n2][n3].style.opacity = "1";
            }, 300);
        }
        myInputs[a][b][c].style.opacity = "0";
        setTimeout(() => {
            myInputs[a][b][c].style.backgroundImage = accentImage;
            myInputs[a][b][c].style.opacity = "1";
            n1 = a, n2 = b, n3 = c;
        }, 300);
        currentButton = "input_" + a + b + c;
    }
}
function assignOnClick_2(i) {
    myButtons[i].onclick = function () {
        if (currentButton != 0) {
            theValue = i + 1;
            myInputs[n1][n2][n3].style.pointerEvents = "none";
            checkAnswer();
        }
        else {
            myErrorMessage.innerHTML = "Select a cell.";
            myErrorMessage.animate([
                { width: errorWidth2 + "px" }
            ], {
                duration: 500,
                easing: "ease-out",
                fill: "forwards"
            });
            myErrorMessage.animate([
                { width: "0" }
            ], {
                duration: 500,
                easing: "ease-out",
                fill: "forwards",
                delay: 2000
            });
        }
    }
}
function keyboardHandler(event) {
    if (event.key == "1" || event.key == "2" || event.key == "3" || event.key == "4" || event.key == "5" || event.key == "6" || event.key == "7" || event.key == "8" || event.key == "9") {
        if (currentButton != 0) {
            theValue = event.key;
            myInputs[n1][n2][n3].style.pointerEvents = "none";
            checkAnswer();
        }
        else {
            myErrorMessage.innerHTML = "Select a cell.";
            myErrorMessage.animate([
                { width: errorWidth2 + "px" }
            ], {
                duration: 500,
                easing: "ease-out",
                fill: "forwards"
            });
            myErrorMessage.animate([
                { width: "0" }
            ], {
                duration: 500,
                easing: "ease-out",
                fill: "forwards",
                delay: 2000
            });
        }
    }
}
function checkAnswer() {
    if (currentButton != 0) {
        if (theValue != main[n1][n2][n3]) {
            myInputs[n1][n2][n3].innerHTML = "X";
            myInputs[n1][n2][n3].style.pointerEvents = "unset";
            mistakeLabel.innerHTML = "Mistakes: " + (wrongs + 1) + " <br> <span style='font-size: calc(.7vw + 1.4vh); font-weight: bold;'>Best Score: <span style='color: " + accentColor + ";'>" + ((localStorage.getItem("bestScore") == null) ? "─" : localStorage.getItem("bestScore")) + "</span></span>";
            myInputs[n1][n2][n3].animate([
                { transform: "rotate(0deg)" },
                { transform: "rotate(30deg)" },
                { transform: "rotate(-30deg)" },
                { transform: "rotate(30deg)" },
                { transform: "rotate(0deg)" }
            ], {
                duration: 450,
                easing: "linear",
                fill: "forwards"
            });
            setTimeout(() => {
                myInputs[n1][n2][n3].innerHTML = "&nbsp;";
            }, 500);
            window.navigator.vibrate(60);
            wrongs++;
        }
        else {
            total++;
            myInputs[n1][n2][n3].animate([
                { transform: "scale(1)" },
                { transform: "scale(.1)" },
                { transform: "scale(1)" }
            ], {
                duration: 600,
                easing: "ease",
                fill: "forwards"
            });
            setTimeout(() => {
                correctSound.play();
                myInputs[n1][n2][n3].innerHTML = theValue;
                setTimeout(() => {
                    myInputs[n1][n2][n3].style.backgroundImage = "none";
                }, 450);
            }, 150);
            currentButton = 0;
            generalCheck();
        }
        if (total == 81) {
            winSound.play();
            setTimeout(() => {
                jokerButton.style.opacity = "0";
                var i = 8;
                var myInterval = setInterval(() => {
                    myButtons[i].style.opacity = "0";
                    i--;
                    if (i < 0) {
                        clearInterval(myInterval);
                        var n = 6, j = 2, k = 2;
                        i = (n + 2);
                        var myInterval2 = setInterval(() => {
                            myInputs[i][j][k].style.opacity = "0";
                            k--;
                            if (k < 0) {
                                i--;
                                if (i < n) {
                                    j--;
                                    if (j < 0) {
                                        n -= 3;
                                        if (n < 0) {
                                            clearInterval(myInterval2);
                                            theBody.style.lineHeight = "normal";
                                            if (localStorage.getItem("bestScore") != null) {
                                                if (localStorage.getItem("bestScore") > wrongs) {
                                                    theBody.innerHTML = "<br><br><h3><b>CONGRATULATIONS!<br><br>NEW BEST SCORE: " + wrongs + " MISTAKES.</b></h3><br><h4>PREVIOUS BEST SCORE WAS: <b>" + localStorage.getItem("bestScore") + ".</b></h4><br><br><br>";
                                                    localStorage.removeItem("bestScore");
                                                    localStorage.setItem("bestScore", wrongs);
                                                }
                                                else {
                                                    theBody.innerHTML = "<br><br><h3><b>YOU FINISHED THE SUDOKU.</b></h3><br><h4>You have made <b>" + wrongs + "</b> mistakes.</h4><br>(Best Score: " + localStorage.getItem("bestScore") + ".)<br><br><br>";
                                                }
                                            }
                                            else {
                                                theBody.innerHTML = "<br><br><h3><b>YOU FINISHED THE SUDOKU.</b></h3><br><h4>You have made <b>" + wrongs + "</b> mistakes.</h4><br>(There is no previous best score.)<br><br><br>";
                                                localStorage.setItem("bestScore", wrongs);
                                            }
                                            theBody.appendChild(playAgain);
                                        }
                                        j = 2;
                                    }
                                    i = (n + 2);
                                }
                                k = 2;
                            }
                        }, 30);
                    }
                }, 30);
            }, 1100);
        }
    }
}
function completionAnimation(i, j, k, colorCheck) {
    setTimeout(() => {
        myInputs[i][j][k].style.backgroundImage = "none";
        myInputs[i][j][k].style.backgroundColor = accentColor;
        myInputs[i][j][k].style.color = (colorCheck == "rgb(32, 33, 37)") ? "rgb(204, 204, 204)" : "rgb(32, 33, 37)";
        myInputs[i][j][k].style.textShadow = (colorCheck == "rgb(32, 33, 37)") ? "1.6px .8px rgba(0, 0, 0, 1)" : "1.6px .8px rgba(0, 0, 0, 0.27)";
        setTimeout(() => {
            myInputs[i][j][k].style.backgroundColor = colorCheck;
        }, 450);
    }, 600);
}
function generalCheck() {
    var colorCheck = ((currentAccentColor == "rgb(204, 204, 204)") ? "rgb(32, 33, 37)" : "rgb(204, 204, 204)");
    for (var i = 0; i < 9; i++) {
        var cnt = 0, cnt2 = 0;
        for (var j = 0; j < 3; j++) {
            for (var k = 0; k < 3; k++) {
                if (myInputs[i][j][k].style.pointerEvents != "none") {
                    cnt++;
                    break;
                }
                if (myInputs[i][j][k].style.backgroundColor == colorCheck) cnt2++;
            }
            if (cnt != 0) break;
            if (cnt2 == 9) break;
        }
        if (cnt == 0 && cnt2 != 9) {
            for (var j = 0; j < 3; j++) {
                for (var k = 0; k < 3; k++) {
                    myInputs[i][j][k].style.color = accentColor;
                    completionAnimation(i, j, k, colorCheck);
                }
            }
        }
    }
    for (var n = 0; n < 7; n += 3) {
        for (var j = 0; j < 3; j++) {
            var cnt = 0, cnt2 = 0;
            for (var i = n; i < (n + 3); i++) {
                for (var k = 0; k < 3; k++) {
                    if (myInputs[i][j][k].style.pointerEvents != "none") {
                        cnt++;
                        break;
                    }
                    if (myInputs[i][j][k].style.backgroundColor == colorCheck) cnt2++;
                }
                if (cnt != 0) break;
                if (cnt2 == 9) break;
            }
            if (cnt == 0 && cnt2 != 9) {
                for (var i = n; i < (n + 3); i++) {
                    for (var k = 0; k < 3; k++) {
                        myInputs[i][j][k].style.color = accentColor;
                        completionAnimation(i, j, k, colorCheck);
                    }
                }
            }
        }
    }
    for (var n = 0; n < 3; n++) {
        for (var k = 0; k < 3; k++) {
            var cnt = 0, cnt2 = 0;
            for (var i = n; i < (n + 7); i += 3) {
                for (var j = 0; j < 3; j++) {
                    if (myInputs[i][j][k].style.pointerEvents != "none") {
                        cnt++;
                        break;
                    }
                    if (myInputs[i][j][k].style.backgroundColor == colorCheck) cnt2++;
                }
                if (cnt != 0) break;
                if (cnt2 == 9) break;
            }
            if (cnt == 0 && cnt2 != 9) {
                for (var i = n; i < (n + 7); i += 3) {
                    for (var j = 0; j < 3; j++) {
                        myInputs[i][j][k].style.color = accentColor;
                        completionAnimation(i, j, k, colorCheck);
                    }
                }
            }
        }
    }
}
function runOnLoad() {
    var randomNumbers = [], tmp, cnt;
    playAgainDiv.innerHTML = "End this game and <br> start a new game?<br><br>";
    playAgainDiv.style.opacity = "0", playAgainDiv.style.paddingTop = "42%", playAgainDiv.style.backdropFilter = "blur(4px)", playAgainDiv.style.backgroundColor = "rgba(0, 0, 0, .4)", playAgainDiv.style.textShadow = "1.6px .8px rgba(0, 0, 0, 1)", playAgainDiv.style.color = accentColor, playAgainDiv.style.width = "100%", playAgainDiv.style.position = "fixed", playAgainDiv.style.top = "0", playAgainDiv.style.left = "0";
    confirmButton.style.color = accentColor;
    cancelButton.style.color = accentColor;
    playAgainDiv.appendChild(confirmButton), playAgainDiv.appendChild(cancelButton);
    for (var i = 0; i < difficulty; i++) {
        while (1) {
            cnt = 0;
            tmp = Math.floor(Math.random() * 81);
            var l = randomNumbers.length;
            for (var j = 0; j < l; j++) {
                if (tmp == randomNumbers[j]) {
                    cnt++;
                    break;
                }
            }
            if (cnt == 0) {
                randomNumbers[i] = tmp;
                break;
            }
        }
    }
    for (var i = difficulty - 1; i > 0; i--) {
        cnt = 0;
        for (var j = 0; j <= i; j++) {
            if (randomNumbers[j] > randomNumbers[j + 1]) {
                tmp = randomNumbers[j];
                randomNumbers[j] = randomNumbers[j + 1];
                randomNumbers[j + 1] = tmp;
                cnt++;
            }
        }
        if (cnt == 0) break;
    }
    generateSudoku();
    cnt = 0;
    var a = 0, c = 0;
    theBody.innerHTML = "<br><b>SUDOKU</b><br><span style='font-size: calc(.64vw + 1.28vh); text-shadow: none; color: " + (difficulty == 38 ? "rgb(20, 172, 172)" : (difficulty == 32 ? "rgb(255, 69, 0)" : "rgb(220, 20, 60)")) + ";'>" + (difficulty == 38 ? "EASY" : (difficulty == 32 ? "NORMAL" : "HARD")) + "</span>";
    mistakeLabel.innerHTML = "Mistakes: 0 <br> <span style='font-size: calc(.7vw + 1.4vh); font-weight: bold;'>Best Score: <span style='color: " + accentColor + ";'>" + ((localStorage.getItem("bestScore") == null) ? "─" : localStorage.getItem("bestScore")) + "</span></span>";
    theBody.appendChild(mistakeLabel);
    theBody.appendChild(mainDivHolder);
    exitButton.style.color = accentColor;
    theBody.appendChild(exitButton);
    theBody.appendChild(switchThemeButton);
    theBody.style.color = (currentAccentColor == "rgb(32, 33, 37)" ? "rgb(204, 204, 204)" : "rgb(32, 33, 37)");
    setTimeout(() => {
        mistakeLabel.style.opacity = "1";
        exitButton.style.opacity = "1";
        switchThemeButton.style.opacity = "1";
    }, 30);
    var colorCheck = ((currentAccentColor == "rgb(204, 204, 204)") ? "rgb(32, 33, 37)" : "rgb(204, 204, 204)");
    var shadowCheck = ((currentAccentColor == "rgb(204, 204, 204)") ? "1.6px .8px rgba(0, 0, 0, 0.27)" : "1.6px .8px rgba(0, 0, 0, 1)");
    for (var n = 0; n < 7; n += 3) {
        for (var j = 0; j < 3; j++) {
            for (var i = n; i < (n + 3); i++) {
                for (var k = 0; k < 3; k++) {
                    myInputs[i][j][k].style.borderColor = accentColor;
                    myInputs[i][j][k].style.color = colorCheck;
                    myInputs[i][j][k].style.textShadow = shadowCheck;
                    assignOnClick_1(i, j, k);
                    if (randomNumbers[a] == cnt) {
                        myInputs[i][j][k].innerHTML = main[i][j][k];
                        myInputs[i][j][k].style.pointerEvents = "none";
                        a++;
                    }
                    cnt++;
                    myDivs[c].appendChild(myInputs[i][j][k]);
                }
            }
            myDivs[c].insertAdjacentHTML("beforeend", "<br>");
        }
        c++;
    }
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 3; j++) {
            if (i != 0 && i != 3 && i != 6) {
                myInputs[i][j][0].style.marginLeft = "calc(.2vw + .2vh)";
                myInputs[i][j][0].style.borderLeftColor = colorCheck;
            }
            else myInputs[i][j][0].style.borderLeft = "none";
            if (i != 2 && i != 5 && i != 8) {
                myInputs[i][j][2].style.marginRight = "calc(.2vw + .2vh)";
                myInputs[i][j][2].style.borderRightColor = colorCheck;
            }
            else myInputs[i][j][2].style.borderRight = "none";
            if (i != 6 && i != 7 && i != 8) {
                myInputs[i][2][j].style.marginBottom = "calc(.2vw + .2vh)";
                myInputs[i][2][j].style.borderBottomColor = colorCheck;
            }
            else myInputs[i][2][j].style.borderBottom = "none";
            if (i != 0 && i != 1 && i != 2) {
                myInputs[i][0][j].style.marginTop = "calc(.2vw + .2vh)";
                myInputs[i][0][j].style.borderTopColor = colorCheck;
            }
            else myInputs[i][0][j].style.borderTop = "none";
        }
    }
    theBody.appendChild(myErrorMessage);
    myErrorMessage.innerHTML = "No jokers left.";
    errorWidth1 = myErrorMessage.offsetWidth;
    myErrorMessage.innerHTML = "Select a cell.";
    errorWidth2 = myErrorMessage.offsetWidth;
    myErrorMessage.innerHTML = "";
    myErrorMessage.style.width = "0";
    myErrorMessage.style.opacity = "1";
    theBody.insertAdjacentHTML("beforeend", "<br>");
    for (var s = 0; s < 9; s++) {
        myButtons[s].style.color = accentColor;
        myButtons[s].style.textShadow = ((difficulty == 38) ? "0 0 6px rgba(20, 172, 172, .4)" : ((difficulty == 32) ? "0 0 6px rgba(255, 69, 0, .4)" : "0 0 6px rgba(220, 20, 60, .4)"));
        assignOnClick_2(s);
        myButtons[s].innerHTML = s + 1;
        if (s == 0 || s == 1 || s == 2) myButtons[s].style.marginTop = "1vw";
        theBody.appendChild(myButtons[s]);
        if ((s + 1) % 3 == 0) theBody.insertAdjacentHTML("beforeend", "<br>");
    }
    var n = 0, j = 0, k = 0, i = n;
    jokerButton.innerHTML = "<div>Use Joker<br><span style='font-size: calc(.9vw + 1.8vh);'><span style='color: " + accentColor + "; text-shadow: " + ((difficulty == 38) ? "0 0 6px rgba(20, 172, 172, .4)" : ((difficulty == 32) ? "0 0 6px rgba(255, 69, 0, .4)" : "0 0 6px rgba(220, 20, 60, .4)")) + ";'>" + jokerCnt + "</span> left</span></div>";
    jokerButton.style.opacity = "0";
    theBody.appendChild(jokerButton);
    theBody.insertAdjacentHTML("beforeend", "<br>");
    var myInterval = setInterval(() => {
        myInputs[i][j][k].style.opacity = "1";
        k++;
        if (k > 2) {
            i++;
            if (i > (n + 2)) {
                j++;
                if (j > 2) {
                    n += 3;
                    if (n > 6) {
                        clearInterval(myInterval);
                        var s = 0;
                        var myInterval2 = setInterval(() => {
                            myButtons[s].style.opacity = "1";
                            s++;
                            if (s > 8) {
                                clearInterval(myInterval2);
                                jokerButton.style.opacity = "1";
                                generalCheck();
                                theBody.style.transition = "none";
                                mistakeLabel.style.transition = "none";
                                exitButton.style.transition = "none";
                                switchThemeButton.style.transition = "none";
                            }
                        }, 30);
                    }
                    j = 0;
                }
                i = n;
            }
            k = 0;
        }
    }, 30);
}
function difficultyPick() {
    theBody = document.getElementsByTagName("body")[0];
    if (localStorage.getItem("currentTheme") == "rgb(32, 33, 37)") {
        theBody.style.backgroundImage = "url('grain11.png')";
        theBody.style.textShadow = "2px 1px rgba(0, 0, 0, 1)";
        theBody.style.color = "rgb(204, 204, 204)";
        currentAccentColor = "rgb(32, 33, 37)";
    }
    else {
        theBody.style.backgroundImage = "url('grain10.png')";
        theBody.style.textShadow = "2px 1px rgba(0, 0, 0, 0.27)";
        theBody.style.color = "rgb(32, 33, 37)";
        currentAccentColor = "rgb(204, 204, 204)";
        localStorage.setItem("currentTheme", currentAccentColor);
    }
    playAgain.style = "background-color: rgb(32, 33, 37); color: rgb(204, 204, 204); border: none; border-radius: calc(.36vw + .72vh); font-size: calc(1.2vw + 2.4vh); text-align: center;";
    playAgain.innerHTML = "PLAY AGAIN", playAgain.setAttribute("onclick", "window.location.reload();");
    mistakeLabel.className = "mistakeLabel";
    jokerButton.className = "jokerButton1", jokerButton.setAttribute("onclick", "joker();");
    switchThemeButton.className = "switchThemeButton", switchThemeButton.setAttribute("onclick", "switchTheme();");
    mainDivHolder.style = "margin-top: 2vh", mainDivHolder.align = "center";
    myDivs[0].className = "myDivs", myDivs[1].className = "myDivs", myDivs[2].className = "myDivs";
    mainDivHolder.appendChild(myDivs[0]), mainDivHolder.appendChild(myDivs[1]), mainDivHolder.appendChild(myDivs[2]);
    playAgainDiv.className = "playAgainDiv", playAgainDiv.align = "center", playAgainDiv.tagName = "playAgainDiv";
    confirmButton.className = "confirmButton", confirmButton.innerHTML = "Yes", confirmButton.setAttribute("onclick", "window.location.reload();");
    cancelButton.className = "confirmButton", cancelButton.innerHTML = "No";
    cancelButton.onclick = function () {
        playAgainDiv.style.opacity = "0";
        setTimeout(() => {
            theBody.removeChild(playAgainDiv);
        }, 300);
    }
    exitButton.className = "exitButton", exitButton.innerHTML = "New <br> Game";
    exitButton.onclick = function () {
        theBody.appendChild(playAgainDiv);
        setTimeout(() => {
            playAgainDiv.style.opacity = "1";
        }, 20);
    }
    myErrorMessage.className = "myErrorMessage";
    for (var i = 0; i < 9; i++) {
        main[i] = new Array(3);
        myInputs[i] = new Array(3);
        for (var j = 0; j < 3; j++) {
            main[i][j] = new Array(3);
            myInputs[i][j] = new Array(3);
            for (var k = 0; k < 3; k++) {
                myInputs[i][j][k] = document.createElement("div");
                myInputs[i][j][k].className = "inputs";
                myInputs[i][j][k].align = "center";
                myInputs[i][j][k].innerHTML = "&nbsp;";
            }
        }
        myButtons[i] = document.createElement("div");
        myButtons[i].className = "buttons1";
    }
    playAgainDiv.style.paddingTop = "32%";
    playAgainDiv.style.backdropFilter = "none";
    playAgainDiv.style.backgroundColor = "rgba(0, 0, 0, 0)";
    playAgainDiv.style.textShadow = (currentAccentColor == "rgb(204, 204, 204)") ? "2.4px 1.2px rgba(0, 0, 0, .27)" : "2.4px 1.2px rgba(0, 0, 0, 1)";
    playAgainDiv.style.color = (currentAccentColor == "rgb(204, 204, 204)") ? "rgb(32, 33, 37)" : "rgb(204, 204, 204)";
    playAgainDiv.style.opacity = "1";
    theBody.appendChild(playAgainDiv);
    var difficultyDiv = document.createElement("div"), easy = document.createElement("button"), normal = document.createElement("button"), hard = document.createElement("button");
    easy.innerHTML = "EASY", easy.className = "difficultyButtons", easy.style.transform = "translateY(27vh)", easy.style.color = "rgb(20, 172, 172)", easy.style.borderColor = "rgb(20, 172, 172)", easy.style.textShadow = (currentAccentColor == "rgb(204, 204, 204)") ? "1.6px .8px rgba(0, 0, 0, .27)" : "1.6px .8px rgba(0, 0, 0, 1)";
    normal.innerHTML = "NORMAL", normal.className = "difficultyButtons", normal.style.transform = "translateY(37vh)", normal.style.color = "rgb(255, 69, 0)", normal.style.borderColor = "rgb(255, 69, 0)", normal.style.textShadow = (currentAccentColor == "rgb(204, 204, 204)") ? "1.6px .8px rgba(0, 0, 0, .27)" : "1.6px .8px rgba(0, 0, 0, 1)";
    hard.innerHTML = "HARD", hard.className = "difficultyButtons", hard.style.transform = "translateY(47vh)", hard.style.color = "rgb(220, 20, 60)", hard.style.borderColor = "rgb(220, 20, 60)", hard.style.textShadow = (currentAccentColor == "rgb(204, 204, 204)") ? "1.6px .8px rgba(0, 0, 0, .27)" : "1.6px .8px rgba(0, 0, 0, 1)";
    difficultyDiv.className = "selectDifficulty";
    difficultyDiv.innerHTML = "Select difficulty.";
    playAgainDiv.appendChild(easy);
    playAgainDiv.appendChild(normal);
    playAgainDiv.appendChild(hard);
    playAgainDiv.appendChild(difficultyDiv);
    var divWidth = difficultyDiv.offsetWidth;
    difficultyDiv.style.width = "0";
    difficultyDiv.style.opacity = "1";
    easy.onclick = function () {
        difficulty = 38;
        accentColor = "rgb(20, 172, 172)";
        accentImage = "radial-gradient(rgb(105, 202, 202), rgb(20, 172, 172))";
        window.requestAnimationFrame(function () {
            normal.style.opacity = "0";
            hard.style.opacity = "0";
            difficultyDiv.animate([
                { width: "0" }
            ], {
                duration: 600,
                easing: "ease-out",
                fill: "forwards"
            });
            easy.animate([
                { transform: "translateY(0)" }
            ], {
                duration: 800,
                easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
                fill: "forwards",
                delay: 600
            });
            easy.animate([
                { transform: "translateY(0) scale(.5)" }
            ], {
                duration: 800,
                easing: "ease",
                fill: "forwards",
                delay: 600
            });
            setTimeout(() => {
                easy.style.borderColor = "transparent";
                easy.style.textShadow = "none";
                theBody.style.color = "transparent";
                setTimeout(() => {
                    theBody.removeChild(playAgainDiv);
                    theBody.style.transition = "color .6s ease";
                    theBody.style.webkitTransition = "color .6s ease";
                    runOnLoad();
                }, 700);
            }, 600);
        });
    }
    normal.onclick = function () {
        difficulty = 32;
        accentColor = "rgb(255, 69, 0)";
        accentImage = "radial-gradient(rgb(255, 136, 92), rgb(255, 69, 0))";
        window.requestAnimationFrame(function () {
            easy.style.opacity = "0";
            hard.style.opacity = "0";
            difficultyDiv.animate([
                { width: "0" }
            ], {
                duration: 600,
                easing: "ease-out",
                fill: "forwards"
            });
            normal.animate([
                { transform: "translateY(0)" }
            ], {
                duration: 900,
                easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
                fill: "forwards",
                delay: 600
            });
            normal.animate([
                { transform: "translateY(0) scale(.5)" }
            ], {
                duration: 800,
                easing: "ease",
                fill: "forwards",
                delay: 650
            });
            setTimeout(() => {
                normal.style.borderColor = "transparent";
                normal.style.textShadow = "none";
                theBody.style.color = "transparent";
                setTimeout(() => {
                    theBody.removeChild(playAgainDiv);
                    theBody.style.transition = "color .6s ease";
                    theBody.style.webkitTransition = "color .6s ease";
                    runOnLoad();
                }, 700);
            }, 650);
        });
    }
    hard.onclick = function () {
        difficulty = 26;
        accentColor = "rgb(220, 20, 60)";
        accentImage = "radial-gradient(rgb(233, 105, 130), rgb(220, 20, 60))";
        window.requestAnimationFrame(function () {
            easy.style.opacity = "0";
            normal.style.opacity = "0";
            difficultyDiv.animate([
                { width: "0" }
            ], {
                duration: 600,
                easing: "ease-out",
                fill: "forwards"
            });
            hard.animate([
                { transform: "translateY(0)" }
            ], {
                duration: 1000,
                easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
                fill: "forwards",
                delay: 600
            });
            hard.animate([
                { transform: "translateY(0) scale(.5)" }
            ], {
                duration: 800,
                easing: "ease",
                fill: "forwards",
                delay: 700
            });
            setTimeout(() => {
                hard.style.borderColor = "transparent";
                hard.style.textShadow = "none";
                theBody.style.color = "transparent";
                setTimeout(() => {
                    theBody.removeChild(playAgainDiv);
                    theBody.style.transition = "color .6s ease";
                    theBody.style.webkitTransition = "color .6s ease";
                    runOnLoad();
                }, 700);
            }, 700);
        });
    }
    var color1 = (currentAccentColor == "rgb(32, 33, 37)") ? "rgb(204, 204, 204)" : "rgb(32, 33, 37)", color2 = (currentAccentColor == "rgb(32, 33, 37)") ? "rgb(32, 33, 37)" : "rgb(204, 204, 204)";
    mistakeLabel.style.color = color1;
    var boxCheck = ((currentAccentColor == "rgb(32, 33, 37)") ? "inset calc(.2vw + .1vh) calc(.2vw + .1vh) calc(.2vw + .1vh) rgb(63, 64, 73), inset calc(-.2vw - .1vh) calc(-.2vw - .1vh) calc(.2vw + .1vh) rgb(6, 6, 8), calc(.2vw + .4vh) calc(.2vw + .4vh) calc(.4vw + .8vh) rgb(15, 16, 20)" : "inset calc(.2vw + .1vh) calc(.2vw + .1vh) calc(.2vw + .1vh) rgb(232, 232, 232), inset calc(-.2vw - .1vh) calc(-.2vw - .1vh) calc(.2vw + .1vh) rgb(15, 16, 20), calc(.2vw + .4vh) calc(.2vw + .4vh) calc(.4vw + .8vh) rgb(32, 33, 37)");
    var imageCheck = ((currentAccentColor == "rgb(32, 33, 37)") ? "url('grain11.png')" : "url('grain10.png')");
    for (var i = 0; i < 9; i++) {
        myButtons[i].style.boxShadow = boxCheck;
        myButtons[i].style.backgroundImage = imageCheck;
    }
    jokerButton.style.backgroundImage = (currentAccentColor == "rgb(32, 33, 37)") ? "url('grain10.png')" : "url('grain11.png')";
    jokerButton.style.color = color2;
    jokerButton.style.boxShadow = (currentAccentColor == "rgb(32, 33, 37)") ? "inset calc(.2vw + .2vh) calc(.2vw + .2vh) calc(.2vw + .2vh) rgb(232, 232, 232), inset calc(-.2vw - .2vh) calc(-.2vw - .2vh) calc(.2vw + .2vh) rgb(32, 33, 37), calc(.4vw + .4vh) calc(.4vw + .4vh) calc(.8vw + .8vh) rgb(15, 16, 20)" : "inset calc(.2vw + .2vh) calc(.2vw + .2vh) calc(.2vw + .2vh) rgb(63, 64, 73), inset calc(-.2vw - .2vh) calc(-.2vw - .2vh) calc(.2vw + .2vh) rgb(6, 6, 8), calc(.4vw + .4vh) calc(.4vw + .4vh) calc(.8vw + .8vh) rgb(32, 33, 37)";
    switchThemeButton.innerHTML = (currentAccentColor == "rgb(32, 33, 37)") ? "Theme:<br>Dark" : "Theme:<br>Light";
    switchThemeButton.style.color = color1;
    playAgain.style.backgroundColor = color1;
    playAgain.style.color = color2;
    difficultyDiv.animate([
        { width: (divWidth * 1.2) + "px" }
    ], {
        duration: 600,
        easing: "ease-out",
        fill: "forwards"
    });
    setTimeout(() => {
        easy.style.opacity = "1";
        normal.style.opacity = "1";
        hard.style.opacity = "1";
    }, 500);
}
function joker() {
    if (jokerCnt > 0) {
        while (1) {
            var i = Math.floor(Math.random() * 9), j = Math.floor(Math.random() * 3), k = Math.floor(Math.random() * 3);
            if (myInputs[i][j][k].style.pointerEvents != "none") {
                theValue = main[i][j][k];
                if (currentButton != 0) {
                    myInputs[n1][n2][n3].style.opacity = "0";
                    setTimeout(() => {
                        myInputs[n1][n2][n3].style.backgroundImage = "none";
                        myInputs[n1][n2][n3].style.opacity = "1";
                    }, 300);
                }
                myInputs[i][j][k].style.opacity = "0";
                setTimeout(() => {
                    myInputs[i][j][k].style.backgroundImage = accentImage;
                    myInputs[i][j][k].style.opacity = "1";
                    n1 = i, n2 = j, n3 = k;
                    setTimeout(() => {
                        myInputs[i][j][k].style.opacity = "0";
                        setTimeout(() => {
                            myInputs[i][j][k].style.backgroundImage = "none";
                            myInputs[i][j][k].style.backgroundColor = accentColor;
                            myInputs[i][j][k].style.color = (currentAccentColor == "rgb(32, 33, 37)") ? "rgb(204, 204, 204)" : "rgb(32, 33, 37)";
                            myInputs[i][j][k].style.opacity = "1";
                            setTimeout(() => {
                                myInputs[i][j][k].style.backgroundColor = "rgba(0, 0, 0, 0)";
                            }, 450);
                        }, 600);
                        myInputs[i][j][k].style.pointerEvents = "none";
                        currentButton = "input_" + i + j + k;
                        checkAnswer();
                    }, 300);
                }, 300);
                jokerCnt--;
                jokerButton.innerHTML = "<div>Use Joker<br><span style='font-size: calc(.9vw + 1.8vh);'><span style='color: " + accentColor + "; text-shadow: " + ((difficulty == 38) ? "0 0 6px rgba(20, 172, 172, .4)" : ((difficulty == 32) ? "0 0 6px rgba(255, 69, 0, .4)" : "0 0 6px rgba(220, 20, 60, .4)")) + ";'>" + jokerCnt + "</span> left</span></div>";
                break;
            }
        }
    }
    else {
        myErrorMessage.innerHTML = "No jokers left.";
        myErrorMessage.animate([
            { width: errorWidth1 + "px" }
        ], {
            duration: 500,
            easing: "ease-out",
            fill: "forwards"
        });
        myErrorMessage.animate([
            { width: "0" }
        ], {
            duration: 500,
            easing: "ease-out",
            fill: "forwards",
            delay: 2000
        });
    }
}
function switchTheme() {
    var color1 = (currentAccentColor == "rgb(204, 204, 204)") ? "rgb(204, 204, 204)" : "rgb(32, 33, 37)", color2 = (currentAccentColor == "rgb(204, 204, 204)") ? "rgb(32, 33, 37)" : "rgb(204, 204, 204)";
    playAgainDiv.innerHTML = "";
    playAgainDiv.style.transition = "none";
    playAgainDiv.style.webkitTransition = "none";
    playAgainDiv.style.paddingTop = "50%";
    playAgainDiv.style.backgroundColor = "rgba(0, 0, 0, 0)";
    playAgainDiv.style.fontSize = "calc(1.7vw + 3.4vh)";
    playAgainDiv.style.transition = "opacity .3s ease, background-color .4s ease";
    playAgainDiv.style.webkitTransition = "opacity .3s ease, background-color .4s ease";
    var allElements = document.getElementsByTagName("*"), tmpTransitions = [], l = allElements.length;
    for (var i = 0; i < l; i++) {
        tmpTransitions[i] = allElements[i].style.transition;
        allElements[i].style.transition = "none";
        allElements[i].style.webkitTransition = "none";
    }
    theBody.appendChild(playAgainDiv);
    window.requestAnimationFrame(function () {
        setTimeout(() => {
            playAgainDiv.style.opacity = "1";
            setTimeout(() => {
                playAgainDiv.innerHTML = (currentAccentColor == "rgb(204, 204, 204)") ? "DARK" : "LIGHT";
                playAgainDiv.style.backgroundColor = color2;
            }, 200);
        }, 20);
    });
    setTimeout(() => {
        theBody.style.backgroundImage = (currentAccentColor == "rgb(204, 204, 204)") ? "url('grain11.png')" : "url('grain10.png')";
        theBody.style.textShadow = (currentAccentColor == "rgb(204, 204, 204)") ? "2px 1px rgba(0, 0, 0, 1)" : "2px 1px rgba(0, 0, 0, 0.27)";
        theBody.style.color = color1;
        mistakeLabel.style.color = color1;
        switchThemeButton.innerHTML = (currentAccentColor == "rgb(204, 204, 204)") ? "Theme:<br>Dark" : "Theme:<br>Light";
        switchThemeButton.style.color = color1;
        var inputsClass = document.getElementsByClassName("inputs");
        l = inputsClass.length;
        var shadowCheck = ((currentAccentColor == "rgb(204, 204, 204)") ? "1.6px .8px rgba(0, 0, 0, 0.27)" : "1.6px .8px rgba(0, 0, 0, 1)");
        var shadowCheck2 = ((currentAccentColor == "rgb(204, 204, 204)") ? "1.6px .8px rgba(0, 0, 0, 1)" : "1.6px .8px rgba(0, 0, 0, 0.27)");
        for (var i = 0; i < l; i++) {
            if (inputsClass[i].style.backgroundColor == "rgb(32, 33, 37)" || inputsClass[i].style.backgroundColor == "rgb(204, 204, 204)") {
                inputsClass[i].style.backgroundColor = color1;
                inputsClass[i].style.color = color2;
                inputsClass[i].style.textShadow = shadowCheck;
            }
            else {
                inputsClass[i].style.color = color1;
                inputsClass[i].style.textShadow = shadowCheck2;
            }
        }
        var boxCheck = ((currentAccentColor == "rgb(204, 204, 204)") ? "inset calc(.2vw + .1vh) calc(.2vw + .1vh) calc(.2vw + .1vh) rgb(63, 64, 73), inset calc(-.2vw - .1vh) calc(-.2vw - .1vh) calc(.2vw + .1vh) rgb(6, 6, 8), calc(.2vw + .4vh) calc(.2vw + .4vh) calc(.4vw + .8vh) rgb(15, 16, 20)" : "inset calc(.2vw + .1vh) calc(.2vw + .1vh) calc(.2vw + .1vh) rgb(232, 232, 232), inset calc(-.2vw - .1vh) calc(-.2vw - .1vh) calc(.2vw + .1vh) rgb(15, 16, 20), calc(.2vw + .4vh) calc(.2vw + .4vh) calc(.4vw + .8vh) rgb(32, 33, 37)");
        var imageCheck = ((currentAccentColor == "rgb(204, 204, 204)") ? "url('grain11.png')" : "url('grain10.png')");
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 3; j++) {
                if (i != 0 && i != 3 && i != 6) myInputs[i][j][0].style.borderLeftColor = color1;
                if (i != 2 && i != 5 && i != 8) myInputs[i][j][2].style.borderRightColor = color1;
                if (i != 6 && i != 7 && i != 8) myInputs[i][2][j].style.borderBottomColor = color1;
                if (i != 0 && i != 1 && i != 2) myInputs[i][0][j].style.borderTopColor = color1;
            }
            myButtons[i].style.boxShadow = boxCheck;
            myButtons[i].style.backgroundImage = imageCheck;
        }
        jokerButton.style.backgroundImage = (currentAccentColor == "rgb(204, 204, 204)") ? "url('grain10.png')" : "url('grain11.png')";
        jokerButton.style.color = color2;
        jokerButton.style.boxShadow = (currentAccentColor == "rgb(204, 204, 204)") ? "inset calc(.2vw + .2vh) calc(.2vw + .2vh) calc(.2vw + .2vh) rgb(232, 232, 232), inset calc(-.2vw - .2vh) calc(-.2vw - .2vh) calc(.2vw + .2vh) rgb(32, 33, 37), calc(.4vw + .4vh) calc(.4vw + .4vh) calc(.8vw + .8vh) rgb(15, 16, 20)" : "inset calc(.2vw + .2vh) calc(.2vw + .2vh) calc(.2vw + .2vh) rgb(63, 64, 73), inset calc(-.2vw - .2vh) calc(-.2vw - .2vh) calc(.2vw + .2vh) rgb(6, 6, 8), calc(.4vw + .4vh) calc(.4vw + .4vh) calc(.8vw + .8vh) rgb(32, 33, 37)";
        playAgain.style.backgroundColor = color1;
        playAgain.style.color = color2;
        window.requestAnimationFrame(function () {
            setTimeout(() => {
                playAgainDiv.style.backgroundColor = "rgba(0, 0, 0, 0)";
                setTimeout(() => {
                    playAgainDiv.style.opacity = "0";
                    setTimeout(() => {
                        theBody.removeChild(playAgainDiv);
                        playAgainDiv.style.backgroundColor = "rgba(0, 0, 0, .4)";
                        playAgainDiv.style.fontSize = "calc(1.4vw + 2.8vh)";
                        playAgainDiv.innerHTML = "End this game and <br> start a new game?<br><br>";
                        playAgainDiv.style.paddingTop = "42%";
                        playAgainDiv.appendChild(confirmButton);
                        playAgainDiv.appendChild(cancelButton);
                        for (var i = 0; i < allElements.length; i++) {
                            allElements[i].style.transition = tmpTransitions[i];
                            allElements[i].style.webkitTransition = tmpTransitions[i];
                        }
                    }, 300);
                }, 300);
            }, 450);
        });
        currentAccentColor = color2;
        localStorage.removeItem("currentTheme");
        localStorage.setItem("currentTheme", currentAccentColor);
    }, 600);
}