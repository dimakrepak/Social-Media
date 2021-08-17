const mongoose = require("mongoose");
// const validator = require('validator');

const ConversationSchema = mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Conversation", ConversationSchema);
