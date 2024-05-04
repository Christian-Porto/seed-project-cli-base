const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

const mongoose = require("mongoose");

const messageRoutes = require ("./routes/message");
const userRoutes = require ("./routes/user");
const appRoutes = require('./routes/app');

const app = express();

app.use(express.json());

//Conexão com o MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/node-angular")
  .then(() => {
    console.log("Conexão com o MongoDB estabelecida com sucesso.");
  })
  .catch((error) => {
    console.log("Erro na conexão com o MongoDB: ", error);
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// Configuração do CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.use("/message", messageRoutes);
app.use("/auth", userRoutes);
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  return res.render('index');
});

module.exports = app;
