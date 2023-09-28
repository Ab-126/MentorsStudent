import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Recording = mongoose.model("Recording", schema);
