const express = require("express");
const router = express.Router();

const Message = require("../models/message");
const User = require("../models/user");

router.get("/", async function(req, res, next) {
  try {
    const messageFindTodos = await Message.find({}).populate("userId");

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
  if (!req.body.content || !req.body.username || !req.body.userId) {
    return res.status(400).json({
      myErrorTitle: "Client-side: Dados incompletos.",
      myError: "Faltam dados necessários para salvar a mensagem."
    });
  }
  const messageObject = new Message({
    content: req.body.content,
    username: req.body.username,
    userId: req.body.userId
  });
  try {
    const messageSave = await messageObject.save();
    await User.findByIdAndUpdate(req.body.userId, {
      $push: { messages: messageSave._id }
    });
    res.status(201).json({
      myMsgSucesso: "Mensagem salva com sucesso!",
      objMessageSave: messageSave
    });
  } catch (error) {
    return res.status(500).json({
      myErrorTitle: "Server-side: Um erro aconteceu ao salvar a mensagem.",
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
    const message = await Message.findById(id);
    if (!message) {
      return res.status(404).json({ myMsgError: "Mensagem não encontrada." });
    }
    await Message.findByIdAndDelete(id);
    await User.findByIdAndUpdate(message.userId, {
      $pull: { messages: id }
    });
    res.status(200).json({ myMsgSucesso: "Mensagem deletada com sucesso!" });
  }
  catch(error) {
    return res.status(500).json({
      myErrorTitle: "Server-side: Um erro aconteceu ao deletar a mensagem.",
      myError: error 
    });
  }
});
  
module.exports = router;