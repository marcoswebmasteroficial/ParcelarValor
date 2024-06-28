const objParcelas = {
    2: { juros: 1.60 },
    3: { juros: 10.0 },
    4: { juros: 1.60 },
    5: { juros: 1.60 },
    6: { juros: 1.60 },
    7: { juros: 1.60 },
    8: { juros: 1.60 },
    9: { juros: 1.60 },
    10: { juros: 1.60 },
    11: { juros: 1.60 },
    12: { juros: 1.60 },
    18: { juros: 1.66 },
    24: { juros: 1.64 },
    36: { juros: 1.62 },
    48: { juros: 1.70 },
    60: { juros: 1.79 }
};

function initParcelasSelect() {
    const select = document.querySelector("select");
    const fragment = document.createDocumentFragment();

    for (let parcela in objParcelas) {
        let option = document.createElement('option');
        option.value = parcela;
        option.innerText = `${parcela} Meses`;
        fragment.appendChild(option);
    }

    select.appendChild(fragment);
}

function formatarMoeda(valor) {
    return "R$ " + parseFloat(valor).toFixed(2).replace(".", ",");
}

const CALCULAR = {
    prestacoes: function () {
        const valorInput = document.getElementById("txt_valor").value.replace("R$ ", "").replace(".", "").replace(",", ".");
        const valor = parseFloat(valorInput);
        const parcelas = parseInt(document.getElementById("parcelas").value);
        const tipoJuros = parseInt(document.getElementById("tiposjuros").value);
        const taxaJuros = parseFloat(objParcelas[parcelas].juros);
        const parcial = taxaJuros / 100;
        let valorParcela, valorTotalDoBem, jurosTotais;

        if (isNaN(valor) || isNaN(parcelas) || isNaN(tipoJuros)) {
            console.error("Valores inválidos!");
            return;
        }

        if (tipoJuros === 1) {
            valorParcela = valor * Math.pow(1 + parcial, parcelas);
            valorTotalDoBem = valorParcela;
            jurosTotais = valorParcela - valor;
        } else if (tipoJuros === 2) {
            valorTotalDoBem = valor + parcial * valor * parcelas;
            valorParcela = valorTotalDoBem / parcelas;
            jurosTotais = valorTotalDoBem - valor;
        }

        document.getElementById("juros").value = `${taxaJuros.toFixed(2)}%`;
        document.getElementById("jurostotais").innerText = formatarMoeda(jurosTotais);
        document.getElementById("parcelas_txt").innerText = `${parcelas}x`;
        document.getElementById("resultado").innerText = formatarMoeda(valorParcela);
        document.getElementById("resultado_aplicacaoes").innerText = formatarMoeda(valor);
        document.getElementById("bem").innerText = formatarMoeda(valorTotalDoBem);
    },
};

document.getElementById("tiposjuros").addEventListener("change", CALCULAR.prestacoes);
document.getElementById("parcelas").addEventListener("change", CALCULAR.prestacoes);
document.getElementById("txt_valor").addEventListener("keyup", function (e) {
    e.target.value = formatarMoeda(e.target.value.replace(/\D/g, "") / 100);
    CALCULAR.prestacoes();
});

initParcelasSelect();
CALCULAR.prestacoes();
