'use strict'
var bcrypt = require('bcrypt-nodejs');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs'); //nos permite trabajar con archivos
var path = require('path'); //nos permite trabajar con rutas de archivos

var User = require ('../models/user'); //en mayuscula para indicar que es un modelo
var jwt = require('../services/jwt');

// Métodos de prueba
function home(req, res){
	res.status(200).send({
		message: 'Hola mundo desde el servidor de NodeJS'
	});
}

//  Login
function loginUser(req, res){
	var params = req.body;

	var email = params.email;
	var password = params.password;

	User.findOne({email: email}, (err, user) => {
		if(err) return res.status(500).send({message: 'Error en la peticion'});

		if(user){
			bcrypt.compare(password, user.password, (err, check) => {
				if(check){
					
					if(params.gettoken){
						//generar y devolver token
						return res.status(200).send({
							token: jwt.createToken(user)
						});
					}else{
						//devolver datos de usuario
						user.password = undefined; //eliminas el password que se queda en el backend de forma interna
						return res.status(200).send({user});
					}
					
				}else{
					return res.status(404).send({message: 'El usuario no se ha podido identificar'});
				}
			});
		}else{  //el usuario no existe
			return res.status(500).send({message: 'El usuario no se ha podido identificar!!'});
		}
	});
}

module.exports = {
	home,
	loginUser
}