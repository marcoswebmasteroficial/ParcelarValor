document.querySelector("calcular").addEventListener("click", function(){
	console.log("test");
			let valorDaCompra = parseFloat(document.getElementById("valorDaCompra").value);
			let qtdeParcelas = parseInt(document.getElementById("qtdeParcelas").value);
			let valorFinal = document.getElementById("resultado");
			let msg = "";
			let resultado = 0;

			if(qtdeParcelas == 1){

				valorFinal = valorDaCompra;
				msg = "1X" + valorFinal;
				console.log(msg); 

			}else if (qtdeParcelas == 2){

				valorFinal = (valorDaCompra + (valorDaCompra * 0.03))/2;
				msg = "2X" + valorFinal;
				console.log(msg); 

			}else{

				valorFinal = (valorDaCompra + (valorDaCompra * 0.07))/4;
				msg = "4X" + valorFinal;
				console.log(msg); 

			}
			
			document.getElementById("resultado").innerHTML = msg;
});
