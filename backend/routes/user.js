const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.post("/signup", async function(req, res) {
  const userObject = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    email: req.body.email,
    gender: req.body.gender,
    personType: req.body.personType,
    terms: req.body.terms
  });
  try {
    const userSave = await userObject.save();

    res.status(201).json({
      myMsgSucesso: "Usuário cadastrado com sucesso!",
      objUserSave: userSave
    });
  }
  catch(error) {
    return res.status(500).json({
      myErrorTitle: "Serve-side: Um erro aconteceu ao cadastrar um usuário.",
      myError: error 
    });
  }
});

router.post("/signin", async function(req, res) {
  const { email, password } = req.body;
  try {
    if(!email || !password) {
      return res.status(400);
    }

    const userObject = await User.findOne({ email: email });

    if (!userObject || !await userObject.verificaPassword(password, userObject.password)) {
      return res.status(400);
    };

    res.status(200).json({
      myMsgSucesso: "Usuário conectado com sucesso!",
      objUser: userObject
    });
  } 
  catch(error) {
    return res.status(500).json({
      myErrorTitle: "Serve-side: Um erro aconteceu ao entrar com o usuário.",
      myError: error 
    });
  }
});


module.exports = router;