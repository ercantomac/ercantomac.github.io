var mainDiv = document.createElement("div"), theText = document.createElement("div"), resultDiv = document.createElement("div"), textString, turkishChars = [199, 231, 286, 287, 304, 305, 214, 246, 220, 252, 350, 351];
mainDiv.className = "mainDiv", mainDiv.align = "center";
theText.contentEditable = "true", theText.setAttribute("data-text", "Write your text here."), theText.spellcheck = 0, theText.cols = "72", theText.rows = "36", theText.className = "theText";
resultDiv.className = "resultDiv", resultDiv.innerHTML = "MOST FREQUENT WORDS<br><br>", resultDiv.align = "center";
theText.oninput = function () {
    textString = theText.innerText;
    analyzeText();
}
theText.onpaste = function (e) {
    e.preventDefault();
    var text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
}
function onLoad() {
    mainDiv.appendChild(theText);
    mainDiv.appendChild(resultDiv);
    document.body.appendChild(mainDiv);
    theText.animate([
        { transform: "translateX(-100%)" },
        { transform: "translateX(0)" }
    ], {
        duration: 800,
        easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
        fill: "forwards"
    });
}
var animationCnt = 0;
function analyzeText() {
    var textLength = textString.length, words = [], cnt = 0, cnt2 = 0, spaceCnt, listedWords = [], listedWordCounts = [], wordLength;
    for (var i = 0; i < textLength; i++) {
        var turkCnt = 0;
        for (var j = 0; j < 12; j++) {
            if (textString.charCodeAt(i) == turkishChars[j]) {
                turkCnt++;
                break;
            }
        }
        if ((textString.charCodeAt(i) >= 97 && textString.charCodeAt(i) <= 122) || (textString.charCodeAt(i) >= 65 && textString.charCodeAt(i) <= 90) || (turkCnt > 0)) {
            spaceCnt = 0;
            if (cnt2 == 0) words[cnt] = '';
            words[cnt] += textString[i];
            cnt2 = 1;
        }
        else {
            if (spaceCnt == 0) {
                spaceCnt++;
                cnt++;
                cnt2 = 0;
                if (i == (textLength - 1)) animationCnt = 0;
            }
        }
    }
    wordLength = words.length;
    for (var i = 0; i < wordLength; i++) {
        var counter = 0, counter2 = 1, listedWordsLength = listedWords.length;
        for (var j = 0; j < listedWordsLength; j++) {
            if (words[i] == listedWords[j]) {
                counter++;
                break;
            }
        }
        if (counter == 0) {
            for (var j = i + 1; j < wordLength; j++) {
                if (words[j] == words[i]) counter2++;
            }
            listedWords[listedWords.length] = words[i];
            listedWordCounts[listedWordCounts.length] = counter2;
        }
    }
    var biggest, tmpno, listedWordCountsLength = listedWordCounts.length;
    for (var i = 0; i < listedWordCountsLength; i++) {
        biggest = listedWordCounts[i];
        tmpno = i;
        for (var j = i + 1; j < listedWordCountsLength; j++) {
            if (listedWordCounts[j] > biggest) {
                biggest = listedWordCounts[j];
                tmpno = j;
            }
        }
        if (biggest != listedWordCounts[i]) {
            var tmp = listedWordCounts[i];
            listedWordCounts[i] = biggest;
            listedWordCounts[tmpno] = tmp;
            var tmp2 = listedWords[i];
            listedWords[i] = listedWords[tmpno];
            listedWords[tmpno] = tmp2;
        }
    }
    resultDiv.innerHTML = "MOST FREQUENT WORDS<br><br>", myDivs = [];
    for (var i = 0; i < listedWords.length; i++) {
        myDivs[i] = document.createElement("div");
        myDivs[i].id = listedWords[i];
        myDivs[i].className = "words";
        myDivs[i].innerHTML = (listedWords[i] + "<span style='color: white;'>&nbsp;(" + listedWordCounts[i] + ")</span>");
        if ((i == (listedWords.length - 1)) && (animationCnt == 0) && (cnt2 == 1)) {
            animationCnt = 1;
            myDivs[i].style.transform = "scale(.1)"
            resultDiv.appendChild(myDivs[i]);
            myDivs[i].animate([
                { transform: "scaleX(.1)" },
                { transform: "scaleX(1)" }
            ], {
                duration: 200,
                easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
                fill: "forwards"
            });
        }
        else resultDiv.appendChild(myDivs[i]);
        onHoverHandler(listedWords[i]);
    }
}

function onHoverHandler(id) {
    document.getElementById(id).onmouseover = function () {
        var newText = theText.innerText.replaceAll(id, ("<mark>" + id + "</mark>"));
        theText.innerHTML = newText;
    }
}