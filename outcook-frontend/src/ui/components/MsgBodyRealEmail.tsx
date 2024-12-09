import { backButtonPressed } from "@/atoms/backButton";
import { bodyMetaData } from "@/atoms/messageBody";
import { s3Base } from "@/constants/s3UrlBase";
import formatDate from "@/utils/formatDate";
import {useRecoilState, useRecoilValue } from "recoil";
import MessagePreviewCards from "./messagePreviewCard";
import { showEmailType } from "@/atoms/showEmails";
import {  messagesAndNotificationMessages, sentMessageList } from "@/atoms/realEmailData";

const MsgBody = () => {

  const data = useRecoilValue<any>(bodyMetaData);
  const [back_Button_Pressed , setBackButtonPressed] = useRecoilState(backButtonPressed);
  const paragraph = data?.body;


  const sent_Message_List = useRecoilValue(sentMessageList);
  let [allMessages , _] = useRecoilState(messagesAndNotificationMessages)
  const emailType = useRecoilValue(showEmailType);
  console.log("this is data");

  return (
    <section >

          {
            !back_Button_Pressed ? 
          <span className="back-btn" 
          onClick={() => {
              setBackButtonPressed(true)
          }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="#39addf" d="M17.51 3.87L15.73 2.1L5.84 12l9.9 9.9l1.77-1.77L9.38 12z"></path></svg>
          </span>

          :

          null

          }

       <> 
            {
              !back_Button_Pressed ?

                  <>
                      {data?.body ?
                        <>
                        <section className="message_header" style={{display : "flex" , flexDirection : "row" , gap: "30px" , margin : " 30px 0px 0px 10%" , alignItems : "center" , width: "80%" , boxSizing: "border-box"}}>
                              <section style={{display: "flex"}}>
                                    <span className="logo" style={{width : "50px" , height : "50px"}}>{data?.from?.name[0]?.toUpperCase()}</span>
                                    
                              </section>
                              <section style={{display: "flex" , flexDirection : "column", width: "100%!important"}}>
                                <span style={{fontSize: "25px" , fontWeight: "500" , padding: "5px"}}>{data?.subject}</span>
                                <section style={{padding : "5px" , color : "#4b5563"}}>
                                      <span style={{color: "#4b5563"}}>From:&nbsp;</span>
                                      <span style={{color: "#4b5563"}}>
                                        {data?.from?.name.charAt(0).toUpperCase() +
                                          data?.from?.name.slice(1)}
                                      </span>
                                      <span className="">&nbsp;&lt;{data?.from?.email}&gt;</span>
                                </section>
                                <section style={{padding : "5px"}}>
                                  <span style={{color: "#6b7280"}}>
                                    {formatDate(data?.date).toString()} &nbsp;
                                  </span>
                                </section>
                              </section>
                          </section>
                          <section className="body-paragraph" style={{paddingTop: "30px" , lineHeight: "24px"}}>
                            {paragraph}
                            <section className="attachments-main-body">
                              {data?.attachments && data?.attachments[0]?.length!= 0 && data?.attachments[0]?.map((attachment : string ) => {
                                      return (
                                          <div className="modal-attachments-children" >
                                            <span onClick={() => {
                                                  window.open(s3Base + "/" + attachment.trim())
                                            }}> {attachment && attachment.split(".")[(attachment.split(".").length - 1)] === "png" || attachment.split(".")[(attachment.split(".").length - 1)] === "jpg" || attachment.split(".")[(attachment.split(".").length - 1)] === "jpeg" ? 
                                            
                                                  <img src={s3Base + "/" + attachment.trim()} alt={attachment + " file preview"} width={250}/>

                                                  : 

                                                  attachment
                                              }</span>  
                                          </div>
                                      )
                                  }).reverse()}
                            </section>
                          </section>
                        </>
                        :  

                        <section style={{width : '100%' , height : "93vh" , display : "flex" , alignItems : "center" , justifyContent : "center"}}>
                            click on email to view it's contents
                        </section>
                      }   
                  </>
              :

              <>
                {

                emailType === "sent" ?
                    <section  style={{ minWidth: "462px" , display: "block!important"}} className=" message_preview overflow message-preview-right">
                    
                        {sentMessageList && sent_Message_List?.map((messagePreview : any) => {
                            return messagePreview? <MessagePreviewCards messageItem={messagePreview} isFavorite={true}/> : "No messages Present right now"
                            
                        }).reverse()}
    
                    </section>
                    
                        : 
                    <div  style={{ minWidth: "462px" , display : "block" }} className=" message_preview message-preview-right overflow">
                        
                        {allMessages && allMessages?.map((messagePreview : any) => {
                            return messagePreview? <MessagePreviewCards messageItem={messagePreview} isFavorite={true}/> : "No messages Present right now"
                            
                        }).reverse()}
    
                    </div>
                }
              </>
            }
        </>
    </section>
  );
};

export default MsgBody;
