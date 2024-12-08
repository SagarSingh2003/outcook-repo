import {domain} from "../constants/domain"

export default function ConnectToWebSocketServer(email : string){

    console.log(email , "email");
    const ws = new WebSocket(`ws://${domain}/${email}`);

    ws.addEventListener('open', () => {
        console.log('Websocket connection established');
    })

    ws.addEventListener('close' , () => {
        console.log('Websocket connection closed')
    })

    return ws;
}