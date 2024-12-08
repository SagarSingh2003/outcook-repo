import { composeModal } from "@/atoms/composeModal";
import { currentFilterCode } from "@/atoms/filter";
import { showEmailType } from "@/atoms/showEmails";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function Header() {
  const setFilter = useSetRecoilState(currentFilterCode);
  const setShowComposeModal = useSetRecoilState<any>(composeModal)
  const handleChangeTab = (filterCode: number) => {
    setFilter(filterCode);
  };
  const [emailType , setEmailType ] = useRecoilState(showEmailType)

  return (
    <header className="header">
      <section className="header-section-nav" style={{fontSize : "14px" , fontWeight : "semibold"}}>
        <span style={emailType === "recieved" ? { backgroundColor: "#E5E7EB", color: "#1F2937" } : {}}
        
            onClick={() => {
                    setEmailType("recieved")
            }}

        >
            recieved
        </span>
        <span style={emailType === "sent" ? { backgroundColor: "#E5E7EB", color: "#1F2937" } : {}}

            onClick={() => {
                setEmailType("sent")  
            }}
        >
            sent
        </span>
        <span
          onClick={() => {
              setShowComposeModal(true)
              handleChangeTab(2)
            }
          }
          className="compose-btn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="#39addf" fillRule="evenodd" d="M14 3v1.2H4.2v15.6h15.6V10H21v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm5.86-.254a.5.5 0 0 1 .706 0l.706.705a.5.5 0 0 1 0 .706l-9.51 9.51l-2.317 1.295a.3.3 0 0 1-.406-.41l1.312-2.296z"></path></svg>
        </span>
      </section>
    </header>
  );
}
