import { atom, selector } from "recoil";

export const bodyMetaData = atom({
  key: "MetaDataBody",
  default: {
    _id: "",
    from: {
      email: "",
      name: "",
    },
    date: 0,
    subject: "",
    short_description: "",
  },
});

export const messageBody = atom({
    key: "MessageBody",
    default: {
        _id : "",
        body: ""          
    }
}) 

export const getMessageBody = selector({
  key: "GetMessageBody",
  get: ({ get }) => {
    const messagebody = get(messageBody);
    const messageMetaData = get(bodyMetaData);

    return { ...messageMetaData, ...messagebody };
  },

});
