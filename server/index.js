import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import userRouter from "./routes/userRouter.js"
import designRouter from "./routes/designRouter.js"
import formRouter from "./routes/formRouter.js"
import lekiumRouter from "./routes/lekiumRouter.js"
import personalRouter from "./routes/personalRouter.js"
import path from "path"

dotenv.config()
const app = express()
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cookieParser())
app.use(express.json({ extended: false, limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "100mb", extended: true, parameterLimit: 50000 })
);
app.use(cors(corsOptions))

app.use('/user', userRouter)
app.use("/design", designRouter);
app.use("/personal", personalRouter);
app.use("/lekium", lekiumRouter);
app.use("/form", formRouter);

app.get("/", (req, res) => {
  try {
    res.send("App is working");
    
  } catch (error) {
    console.log("error")
    console.log(error.message)
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client/dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
}

mongoose.connect(process.env.MONGO_URL).then(()=> {
    app.listen(process.env.PORT, ()=>  {
        console.log("Connected to database and server at port 5000!")
    })
}).catch((err)=> {
    console.log(err)
})