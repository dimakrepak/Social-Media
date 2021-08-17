const ConversationModel = require("../models/conversation");

function arrayEquals(a, b) {
  if (a.length === b.length) {
    return a.every((val) => b.includes(val));
  }
}

async function createConversation(req, res) {
  const newConversation = new ConversationModel({
    members: [req.body.senderId, req.body.receiverId],
  });
  const isExistConversations = await ConversationModel.find({
    members: { $all: [req.body.senderId, req.body.receiverId] },
  });
  console.log(isExistConversations);
  try {
    if (isExistConversations.length > 0) {
      res.status(200).json(isExistConversations[0]);
    } else {
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    }
  } catch (err) {
    res.status(500).json(err);
  }
}
async function getUserConversation(req, res) {
  try {
    const conversation = await ConversationModel.find({
      members: { $in: [req.user._id.toString()] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
}
module.exports = {
  createConversation,
  getUserConversation,
};
