const palavras = {
    _segredos: [
        "Amor",
        "Bolo",
        "Cão",
        "Dado",
        "Ego",
        "Fato",
        "Gato",
        "Hora",
        "Ímpar",
        "Jato",
        "Kilo",
        "Lã",
        "Mito",
        "Nós",
        "Ovo",
        "Pão",
        "Quem",
        "Riso",
        "Sol",
        "Tempo",
        "Uva",
        "Vida",
        "Xará",
        "Yoga",
        "Zero"
    ],
    sorteiaPalavra: function () {
        const indice = Math.floor(Math.random() * this._segredos.length)
        return this._segredos[indice]
    }
}