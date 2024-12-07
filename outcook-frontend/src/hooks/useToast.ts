import { useRecoilState } from "recoil";
import { toastValue } from "@/atoms/toast";
import { useEffect } from "react";

export function useToast() {
  const [toast , setToast] = useRecoilState(toastValue);

  const showToast = ({ title, desc }: { title: string; desc: string }) => {
    setToast({ title, desc });

  };


  useEffect(() => {
    const id = setTimeout(() => {
        if(toast?.title?.length !== 0 || toast?.desc?.length !== 0){
            setToast({title : "" , desc : ""})
        }
    } , 2000)

    return () => {
        clearTimeout(id)
    }

} , [toast])


  return { showToast };
}
