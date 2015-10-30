
$(document).ready(function(){

  var prestador = $("#prestador").val();

  if(prestador != undefined || prestador != "undefined"){
    
    /*detalhaPrestador(prestador);
    $("modal").load(myModal);*/
  }
});

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
        	html+= "<form action='/comentario/create'method='post'><input type='hidden' name='_id'' value='"+id+"' ><textarea name='comentario' style='resize:none' class='form-control' rows='3' placeholder='Faça seu comentario sobre este prestador'/></textarea><input type='submit' value='Enviar Comentário!'/></form>";
          $.ajax({
            url:"/comentario/index/"+id,
            method: "GET",
            success: function(data2){
              for(var i in data2){
                html+= "<div id='comentario'><span> "+data2[i].comentario+"</span></br></div>";
              }
              $("#dadosDetalhar").html(html);
            },
            error: function(err){
              $("#dadosDetalhar").html(html);
            }
          }          
            )
        	
        	
      	},
      error: function(err) {
        console.log("ERRO no detalhaPrestador");
      }
  });
}
