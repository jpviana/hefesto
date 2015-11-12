
var PrestadorModel, mongoose, TipoServicoModel, ComentarioModel;


mongoose = require('mongoose');

PrestadorModel = require('../models/prestador');
TipoServicoModel = require('../models/tipoServico');
ComentarioModel = require('../models/comentario');

module.exports = function (app) {

    var ComentarioController = {
        web: {
            index: function (req, res) {
                var _id = req.params._id;
                ComentarioModel.find({idPrestador:_id}, function (err, comentarios) {
                    console.log('err:', JSON.stringify(err), 'prest:', JSON.stringify(comentarios));
                    if (err) {
                        throw err;
                    }
                        console.log(_id);
                        res.json(comentarios);
                    });

            }

        },
        api: {
            create: function (req, res) {
                var ComentarioObj = {
                    idPrestador: req.body._id,
                    comentario: req.body.comentario,
                    autor: req.body.autor
                }
                var comentario = new ComentarioModel(ComentarioObj);
                console.log(ComentarioObj);
                comentario.save(function (err, result) {
                    if (err) {
                        console.log('erro', err);
                        return res.json(ComentarioObj);
                    }
                    res.redirect('/prestador?prestador='+ ComentarioObj.idPrestador);
                });
            },
            delete: function (req, res) {
                var id;
                id = req.params.id;
                ComentarioModel.remove({_id: id}, function (err) {
                    if (err) {
                        if (err) {
                            res.send(500);
                        }
                    } else {
                        console.log("Removido");
                        res.redirect('/prestador');
                    }
                });
            }


        }
    }
    return ComentarioController;
}

