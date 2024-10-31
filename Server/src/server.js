import dotenv from "dotenv"
import express from 'express'

import Router from "./routers/router.js"

import path from 'path'
import bodyParser from "body-parser"

import cors from 'cors'


const app = express()


dotenv.config()
const port = process.env.PORT
app.use(cors({
    origin: 'http://localhost:3000', 
    optionsSuccessStatus: 200,
    credentials: true 
}));


app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())




Router(app)




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
