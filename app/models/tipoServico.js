var Schema, TipoServico, mongoose;

mongoose = require("mongoose");

Schema = mongoose.Schema;

TipoServico = new Schema({
  descricao: [
    {
      type: String,
      required: true,
      index: [
        {
          unique: true
        }
      ]
    }
  ]
});


module.exports = mongoose.model("TipoServico", TipoServico);