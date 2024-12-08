import {WebSocketDomain} from "../constants/web_socket_domain"

export default function ConnectToWebSocketServer(email : string){

    console.log(email , "email");
    const ws = new WebSocket(`${WebSocketDomain}/${email}`);

    ws.addEventListener('open', () => {
        console.log('Websocket connection established');
    })

    ws.addEventListener('close' , () => {
        console.log('Websocket connection closed')
    })

    return ws;
}