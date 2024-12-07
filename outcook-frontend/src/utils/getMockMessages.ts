import { mock_message_body_api, mock_message_list_api } from "@/constants/api";
import axios from "axios";
import { RecoilState } from "recoil";


export interface IMSG_DATA{
        id: string;
        from: {
            email: string;
            name: string;
        };
        date: number;
        subject: string;
        short_description: string;        
}

export interface IMSG_BODY{
    data : {
        id : string,
        body: string
    }
}

interface IMOCK_API_MSG_LIST_RESPONSE{
    data : {
        list : [IMSG_DATA]
    }
}

export const get_Mock_Messages = async (suffix? : string) => {

    try{
        

        const api = `${mock_message_list_api + suffix}`.trim()

        console.log("api is", api);

        const api_response : IMOCK_API_MSG_LIST_RESPONSE = await axios.get(api)
    
        return api_response.data.list

    }catch(err){

        console.log("Error occured in getMockMessage api *****");
        console.log(err);

    }
}


export const get_Paginated_Messages_List = async (page_id : RecoilState<number>) => {
        return await get_Mock_Messages(`?page=${page_id}`)
}


export const get_Message_Body = async (id: string) => {

    try{
        
        const api = `${ mock_message_body_api + id}`.trim()

        const api_response : IMSG_BODY = await axios.get(api)
    
        return api_response.data

    }catch(err){

        console.log("Error occured in get_Message_Body api *****");
        console.log(err);

    }
}
