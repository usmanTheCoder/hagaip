import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import designRouter from "./routes/designRouter.js";
import formRouter from "./routes/formRouter.js";
import lekiumRouter from "./routes/lekiumRouter.js";
import personalRouter from "./routes/personalRouter.js";
import path from "path";

dotenv.config();
const app = express();
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ extended: false, limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "100mb", extended: true, parameterLimit: 50000 })
);

app.use("/api/user", userRouter);
app.use("/api/design", designRouter);
app.use("/api/personal", personalRouter);
app.use("/api/lekium", lekiumRouter);
app.use("/api/form", formRouter);

app.get("/", (req, res) => {
  try {
    res.send("App is working");
  } catch (error) {
    console.log("error");
    res.status(500).json(error);
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
}

const URI = process.env.MONGO_URL;
mongoose.connect(URI, { useNewUrlParser: true }).then(() => {
  console.log(URI);
  app.listen(process.env.PORT, () => {
    console.log("Server is running on port", process.env.PORT);
  });
});
