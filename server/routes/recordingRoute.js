import express from "express";
import { Recording } from "../models/recording.js";
import { User } from "../models/User.js";
import verify from "../verify.js";

const router = express.Router();

router.route("/upload").post(verify, async (req, res) => {
  try {
    const { url } = req.body;
    const user = await User.findById(req.user.userId);

    const recording = new Recording({
      userId: user._id,
      url,
    });

    await recording.save();
    res.status(201).json({ message: "Recording saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Recording saved failed",
    });
  }
});

export default router;
