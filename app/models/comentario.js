var Schema, Comentario, mongoose;

mongoose = require("mongoose");

Schema = mongoose.Schema;

Comentario = new Schema({
  comentario: [
    {
      type: String
    }
  ],

  idPrestador:
    {
      type: String
    }

});


module.exports = mongoose.model("Comentario", Comentario);