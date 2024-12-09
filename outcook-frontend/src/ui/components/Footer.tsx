import { currentPage, getPaginatedMessageList, maxMessages } from "@/atoms/emailMockData"
import { startTransition } from "react";
import { useRecoilState, useRecoilValue } from "recoil"

export default function Footer(){

    const [currentpage , setCurrentPage] = useRecoilState<number>(currentPage);
    const messageList : any = useRecoilValue(getPaginatedMessageList);
    const maxmessages = useRecoilValue(maxMessages);

    if(messageList?.length !== 0){

        return (
            <footer className="footer">
                    <span  className="pagination-btn" 
                        onClick={() => {
                            if(currentpage > 1){
                                startTransition(() => {
                                    setCurrentPage(currentpage - 1)
                                })
                            }
                        }}
                    >Previous</span>
                    <span className="pagination-btn pagination-btn-color">{currentpage}</span>
                    <span className="pagination-btn "
                    onClick={() => {
                        startTransition(() => {
                        console.log(messageList[messageList?.length - 1].id , maxmessages);
                        if( Number(messageList[messageList?.length - 1].id) < maxmessages ){  
                        
                                setCurrentPage(currentpage + 1)
                        
                        }
                    })
                    }}
                    >Next</span>
            </footer>
        )
    }
}