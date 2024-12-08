import { get_Messages_List_From_Backend, get_Sent_Messages_List_From_Backend } from "@/utils/getRealMessages";
import { atom, selector } from "recoil";


export const getMessageList = selector({
    key: 'GetMessageList',
    get: async () => {
        return await get_Messages_List_From_Backend()
    }    
})


export const sentMessageList = selector({
    key: "SentMessageList",
    get: async () => {
        return await get_Sent_Messages_List_From_Backend()
    }
})

export const messagesAndNotificationMessages = atom({
    key : 'GetMessageAndNotificationMessages',
    default: []
})