import { IsMessageBodyOpen } from "@/atoms/isMessageBodyOpen";
import { getMessageBody, messageBody } from "@/atoms/messageBody";
import { getMessageList } from "@/atoms/realEmailData";
import Footer from "@/ui/components/Footer";
import Header from "@/ui/components/Header";
import MessagePreviewCards from "@/ui/components/messagePreviewCard";
import MsgBody from "@/ui/components/MsgBody";
import { get_Message_Body, IMSG_DATA } from "@/utils/getMockMessages";
import { useEffect } from "react";
import { useRecoilValue , useSetRecoilState } from "recoil";

export default function Home(){

    let messageList = useRecoilValue(getMessageList);
    const isMsgBodyOpen = useRecoilValue(IsMessageBodyOpen);
    const setMessageBody = useSetRecoilState(messageBody);
    const msgBodyWithMetaData = useRecoilValue(getMessageBody);
    
    const fetchMessageBody = async (id: string) => {

        const temp_body_store : any = await get_Message_Body(id);
        setMessageBody(temp_body_store);
        
    }


    console.log("message list is: " , messageList);

    useEffect(() => {
        
        if(isMsgBodyOpen.open){
            fetchMessageBody(isMsgBodyOpen?._id);
        }

    } , [isMsgBodyOpen]);


    return(
        <main>
            <Header />
            <section className="flex-row">
                <div style={{width: "25%" }} className="overflow">
                    {messageList?.map((messagePreview : IMSG_DATA) => {
                        return (
                            <MessagePreviewCards messageItem={messagePreview} isFavorite={true}/>
                        )
                    })}

                    <section style={{position : "absolute" , bottom : "0px" , borderTop: "1px solid #efe7eb" , padding : "20px" , backgroundColor : "#f9fafb" , minWidth :"22.4%" , display : "flex" , alignItems : "center" , justifyContent : "center"}}>
                        <Footer />
                    </section>
                </div>
                <div style={{width: "75%"}} className="overflow">
                     <MsgBody data={msgBodyWithMetaData}/> 
                </div>
            </section>
        </main>
    )
}