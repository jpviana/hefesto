
var mongoose, TipoServicoModel, Comentario;


mongoose = require('mongoose');

TipoServicoModel = require('../models/tipoServico');

module.exports = function (app) {

    var TipoServicoController = {
        util: {
            criarTipoServicosDefaul: function () {
                TipoServicoModel.remove(function (err, tipoServicos) {
                    if (err) {
                        throw err;
                    }
                    var tiposSalvar = ['Babá', 'Churrasqueiro', 'Cozinheira', 'Diarista', 'Eletricista',
                        'Limpeza de piscina', 'Montador de Móveis', 'Passadeira', 'Passeador de cães', 'Salgadeira'];
                    for (var i in tiposSalvar) {
                        var tipoServico = new TipoServicoModel(
                                {
                                    descricao: tiposSalvar[i]
                                }
                        );
                        tipoServico.save(function (erro, result) {
                            console.log("Save default tipoServico, erro:", JSON.stringify(erro), "result:", JSON.stringify(result));
                            if (erro) {
                                throw erro;
                            }
                        });
                    }
                });
            }

        },
        web: {
            index: function (req, res) {
                    TipoServicoModel.find({}, function (err, tipoServicos) {
                        console.log('err:', JSON.stringify(err), 'serv:', JSON.stringify(tipoServicos));
                        if (err) {
                            throw err;
                        }
                        console.log("aki", req.query)
                        res.render("tipoServico/index", {
                            tipoServicos: tipoServicos,
                            user: req.user
                        });
                    });


            },
            create: function (req, res) {
                TipoServicoModel.find({}, function (err, tipoServicos) {
                    console.log('err:', JSON.stringify(err), 'serv:', JSON.stringify(tipoServicos));
                    if (err) {
                        throw err;
                    }

                    res.render("tipoServico/create", {tipoServicos: tipoServicos, user: req.user})
                });
            }
        },
        api: {
            create: function (req, res) {
                var tipoServico = new TipoServicoModel(req.body.tipoServico);
                console.log(req.body.descricao);
                tipoServico.save(function (err, result) {
                    if (err) {
                        console.log('erro', err);
                        res.render('tipoServico/create', {erro: err, user: req.user});
                    }
                    res.redirect('/tipoServico/create');
                });
            },
            delete: function (req, res) {
                var id;
                id = req.params.id;
                TipoServicoModel.remove({_id: id}, function (err) {
                    if (err) {
                        if (err) {
                            res.send(500);
                        }
                    } else {
                        console.log("Removido");
                        res.redirect('/tipoServico');
                    }
                });
            },
            single: function (req, res) {
                var _id;
                _id = req.params.id;
                //console.log("id " + req.params.id);
                return TipoServicoModel.findById(_id, function (err, tipoServico) {
                    if (err) {
                        return console.log("Erro " + err);
                    } else {
                        //console.log("prestador" + prestador);
                        return res.json(tipoServico);
                    }
                });
            },
            pesquisa: function (req, res) {
                var pesquisa = req.query.pesquisa;
                
                    TipoServicoModel.find(pesquisa, function (err, tipoServicos) {
                        console.log(pesquisa);
                        //console.log('err:',JSON.stringify(err),'serv:', JSON.stringify(tipoServicos));
                        if (err) {
                            throw err;
                        }

                        res.render("tipoServico/index", {
                            tipoServicos: tipoServicos,
                            user: req.user,
                            tipoServico:req.query.tipoServico
                        });
                    });

            },


        }
    }
    return TipoServicoController;
}
