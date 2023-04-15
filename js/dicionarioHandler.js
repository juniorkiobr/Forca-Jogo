async function getSignificado(palavra) {
    let definicao = await fetch("https://api.dicionario-aberto.net/word/" + palavra + "/1?format=json");
    // console.log(await fetch("https://dicio-api-ten.vercel.app/v2/" + palavra + "/"));
    window.awaitFetch = true;
    let json = await definicao.json();
    window.awaitFetch = false;
    return json[0] ? xmlTranslate(json[0].xml) : null;
}

function fillSignificado(dicionario) {
    let palavra = document.getElementById("palavra");
    let significado = document.getElementById("significado");
    let etimologia = document.getElementById("etimologia");
    palavra.innerHTML = dicionario.palavra;
    significado.innerHTML = "";
    etimologia.innerHTML = dicionario.etimologia;
    for (let i = 0; i < dicionario.sentidos.length; i++) {
        const element = dicionario.sentidos[i];
        let extra = false;
        if (element.grupoGramatical != null) {
            significado.innerHTML += "<p><strong>" + element.grupoGramatical + "</strong></p>";
            extra = true;
        }
        if (element.sentido.length > 0) {
            significado.innerHTML += "<p><em>" + element.sentido.join(" ") + "</em></p>";
            extra = true;

        }
        for (const item in element.definicao) {
            // console.log(element.definicao[item], extra);
            significado.innerHTML += "<p " + (extra ? 'class=" tabulacao "' : "") + "> " + element.definicao[item] + "</p>";

        }
    }
}
function xmlTranslate(xml) {
    let obj = {};
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(xml, "text/xml");

    obj.palavra = xmlDoc.getElementsByTagName("entry")[0].getAttribute("id");
    obj.sentidos = [];
    let senses = xmlDoc.getElementsByTagName("sense");
    for (let i = 0; i < senses.length; i++) {
        let sentido = {};
        let uso = [];

        // console.log(senses[i].getElementsByTagName("def")[0]?.innerHTML);
        sentido.grupoGramatical = senses[i].getElementsByTagName("gramGrp")[0]?.innerHTML;
        sentido.definicao = senses[i].getElementsByTagName("def")[0]?.innerHTML.replace(/(_\.)+/g, "</em>").replace(/_/g, "<em>").split("\n");
        sentido.definicao.pop();
        sentido.definicao.shift();
        sentido.definicao.map((item, index) => {
            sentido.definicao[index] = (index + 1) + ". " + item;
        })

        for (let j = 0; j < senses[i].getElementsByTagName("usg").length; j++) {
            const element = senses[i].getElementsByTagName("usg")[j];
            uso.push(element.innerHTML);

        }
        sentido.sentido = uso;

        // sentido.definicao = senses[i].childNodes[5].nodeValue;
        // sentido.exemplos = [];
        // for (let j = 0; j < xmlDoc.getElementsByTagName("ex")[i].childNodes.length; j++) {
        //     sentido.exemplos.push(xmlDoc.getElementsByTagName("ex")[i].childNodes[j].nodeValue);
        // }
        obj.sentidos.push(sentido);
    }
    obj.etimologia = xmlDoc.getElementsByTagName("etym")[0]?.innerHTML;
    console.log(obj);
    return obj;


    // let significado = xmlDoc.getElementsByTagName("def")[0].childNodes[0].nodeValue;
}