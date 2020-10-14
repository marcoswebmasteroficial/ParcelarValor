var objParcelas = {
    2: {
        juros: 1.60
    },
    3: {
        juros: 1.60
    },
    4: {
        juros: 1.60
    },
    5: {
        juros: 1.60
    },
    6: {
        juros: 1.60
    },
    7: {
        juros: 1.60
    },
    8: {
        juros: 1.60
    },
    9: {
        juros: 1.60
    },
    10: {
        juros: 1.60
    },
    11: {
        juros: 1.60
    },
    11: {
        juros: 1.60
    },
    12: {
        juros: 1.60
    },
    18: {
        juros: 1.66
    },
    24: {
        juros: 1.64
    },
    36: {
        juros: 1.62
    },
    48: {
        juros: 1.70
    },
    60: {
        juros: 1.79
    }
};

for (parcela in objParcelas) {
    let option = document.createElement('option');
    option.value = parcela;
    option.innerText = parcela + ' Meses';
    document.querySelector("select").appendChild(option);
}
const CALCULAR = {
    prestacoes: function() {
        let $this = document.getElementById("valor");
        let str = parseFloat($this.value);
        let parcelas = parseInt(document.getElementById("parcelas").value);
        let tipoJuros = parseInt(document.getElementById("tiposjuros").value);
        let taxaJuros = parseFloat(objParcelas[parcelas].juros);
        var parcial = parseFloat(taxaJuros) / 100; //taxa de juros anual
        var valorParcela;
        var valorTotalDoBem;
        var jurosTotais;
        if (tipoJuros == 1) {
            valorParcela = (str * Math.pow((1 + parcial), parcelas) / parcelas).toFixed(2);
            valorTotalDoBem = valorParcela * parcelas;
            jurosTotais = (str * Math.pow((1 + parcial), parcelas) - str).toFixed(2);
        } else if (tipoJuros == 2) {
            valorTotalDoBem = parseFloat(str + parcial * str * parcelas);
            valorParcela = parseFloat(valorTotalDoBem / parcelas).toFixed(2);
            jurosTotais = (parseFloat(valorTotalDoBem / parcelas) - str).toFixed(2);
        }
        document.getElementById("juros").value = taxaJuros + '%';
        document.getElementById("jurostotais").innerText = jurosTotais;
        document.getElementById("parcelas_txt").innerText = 'Dividido em :' + parcelas + ' vezes';
        document.getElementById("resultado").innerText = parcelas + 'x' + valorParcela;
        document.getElementById("bem").innerText = valorTotalDoBem.toFixed(2);
    }
}
document.getElementById("tiposjuros").addEventListener("change", function(e) {
    CALCULAR.prestacoes();
});
document.getElementById("parcelas").addEventListener("change", function(e) {
    CALCULAR.prestacoes();
});
document.getElementById("valor").addEventListener("blur", function(e) {
    CALCULAR.prestacoes();
});
