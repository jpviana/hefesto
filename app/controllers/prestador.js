
var PrestadorModel, mongoose, TipoServicoModel, Comentario;


mongoose = require('mongoose');

PrestadorModel = require('../models/prestador');
TipoServicoModel = require('../models/tipoServico');
Comentario = require('../models/comentario');

module.exports = function (app) {

    var PrestadorController = {
        /*util: {
            criarPrestadorDefaul: function () {
                PrestadorModel.find(function (err, prestadores) {
                    if (err) {
                        throw err;
                    }
                    if (prestadores === undefined || prestadores.length === 0) {

                        var prestador = new PrestadorModel(
                                {
                                    email: 'teste@teste.com',
                                    nome: 'teste',
                                    servico: 'salgadeira',
                                    endereco: 'rua 1',
                                    telefone: '3492004434',
                                    atendimento: 'todos os dias',
                                    formaPagamento: 'dinheiro'
                                }
                        );
                        prestador.save(function (erro, result) {
                            console.log("Save default user, erro:", JSON.stringify(erro), "result:", JSON.stringify(result));
                            if (erro) {
                                throw erro;
                            }
                        });
                    }
                });
            },
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

        },*/
        web: {
            index: function (req, res) {
                PrestadorModel.find({}, {foto: 0}, function (err, prestadores) {
                    console.log('err:', JSON.stringify(err), 'prest:', JSON.stringify(prestadores));
                    if (err) {
                        throw err;
                    }
                    TipoServicoModel.find({}, function (err, tipoServicos) {
                        console.log('err:', JSON.stringify(err), 'serv:', JSON.stringify(tipoServicos));
                        if (err) {
                            throw err;
                        }
                        console.log("aki", req.query)
                        res.render("prestador/index", {
                            title: "Prestadores", prestadores: prestadores,
                            tipoServicos: tipoServicos,
                            user: req.user,
                            prestador:req.query.prestador
                        });
                    });

                });

            },
            create: function (req, res) {
                TipoServicoModel.find({}, function (err, tipoServicos) {
                    console.log('err:', JSON.stringify(err), 'serv:', JSON.stringify(tipoServicos));
                    if (err) {
                        throw err;
                    }

                    res.render("prestador/create", {tipoServicos: tipoServicos, user: req.user})
                });
            }
        },
        api: {
            create: function (req, res) {
                var prestador = new PrestadorModel(req.body.prestador);
                console.log(req.body.servico);
                prestador.save(function (err, result) {
                    if (err) {
                        console.log('erro', err);
                        res.render('prestador/create', {erro: err, user: req.user});
                    }
                    res.redirect('/prestador/create');
                });
            },
            delete: function (req, res) {
                var id;
                id = req.params.id;
                PrestadorModel.remove({_id: id}, function (err) {
                    if (err) {
                        if (err) {
                            res.send(500);
                        }
                    } else {
                        console.log("Removido");
                        res.redirect('/prestador');
                    }
                });
            },

            edit: function(req, res){
                var id;
                
                var prestador = new PrestadorModel(req.body.prestador);
                PrestadorModel.findById(_id, function(erro, prestador) {
                var resultado = {prestador: prestador};
                res.render('prestador/edit', resultado);
              });
            },

            update: function(req, res) {
              id =req.params.id;
              var prestador = new PrestadorModel(req.body.prestador);
              PrestadorModel.findById(_id, function(erro, prestador) {
                prestador.nome = req.body.prestador.nome;
                prestador.email = req.body.prestador.email;
                prestador.save(function() {
                  res.redirect('/prestador');
                });
              });
            },

            single: function (req, res) {
                var _id;
                _id = req.params.id;
                //console.log("id " + req.params.id);
                return PrestadorModel.findById(_id, function (err, prestador) {
                    if (err) {
                        return console.log("Erro " + err);
                    } else {
                        //console.log("prestador" + prestador);
                        return res.json(prestador);
                    }
                });
            },
            pesquisa: function (req, res) {
                var pesquisa = req.query.pesquisa;
                var servico = req.query.servico;
                var objetoPesquisa = {};

                if (pesquisa != "") {
                    objetoPesquisa.nome = pesquisa;
                }
                if (servico != "") {
                    objetoPesquisa.servico = servico;
                }
                PrestadorModel.find(objetoPesquisa, {foto: 0}, function (err, prestadores) {
                    //console.log('err:',JSON.stringify(err),'prest:', JSON.stringify(prestadores));
                    if (err) {
                        throw err;
                    }
                    TipoServicoModel.find({}, function (err, tipoServicos) {
                        //console.log('err:',JSON.stringify(err),'serv:', JSON.stringify(tipoServicos));
                        if (err) {
                            throw err;
                        }

                        res.render("prestador/index", {
                            title: "Prestadores", prestadores: prestadores,
                            tipoServicos: tipoServicos,
                            user: req.user,
                            prestador:req.query.prestador
                        });
                    });

                });
            },
            /*addComentario: function(req, res){
             
             }*/



        }
    }
    return PrestadorController;
}

