async function getSignificado(palavra) {
    palavra = palavra.toLowerCase();

    try {
        // Linha para remover acentos
        palavra = palavra.normalize("NFD").replace(/([\u0300-\u036f])+/g, "");
        window.awaitFetch = true;

        let definicao = await fetch("https://api-dicio-juniorkiobr.vercel.app/api/dicionario?word=" + palavra);
        let json = await definicao.json();
        window.awaitFetch = false;
        if (json && json.length == 0 && (json.status_code && json.status_code != 200) || json.error || (json.definicao && json.definicao.length == 0)) {
            return null;
        }

        // return json[0] ? xmlTranslate(json[0].xml) : null;
        return json ? json : null;
    } catch (error) {
        // console.error(error);
        return null;
    }
}

function showDict(json) {
    fillPalavra(json.palavra);
    fillDefinicao(json.significados);

}

function fillPalavra(palavra) {
    let palavraDiv = document.getElementById("palavra");
    palavraDiv.innerHTML = `<h1>${palavra}</h1>`;
}

function fillDefinicao(definicao, singular = false) {
    let significadoDiv = document.getElementById("significado");
    if (singular) {
        significadoDiv.innerHTML += "<div id='singular'></div>";
        significadoDiv = document.getElementById("singular");
        significadoDiv.innerHTML += `<h2>Significado de ${definicao.palavra}</h2>`;
        definicao = definicao.significados;
    }
    for (const dictionary in definicao) {
        const element = definicao[dictionary];
        if (element.singular) continue;
        if (element.classificacao != "definicao" && element.classificacao != "classificacao") {
            if (element.classificacao == "etimologia" && element.definicao) {
                if (singular) {
                    significadoDiv.innerHTML += `<h3><b>Etimologia:</b> <em>${element.definicao}</em></h3>`;
                } else {
                    fillEtimologia(element.definicao);
                }
                continue;
            } else {
                significadoDiv.innerHTML += `<h3>${element.classificacao}</h3>`;

            }
        }
        significadoDiv.innerHTML += "<p>" + element.definicao + "</p>";
    }
    // console.log(definicao[0].singular)
    if (definicao[0]?.singular) {
        fillDefinicao(definicao[0].singular, true);
    }

}

function fillEtimologia(etimologia) {
    let etimologiaDiv = document.getElementById("etimologia");
    etimologiaDiv.innerHTML = `<h3><b>Etimologia<b>: <em>${etimologia}</em></h3>`;
}

