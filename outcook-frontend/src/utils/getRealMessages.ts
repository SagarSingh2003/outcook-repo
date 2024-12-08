import axios from "@/configs/axios.config";

export const get_Messages_List_From_Backend = async () => {
       
        try{

            const res = await axios.get('/user/get_all_recieved_messages')

            console.log(res)

            if(res.status === 200){
                return res?.data?.data?.recievedMessages
            }else if(typeof(res) === typeof("string")){
                return "redirect"
            }else{
                return null
            }

        }catch(err : any){
            console.log("error occured while fetching email from backend" , err)
            return null
        }

};


export const get_Sent_Messages_List_From_Backend = async () => {
       
    try{

        const res = await axios.get('/user/get_all_sent_messages')

        console.log(res)

        if(res.status === 200){
            return res?.data?.data?.sentMessages
        }else{
            return null
        }

    }catch(err : any){
        console.log("error occured while fetching email from backend" , err)
        return err.toString()
    }

};
