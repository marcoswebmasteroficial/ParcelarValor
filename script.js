
        var objParcelas = {
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

        for (parcela in objParcelas) {
            let option = document.createElement('option');
            option.value = parcela;
            option.innerText = parcela + ' Meses';
            document.querySelector("select").appendChild(option);
        }

        function moeda(v) {
            v = v.replace(/\D/g, "");
            v = (parseFloat(v) / 100).toFixed(2); 
            return "R$ " + v.replace(".", ",");
        }

        const CALCULAR = {
            prestacoes: function () {
                let $this = document.getElementById("txt_valor");
                let str = parseFloat($this.value.replace("R$ ", "").replace(".", "").replace(",", "."));
                let parcelas = parseInt(document.getElementById("parcelas").value);
                let tipoJuros = parseInt(document.getElementById("tiposjuros").value);
                let taxaJuros = parseFloat(objParcelas[parcelas].juros);
                let parcial = parseFloat(taxaJuros) / 100; // Interest rate (in decimal form)
                let valorParcela;
                let valorTotalDoBem;
                let jurosTotais;

                if (tipoJuros === 1) {
                    valorParcela = str * Math.pow(1 + parcial, parcelas);
                    valorTotalDoBem = valorParcela;
                    jurosTotais = valorParcela - str;
                } else if (tipoJuros === 2) {
                    valorTotalDoBem = str + parcial * str * parcelas;
                    valorParcela = valorTotalDoBem / parcelas;
                    jurosTotais = valorTotalDoBem - str;
                }

                document.getElementById("juros").value = taxaJuros.toFixed(2) + "%";
                document.getElementById("jurostotais").innerText = jurosTotais.toLocaleString("pt-br", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                });
                document.getElementById("parcelas_txt").innerText = parcelas + "x";
                document.getElementById("resultado").innerText = valorParcela.toLocaleString("pt-br", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                });
                document.getElementById("resultado_aplicacaoes").innerText = str.toLocaleString("pt-br", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                });
                document.getElementById("bem").innerText = valorTotalDoBem.toLocaleString("pt-br", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                });
            },
        };

        document.getElementById("tiposjuros").addEventListener("change", function (e) {
            CALCULAR.prestacoes();
        });

        document.getElementById("parcelas").addEventListener("change", function (e) {
            CALCULAR.prestacoes();
        });

        document.getElementById("txt_valor").addEventListener("keyup", function (e) {
            e.target.value = moeda(e.target.value);
            document.getElementById("txt_valor").value = parseFloat(e.target.value.replace("R$ ", "").replace(".", "").replace(",", "."));
            CALCULAR.prestacoes();
        });

        CALCULAR.prestacoes();
