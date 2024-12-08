import axios from "@/configs/axios.config"

// {
//     "from": {
//       "email": "iamsagar762@gmail.com",
//       "name": "sagarsingh"
//     },
//     "to": {
//       "email": "t@gmail.com"
//     },
//     "subject": "latest notification",
//     "short_description": "Reminder for our upcoming meeting.",
//     "date": "2024-12-05T09:00:00Z",
//     "body": "Hey there,\n\nThis is a reminder for our meeting scheduled for tomorrow. Please let me know if you have any questions.\n\nBest,\nSagar",
//     "attachments": [
//       "https://example.com/attachment1.pdf",
//       "https://example.com/attachment2.jpg"
//     ],
//     "isFavorite": false,
//     "isRead": false
//   }

export const sendMessage = async (data : any) => {

    console.log(data.attachments)
    try{
        const res = await axios.post("/user/send_message" , {
            "to" : {
                "email" : data.to
            },
            "subject" : data.subject,
            "short_description" : data?.message?.length > 15 ? data?.message?.slice(0 , Math.floor(data.message.length / 4)).toString() : data?.message.toString(),
            "body" : data?.message,
            "date" : new Date(Date.now()).toString(),
            "attachments" : data.attachments,
            "isFavorite" : false,
            "isRead" : false
        })
    
        if(res.status === 200){
            return res.data
        }else{
            return null
        }
    }catch(err : any){
        return err.toString()
    }
}