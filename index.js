var header = document.getElementById("header"), wrap = [], card = [], inner = [], backgroundCnt = 0;
var darkenScreen = document.getElementById("darkenScreen");
for (var i = 0; i < 6; i++) {
    wrap[i] = document.getElementById(("wrap" + i));
    card[i] = document.getElementById(("card" + i));
    inner[i] = document.getElementById(("inner" + i));
}
function changeBackground() {
    if (backgroundCnt < 7) backgroundCnt++;
    else backgroundCnt = 0;
    darkenScreen.style.display = "block";
    darkenScreen.animate({
        opacity: ["0", "1"]
    }, {
        duration: 600,
        easing: "cubic-bezier(0.645, 0.045, 0.355, 1)",
        fill: "forwards"
    });
    setTimeout(() => {
        document.body.style.backgroundImage = "url('./background" + backgroundCnt + ".jpg')";
    }, 550);
    darkenScreen.animate({
        opacity: ["1", "0"]
    }, {
        duration: 600,
        easing: "cubic-bezier(0.645, 0.045, 0.355, 1)",
        fill: "forwards",
        delay: 500
    });
    setTimeout(() => {
        darkenScreen.style.display = "none";
    }, 1100);
}
function onLoad() {
    document.body.animate({
        backdropFilter: ["none"],
        webkitBackdropFilter: ["none"]
    }, {
        duration: 1200,
        easing: "cubic-bezier(0.645, 0.045, 0.355, 1)",
        fill: "forwards",
        delay: 300
    });
    header.animate({
        transform: ["translateY(-6vw)", "translateY(0)"]
    }, {
        duration: 1000,
        easing: "cubic-bezier(0.645, 0.045, 0.355, 1)",
        fill: "forwards",
        delay: 1500
    });
    for (var i = 0; i < 6; i++) {
        card[i].animate({
            transform: [(((i == 0 || i == 3) ? "scale(2.5) translateX(-28vw)" : ((i == 2 || i == 5) ? "scale(2.5) translateX(28vw)" : "scale(2.5) translateX(0)"))), "scale(1) translateX(0)"]
        }, {
            duration: 1000,
            easing: "cubic-bezier(0.645, 0.045, 0.355, 1)",
            fill: "forwards",
            delay: (i < 3) ? (2500 + (i * 100)) : (2500 + (i * 100) + 400)
        });
        card[i].animate({
            opacity: ["0", "1"]
        }, {
            duration: 1000,
            easing: "cubic-bezier(0.645, 0.045, 0.355, 1)",
            fill: "forwards",
            delay: (i < 3) ? (2500 + (i * 100)) : (2500 + (i * 100) + 400)
        });
        card[i].animate({
            backdropFilter: ["blur(0px) brightness(110%) saturate(110%)", "blur(20px) brightness(110%) saturate(110%)"],
            webkitBackdropFilter: ["blur(0px) brightness(110%) saturate(110%)", "blur(20px) brightness(110%) saturate(110%)"]
        }, {
            duration: 1000,
            easing: "cubic-bezier(0.645, 0.045, 0.355, 1)",
            fill: "forwards",
            delay: 4200
        });
    }
    setTimeout(() => {
        for (var i = 0; i < 6; i++) {
            card[i].setAttribute("onmouseenter", "hoverAnimation(wrap[" + i + "], card[" + i + "], inner[" + i + "], 1)");
            card[i].setAttribute("onmouseleave", "hoverAnimation(wrap[" + i + "], card[" + i + "], inner[" + i + "], 0)");
        }
    }, 4200);
}
function hoverAnimation(wrap, el, inner, cnt) {
    wrap.animate({
        transform: [((cnt == 1) ? "translateX(0)" : "translateX(-28.2vw)")]
    }, {
        duration: 600,
        easing: ((cnt == 1) ? "cubic-bezier(0.215, 0.610, 0.355, 1)" : "cubic-bezier(0.645, 0.045, 0.355, 1)"),
        fill: "forwards"
    });
    el.animate({
        transform: [((cnt == 1) ? "translateY(-2.5vw)" : "translateY(0)")],
        backgroundColor: [((cnt == 1) ? "transparent" : "rgba(255, 255, 255, .02)")],
        fontSize: [((cnt == 1) ? "2.75vw" : "2.25vw")],
        boxShadow: [((cnt == 1) ? "0 1vw 1.5vw -.15vw rgba(0, 0, 0, .5)" : "0 .25vw .5vw -.15vw rgba(0, 0, 0, .375)")],
        border: [((cnt == 1) ? "1px solid rgba(0, 0, 0, .625)" : "1px solid rgba(255, 255, 255, .2)")],
        textShadow: [((cnt == 1) ? "0 .2vw .15vw rgba(0, 0, 0, .8)" : "0 .1vw .15vw rgba(0, 0, 0, .625)")]
    }, {
        duration: 600,
        easing: ((cnt == 1) ? "cubic-bezier(0.215, 0.610, 0.355, 1)" : "cubic-bezier(0.645, 0.045, 0.355, 1)"),
        fill: "forwards"
    });
    inner.animate({
        width: [((cnt == 1) ? "100%" : "0")]
    }, {
        duration: 600,
        easing: ((cnt == 1) ? "cubic-bezier(0.215, 0.610, 0.355, 1)" : "cubic-bezier(0.645, 0.045, 0.355, 1)"),
        fill: "forwards"
    });
}
