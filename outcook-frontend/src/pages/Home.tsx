import { getMessageList } from "@/atoms/realEmailData";
import Header from "@/ui/components/Header";
import MessagePreviewCards from "@/ui/components/messagePreviewCard";
import MsgBodyRealEmail from "@/ui/components/MsgBodyRealEmail";
import { IMSG_DATA } from "@/utils/getMockMessages";
import { useEffect} from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import ConnectToWebSocketServer from "@/utils/ConnectToWSS";
import {  useNavigate } from "react-router-dom";
import { notification } from "@/atoms/notifications";
import { useToast } from "@/hooks/useToast";
import { messagesAndNotificationMessages } from "@/atoms/realEmailData";
import ComposeEmail  from "@/ui/components/ComposeEmail";
import { composeModal } from "@/atoms/composeModal";

export default function Home(){

    let messageList = useRecoilValue(getMessageList);
    let [allMessages , setAllMessages] = useRecoilState(messagesAndNotificationMessages)
    let [noti_fication , setNotification] = useRecoilState(notification);

    const [showComposeModal , _] = useRecoilState<any>(composeModal)


    console.log(messageList);
    console.log(document.cookie);

    const navigate = useNavigate();
    const {showToast} = useToast();

    useEffect(() => {

            const email = localStorage.getItem("email")

            if(!email){
                navigate("/signin")
            }

            const ws = ConnectToWebSocketServer(email as string)

            ws.addEventListener('message' , (msg : any) => {
                const message = JSON.parse(JSON.parse(msg?.data))
                setNotification((state : any) => state.concat([message]))
                showToast({title: "🔔" + message.subject , desc : (message)?.short_description})
                console.log(message , "message recieved");
            })
            
            return () => {
                ws.close()
            }
    } , [])


    useEffect(() => {

        setAllMessages(state => state.concat(noti_fication))
        
    } , [noti_fication])

    useEffect(() => {
        setAllMessages(state  => state.concat(messageList))
    } , [messageList])

    return(
        <main>
            <Header />
            <section className="flex-row">
                <div style={{width: "25%" }} className="overflow">
                    {allMessages && allMessages?.map((messagePreview : IMSG_DATA) => {
                        return messagePreview? <MessagePreviewCards messageItem={messagePreview} isFavorite={true}/> : "No messages Present right now"
                        
                    }).reverse()}

                </div>
                <div style={{width: "75%"}} className="overflow">
                     <MsgBodyRealEmail /> 
                     
                </div>
            </section>
            <section style={{position : "absolute", top: "0px"}}>
                    {showComposeModal ? <ComposeEmail /> : null}
            </section>
        </main>
    )
}