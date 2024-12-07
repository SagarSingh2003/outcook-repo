import { get_Messages_List_From_Backend } from "@/utils/getRealMessages";
import { atom, selector } from "recoil";


export const getMessageList = selector({
    key: 'GetMessageList',
    get: async () => {
        return await get_Messages_List_From_Backend()
    }    
})


export const messagesAndNotificationMessages = atom({
    key : 'GetMessageAndNotificationMessages',
    default: []
})