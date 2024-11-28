var estados = {
    "saoPaulo": [["BFA", "GKI"], ["QSN", "QSZ"]],
    "espiritoSanto": [["RBA", "RBJ"], ["QRB", "QRM"], ["PPA", "PPZ"], ["OYD", "OYK"], ["OVH", "OVL"], ["OVE", "OVF"], ["OCV", "ODT"], ["MOX", "MTZ"], ["RQM", "RQV"]],
    "rioDeJaneiro": [["RIO", "RIO"], ["RIP", "RKV"], ["KMF", "LVE"]]
};

var imagens = {
    "placeholder": { brasao: "Imagens/brasao-placeholder.png", bandeira: "Imagens/bandeira-placeholder.png" },
    "saoPaulo": { brasao: "Imagens/sao-paulo-brasao.png", bandeira: "Imagens/sao-paulo-bandeira.png" },
    "espiritoSanto": { brasao: "Imagens/espirito-santo-brasao.png", bandeira: "Imagens/espirito-santo-bandeira.png" },
    "rioDeJaneiro": { brasao: "Imagens/rio-de-janeiro-brasao.png", bandeira: "Imagens/rio-de-janeiro-bandeira.png" },
    "naoTem": { brasao: "Imagens/nao-tem.jpg", bandeira: "Imagens/nao-tem.jpg" }
};

var placadigitar = document.getElementById("placa-input");
var verificarbotao = document.getElementById("verificar-btn");
var resultado = document.getElementById("resultado");
var brasaoimagem = document.getElementById("brasao-img");
var bandeiraimagem = document.getElementById("bandeira-img");

verificarbotao.onclick = function () {
    var placa = placadigitar.value.toUpperCase();

    if (placa.length !== 7 || !/^[A-Z]{3}[0-9][A-Z][0-9]{2}$/.test(placa)) {
        resultado.textContent = "Formato inválido! Use o formato AAA0A00.";
        brasaoimagem.src = imagens["naoTem"].brasao;
        bandeiraimagem.src = imagens["naoTem"].bandeira;
        return;
    }

    var letrasPlaca = placa.slice(0, 3);
	
    var estadoEncontrado = "naoTem";

    for (var estado in estados) {
        var intervalos = estados[estado];
        for (var i = 0; i < intervalos.length; i++) {
            var inicio = intervalos[i][0];
            var fim = intervalos[i][1];
            if (letrasPlaca >= inicio && letrasPlaca <= fim) {
                estadoEncontrado = estado;
                break;
            }
        }
        if (estadoEncontrado !== "naoTem") {
            break;
        }
    }

    brasaoimagem.src = imagens[estadoEncontrado].brasao;
    bandeiraimagem.src = imagens[estadoEncontrado].bandeira;

    if (estadoEncontrado === "naoTem") {
        resultado.textContent = "Placa não pertence a São Paulo, Espírito Santo ou Rio de Janeiro.";
    } else if (estadoEncontrado === "saoPaulo") {
        resultado.textContent = "A placa pertence ao estado de São Paulo.";
    } else if (estadoEncontrado === "espiritoSanto") {
        resultado.textContent = "A placa pertence ao estado de Espírito Santo.";
    } else if (estadoEncontrado === "rioDeJaneiro") {
        resultado.textContent = "A placa pertence ao estado do Rio de Janeiro.";
    }
};
