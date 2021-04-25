var header = document.getElementById("header"), wrap = [], card = [], inner = [];
for (var i = 0; i < 6; i++) {
    wrap[i] = document.getElementById(("wrap" + i));
    card[i] = document.getElementById(("card" + i));
    inner[i] = document.getElementById(("inner" + i));
}
function onLoad() {
    document.body.animate({
        backdropFilter: ["none"]
    }, {
        duration: 1000,
        easing: "ease",
        fill: "forwards",
        delay: 200
    });
    header.animate({
        transform: ["translateY(-6vw)", "translateY(0)"]
    }, {
        duration: 800,
        easing: "ease",
        fill: "forwards",
        delay: 1200
    });
    for (var i = 0; i < 6; i++) {
        card[i].animate({
            transform: [(((i == 0 || i == 3) ? "scale(2.5) translateX(-28vw)" : ((i == 2 || i == 5) ? "scale(2.5) translateX(28vw)" : "scale(2.5) translateX(0)"))), "scale(1) translateX(0)"]
        }, {
            duration: 700,
            easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
            fill: "forwards",
            delay: (i < 3) ? (2000 + (i * 100)) : (2000 + (i * 100) + 300)
        });
        card[i].animate({
            opacity: ["0", "1"]
        }, {
            duration: 700,
            easing: "ease",
            fill: "forwards",
            delay: (i < 3) ? (2000 + (i * 100) + 100) : (2000 + (i * 100) + 400)
        });
    }
    setTimeout(() => {
        for (var i = 0; i < 6; i++) {
            card[i].setAttribute("onmouseenter", "hoverAnimation(wrap[" + i + "], card[" + i + "], inner[" + i + "], 1)");
            card[i].setAttribute("onmouseleave", "hoverAnimation(wrap[" + i + "], card[" + i + "], inner[" + i + "], 0)");
        }
    }, 3600);
}
function hoverAnimation(wrap, el, inner, cnt) {
    wrap.animate({
        transform: [((cnt == 1) ? "translateX(0)" : "translateX(-28vw)")]
    }, {
        duration: 600,
        easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
        fill: "forwards"
    });
    el.animate({
        transform: [((cnt == 1) ? "translateY(-2.5vw)" : "translateY(0)")],
        backgroundColor: [((cnt == 1) ? "transparent" : "rgba(255, 255, 255, .07)")],
        color: [((cnt == 1) ? "rgba(255, 255, 255, .625)" : "rgba(0, 0, 0, .8)")],
        fontSize: [((cnt == 1) ? "2.75vw" : "2.25vw")],
        boxShadow: [((cnt == 1) ? "0 .75vw 2.25vw -.2vw rgba(0, 0, 0, .8)" : "0 .25vw .75vw -.2vw rgba(0, 0, 0, .8)")]
    }, {
        duration: 600,
        easing: "ease",
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
