const objParcelas = {
  2: { juros: 1.6 },
  3: { juros: 10.0 },
  4: { juros: 1.6 },
  5: { juros: 1.6 },
  6: { juros: 1.6 },
  7: { juros: 1.6 },
  8: { juros: 1.6 },
  9: { juros: 1.6 },
  10: { juros: 1.6 },
  11: { juros: 1.6 },
  12: { juros: 1.6 },
  18: { juros: 1.66 },
  24: { juros: 1.64 },
  36: { juros: 1.62 },
  48: { juros: 1.7 },
  60: { juros: 1.79 },
};

function initParcelasSelect() {
  const select = document.querySelector("select");
  const fragment = document.createDocumentFragment();

  for (let parcela in objParcelas) {
    const option = document.createElement("option");
    option.value = parcela;
    option.innerText = `${parcela} Meses`;
    fragment.appendChild(option);
  }

  select.appendChild(fragment);
}

function formatarMoeda(valor) {
  return parseFloat(valor).toFixed(2).replace(".", ",");
}

function obterValorFormatado(id) {
  return parseFloat(
    document
      .getElementById(id)
      .value.replace("R$ ", "")
      .replace(".", "")
      .replace(",", ".")
  );
}

function exibirResultados(
  taxaJuros,
  jurosTotais,
  parcelas,
  valorParcela,
  valor,
  valorTotalDoBem
) {
  document.getElementById("juros").value = `${taxaJuros.toFixed(2)}%`;
  document.getElementById("jurostotais").innerText = formatarMoeda(jurosTotais);
  document.getElementById("parcelas_txt").innerText = `${parcelas}x`;
  document.getElementById("resultado").innerText = formatarMoeda(valorParcela);
  document.getElementById("resultado_aplicacaoes").innerText =
    formatarMoeda(valor);
  document.getElementById("bem").innerText = formatarMoeda(valorTotalDoBem);
}

const CALCULAR = {
  prestacoes: function () {
    const valor = obterValorFormatado("txt_valor");
    const parcelas = parseInt(document.getElementById("parcelas").value);
    const tipoJuros = parseInt(document.getElementById("tiposjuros").value);
    const taxaJuros = parseFloat(objParcelas[parcelas]?.juros || 0);
    const parcial = taxaJuros / 100;

    if (
      isNaN(valor) ||
      isNaN(parcelas) ||
      isNaN(tipoJuros) ||
      isNaN(taxaJuros)
    ) {
      console.error("Valores inválidos!");
      return;
    }

    let valorParcela, valorTotalDoBem, jurosTotais;
    if (tipoJuros === 1) {
      valorParcela = valor * Math.pow(1 + parcial, parcelas);
      valorTotalDoBem = valorParcela;
      jurosTotais = valorParcela - valor;
    } else if (tipoJuros === 2) {
      valorTotalDoBem = valor + parcial * valor * parcelas;
      valorParcela = valorTotalDoBem / parcelas;
      jurosTotais = valorTotalDoBem - valor;
    }

    exibirResultados(
      taxaJuros,
      jurosTotais,
      parcelas,
      valorParcela,
      valor,
      valorTotalDoBem
    );
  },
};

function adicionarEventos() {
  document
    .getElementById("tiposjuros")
    .addEventListener("change", CALCULAR.prestacoes);
  document
    .getElementById("parcelas")
    .addEventListener("change", CALCULAR.prestacoes);
  document.getElementById("txt_valor").addEventListener("keyup", function (e) {
    e.target.value = formatarMoeda(e.target.value.replace(/\D/g, "") / 100);
    CALCULAR.prestacoes();
  });
}

initParcelasSelect();
document.getElementById("txt_valor").value = "0,00";
adicionarEventos();
CALCULAR.prestacoes();
