import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { connectDB } from "./config/db.js";

const app = express();
const port = 8000;

app.use(cors());
config();

connectDB();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

import user from "./routes/userRoute.js";
import recording from "./routes/recordingRoute.js";

app.use("/api/v1", user);
app.use("/api/v1", recording);

app.get("/", (req, res) => {
  res.send(`<h1>Site is working fine</h1>`);
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
