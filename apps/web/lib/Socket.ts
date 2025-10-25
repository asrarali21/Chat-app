
import { stringify } from "querystring";
import { io } from "socket.io-client";



let socket :any ;

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8000";


export function getSocket(){
    if( !socket    ){
     socket = io(SOCKET_URL, {
         transports: ["websocket"],
      withCredentials: true,
     })
    }
    return socket
}