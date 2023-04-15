// Abrir arquivo /palavras_ptbr.txt em uma função
const arquivo = abrirArquivo();

function abrirArquivo() {
    var arquivo = new XMLHttpRequest();
    arquivo.open("GET", "palavras_ptbr.txt", false);
    arquivo.send(null);
    return arquivo.responseText.split("\n");
}

function getRandomWord(tamMaximo) {
    let palavra = "";
    while (palavra.length == 0 && palavra.length < tamMaximo) {
        palavra = arquivo[Math.floor(Math.random() * arquivo.length)];
    }
    console.log("palavras.js: ", palavra);
    return palavra;
}