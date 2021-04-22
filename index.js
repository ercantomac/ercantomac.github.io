var header = document.getElementById("header"), card = [], inner = [];
for (var i = 0; i < 6; i++) {
    card[i] = document.getElementById(("card" + i));
    inner[i] = document.getElementById(("inner" + i));
    card[i].setAttribute("onmouseenter", "hoverAnimation(card[" + i + "], inner[" + i + "], 1)");
    card[i].setAttribute("onmouseleave", "hoverAnimation(card[" + i + "], inner[" + i + "], 0)");
}
function onLoad() {
    document.body.animate({
        backdropFilter: ["none"]
    }, {
        duration: 1200,
        easing: "ease",
        fill: "forwards",
        delay: 300
    });
    header.animate({
        transform: ["translateY(-8vw)", "translateY(0)"]
    }, {
        duration: 800,
        easing: "ease",
        fill: "forwards",
        delay: 1500
    });
    for (var i = 0; i < 6; i++) {
        card[i].animate({
            transform: [(((i == 0 || i == 3) ? "scale(2) translateX(-30vw)" : ((i == 2 || i == 5) ? "scale(2) translateX(30vw)" : "scale(2)"))), "scale(1) translateX(0)"]
        }, {
            duration: 700,
            easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
            fill: "forwards",
            delay: (i < 3) ? (2300 + (i * 100)) : (2300 + (i * 100) + 300)
        });
        card[i].animate({
            opacity: ["0", "1"]
        }, {
            duration: 700,
            easing: "ease",
            fill: "forwards",
            delay: (i < 3) ? (2300 + (i * 100) + 100) : (2300 + (i * 100) + 400)
        });
    }
}
function hoverAnimation(el, inner, cnt) {
    el.animate({
        transform: [((cnt == 1) ? "translateY(-2.5vw)" : "translateY(0)")],
        backgroundColor: [((cnt == 1) ? "transparent" : "rgba(255, 255, 255, .2)")],
        color: [((cnt == 1) ? "rgba(255, 255, 255, .625)" : "rgba(0, 0, 0, .8)")],
        fontSize: [((cnt == 1) ? "2.75vw" : "2.25vw")]
    }, {
        duration: 600,
        easing: "ease",
        fill: "forwards"
    });
    el.animate({
        backgroundPosition: [((cnt == 1) ? "center" : "-29vw")]
    }, {
        duration: 600,
        easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
        fill: "forwards"
    });
    el.style.textShadow = ((cnt == 1) ? "0 .2vw .15vw rgba(0, 0, 0, .8)" : "0 .15vw .15vw rgba(0, 0, 0, .4)");
    inner.animate({
        width: [((cnt == 1) ? "100%" : "0")]
    }, {
        duration: ((cnt == 1) ? 800 : 600),
        easing: ((cnt == 1) ? "cubic-bezier(0.215, 0.610, 0.355, 1)" : "ease"),
        fill: "forwards"
    });
}
