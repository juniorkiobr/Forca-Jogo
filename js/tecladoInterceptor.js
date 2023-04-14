const getTeclado = (event) => {
    const tecla = event.key;
    const teclaCode = event.code;
    console.log(tecla, teclaCode);
    switch (tecla) {
        case "a":
            console.log("A");
            jogo.tentaPalavra("a");
            break;
        case "b":
            console.log("B");
            jogo.tentaPalavra("b");
            break;
        case "c":
            console.log("C");
            jogo.tentaPalavra("c");
            break;
        case "d":
            console.log("D");
            jogo.tentaPalavra("d");
            break;
        case "e":
            console.log("E");
            jogo.tentaPalavra("e");
            break;
        case "f":
            console.log("F");
            jogo.tentaPalavra("f");
            break;
        case "g":
            console.log("G");
            jogo.tentaPalavra("g");
            break;
        case "h":
            console.log("H");
            jogo.tentaPalavra("h");
            break;
        case "i":
            console.log("I");
            jogo.tentaPalavra("i");
            break;
        case "j":
            console.log("J");
            jogo.tentaPalavra("j");
            break;
        case "k":
            console.log("K");
            jogo.tentaPalavra("k");
            break;
        case "l":
            console.log("L");
            jogo.tentaPalavra("l");
            break;
        case "m":
            console.log("M");
            jogo.tentaPalavra("m");
            break;
        case "n":
            console.log("N");
            jogo.tentaPalavra("n");
            break;
        case "o":
            console.log("O");
            jogo.tentaPalavra("o");
            break;
        case "p":
            console.log("P");
            jogo.tentaPalavra("p");
            break;
        case "q":
            console.log("Q");
            jogo.tentaPalavra("q");
            break;
        case "r":
            console.log("R");
            jogo.tentaPalavra("r");
            break;
        case "s":
            console.log("S");
            jogo.tentaPalavra("s");
            break;
        case "t":
            console.log("T");
            jogo.tentaPalavra("t");
            break;
        case "u":
            console.log("U");
            jogo.tentaPalavra("u");
            break;
        case "v":
            console.log("V");
            jogo.tentaPalavra("v");
            break;
        case "w":
            console.log("W");
            jogo.tentaPalavra("w");
            break;
        case "x":
            console.log("X");
            jogo.tentaPalavra("x");
            break;
        case "y":
            console.log("Y");
            jogo.tentaPalavra("y");
            break;
        case "z":
            console.log("Z");
            jogo.tentaPalavra("z");
            break;
        default:
            console.log("Outra tecla");
    }
    if (teclaCode == "Space" || teclaCode == "Enter") {
        jogo.resetGame();
    }
}