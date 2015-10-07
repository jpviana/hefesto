var Schema, Prestador, mongoose;

mongoose = require("mongoose");

Schema = mongoose.Schema;

Prestador = new Schema({
  email: [
    {
      type: String,
      required: true,
      index: [
        {
          unique: true
        }
      ]
    }
  ],
  pagina: [
    {
      type: String
    }
  ],
  nome: [
    {
      type: String,
      required: true
    }
  ],
  servico:[{
    type: String,
    required: true
  }],
  endereco: [
    {
      type: String,
      required: true
    }
  ],
  telefone: [
    {
      type: String,
      required: true
    }
  ],
  atendimento: [
    {
      type: String,
      required: true
    }
  ],
  formaPagamento: [
    {
      type: String,
      required: true
    }
  ],
  foto:[
    {
      type: String
    }
  ],
  observacao:[
    {
      type: String
    }
  ]
});

module.exports = mongoose.model("Prestador", Prestador);