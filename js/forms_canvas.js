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
    set_canvas: function (canvas, width, height) {
        this._canvas = canvas;
        this._canvas.width = width;
        this._canvas.height = height;
        this._pincel = this._canvas.getContext("2d");

    },
    desenhaForca: function (x, y, cor) {
        jogo.desenhaRetangulo(x, y, 4, 100, cor);
        jogo.desenhaRetangulo(x, y, 55, 4, cor);
        jogo.desenhaRetangulo(70, y, 4, 20, cor);
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
        // jogo.desenhaCirculo(71, 118, 10, colors.red);
        // jogo.desenhaRetangulo(70, 127, 4, 25, colors.red);
        // jogo.desenhaRetangulo(70, 135, 20, 4, colors.red, 40);
        // jogo.desenhaRetangulo(73, 135, -20, 4, colors.red, -40);
        // jogo.desenhaRetangulo(70, 155, 20, 4, colors.red, 40);
        // jogo.desenhaRetangulo(73, 155, -20, 4, colors.red, -40);
    },
    update: function () {
        this.desenhaRetangulo(0, 0, this._canvas.width, this._canvas.height, colors.white);
        this.desenhaForca(15, 100, colors.black);
        this.desenhaErros();
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
    desenhaTexto: function (texto, x, y, cor) {
        this._pincel.fillStyle = cor;
        this._pincel.font = "30px Arial";
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