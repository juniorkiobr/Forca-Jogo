var colors = {
    red: "red",
    lightred: "lightred",
    darkred: "darkred",
    green: "green",
    lightgreen: "lightgreen",
    darkgreen: "darkgreen",
    blue: "blue",
    lightblue: "lightblue",
    darkblue: "darkblue",
    yellow: "yellow",
    lightyellow: "lightyellow",
    darkyellow: "darkyellow",
    black: "black",
    white: "white",
    gray: "gray",
    lightgray: "lightgray",
    darkgray: "darkgray",
    orange: "orange",
    purple: "purple",
    brown: "brown",
    pink: "pink",
    cyan: "cyan",
    magenta: "magenta",
    lime: "lime",
    maroon: "maroon",
    olive: "olive",
    navy: "navy",
    teal: "teal",
    aqua: "aqua",
    fuchsia: "fuchsia",
    silver: "silver",
    gold: "gold"
}

var jogo = {
    _canvas: null,
    _pincel: null,
    _erros: 0,
    _palavra: "",
    _tentadas: [],
    _exibidas: [],
    _acertos: [],
    _gameOver: false,
    _dicionario: null,
    set_canvas: function (canvas, width, height) {
        this._canvas = canvas;
        this._canvas.width = width;
        this._canvas.height = height;
        this._pincel = this._canvas.getContext("2d");

    },
    tentaPalavra: function (letra) {

        if (this._palavra.indexOf(letra) != -1 && this._acertos.indexOf(letra) == -1) {
            this._acertos.push(letra);
            letra = '<verde>' + letra + "</verde>";
        } else {
            this._erros++;
            letra = '<vermelho>' + letra + "</vermelho>";
        }
        this._tentadas.push(letra);

        // this.update();
    },
    desenhaForca: function (x, y, cor) {
        jogo.desenhaRetangulo(x, y, 4, 100, cor);
        jogo.desenhaRetangulo(x, y, 55, 4, cor);
        jogo.desenhaRetangulo(70, y, 4, 20, cor);
    },
    definirPalavra: async function () {
        if ((this._palavra == null || this._palavra == "") && !this._gameOver && !this._carregando) {
            this._carregando = true;

            let palavra = await fetch("https://api.dicionario-aberto.net/random");
            let json = await palavra.json();
            console.log(json);
            console.log(json.word);
            this._dicionario = await getSignificado(json.word);

            if (json.word != null && json.word != "" && json.word.length <= 12 && (jogo._palavra == "" || jogo._palavra == null)) {
                let tmp = json.word.toLowerCase();

                // Linha para remover acentos
                tmp = tmp.normalize("NFD").replace(/([\u0300-\u036f])+/g, "");
                console.log(tmp);

                jogo._palavra = tmp;
            }

            this._carregando = false;
            // palavra.then(function (response) {
            //     // console.log(response);
            //     response.json().then(function (json) {

            //     });
            // });
        }
    },
    desenhaPalavra: function () {
        let inicioX = 95;
        let inicioY = 180;
        let tamanho = 30;
        let espaco = 10;
        for (let i = 0; i < this._palavra.length; i++) {
            this._exibidas[i] = "_";
            // const element = palavra[i];
            jogo.desenhaRetangulo(inicioX, inicioY, tamanho, 3, colors.black);
            if (this._acertos.indexOf(this._palavra[i]) != -1) {
                this.desenhaTexto(this._palavra[i], inicioX + tamanho / 2, inicioY - 10, colors.black, "bold 20px Arial", "center");
                this._exibidas[i] = this._palavra[i];
            }
            inicioX += tamanho + espaco;

        }
    },
    desenhaErros: function () {
        let valores = [
            [71, 118, 10, colors.red, 0],
            [70, 127, 4, 25, colors.red, 0],
            [70, 135, 20, 4, colors.red, 40],
            [73, 135, -20, 4, colors.red, -40],
            [70, 155, 20, 4, colors.red, 40],
            [73, 155, -20, 4, colors.red, -40]
        ];
        if (this._erros > valores.length) {
            this._erros = valores.length;
        }

        for (let i = 0; i < this._erros; i++) {
            let valor = valores[i];
            if (i == 0) {
                this.desenhaCirculo(valor[0], valor[1], valor[2], valor[3]);
            } else {
                this.desenhaRetangulo(valor[0], valor[1], valor[2], valor[3], valor[4], valor[5]);
            }
        }
    },
    update: async function () {
        await this.definirPalavra();

        if (!this._gameOver && this._palavra != null && this._palavra != "") {
            let palavraTentada = document.getElementById("palavrasTentadas");

            this.desenhaRetangulo(0, 0, this._canvas.width, this._canvas.height, colors.white);
            this.desenhaForca(15, 100, colors.black);
            this.desenhaErros();
            this.desenhaPalavra(this._palavra);
            palavraTentada.innerHTML = "Palavras tentadas:. " + this._tentadas.join(", ");
            if (this._exibidas.join("") == this._palavra) {
                this._gameOver = true;
                this.desenhaRetangulo(0, 0, this._canvas.width, this._canvas.height, colors.black);
                this.desenhaTexto("Você ganhou!", this._canvas.width / 2 - 50, this._canvas.height / 2, colors.white, "bold 20px Arial", "center");
                this.desenhaTexto("A palavra era: " + this._palavra, this._canvas.width / 2 - 50, this._canvas.height / 2 + 25, colors.white, "bold 20px Arial", "center");
                this.desenhaTexto("Aperte 'Enter' jogar novamente", this._canvas.width / 2 - 50, this._canvas.height / 2 + 50, colors.white, "bold 20px Arial", "center");
                fillSignificado(this._dicionario);


            } else if (this._erros >= 6) {
                this._gameOver = true;
                this.desenhaRetangulo(0, 0, this._canvas.width, this._canvas.height, colors.black);
                this.desenhaTexto("Você perdeu!", this._canvas.width / 2 - 50, this._canvas.height / 2, colors.white, "bold 20px Arial", "center");
                this.desenhaTexto("A palavra era: " + this._palavra, this._canvas.width / 2 - 50, this._canvas.height / 2 + 25, colors.white, "bold 20px Arial", "center");
                this.desenhaTexto("Aperte 'Enter' jogar novamente", this._canvas.width / 2 - 50, this._canvas.height / 2 + 50, colors.white, "bold 20px Arial", "center");
                fillSignificado(this._dicionario);


            }
        }

    },
    resetGame: function () {
        this._gameOver = false;
        this._erros = 0;
        this._acertos = [];
        this._exibidas = [];
        this._palavra = "";
        this._dicionario = "";
        let significado = document.getElementById("significado");
        significado.innerHTML = "";
        let palavra = document.getElementById("palavra");
        palavra.innerHTML = "";
        let etimologia = document.getElementById("etimologia");
        etimologia.innerHTML = "";
        this._tentadas = [];
        let palavrasTentadas = document.getElementById("palavrasTentadas");

    },
    desenhaRetangulo: function (x, y, largura, altura, cor, angulo = 0) {
        this._pincel.save();
        if (angulo != 0) {
            this._pincel.translate(x + largura / 2, y + altura / 2);
            this._pincel.rotate(angulo * Math.PI / 180);
            x = -largura / 2;
            y = -altura / 2;

        }
        // this._pincel.translate(angulo * Math.PI / 4, 0);
        this._pincel.fillStyle = cor;
        this._pincel.fillRect(x, y, largura, altura);
        this._pincel.restore();
    },
    desenhaTriangulo: function (x, y, base, altura, cor) {
        this._pincel.fillStyle = cor;
        this._pincel.beginPath();
        this._pincel.moveTo(x, y);
        this._pincel.lineTo(x + base / 2, y + altura);
        this._pincel.lineTo(x - base / 2, y + altura);
        this._pincel.fill();
    },
    desenhaCirculo: function (x, y, raio, cor) {
        this._pincel.fillStyle = cor;
        this._pincel.beginPath();
        this._pincel.arc(x, y, raio, 0, 2 * Math.PI);
        this._pincel.fill();
    },
    desenhaQuadrado: function (x, y, tamanho, cor) {
        this.desenhaRetangulo(x, y, tamanho, tamanho, cor);
    },
    desenhaTexto: function (texto, x, y, cor, fonte = "30px Arial", alinhamento = "left") {
        this._pincel.fillStyle = cor;
        this._pincel.font = fonte;
        this._pincel.textAlign = alinhamento;
        this._pincel.fillText(texto, x, y);
    },
    desenhaPoligono: function (x, y, raio, lados, cor) {
        this._pincel.fillStyle = cor;
        this._pincel.beginPath();
        this._pincel.moveTo(x + raio, y);
        for (let i = 1; i < lados; i++) {
            let angulo = (2 * Math.PI * i) / lados;
            let x1 = x + raio * Math.cos(angulo);
            let y1 = y + raio * Math.sin(angulo);
            this._pincel.lineTo(x1, y1);
        }
        this._pincel.fill();
    }
};	