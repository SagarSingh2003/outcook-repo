import UserData from "../model/userdata.js";
import Message from "../model/MessageSchema.js";
import ApiResponse from "../utils/ApiReponses.js";
import dbService from "../utils/dbService.js";
import sendMessageToKafkaQueue from "../utils/kafka/kafkaProduceMessageService.js";

const chartDataController = {
  getSentMessages : async (req , res) => {

        try{
          
            const email = req?.userData?.email;
            const result = await dbService.findOneUserAndPopulate(UserData , {email : email} , 'sentMessages')
    
            if(result){
              return new ApiResponse(res).successful(
                  "user sent messages found successfully",
                  result
              )
            } else{
              return new ApiResponse(res).internalServerError(
                "sent messages not found , please try again!"
              )
            }
        }catch(err){
            console.log("caught exception red handed : " , err)
            return new ApiResponse(res).internalServerError();
        }
  },
  getRecievedMessages : async(req , res) => {
    
      try{
              
          const email = req?.userData?.email;
          console.log(email)
          const result = await dbService.findOneUserAndPopulate(UserData , {email : email} , 'recievedMessages')

          console.log(result);

          if(result){
            
            return new ApiResponse(res).successful(
                "user recieved messages found successfully",
                result
            )
          } else{
            return new ApiResponse(res).internalServerError(
              "recieved messages not found , please try again!"
            )
          }
      }catch(err){
          console.log("caught exception red handed : " , err)
          return new ApiResponse(res).internalServerError();
      }
  },
  sendMessage : async (req , res) => {

      const message = req.body;
      console.log(req , "requestObject");
      console.log(req.userData);
      const sender_email = req?.userData?.email;
      const sender_name = req?.userData?.username;

      console.log(sender_email)
      console.log(sender_name)
      message.from = {
        name : sender_name,
        email : sender_email
      }

      if(!sender_email || !sender_name){
        return new ApiResponse(res).badRequest("email not found or name not found , please sign up first")
      }

      try{

          const isMessageSent = sendMessageToKafkaQueue(message);

          if(isMessageSent){
              return new ApiResponse(res).successful()
          }
      }catch(err){
          console.log(err);

          return new ApiResponse(res).internalServerError(err.toString())
      }

  },
  markAsDone : async (req , res) => {

    const id = req.params.id;

    try{
        
        const isMessageUpdated = await dbService.findOneAndUpdate(Message , {_id : id} , {isRead : true})  

        if(isMessageUpdated){
            return new ApiResponse(res).successful()
        }
    }catch(err){
        
        console.log(err);

        return new ApiResponse(res).internalServerError(err.toString())
    }

}
};


export default chartDataController;
