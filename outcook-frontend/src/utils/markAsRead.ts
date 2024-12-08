import axios from "@/configs/axios.config"

export const markAsRead = async (id : any) => {

    try{
        const res = await axios.put(`/user/mark_as_done/${id}`)
    
        if(res.status === 200){
            return res.data
        }else{
            return null
        }
    }catch(err : any){
        return err.toString()
    }
}