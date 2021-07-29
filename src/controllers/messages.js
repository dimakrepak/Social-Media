const MessagesModel = require("../models/message");

async function createMessage(req, res) {
  const newMessage = new MessagesModel(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
}
async function getMessage(req, res) {
  try {
    const messages = await new MessagesModel.find({
      conversationId: req.params.convId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
}
module.exports = {
  createMessage,
  getMessage,
};
