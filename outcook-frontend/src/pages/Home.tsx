import { getMessageList, sentMessageList } from "@/atoms/realEmailData";
import HeaderReal from "@/ui/components/HeaderReal";
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
import { showEmailType } from "@/atoms/showEmails";

export default function Home(){

    let messageList = useRecoilValue(getMessageList);
    const sent_Message_List = useRecoilValue(sentMessageList);
    let [allMessages , setAllMessages] = useRecoilState(messagesAndNotificationMessages)
    let [noti_fication , setNotification] = useRecoilState(notification);
    const emailType = useRecoilValue(showEmailType);
    const [showComposeModal , _] = useRecoilState<any>(composeModal)


    console.log(messageList);
    console.log(document.cookie);

    const navigate = useNavigate();
    const {showToast} = useToast();

    useEffect(() => {

            const email = localStorage.getItem("email")

            console.log(messageList , "this is supposed to be redirect");
            if(!email || messageList === "redirect"){
                navigate("/signin");
            }

            const ws = ConnectToWebSocketServer(email as string)

            ws.addEventListener('message' , (msg : any) => {
                const message = JSON.parse(JSON.parse(msg?.data))
                console.log(message , "maasage");
                setAllMessages(state => state.concat([message] as any))
                setNotification((state : any) => state.concat([message]))
                showToast({title: "🔔" + message.subject , desc : (message)?.short_description})
                console.log(message , "message recieved");
            })
            
            return () => {
                ws.close()
            }
    } , [])


    useEffect(() => {


        
    } , [noti_fication])

    useEffect(() => {
        setAllMessages(state  => state.concat(messageList))
    } , [messageList])

    return(
        <main>
            <HeaderReal />
            <section className="flex-row">
                {

            emailType === "sent" ?
                <section  style={{ minWidth: "462px" }} className=" message_preview overflow">
                
                    {sentMessageList && sent_Message_List?.map((messagePreview : IMSG_DATA) => {
                        return messagePreview? <MessagePreviewCards messageItem={messagePreview} isFavorite={true}/> : "No messages Present right now"
                        
                    }).reverse()}

                </section>
                
                    : 
                <div  style={{ minWidth: "462px" }} className=" message_preview overflow">
                    
                    {allMessages && allMessages?.map((messagePreview : IMSG_DATA) => {
                        return messagePreview? <MessagePreviewCards messageItem={messagePreview} isFavorite={true}/> : "No messages Present right now"
                        
                    }).reverse()}

                </div>
                }
                <div  style={{width: "75%"}} className="message_body overflow">
                     <MsgBodyRealEmail /> 
                     
                </div>
            </section>
            <section>
                    {showComposeModal ? <ComposeEmail /> : null}
            </section>
        </main>
    )
}