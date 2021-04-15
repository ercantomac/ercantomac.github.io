var cnt = 0;
var box1 = document.getElementById("box1"), box2 = document.getElementById("box2"), box3 = document.getElementById("box3"), box4 = document.getElementById("box4"), box5 = document.getElementById("box5"), box6 = document.getElementById("box6"), translateValues = [((document.body.offsetWidth / 2) + "px"), ((document.body.offsetHeight / 2) + "px")];
box2.style.left = "18vh", box2.style.backgroundImage = "radial-gradient(#f3e500, #f79e1b)";
box3.style.left = "36vh", box3.style.backgroundImage = "radial-gradient(mediumspringgreen, #00bf8f)";
box4.style.top = "18vh", box4.style.left = "0", box4.style.backgroundImage = "radial-gradient(purple, indigo)";
box5.style.top = "18vh", box5.style.left = "18vh", box5.style.backgroundImage = "radial-gradient(deeppink, #FF0066)";
box6.style.top = "18vh", box6.style.left = "36vh", box6.style.backgroundImage = "radial-gradient(#12fff7, cornflowerblue)";
box1.setAttribute("onclick", "buttonHandler(box1);");
box2.setAttribute("onclick", "buttonHandler(box2);");
box3.setAttribute("onclick", "buttonHandler(box3);");
box4.setAttribute("onclick", "buttonHandler(box4);");
box5.setAttribute("onclick", "buttonHandler(box5);");
box6.setAttribute("onclick", "buttonHandler(box6);");

function buttonHandler(id) {
    box1.style.zIndex = (id.id == "box1") ? "1" : "0";
    box2.style.zIndex = (id.id == "box2") ? "1" : "0";
    box3.style.zIndex = (id.id == "box3") ? "1" : "0";
    box4.style.zIndex = (id.id == "box4") ? "1" : "0";
    box5.style.zIndex = (id.id == "box5") ? "1" : "0";
    box6.style.zIndex = (id.id == "box6") ? "1" : "0";
    if (cnt == 0) {
        id.animate([
            { transform: (((id.id == "box1" || id.id == "box4") ? "translate(calc(50vw - 8vh)" : ((id.id == "box2" || id.id == "box5") ? "translate(calc(50vw - 26vh)" : "translate(calc(50vw - 44vh)")) + ((id.id == "box1" || id.id == "box2" || id.id == "box3") ? ", 42vh)" : ", 24vh)")) }
        ], {
            duration: 600,
            easing: "ease-in-out",
            fill: "forwards"
        });
        id.animate([
            { transform: (((id.id == "box1" || id.id == "box4") ? "translate(calc(50vw - 8vh)" : ((id.id == "box2" || id.id == "box5") ? "translate(calc(50vw - 26vh)" : "translate(calc(50vw - 44vh)")) + ((id.id == "box1" || id.id == "box2" || id.id == "box3") ? ", 42vh)" : ", 24vh)") + " scale(3.14, 6.28)") }
        ], {
            duration: 800,
            easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
            fill: "forwards",
            delay: 200
        });
        setTimeout(() => {
            id.style.color = "transparent";
            setTimeout(() => {
                id.innerHTML = "What is Lorem Ipsum? <br> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
                id.style.lineHeight = "normal";
                id.style.fontSize = ".9vh";
                id.style.color = "rgb(21, 21, 24)";
                setTimeout(() => {
                    id.style.borderRadius = "0";
                }, 100);
            }, 300);
        }, 150);
        cnt = 1;
    }
    else {
        id.animate([
            { transform: (((id.id == "box1" || id.id == "box4") ? "translate(calc(50vw - 8vh)" : ((id.id == "box2" || id.id == "box5") ? "translate(calc(50vw - 26vh)" : "translate(calc(50vw - 44vh)")) + ((id.id == "box1" || id.id == "box2" || id.id == "box3") ? ", 42vh)" : ", 24vh)") + " scale(2.3, 3.1)") }
        ], {
            duration: 600,
            easing: "ease-in-out",
            fill: "forwards"
        });
        id.animate([
            { transform: (((id.id == "box1" || id.id == "box4") ? "translate(calc(50vw - 8vh), 0)" : ((id.id == "box2" || id.id == "box5") ? "translate(calc(50vw - 26vh), 0)" : "translate(calc(50vw - 44vh), 0)")) + " scale(1)") }
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
        setTimeout(() => {
            id.style.borderRadius = "2.4vh";
            setTimeout(() => {
                id.style.color = "transparent";
                setTimeout(() => {
                    id.innerHTML = (id.id == "box1") ? "&#9398;" : (id.id == "box2") ? "&#9399;" : (id.id == "box3") ? "&#9400;" : (id.id == "box4") ? "&#9401;" : (id.id == "box5") ? "&#9402;" : "&#9403;";
                    id.style.lineHeight = "16vh";
                    id.style.fontSize = "10vh";
                    id.style.color = "rgb(21, 21, 24)";
                }, 300);
            }, 300);
        }, 100);
        cnt = 0;
    }
}

function fullScreen() {
    if (document.documentElement.requestFullScreen) document.documentElement.requestFullScreen();
    else if (document.documentElement.webkitRequestFullScreen) document.documentElement.webkitRequestFullScreen();
}