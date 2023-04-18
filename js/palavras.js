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
    do {
        palavra = arquivo[Math.floor(Math.random() * arquivo.length)];

    }
    while (palavra.length > tamMaximo)
    console.log("palavras.js: ", palavra);
    return palavra;
}