var box = [], cnt = 0;
for (var i = 0; i < 6; i++) {
    box[i] = document.getElementById(("box" + i));
    box[i].setAttribute("onclick", "buttonHandler(box[" + i + "])");
}
function buttonHandler(id) {
    for (var i = 0; i < 6; i++) {
        box[i].style.zIndex = (id.id == ("box" + i)) ? "1" : "0";
    }
    if (cnt == 0) {
        id.animate([
            { transform: (((id.id == "box0" || id.id == "box3") ? "translate(calc(50vw - 8vh)" : ((id.id == "box1" || id.id == "box4") ? "translate(calc(50vw - 26vh)" : "translate(calc(50vw - 44vh)")) + ((id.id == "box0" || id.id == "box1" || id.id == "box2") ? ", 42vh)" : ", 24vh)")) }
        ], {
            duration: 600,
            easing: "ease-in-out",
            fill: "forwards"
        });
        id.animate([
            { transform: (((id.id == "box0" || id.id == "box3") ? "translate(calc(50vw - 8vh)" : ((id.id == "box1" || id.id == "box4") ? "translate(calc(50vw - 26vh)" : "translate(calc(50vw - 44vh)")) + ((id.id == "box0" || id.id == "box1" || id.id == "box2") ? ", 42vh)" : ", 24vh)") + " scale(3.14, 6.28)") }
        ], {
            duration: 800,
            easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
            fill: "forwards",
            delay: 200
        });
        id.animate([
            { color: "transparent" }
        ], {
            duration: 400,
            easing: "ease",
            fill: "forwards",
            delay: 150
        });
        id.animate([
            { color: "rgb(21, 21, 24)" }
        ], {
            duration: 400,
            easing: "ease",
            fill: "forwards",
            delay: 450
        });
        id.animate([
            { borderRadius: "0" }
        ], {
            duration: 600,
            easing: "ease",
            fill: "forwards",
            delay: 550
        });
        setTimeout(() => {
            id.innerText = "What is Lorem Ipsum? <br> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
            id.style.lineHeight = "normal";
            id.style.fontSize = ".9vh";
        }, 450);
        cnt = 1;
    }
    else {
        id.animate([
            { transform: (((id.id == "box0" || id.id == "box3") ? "translate(calc(50vw - 8vh)" : ((id.id == "box1" || id.id == "box4") ? "translate(calc(50vw - 26vh)" : "translate(calc(50vw - 44vh)")) + ((id.id == "box0" || id.id == "box1" || id.id == "box2") ? ", 42vh)" : ", 24vh)") + " scale(2.3, 3.1)") }
        ], {
            duration: 600,
            easing: "ease-in-out",
            fill: "forwards"
        });
        id.animate([
            { transform: (((id.id == "box0" || id.id == "box3") ? "translate(calc(50vw - 8vh), 0)" : ((id.id == "box1" || id.id == "box4") ? "translate(calc(50vw - 26vh), 0)" : "translate(calc(50vw - 44vh), 0)")) + " scale(1)") }
        ], {
            duration: 600,
            easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
            fill: "forwards",
            delay: 400
        });
        id.animate([
            { transform: "translate(0, 0) scale(1)" }
        ], {
            duration: 600,
            easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
            fill: "forwards",
            delay: 500
        });
        id.animate([
            { borderRadius: "2.4vh" }
        ], {
            duration: 600,
            easing: "ease",
            fill: "forwards",
            delay: 100
        });
        id.animate([
            { color: "transparent" }
        ], {
            duration: 400,
            easing: "ease",
            fill: "forwards",
            delay: 400
        });
        id.animate([
            { color: "rgb(21, 21, 24)" }
        ], {
            duration: 400,
            easing: "ease",
            fill: "forwards",
            delay: 700
        });
        setTimeout(() => {
            id.innerHTML = (id.id == "box0") ? "&#9398;" : (id.id == "box1") ? "&#9399;" : (id.id == "box2") ? "&#9400;" : (id.id == "box3") ? "&#9401;" : (id.id == "box4") ? "&#9402;" : "&#9403;";
            id.style.lineHeight = "16vh";
            id.style.fontSize = "10vh";
        }, 700);
        cnt = 0;
    }
}

function fullScreen() {
    if (document.documentElement.requestFullScreen) document.documentElement.requestFullScreen();
    else if (document.documentElement.webkitRequestFullScreen) document.documentElement.webkitRequestFullScreen();
}