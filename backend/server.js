import express from 'express';
import morgan from 'morgan';
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/loginRoute.js'


dotenv.config();

const app = express();

const PORT = process.env.PORT || 9090;

//Middleware: Might need some of these
app.use(morgan("dev"));
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended: true}))

//routes...
//account login and signup routes 
app.use("/auth", authRoutes);




app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
