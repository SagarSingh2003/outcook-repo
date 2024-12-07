export default function ConnectToWebSocketServer(email : string){

    console.log(email , "email");
    const ws = new WebSocket(`ws://localhost:3000/${email}`);

    ws.addEventListener('open', () => {
        console.log('Websocket connection established');
    })

    ws.addEventListener('close' , () => {
        console.log('Websocket connection closed')
    })

    return ws;
}