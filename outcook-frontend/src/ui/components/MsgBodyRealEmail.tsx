import { bodyMetaData } from "@/atoms/messageBody";
import formatDate from "@/utils/formatDate";
import {useRecoilValue } from "recoil";

const MsgBody = () => {

  const data = useRecoilValue<any>(bodyMetaData);
  const paragraph = data?.body;

  console.log("this is data");

  return (
    <section style={{minWidth : "100%"}}>
      {data?.body ? (
        <>
          <section style={{display : "flex" , flexDirection : "row" , gap: "30px" , margin : " 30px 0px 0px 100px" , alignItems : "center" }}>
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
                  <span style={{color: "#6b7280"}}>
                    {formatDate(data?.date).toString()} &nbsp;
                  </span>
                </section>
              </section>
          </section>
          <section className="body-paragraph" style={{paddingTop: "30px"}}>
            {paragraph}
          </section>
        </>
      ) : 
      
      <section style={{width : '100%' , height : "93vh" , display : "flex" , alignItems : "center" , justifyContent : "center"}}>
          Click on email to view contents  
      </section>}
    </section>
  );
};

export default MsgBody;
