function showAlert(type,message) {
  $('#alert').addClass('alert-' + type).html( message ).fadeIn();
  setTimeout("closeAlert()", 5000); // 5 segundos
}

$(function() {
  $('#alert').click(function() {
    closeAlert();
  });
});
 
function closeAlert() {
  $('#alert').fadeOut();
}

$(document).ready(function(){
   $("#btn-apagar").click( function(event) {
      var apagar = confirm('Deseja realmente excluir este registro?');
      if (apagar){
	// aqui vai a instrução para apagar registro			
      }else{
         event.preventDefault();
      }	
   });
});
