'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar rutas
var user_routes = require('./routes/user');

// middlewares  metodo que se ejecuta antes de que llegue a un controlador
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//cors

//rutas
app.use('/api', user_routes);


//exportar	
module.exports = app; 