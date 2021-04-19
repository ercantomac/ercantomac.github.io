function ai() {
    var b = 'O';
    for (var i = 0; i < 2; i++) {
        var counter = 0, a = 0, c = 1, d = 2, gecici;
        for (var k = 0; k < 3; k++) {
            if (k == 1) {
                gecici = c, c = d, d = gecici;
            }
            else if (k == 2) {
                gecici = c, c = d, d = gecici, gecici = a, a = d, d = gecici;
            }
            if (tmp[0][a] == b && tmp[0][c] == b && tmp[0][d] != 'O' && tmp[0][d] != 'X') {
                cpuCell = tmp[0][d];
                tmp[0][d] = 'O';
                counter++;
                break;
            }
            if (tmp[1][a] == b && tmp[1][c] == b && tmp[1][d] != 'O' && tmp[1][d] != 'X') {
                cpuCell = tmp[1][d];
                tmp[1][d] = 'O';
                counter++;
                break;
            }
            if (tmp[2][a] == b && tmp[2][c] == b && tmp[2][d] != 'O' && tmp[2][d] != 'X') {
                cpuCell = tmp[2][d];
                tmp[2][d] = 'O';
                counter++;
                break;
            }
            if (tmp[a][0] == b && tmp[c][0] == b && tmp[d][0] != 'O' && tmp[d][0] != 'X') {
                cpuCell = tmp[d][0];
                tmp[d][0] = 'O';
                counter++;
                break;
            }
            if (tmp[a][1] == b && tmp[c][1] == b && tmp[d][1] != 'O' && tmp[d][1] != 'X') {
                cpuCell = tmp[d][1];
                tmp[d][1] = 'O';
                counter++;
                break;
            }
            if (tmp[a][2] == b && tmp[c][2] == b && tmp[d][2] != 'O' && tmp[d][2] != 'X') {
                cpuCell = tmp[d][2];
                tmp[d][2] = 'O';
                counter++;
                break;
            }
            if (tmp[a][a] == b && tmp[c][c] == b && tmp[d][d] != 'O' && tmp[d][d] != 'X') {
                cpuCell = tmp[d][d];
                tmp[d][d] = 'O';
                counter++;
                break;
            }
        }
        if (counter != 0) break;
        if (tmp[0][2] == b && tmp[1][1] == b && tmp[2][0] != 'O' && tmp[2][0] != 'X') {
            cpuCell = tmp[2][0];
            tmp[2][0] = 'O';
            break;
        }
        if (tmp[0][2] == b && tmp[2][0] == b && tmp[1][1] != 'O' && tmp[1][1] != 'X') {
            cpuCell = tmp[1][1];
            tmp[1][1] = 'O';
            break;
        }
        if (tmp[2][0] == b && tmp[1][1] == b && tmp[0][2] != 'O' && tmp[0][2] != 'X') {
            cpuCell = tmp[0][2];
            tmp[0][2] = 'O';
            break;
        }
        else {
            if (i == 1) {
                if (tmp[2][1] == b && tmp[1][2] == b && tmp[2][2] != 'O' && tmp[2][2] != 'X') {
                    cpuCell = tmp[2][2];
                    tmp[2][2] = 'O';
                    break;
                }
                if (tmp[2][1] == b && tmp[1][0] == b && tmp[2][0] != 'O' && tmp[2][0] != 'X') {
                    cpuCell = tmp[2][0];
                    tmp[2][0] = 'O';
                    break;
                }
                if (tmp[0][1] == b && tmp[1][2] == b && tmp[0][2] != 'O' && tmp[0][2] != 'X') {
                    cpuCell = tmp[0][2];
                    tmp[0][2] = 'O';
                    break;
                }
                if (tmp[0][1] == b && tmp[1][0] == b && tmp[0][0] != 'O' && tmp[0][0] != 'X') {
                    cpuCell = tmp[0][0];
                    tmp[0][0] = 'O';
                    break;
                }
                counter = 0;
                b = 'O';
                for (var j = 0; j < 1; j++) {
                    for (var a = 0; a < 3; a++) {
                        switch (a) {
                            case 0: c = 1; d = 2; break;
                            case 1: c = 0; d = 2; break;
                            case 2: c = 1; d = 0; break;
                        }
                        for (var k = 0; k < 2; k++) {
                            if (tmp[0][a] == b && tmp[0][c] != 'X' && tmp[0][d] != 'O' && tmp[0][d] != 'X') {
                                cpuCell = tmp[0][d];
                                tmp[0][d] = 'O';
                                counter++;
                                break;
                            }
                            gecici = c, c = d, d = gecici;
                        }
                        if (counter != 0) break;
                    }
                    if (counter == 0) {
                        for (var a = 0; a < 3; a++) {
                            switch (a) {
                                case 0: c = 1; d = 2; break;
                                case 1: c = 0; d = 2; break;
                                case 2: c = 1; d = 0; break;
                            }
                            for (var k = 0; k < 2; k++) {
                                if (tmp[1][a] == b && tmp[1][c] != 'X' && tmp[1][d] != 'O' && tmp[1][d] != 'X') {
                                    cpuCell = tmp[1][d];
                                    tmp[1][d] = 'O';
                                    counter++;
                                    break;
                                }
                                gecici = c, c = d, d = gecici;
                            }
                            if (counter != 0) break;
                        }
                    }
                    if (counter == 0) {
                        for (var a = 0; a < 3; a++) {
                            switch (a) {
                                case 0: c = 1; d = 2; break;
                                case 1: c = 0; d = 2; break;
                                case 2: c = 1; d = 0; break;
                            }
                            for (var k = 0; k < 2; k++) {
                                if (tmp[2][a] == b && tmp[2][c] != 'X' && tmp[2][d] != 'O' && tmp[2][d] != 'X') {
                                    cpuCell = tmp[2][d];
                                    tmp[2][d] = 'O';
                                    counter++;
                                    break;
                                }
                                gecici = c, c = d, d = gecici;
                            }
                            if (counter != 0) break;
                        }
                    }
                    if (counter == 0) {
                        for (var a = 0; a < 3; a++) {
                            switch (a) {
                                case 0: c = 1; d = 2; break;
                                case 1: c = 0; d = 2; break;
                                case 2: c = 1; d = 0; break;
                            }
                            for (var k = 0; k < 2; k++) {
                                if (tmp[a][0] == b && tmp[c][0] != 'X' && tmp[d][0] != 'O' && tmp[d][0] != 'X') {
                                    cpuCell = tmp[d][0];
                                    tmp[d][0] = 'O';
                                    counter++;
                                    break;
                                }
                                gecici = c, c = d, d = gecici;
                            }
                            if (counter != 0) break;
                        }
                    }
                    if (counter == 0) {
                        for (var a = 0; a < 3; a++) {
                            switch (a) {
                                case 0: c = 1; d = 2; break;
                                case 1: c = 0; d = 2; break;
                                case 2: c = 1; d = 0; break;
                            }
                            for (var k = 0; k < 2; k++) {
                                if (tmp[a][1] == b && tmp[c][1] != 'X' && tmp[d][1] != 'O' && tmp[d][1] != 'X') {
                                    cpuCell = tmp[d][1];
                                    tmp[d][1] = 'O';
                                    counter++;
                                    break;
                                }
                                gecici = c, c = d, d = gecici;
                            }
                            if (counter != 0) break;
                        }
                    }
                    if (counter == 0) {
                        for (var a = 0; a < 3; a++) {
                            switch (a) {
                                case 0: c = 1; d = 2; break;
                                case 1: c = 0; d = 2; break;
                                case 2: c = 1; d = 0; break;
                            }
                            for (var k = 0; k < 2; k++) {
                                if (tmp[a][2] == b && tmp[c][2] != 'X' && tmp[d][2] != 'O' && tmp[d][2] != 'X') {
                                    cpuCell = tmp[d][2];
                                    tmp[d][2] = 'O';
                                    counter++;
                                    break;
                                }
                                gecici = c, c = d, d = gecici;
                            }
                            if (counter != 0) break;
                        }
                    }
                    if (counter == 0) {
                        for (var a = 0; a < 3; a++) {
                            switch (a) {
                                case 0: c = 1; d = 2; break;
                                case 1: c = 2; d = 0; break;
                                case 2: c = 1; d = 0; break;
                            }
                            for (var k = 0; k < 2; k++) {
                                if (tmp[a][a] == b && tmp[c][c] != 'X' && tmp[d][d] != 'O' && tmp[d][d] != 'X') {
                                    cpuCell = tmp[d][d];
                                    tmp[d][d] = 'O';
                                    counter++;
                                    break;
                                }
                                gecici = c, c = d, d = gecici;
                            }
                            if (counter != 0) break;
                        }
                    }
                    if (counter != 0) break;
                    if (tmp[0][2] == b && tmp[1][1] != 'X' && tmp[2][0] != 'O' && tmp[2][0] != 'X') {
                        cpuCell = tmp[2][0];
                        tmp[2][0] = 'O';
                        break;
                    }
                    if (tmp[0][2] == b && tmp[2][0] != 'X' && tmp[1][1] != 'O' && tmp[1][1] != 'X') {
                        cpuCell = tmp[1][1];
                        tmp[1][1] = 'O';
                        break;
                    }
                    if (tmp[2][0] == b && tmp[1][1] != 'X' && tmp[0][2] != 'O' && tmp[0][2] != 'X') {
                        cpuCell = tmp[0][2];
                        tmp[0][2] = 'O';
                        break;
                    }
                    if (tmp[2][0] == b && tmp[0][2] != 'X' && tmp[1][1] != 'O' && tmp[1][1] != 'X') {
                        cpuCell = tmp[1][1];
                        tmp[1][1] = 'O';
                        break;
                    }
                    if (tmp[1][1] == b && tmp[0][2] != 'X' && tmp[2][0] != 'O' && tmp[2][0] != 'X') {
                        cpuCell = tmp[2][0];
                        tmp[2][0] = 'O';
                        break;
                    }
                    if (tmp[1][1] == b && tmp[2][0] != 'X' && tmp[0][2] != 'O' && tmp[0][2] != 'X') {
                        cpuCell = tmp[0][2];
                        tmp[0][2] = 'O';
                        break;
                    }
                    else {
                        if (difficulty == "impossible") {
                            if (whoStarted == 'E' || whoStarted == 'e') {
                                if (tmp[1][1] != 'O' && tmp[1][1] != 'X') {
                                    cpuCell = tmp[1][1];
                                    tmp[1][1] = 'O';
                                    break;
                                }
                            }
                        }
                        if (tmp[0][0] == 'X' && tmp[2][2] == 'X' || tmp[0][2] == 'X' && tmp[2][0] == 'X') {
                            if (tmp[0][1] != 'O' && tmp[0][1] != 'X') {
                                cpuCell = tmp[0][1];
                                tmp[0][1] = 'O';
                                break;
                            }
                            if (tmp[1][0] != 'O' && tmp[1][0] != 'X') {
                                cpuCell = tmp[1][0];
                                tmp[1][0] = 'O';
                                break;
                            }
                            if (tmp[1][2] != 'O' && tmp[1][2] != 'X') {
                                cpuCell = tmp[1][2];
                                tmp[1][2] = 'O';
                                break;
                            }
                            if (tmp[2][1] != 'O' && tmp[2][1] != 'X') {
                                cpuCell = tmp[2][1];
                                tmp[2][1] = 'O';
                                break;
                            }
                        }
                        if (tmp[0][0] != 'O' && tmp[0][0] != 'X') {
                            cpuCell = tmp[0][0];
                            tmp[0][0] = 'O';
                            break;
                        }
                        if (tmp[0][2] != 'O' && tmp[0][2] != 'X') {
                            cpuCell = tmp[0][2];
                            tmp[0][2] = 'O';
                            break;
                        }
                        if (tmp[2][0] != 'O' && tmp[2][0] != 'X') {
                            cpuCell = tmp[2][0];
                            tmp[2][0] = 'O';
                            break;
                        }
                        if (tmp[2][2] != 'O' && tmp[2][2] != 'X') {
                            cpuCell = tmp[2][2];
                            tmp[2][2] = 'O';
                            break;
                        }
                        if (tmp[0][1] != 'O' && tmp[0][1] != 'X') {
                            cpuCell = tmp[0][1];
                            tmp[0][1] = 'O';
                            break;
                        }
                        if (tmp[1][0] != 'O' && tmp[1][0] != 'X') {
                            cpuCell = tmp[1][0];
                            tmp[1][0] = 'O';
                            break;
                        }
                        if (tmp[1][2] != 'O' && tmp[1][2] != 'X') {
                            cpuCell = tmp[1][2];
                            tmp[1][2] = 'O';
                            break;
                        }
                        if (tmp[2][1] != 'O' && tmp[2][1] != 'X') {
                            cpuCell = tmp[2][1];
                            tmp[2][1] = 'O';
                            break;
                        }
                    }
                }
            }
        }
        b = 'X';
    }
    myCounter++;
    myInnerDivs[cpuCell].innerHTML = cpuSign;
    myInnerDivs[cpuCell].style.webkitTextStroke = ((cpuSign == "O") ? "1px rgba(255, 255, 255, .72)" : "1px rgba(0, 0, 0, .72)");
    myInnerDivs[cpuCell].animate([
        { color: "transparent" },
        { color: ((cpuSign == "O") ? "rgba(255, 255, 255, .36)" : "rgba(0, 0, 0, .36)") }
    ], {
        duration: 600,
        easing: "linear",
        fill: "forwards"
    });
    myInnerDivs[cpuCell].animate([
        { transform: "scale(0)" },
        { transform: "scale(1)" }
    ], {
        duration: 600,
        easing: "cubic-bezier(0.215, 0.610, 0.355, 1)",
        fill: "forwards"
    });
    chalkSound.play();
    winner('O');
}
