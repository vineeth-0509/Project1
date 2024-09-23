import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
dotenv.config();

const app = express();


mongoose
.connect(process.env.MONGO)
.then(() => {
    console.log('Connected to MongoDB!');
})
.catch((err)=>{
    console.log(err)
});

app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.listen(3000,() => {
    console.log('Server is running on port 3000');
});

/*
tuesday 24
wednesday 5
thursday 6
friday 7
saturday 8
sunday 9
monday 30
tuesday 1
wednesday 2
thursday 3
friday 4


*/
