import { atom } from "recoil";

export const currentFilterCode = atom({
    key : 'CurrentFilterCode',

    //check the filter code from constants filter_code.ts
    default : 0
})