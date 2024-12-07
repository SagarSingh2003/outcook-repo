import axios from "@/configs/axios.config";

export const get_Signed_Url = async (key : string) => {
       
    try{

        const res = await axios.get('/aws/get_presigned_url/' + key)

        console.log(res)

        if(res.status === 200){
            return res?.data?.data?.uploadURL
        }else{
            return res
        }

    }catch(err : any){
        console.log("error occured while fetching presigned url" , err)
        return err.toString()
    }

};
