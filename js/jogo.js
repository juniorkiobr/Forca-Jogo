var jogo = {
    _canvas: null,
    _posPalavra: [95, 180],
    _tamCampoPalavra: 30,
    _espPalavra: 10,
    _maxPalavra: 0,
    _erros: 0,
    _palavra: "",
    _tentadas: [],
    _exibidas: [],
    _acertos: [],
    _gameOver: false,
    _dicionario: null,
    set_canvas: function (canvas, width, height) {
        this._loading = document.getElementById("loading");

        // loading.style.display = "block";
        this._loading.style.width = width + "px";
        this._loading.style.height = height + "px";

        this._canvas = formas.set_canvas(canvas, width, height);

    },
    calculaTamMaxPalavra: function () {
        let maximo = 0;
        for (let i = this._posPalavra[0]; i < (this._canvas.width + this._tamCampoPalavra + this._espPalavra); i += this._tamCampoPalavra + this._espPalavra) {
            maximo++;
        }
        if (maximo < this._maxPalavra) {
            this._maxPalavra = maximo;
            // this._palavra = "";
            this.resetGame();
        } else if (maximo > 0) {
            this._maxPalavra = maximo;
        }
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
        jogo._canvas.desenhaRetangulo(x, y, 4, 100, cor);
        jogo._canvas.desenhaRetangulo(x, y, 55, 4, cor);
        jogo._canvas.desenhaRetangulo(70, y, 4, 20, cor);
    },
    definirPalavra: async function () {
        this.calculaTamMaxPalavra();
        if (this._gameOver) { return; };
        this._canvas.desenhaRetangulo(0, 0, this._canvas.width, this._canvas.height, colors.white);
        this.desenhaForca(15, 100, colors.black);

        if ((this._palavra == null || this._palavra == "") && !this._carregando) {
            this._carregando = true;

            // let palavra = await fetch("https://api.dicionario-aberto.net/random");
            let palavra = "";
            // let json = await palavra.json();

            while (this._dicionario == null) {
                if (window.awaitFetch == true) { continue; }
                palavra = getRandomWord(this._maxPalavra);
                this._dicionario = await getSignificado(palavra);
            }

            if (palavra != null && palavra != "" && palavra.length <= this._maxPalavra && (jogo._palavra == "" || jogo._palavra == null)) {
                let tmp = palavra.toLowerCase();

                // Linha para remover acentos
                tmp = tmp.normalize("NFD").replace(/([\u0300-\u036f])+/g, "");
                console.log(tmp);

                this._palavra = tmp;
            }

            this._carregando = false;
            this._loading.style.display = "none";
            // palavra.then(function (response) {
            //     // console.log(response);
            //     response.json().then(function (json) {

            //     });
            // });
        }
    },
    desenhaPalavra: function () {
        let inicioX = this._posPalavra[0];
        let inicioY = this._posPalavra[1];

        for (let i = 0; i < this._palavra.length; i++) {
            this._exibidas[i] = "_";
            // const element = palavra[i];
            jogo._canvas.desenhaRetangulo(inicioX, inicioY, this._tamCampoPalavra, 3, colors.black);
            if (this._acertos.indexOf(this._palavra[i]) != -1) {
                this._canvas.desenhaTexto(this._palavra[i], inicioX + this._tamCampoPalavra / 2, inicioY - 10, colors.black, "bold 20px Arial", "center");
                this._exibidas[i] = this._palavra[i];
            }
            inicioX += this._tamCampoPalavra + this._espPalavra;

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
                this._canvas.desenhaCirculo(valor[0], valor[1], valor[2], valor[3]);
            } else {
                this._canvas.desenhaRetangulo(valor[0], valor[1], valor[2], valor[3], valor[4], valor[5]);
            }
        }
    },
    update: async function () {

        await this.definirPalavra();

        if (!this._gameOver && this._palavra != null && this._palavra != "") {

            let palavraTentada = document.getElementById("palavrasTentadas");

            this.desenhaErros();
            this.desenhaPalavra(this._palavra);
            palavraTentada.innerHTML = "Palavras tentadas:. " + this._tentadas.join(", ");
            if (this._exibidas.join("") == this._palavra) {
                this._gameOver = true;
                this._canvas.desenhaRetangulo(0, 0, this._canvas.width, this._canvas.height, colors.black);
                this._canvas.desenhaTexto("Você ganhou!", this._canvas.width / 2 - 50, this._canvas.height / 2, colors.white, "bold 20px Arial", "center");
                this._canvas.desenhaTexto("A palavra era: " + this._palavra, this._canvas.width / 2 - 50, this._canvas.height / 2 + 25, colors.white, "bold 20px Arial", "center");
                this._canvas.desenhaTexto("Aperte 'Enter' jogar novamente", this._canvas.width / 2 - 50, this._canvas.height / 2 + 50, colors.white, "bold 20px Arial", "center");
                fillSignificado(this._dicionario);


            } else if (this._erros >= 6) {
                this._gameOver = true;
                this._canvas.desenhaRetangulo(0, 0, this._canvas.width, this._canvas.height, colors.black);
                this._canvas.desenhaTexto("Você perdeu!", this._canvas.width / 2 - 50, this._canvas.height / 2, colors.white, "bold 20px Arial", "center");
                this._canvas.desenhaTexto("A palavra era: " + this._palavra, this._canvas.width / 2 - 50, this._canvas.height / 2 + 25, colors.white, "bold 20px Arial", "center");
                this._canvas.desenhaTexto("Aperte 'Enter' jogar novamente", this._canvas.width / 2 - 50, this._canvas.height / 2 + 50, colors.white, "bold 20px Arial", "center");
                fillSignificado(this._dicionario);


            }
        }

    },
    resetGame: function () {
        this._gameOver = false;
        this._loading.style.removeProperty("display");

        this._erros = 0;
        this._acertos = [];
        this._exibidas = [];
        this._palavra = "";
        this._dicionario = null;
        let significado = document.getElementById("significado");
        significado.innerHTML = "";
        let palavra = document.getElementById("palavra");
        palavra.innerHTML = "";
        let etimologia = document.getElementById("etimologia");
        etimologia.innerHTML = "";
        this._tentadas = [];
        let palavrasTentadas = document.getElementById("palavrasTentadas");

    },

};	