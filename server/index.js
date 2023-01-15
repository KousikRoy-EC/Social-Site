import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
// Router
import authRoute from "./routes/authroute.js";
import userRoute from "./routes/userroute.js";
import postRoute from "./routes/postroute.js"
import uploadRoute from "./routes/uploadroute.js"


// Middleware
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
                                        
                                        
                                        
// serve static files
app.use(express.static('public')); 
app.use('/images', express.static('images'));
dotenv.config()

mongoose
  .connect(
    process.env.MONGO_DB,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() =>
    app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))
  )
  .catch((error) => console.log(error.message));



  app.use('/auth', authRoute);
  app.use('/user', userRoute);
  app.use('/post',postRoute)
  app.use('/upload',uploadRoute);