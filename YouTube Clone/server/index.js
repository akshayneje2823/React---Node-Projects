import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/users.js'
import videoRoute from './routes/videos.js'
import commentRoute from './routes/comments.js'
import authRoute from './routes/auth.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();
dotenv.config();

app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || "Something went wrong!"

    return res.status(status).json({
        success: false,
        status,
        message
    })

})
app.use(cors())
app.use(cookieParser())
app.use(express.json())

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("connected to DB")
        })
        .catch(err => console.log(err, err.message))
};

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/videos', videoRoute);
app.use('/api/comments', commentRoute);



app.listen(8800, () => {
    connectDB();
    console.log("Server is running on 8800...")
})