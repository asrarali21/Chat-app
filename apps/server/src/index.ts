import express from "express"
import dotenv from "dotenv"
import { Server } from "socket.io"
import { createServer } from 'node:http';
import cors from "cors"


dotenv.config()

const app = express ()

app.use(cors())

const server = createServer(app)

const io = new Server(server , {
    cors: {
        origin: "localhost:8000",        
        methods: ["GET", "POST"]
    }
})



io.on("connection" , (socket)=>{
        console.log("A user connected:", socket.id)
    socket.on("message" , (msg)=>{
      console.log(msg)
    })
})


app.get("/" , (req , res)=>{
    res.send("hello boi")
})




server.listen(process.env.PORT || 8000  , ()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})