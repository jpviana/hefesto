
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
          html+= "<span>Telefone: "+data.telefone[0]+"</span></br>";
          html+= "<span>Endereço: "+data.endereco[0]+"</span></br>";
          html+= "<span>Atendimento: "+data.atendimento[0]+"</span></br>";
          html+= "<span>Forma de pagamento: "+data.formaPagamento[0]+"</span></br>";
          html+= "<span>Email: "+data.email[0]+"</span></br>";
          //html+= "<span>Página: "+data.pagina[0]+"</span></br>";
          html+= "<span>Resumo do serviço: "+data.observacao[0]+"</span></br>";
        	if(data.foto[0] !=undefined){
        	html+= "<div><img class='img-responsive' src='"+data.foto[0]+"'/></div></br>";
        	}
        	html+= "<form action='/comentario/create'method='post'><input type='hidden' name='_id'' value='"+id+"' ><input type='text' name='autor' class='form-control' placeholder='Digite seu nome para comentar' required='true'><br><textarea name='comentario' style='resize:none' class='form-control' rows='3' required='true' placeholder='Faça seu comentario sobre este prestador'/></textarea><br><input type='submit' class='btn btn-primary' value='Enviar Comentário!'/><hr/></form>";
          $.ajax({
            url:"/comentario/index/"+id,
            method: "GET",
            success: function(data2){
              for(var i in data2){
                html+= "<div id='comentario'><span>Autor: "+data2[i].autor+"</span></br></div>";
                html+= "<div id='comentario'><span>Mensagem: "+data2[i].comentario+"</span></br>";
                html+= " <button type='button' class='btn btn-danger btn-lg' onclick='confirmar2('/comentario/delete"+data2[i]._id+"')'>Excluir</button></div><hr/>";
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
