import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO)
    .then(() => console.log("MongoDB is connected"))
    .catch(err => console.log(err));

app.use(express.json());



app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes); 



// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});


app.use((err, req, res, next) => {
    const statuscode = err.statuscode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statuscode).json({
        success: false,
        statuscode,
        message
    })
});