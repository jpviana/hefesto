
detalhaPrestador = function(id){
	$.ajax(
	{
		url:"/prestador/single/"+id,
		method: "GET",
		success: function(data) {
        	//console.log(data);
        	var html = "";
        	html+= "<span><h3>Nome: "+data.nome[0]+"</h3></span></br>";
          html+= "<span>Servico: "+data.servico[0]+"</span></br>";
        	html+= "<span>Email: "+data.email[0]+"</span></br>";
          html+= "<span class='glyphicon glyphicon-earphone'>Telefone: "+data.telefone[0]+"</span></br>";
          html+= "<span>Endereço: "+data.endereco[0]+"</span></br>";
          html+= "<span>Atendimento: "+data.atendimento[0]+"</span></br>";
          html+= "<span>Forma de pagamento: "+data.email[0]+"</span></br>";
          html+= "<span>Página: "+data.email[0]+"</span></br>";
          html+= "<span>Resumo do serviço: "+data.observacao[0]+"</span></br>";
        	if(data.foto[0] !=undefined){
        	html+= "<div><img class='img-responsive' src='"+data.foto[0]+"'/></div></br>";	
        	}
        	
        	
        	$("#dadosDetalhar").html(html);
      	},
      error: function(err) {
        console.log("ERRO");
      }
  });
}
