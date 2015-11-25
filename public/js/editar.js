$(function() {
  var alterarFormularioUpdate, changevalue;

  $(".update").click(function() {
    var _id;
    _id = $(this).data("id");
    console.log('update ' + _id);
    $.ajax({
      type: "GET",
      url: "/api/user/" + _id,
      success: function(data) {
        console.log(data);
        changevalue("input[name=\"nome\"]", data.nome);
        changevalue("input[name=\"sobrenome\"]", data.sobrenome);
        changevalue("input[name=\"email\"]", data.email);
        return alterarFormularioUpdate(_id);
      },
      error: function(err) {
        console.log("ERRO");
        return console.log(err);
      }
    });
  });
  changevalue = function(el, val) {
    var $el;
    $el = $(el);
    $el.val("");
    $el.val(val);
  };
  alterarFormularioUpdate = function(id) {
    var $btn, $form;
    $("div.createbox > h2").text("Alterar usuário");
    $form = $("form:first");
    $btn = $("form:first button");
    $btn.text("Alterar");
    $btn.data("action", "update");
    $form.attr("action", "/api/user/" + id);
  };
});
