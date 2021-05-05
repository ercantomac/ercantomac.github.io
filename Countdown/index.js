var innerInner = [[], [], []], div1 = document.getElementById("div1"), div2 = document.getElementById("div2"), div3 = document.getElementById("div3"), btn = document.getElementById("btn");
var timer = [0, 0, 0], previous, startCheck = 0, myInterval = 0, tick = new Audio("tick.mp3"), backgrounds = ["rgb(75, 0, 130)", "rgb(220, 20, 60)", "rgb(247, 158, 27)", "rgb(20, 172, 172)", "rgb(255, 69, 0)"], bckgrndCnt = 0;
var i, j, k;
function bckgrndChanger() {
    for (var i = 0; i < backgrounds.length; i++) {
        if (bckgrndCnt == i) {
            if ((i + 1) < backgrounds.length) {
                document.body.style.backgroundColor = backgrounds[(i + 1)];
                bckgrndCnt = (i + 1);
            }
            else {
                document.body.style.backgroundColor = backgrounds[0];
                bckgrndCnt = 0;
            }
            break;
        }
    }
}
function fullScreen() {
    if (document.documentElement.requestFullScreen) document.documentElement.requestFullScreen();
    else if (document.documentElement.webkitRequestFullScreen) document.documentElement.webkitRequestFullScreen();
}
function start() {
    for (var i = 0; i < 60; i++) {
        innerInner[0][i] = document.createElement("div"), innerInner[0][i].className = "innerInner", innerInner[0][i].innerHTML = i;
        innerInner[1][i] = document.createElement("div"), innerInner[1][i].className = "innerInner", innerInner[1][i].innerHTML = i;
        innerInner[2][i] = document.createElement("div"), innerInner[2][i].className = "innerInner", innerInner[2][i].innerHTML = i;
        div1.appendChild(innerInner[0][i]), div2.appendChild(innerInner[1][i]), div3.appendChild(innerInner[2][i]);
    }
    previous = [innerInner[0][0], innerInner[1][0], innerInner[2][0]];
    for (var i = 0; i < 3; i++) {
        innerInner[i][0].style.marginTop = "100%";
        innerInner[i][59].style.marginBottom = "100%";
    }
}
function scroll() {
    if (k >= 0) {
        tick.play();
        innerInner[2][k].scrollIntoView({ block: "center", inline: "center" });
        k--;
    }
    else if (k < 0) {
        k = 59;
        div3.style.scrollBehavior = "auto";
        if (j >= 0) {
            innerInner[2][k].scrollIntoView({ block: "center", inline: "center" });
            k--;
            innerInner[1][j].scrollIntoView({ block: "center", inline: "center" });
            j--;
        }
        else if (j < 0) {
            j = 59;
            div2.style.scrollBehavior = "auto";
            if (i >= 0) {
                innerInner[2][k].scrollIntoView({ block: "center", inline: "center" });
                k--;
                innerInner[1][j].scrollIntoView({ block: "center", inline: "center" });
                j--;
                innerInner[0][i].scrollIntoView({ block: "center", inline: "center" });
                i--;
            }
            else if (i < 0) {
                clearInterval(myInterval);
                btn.click();
            }
            div2.style.scrollBehavior = "smooth";
        }
        div3.style.scrollBehavior = "smooth";
    }
}
function btnHandler() {
    if (startCheck == 0) {
        const rect = [div1.getBoundingClientRect(), div2.getBoundingClientRect(), div3.getBoundingClientRect()], centerCell = [];
        centerCell[0] = document.elementFromPoint((rect[0].left + div1.offsetWidth / 2), (rect[0].top + div1.offsetHeight / 2));
        centerCell[1] = document.elementFromPoint((rect[1].left + div2.offsetWidth / 2), (rect[1].top + div2.offsetHeight / 2));
        centerCell[2] = document.elementFromPoint((rect[2].left + div3.offsetWidth / 2), (rect[2].top + div3.offsetHeight / 2));
        i = (parseInt(centerCell[0].innerText) - 1), j = (parseInt(centerCell[1].innerText) - 1), k = (parseInt(centerCell[2].innerText) - 1);
        scroll();
        myInterval = setInterval(scroll, 1000);
        btn.style.filter = "drop-shadow(0 0 .3vh rgba(24, 24, 24, .68))";
        btn.style.webkitFilter = "drop-shadow(0 0 .3vh rgba(24, 24, 24, .68))";
        btn.innerHTML = "| |";
        btn.style.transform = "rotate(0)";
        btn.style.webkitTransform = "rotate(0)";
        btn.style.fontWeight = "600";
        btn.animate({
            color: ["rgb(219, 219, 219)", "rgb(24, 24, 24)"],
            borderColor: ["rgb(219, 219, 219)", "rgb(24, 24, 24)"]
        }, {
            duration: 500,
            easing: "ease",
            fill: "forwards"
        });
        startCheck = 1;
        div1.style.overflow = "hidden", div2.style.overflow = "hidden", div3.style.overflow = "hidden";
    }
    else {
        clearInterval(myInterval);
        myInterval = 0;
        btn.style.filter = "drop-shadow(0 0 .3vh rgba(219, 219, 219, .68))";
        btn.style.webkitFilter = "drop-shadow(0 0 .3vh rgba(219, 219, 219, .68))";
        btn.innerHTML = "&#5121;";
        btn.style.transform = "rotate(-90deg)";
        btn.style.webkitTransform = "rotate(-90deg)";
        btn.style.fontWeight = "normal";
        btn.animate({
            color: ["rgb(24, 24, 24)", "rgb(219, 219, 219)"],
            borderColor: ["rgb(24, 24, 24)", "rgb(219, 219, 219)"]
        }, {
            duration: 500,
            easing: "ease",
            fill: "forwards"
        });
        startCheck = 0;
        div1.style.overflow = "scroll", div2.style.overflow = "scroll", div3.style.overflow = "scroll";
    }
}
function check(e) {
    const rect = e.getBoundingClientRect();
    var centerCell = document.elementFromPoint(rect.left + e.offsetWidth / 2, rect.top + e.offsetHeight / 2);
    var previousCell = ((e.id == "div1") ? previous[0] : ((e.id == "div2") ? previous[1] : previous[2]));
    if (previousCell != 0) {
        previousCell.animate([
            { opacity: "1" },
            { opacity: ".36" }
        ], {
            duration: 200,
            easing: "linear",
            fill: "forwards"
        });
        previousCell.animate([
            { transform: "scale(1)" },
            { transform: "scale(.68)" }
        ], {
            duration: 300,
            easing: "ease",
            fill: "forwards"
        });
    }
    centerCell.animate([
        { opacity: ".36" },
        { opacity: "1" }
    ], {
        duration: 400,
        easing: "linear",
        fill: "forwards"
    });
    centerCell.animate([
        { transform: "scale(.68)" },
        { transform: "scale(1)" }
    ], {
        duration: 500,
        easing: "ease",
        fill: "forwards"
    });
    if (e.id == "div1") previous[0] = centerCell;
    else if (e.id == "div2") previous[1] = centerCell;
    else if (e.id == "div3") previous[2] = centerCell;
}
div1.onscroll = function () {
    if (timer[0] != 0) clearTimeout(timer[0]);
    timer[0] = setTimeout(() => {
        check(div1);
    }, 60);
}
div2.onscroll = function () {
    if (timer[1] != 0) clearTimeout(timer[1]);
    timer[1] = setTimeout(() => {
        check(div2);
    }, 60);
}
div3.onscroll = function () {
    if (timer[2] != 0) clearTimeout(timer[2]);
    timer[2] = setTimeout(() => {
        check(div3);
    }, 60);
}
