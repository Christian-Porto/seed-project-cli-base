const express = require("express");
const router = express.Router();

const Message = require("../models/message");
const User = require("../models/user");

router.get("/", async function(req, res, next) {
  try {
    const messageFindTodos = await Message.find({}).populate("user");

    res.status(200).json({
      myMsgSucesso: "Mensagens recuperadas com sucesso!",
      objsMessagesRecuperados: messageFindTodos
    });
  }
  catch(error) {
    return res.status(500).json({
      myErrorTitle: "Serve-side: Um erro aconteceu ao buscar as mensagens.",
      myError: error 
    });
  }
});

router.post("/", async function(req, res, next) {
  const messsageObject = new Message({
    content: req.body.content,
    user: req.body.user
  });
  try {
    const messageSave = await messsageObject.save();

    await User.findByIdAndUpdate(req.body.user, {
      $push: { messages: messageSave._id }
    });

    res.status(201).json({
      myMsgSucesso: "Mensagem salva com sucesso!",
      objMessageSave: messageSave
    });
  }
  catch(error) {
    return res.status(500).json({
      myErrorTitle: "Serve-side: Um erro aconteceu ao salvar a mensagem.",
      myError: error 
    });
  }
});

router.patch("/:id", async function(req, res) {
  const { id } = req.params;
  try {
    await Message.findByIdAndUpdate(id, { $set: req.body });
    const messageSave = await Message.findById(id);
    res.status(200).json({
      myMsgSucesso: "Mensagem editada com sucesso!",
      objMessageSave: messageSave
    });
  }
  catch(error) {
    return res.status(500).json({
      myErrorTitle: "Serve-side: Um erro aconteceu ao editar a mensagem.",
      myError: error 
    });
  }
});

router.delete("/:id", async function(req, res) {
  const { id } = req.params;
  try {
    await Message.findByIdAndDelete(id);
    res.status(200).json({ myMsgSucesso: "Mensagem deletada com sucesso!"});
  }
  catch(error) {
    return res.status(500).json({
      myErrorTitle: "Serve-side: Um erro aconteceu ao deletar a mensagem.",
      myError: error 
    });
  }
});

module.exports = router;