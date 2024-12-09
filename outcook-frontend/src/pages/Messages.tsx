import { getPaginatedMessageList } from "@/atoms/emailMockData";
import { IsMessageBodyOpen } from "@/atoms/isMessageBodyOpen";
import { getMessageBody, messageBody } from "@/atoms/messageBody";
import { mockFilter } from "@/atoms/mockFilter";
import Footer from "@/ui/components/Footer";
import Header from "@/ui/components/Header";
import MockMessagePreviewCards from "@/ui/components/mockMessagePreview";
import MsgBody from "@/ui/components/MsgBody";
import { get_Message_Body, IMSG_DATA } from "@/utils/getMockMessages";
import { useEffect, useState } from "react";
import { useRecoilValue , useSetRecoilState } from "recoil";

export default function Home(){

    let messageList = useRecoilValue(getPaginatedMessageList);
    const isMsgBodyOpen = useRecoilValue(IsMessageBodyOpen);
    const setMessageBody = useSetRecoilState(messageBody);
    const msgBodyWithMetaData = useRecoilValue(getMessageBody);
    const  [filteredMessage , setFilteredMessage] = useState<any>([]);
    const readArrStr = localStorage.getItem("readArrStr") || ""
    const favoriteArrStr = localStorage.getItem("favoriteArrStr") || ""
    const filter = useRecoilValue(mockFilter);

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

    console.log(filter , "filter");

    useEffect(() => {
        if(filter === "read"){
            setFilteredMessage(messageList?.filter((message : any) => {
                    return readArrStr.includes(message.id)
            }))

            console.log("filtered for read")
        }else if(filter === "favorite"){
            setFilteredMessage(messageList?.filter((message : any) => {
                    return favoriteArrStr.includes(message.id)
            }))
        }else{
            setFilteredMessage(messageList?.filter((message : any) => {
                return !readArrStr.includes(message?.id)
            }))
        }
    
    } , [messageList , filter])

    console.log("filter : " , filteredMessage)

    return(
        <main>
            <Header />
            <section className="flex-row">
                <div style={{width: "25%" }} className="message_preview overflow">
                    {filteredMessage?.map((messagePreview : IMSG_DATA) => {
                        return (
                            <MockMessagePreviewCards messageItem={messagePreview} isFavorite={true}/>
                        )
                    })}

                    <section style={{position : "absolute" , bottom : "0px" , borderTop: "1px solid #efe7eb" , padding : "20px" , backgroundColor : "#f9fafb" , minWidth :"22.4%" , display : "flex" , alignItems : "center" , justifyContent : "center"}}>
                        <Footer />
                    </section>
                </div>
                <div style={{width: "75%"}} className="message_body overflow">
                     <MsgBody data={msgBodyWithMetaData}/> 
                </div>
            </section>
        </main>
    )
}