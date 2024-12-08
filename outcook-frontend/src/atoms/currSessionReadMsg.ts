import { atom, selector } from "recoil";
import { getMessageList } from "./realEmailData";

export const currSessionReadMsg = atom({
    key : "CurrSessionReadMsg",
    default : ""
})

export const readMsgList = selector({
    key: "ReadMsgList",
    get : ({get}) => {
           const templist =  get(getMessageList)
           let tempstr = "";
           templist.forEach((message : any) => {
                tempstr += "+" + message?._id
           })

           return tempstr + get(currSessionReadMsg)
    }
})