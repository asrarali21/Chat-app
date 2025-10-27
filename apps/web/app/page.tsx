"use client"; 
import { Button } from "@repo/ui/button";
import { getSocket } from "../lib/Socket";
import { useEffect, useState } from "react";



export default function Home({}) {

    const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
 
  console.log(messages)
  
  useEffect(() => {
     const socket = getSocket();
     console.log(socket)
     
    socket.on("connect", () => {
      console.log("Connected to socket server ✅");
    });

    socket.on("message", (msg :string) => {
      setMessages((prev ) => [...prev, msg]as any);
    });

    // cleanup on unmount
    return () => {
      socket.off("message");
    };
  }, []);

  function sendMessage() {
      const socket = getSocket()
     if (input.trim()) {
      socket.emit("message", input);
      setInput("");
    }
  }


  return (
   <div>
    <div>
<h1>All the message will there here </h1>
<input type="text"  onChange={(e)=> setInput(e.target.value)}/>
     <button onClick={sendMessage}>send</button>

     {messages.map((message , i)=>(
      <li key={i}>{message}</li>
     ))}
    </div>
   </div>
  );
}
