import { atom } from "recoil";

export const toastValue = atom({
    key : "ToastValue",
    default : {title : "" , desc : ""}
})
