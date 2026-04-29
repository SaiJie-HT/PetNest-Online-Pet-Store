import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/loginRoute.js';
import profileInfoRoutes from './routes/profileInfoRoute.js';
import cartRoutes from './routes/cartRoute.js';
import orderRoutes from './routes/orderRoute.js';
import petsRoutes from './routes/petsRoute.js';
import orderRecordRoutes from './routes/orderRecordRoute.js';
import requireAuth from './middleware/requireAuth.js';



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

//pets routes (The basic CRUD operations reguarding the store's pet listings)
app.use("/pets", petsRoutes);

app.use("/profile", requireAuth, profileInfoRoutes);

app.use("/cart", cartRoutes);

app.use("/order", orderRoutes);

//might not need this route? Maybe too much?
app.use("/orderRecord", orderRecordRoutes);





app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
