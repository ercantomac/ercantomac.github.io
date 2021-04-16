var card1 = document.getElementById("card1"), card2 = document.getElementById("card2"), card3 = document.getElementById("card3");
var wrapper1 = document.getElementById("wrapper1"), wrapper2 = document.getElementById("wrapper2"), wrapper3 = document.getElementById("wrapper3");
var header = document.getElementById("header");
card1.setAttribute("onmouseenter", "hoverAnimation(wrapper1, card1, 1)"), card1.setAttribute("onmouseleave", "hoverAnimation(wrapper1, card1, 0)");
card2.setAttribute("onmouseenter", "hoverAnimation(wrapper2, card2, 1)"), card2.setAttribute("onmouseleave", "hoverAnimation(wrapper2, card2, 0)");
card3.setAttribute("onmouseenter", "hoverAnimation(wrapper3, card3, 1)"), card3.setAttribute("onmouseleave", "hoverAnimation(wrapper3, card3, 0)");

function onLoad() {
    header.animate([
        { transform: "translateY(-5.5vw)" },
        { transform: "translateY(0)" }
    ], {
        duration: 700,
        easing: "ease",
        fill: "forwards",
        delay: 200
    });
    setTimeout(() => {
        wrapper2.animate([
            { transform: "scale(6)" },
            { transform: "scale(1)" }
        ], {
            duration: 700,
            easing: "ease-in-out",
            fill: "forwards"
        });
        wrapper2.animate([
            { opacity: "0" },
            { opacity: "1" }
        ], {
            duration: 700,
            easing: "ease",
            fill: "forwards",
            delay: 100
        });
        wrapper1.animate([
            { transform: "scale(6) translateX(-30vw)" },
            { transform: "scale(1) translateX(0)" }
        ], {
            duration: 700,
            easing: "ease-in-out",
            fill: "forwards",
            delay: 100
        });
        wrapper1.animate([
            { opacity: "0" },
            { opacity: "1" }
        ], {
            duration: 700,
            easing: "ease",
            fill: "forwards",
            delay: 200
        });
        wrapper3.animate([
            { transform: "scale(6) translateX(30vw)" },
            { transform: "scale(1) translateX(0)" }
        ], {
            duration: 700,
            easing: "ease-in-out",
            fill: "forwards",
            delay: 200
        });
        wrapper3.animate([
            { opacity: "0" },
            { opacity: "1" }
        ], {
            duration: 700,
            easing: "ease",
            fill: "forwards",
            delay: 300
        });
    }, 800);
}

function hoverAnimation(wrap, el, cnt) {
    if (cnt == 1) {
        wrap.animate([
            { transform: "translateY(-2.5vw)" }
        ], {
            duration: 600,
            easing: "ease",
            fill: "forwards"
        });
        el.animate([
            { backgroundColor: "transparent" }
        ], {
            duration: 450,
            easing: "ease",
            fill: "forwards"
        });
        el.animate([
            { backgroundPosition: "center" }
        ], {
            duration: 600,
            easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
            fill: "forwards"
        });
        el.animate([
            { color: "transparent" },
            { color: "rgba(255, 255, 255, .625)" }
        ], {
            duration: 450,
            easing: "ease",
            fill: "forwards"
        });
        el.animate([
            { fontSize: "2.75vw" }
        ], {
            duration: 450,
            easing: "ease",
            fill: "forwards"
        });
        el.style.textShadow = "0 .2vw .15vw rgba(0, 0, 0, .8)";
        wrap.style.backgroundImage = "none";
        wrap.style.webkitTextFillColor = "unset";
    }
    else {
        wrap.animate([
            { transform: "translateY(0)" }
        ], {
            duration: 600,
            easing: "ease",
            fill: "forwards"
        });
        el.animate([
            { backgroundColor: "rgba(255, 255, 255, .12)" }
        ], {
            duration: 450,
            easing: "ease",
            fill: "forwards"
        });
        el.animate([
            { backgroundPosition: "-30vw" }
        ], {
            duration: 600,
            easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
            fill: "forwards"
        });
        el.animate([
            { fontSize: "2.25vw" }
        ], {
            duration: 450,
            easing: "ease",
            fill: "forwards"
        });
        el.style.textShadow = "0 .15vw .15vw rgba(0, 0, 0, .4)";
        el.style.color = "transparent";
        wrap.style.backgroundImage = "linear-gradient(to right, #FF0066, #F76B1C 75%)";
        wrap.style.webkitTextFillColor = "transparent";
    }
}