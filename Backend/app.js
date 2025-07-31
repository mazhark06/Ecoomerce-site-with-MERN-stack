import express from 'express'
import userRoutes  from './Routes/userRoutes.js'
import db from  './db/db.js'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import apiRoutes from './Routes/apiRoutes.js'
dotenv.config()
const app = express()

db()

//Middelwares
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5500',  // Your exact frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['set-cookie']
}));
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//routes
app.use('/user',userRoutes)
app.use('/api',apiRoutes)




app.get('/' ,(req,res)=>{
    res.send('Hello World')
})




export default app
