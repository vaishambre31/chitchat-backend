//package imports
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'

//configuration imports
import connectDb from './src/config/db.js'

//middlewares
import { errorHandler, notFound } from './src/middlewares/errorMiddleware.js'

//routes (common)
import UserRoutes from './src/routes/UserRoutes.js'

const app = express();

//configs called
dotenv.config();
app.use(express.json())
connectDb();

//logger
app.use(morgan('dev'))

//get all routes info
app.get('/', (req, res) => {
    res.send("Hey there! Your backend is up and running!")
})
//user module routes
app.use('/api', UserRoutes)

//error handling
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`))