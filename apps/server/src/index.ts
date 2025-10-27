import express from "express"
import dotenv from "dotenv"
import { Server } from "socket.io"
import { createServer } from 'node:http';
import cors from "cors"
import { Redisclient, Redissubclient } from "./services/redisClient.js";



dotenv.config()

const app = express ()

app.use(cors())

console.log(process.env.UPSTASH_REDIS_REST_URL)

const server = createServer(app)

const io = new Server(server , {
    cors: {
        origin:["http://localhost:3000", "*"],        
        methods: ["GET", "POST"]
    }
})


  Redissubclient.subscribe("message" , (msg)=>{
     console.log("Got message:", msg);
     io.emit("message" , msg)
    })


io.on("connection" , (socket)=>{
        console.log("A user connected:", socket.id)

   socket.onAny((event, ...args) => {
        console.log(`[${socket.id}] received event: ${event}`, args)
    })


    socket.on("message" ,async (msg)=>{

        console.log(msg)
         socket.broadcast.emit("message", msg)
     const deliverd =   await  Redisclient.publish("message" , msg)
    console.log(deliverd)
       
    })
    
  
})


server.listen(process.env.PORT || 8000  , ()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})