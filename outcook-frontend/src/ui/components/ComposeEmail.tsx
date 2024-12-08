import { composeModal } from "@/atoms/composeModal";
import { s3Base } from "@/constants/s3UrlBase";
import { useToast } from "@/hooks/useToast";
import { get_Signed_Url } from "@/utils/getSignedUrl";
import { sendMessage } from "@/utils/sendMessage";
import axios from "axios";
import { useRef, useState } from "react";
import { useRecoilState} from "recoil";

const MessageModal = () => {


   const [attachments , setAttachments] = useState<[string]>([""]);
   const [_, setShowComposeModal] = useRecoilState<any>(composeModal)

  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    to: "",
    subject: "",
    message: "",
  });

  const handleChange = (e : any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "", 
    });
  };


  const handleAttachFile = async (e : any) => {
        const file = e?.target?.files[0];
        
        const url = await get_Signed_Url(file?.name);

        try {
            const response = await axios.put(url, file, {
                headers: {
                    'Content-Type': file.type,
                },
            });
    
            if (response.status === 200) {
                console.log('File uploaded successfully!');
                setAttachments((state : any) => {
                    if(state[0].length === 0){
                        return [file.name.replaceAll(' ' , "+")]
                    }else{
                        return state.concat([file.name.replaceAll(" " + "+")])
                    }
                })
                
            } else {
                console.error('File upload failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }

        console.log(url);
        // const bodyBlob = dataURIToBlob(e?.target?.files)
  }
  const {showToast} = useToast()
  const fileInputRef = useRef()

//   @ts-expect-error 
  console.log(fileInputRef?.current?.value , "current value");

  const validateForm = () => {
    const newErrors : any = {};
    if (!formData.to.trim()) newErrors.to = "The 'To' field cannot be empty.";
    if (!formData.subject.trim()) newErrors.subject = "The 'Subject' field cannot be empty.";
    if (!formData.message.trim()) newErrors.message = "The 'Message' field cannot be empty.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);

      if(attachments[0].length !== 0){
         const res =    await sendMessage({...formData , attachments : attachments})
         if(res){
            setShowComposeModal(false)
         }else{
          showToast({
            title : "EMAIL COULD NOT BE SENT",
            desc: "please try again"
          })
         }
 
      }else{
        const res = await sendMessage(formData)
        console.log(res);
        
        if(res){
          setShowComposeModal(false)
        }else{
            showToast({
              title : "EMAIL COULD NOT BE SENT",
              desc: "please try again"
            })
        }
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <form onSubmit={handleSubmit}>
          <div className="modal-header">
            <h2>New Message</h2>

          <input
                type="file"
                // @ts-ignore 
                ref={fileInputRef}
                onChange={handleAttachFile}
                className="hidden"
                style={{display : "none"}}
                multiple
              />
            <button type="button" className="attach-button" onClick={() => {
                // @ts-expect-error
                  fileInputRef.current?.click()
            }}> 
              <span className="attach-icon">&#128206;</span> Attach
            </button>
            <button type="submit" className="send-button">Send</button>

            <button onClick={() => {
                setShowComposeModal(false)
            }}
            
            type="button" className="close-button">&times;</button>
          </div>
          <div className="modal-body">
            <div className="input-wrapper">
              <input
                type="email"
                name="to"
                placeholder="To"
                className={`input-field ${errors.to ? "error-field" : ""}`}
                value={formData.to}
                onChange={handleChange}
              />
              {errors.to && <span className="error-text" style={{padding : "5px 0 5px 0"}} >{errors.to}</span>}
            </div>
            <div className="input-wrapper">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className={`input-field ${errors.subject ? "error-field" : ""}`}
                value={formData.subject}
                onChange={handleChange}
              />
              {errors.subject && <span className="error-text" style={{padding : "5px 0 5px 0"}} >{errors.subject}</span>}
            </div>
            <div className="input-wrapper">
              <textarea
                name="message"
                placeholder="Message"
                className={`textarea-field ${errors.message ? "error-field" : ""}`}
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              {errors.message && <span className="error-text" style={{padding : "10px 0 10px 0"}} >{errors.message}</span>}
            </div>
          </div>
          
          <div className="modal-attachments">
                {attachments[0]?.length!= 0 && attachments?.map((attachment : string , index : number) => {
                    return (
                        <p className="modal-attachments-children" style={{display : "flex" , width : "95%" , gap: "10px" , justifyContent : "space-between" , padding : "10px" , backgroundColor: "#e5e7eb" ,   border: "1px solid white"}}>
                           <span onClick={() => {
                                window.open(s3Base + "/" + attachment.trim())
                           }}> {attachment.split(".")[(attachment.split(".").length - 1)] === "png" || attachment.split(".")[(attachment.split(".").length - 1)] === "jpg" || attachment.split(".")[(attachment.split(".").length - 1)] === "jpeg" ? 
                           
                                <img src={s3Base + "/" + attachment.trim()} alt={attachment + " file preview"} width={250}/>

                                : 

                                attachment
                            }</span>
                           <span className="modal-attachment-remove" onClick={() => {
                                    setAttachments((state : any ) =>{
                                        if(state.length !== 1){
                                            return state.slice(0 , index).concat(state.slice(index+1))
                                        }else{
                                            return [""]
                                        }
                                    })
                            }}>&times;</span>    
                        </p>
                    )
                }).reverse()}
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageModal;

