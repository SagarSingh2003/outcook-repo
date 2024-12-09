import { backButtonPressed } from "@/atoms/backButton";
import { getPaginatedMessageList } from "@/atoms/emailMockData";
import formatDate from "@/utils/formatDate";
import { IMSG_DATA } from "@/utils/getMockMessages";
import HTML_parser from "@/utils/HTML_parser";
import { useRecoilState, useRecoilValue } from "recoil";
import MockMessagePreviewCards from "./mockMessagePreview";
import Footer from "./Footer";
import { useState } from "react";

const MsgBody = ({ data }: { data: any }) => {

  const paragraphs = HTML_parser(data?.body);
  const [_, setCount] = useState(0)
  const [back_Button_Pressed , setBackButtonPressed] = useRecoilState(backButtonPressed);
  let messageList = useRecoilValue(getPaginatedMessageList);
  
  return (
    <section style={{minWidth : "100%"}}>

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
      {data?.body ? (
        <>
          <section className="message_header" style={{display : "flex" , flexDirection : "row" , gap: "30px" , margin : " 30px 0px 0px 100px" , alignItems : "center" }}>
              <section style={{display: "flex"}}>
                    <span className="logo" style={{width : "50px" , height : "50px"}}>{data?.from?.name[0]?.toUpperCase()}</span>
                    
              </section>
              <section style={{display: "flex" , flexDirection : "column"}}>
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
                          <section>
                          <span style={{color: "#6b7280"}}>
                            {formatDate(data?.date).toString()} &nbsp;
                          </span>
                          <span onClick={() => {
                              localStorage.setItem("favoriteArrStr" , localStorage.getItem("favoriteArrStr") + "+" + data?.id)
                              setCount((state) => state + 1)
                              
                          }}
                          style={{color : "#db2777" , backgroundColor: "rgb(253, 242, 248)" , padding : "10px 20px 10px 20px" , borderRadius: "6px"}}
                          >
                             {  !(localStorage.getItem("favoriteArrStr") || "" ).includes(data?.id) ? "Mark As Favorite" : "Marked as Favorite"}
                          </span>
                          </section>
                </section>
              </section>
          </section>
          <section className="body-paragraph">
            {paragraphs?.map((paragraph: string) => {
              return <p>{paragraph}</p>;
            })}
          </section>
        </>
      ) : 
      
      <section style={{width : '100%' , height : "93vh" , display : "flex" , alignItems : "center" , justifyContent : "center"}}>
          Click on email to view contents  
      </section>}
      </>

        : 

        <div  className="message_preview overflow message-preview-right">
                    {messageList?.map((messagePreview : IMSG_DATA) => {
                        return (
                            <MockMessagePreviewCards messageItem={messagePreview} isFavorite={true}/>
                        )
                    })}

                    <section style={{width: "100%" ,position : "absolute" , bottom : "0px" , borderTop: "1px solid #efe7eb" , padding : "20px" , backgroundColor : "#f9fafb" , minWidth :"22.4%" , display : "flex" , alignItems : "center" , justifyContent : "center"}}>
                        <Footer />
                    </section>
        </div>
       }
      </>
    </section>
  );
};

export default MsgBody;
