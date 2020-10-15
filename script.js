var objParcelas = {
	2: {
		juros: 1.60
	},
	3: {
		juros: 10.0
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
	prestacoes: function () {
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
			valorParcela = (str * Math.pow((1 + parcial), parcelas) / parcelas);
			valorTotalDoBem = valorParcela * parcelas;
			jurosTotais = (str * Math.pow((1 + parcial), parcelas) - str);
		} else if (tipoJuros == 2) {
			valorTotalDoBem = parseFloat(str + parcial * str * parcelas);
			valorParcela = parseFloat(valorTotalDoBem / parcelas);
			jurosTotais = parseFloat(valorTotalDoBem - str);
		}
		document.getElementById("juros").value = taxaJuros + '%';
		document.getElementById("jurostotais").innerText = jurosTotais.toLocaleString('pt-br', {
			minimumFractionDigits: 2
		});
		document.getElementById("parcelas_txt").innerText = parcelas + 'x';
		document.getElementById("resultado").innerText = valorParcela.toLocaleString('pt-br', {
			minimumFractionDigits: 2
		});
		document.getElementById("resultado_aplicacaoes").innerText = str.toLocaleString('pt-br', {
			minimumFractionDigits: 2
		});
		document.getElementById("resultado_aplicacao").innerText = str.toLocaleString('pt-br', {
			minimumFractionDigits: 2
		});

		document.getElementById("bem").innerText = valorTotalDoBem.toLocaleString('pt-br', {
			minimumFractionDigits: 2
		});
	}
}
document.getElementById("tiposjuros").addEventListener("change", function (e) {
	CALCULAR.prestacoes();
});
document.getElementById("parcelas").addEventListener("change", function (e) {
	CALCULAR.prestacoes();
});
document.getElementById("valor").addEventListener("blur", function (e) {
	CALCULAR.prestacoes();
});
document.getElementById("valor").addEventListener("keyup", function (e) {
let val,temp, neg;
[val ,temp, neg] = [e.target.value,e.target.value+ '',false];
temp = parseInt(temp.replace(/\D/g,""));
if (Number.isNaN(temp)) temp = 0;
temp = temp + '';
if(val.indexOf("-") == 0) neg = true;temp = temp.replace("-","");
if(temp.length == 1) temp = "0"+temp;  temp = temp.replace(/([0-9]{2})$/g, ",$1");
if (temp.indexOf("-") == 0) neg = true;temp = temp.replace("-", "");
if (temp.length > 6)temp = temp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
if( temp.length > 9)temp = temp.replace(/([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g,".$1.$2,$3");
if( temp.length > 12)temp = temp.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g,".$1.$2.$3,$4");
if(temp.indexOf(".") == 0) temp = temp.replace(".","");
if(temp.indexOf(",") == 0) temp = temp.replace(",","0,");
e.target.value = (neg ? '-'+temp : temp);
});
