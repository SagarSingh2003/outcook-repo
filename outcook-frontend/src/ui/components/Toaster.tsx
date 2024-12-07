import { toastValue } from "@/atoms/toast";
import { useRecoilValue } from "recoil";
import chime from "@/assets/chime-sound-7143.mp3";
import { useEffect, useRef } from "react";

const Toaster = () => {
    const toast = useRecoilValue(toastValue);
    const audioRef = useRef(new Audio(chime));

    useEffect(() => {
        if (toast.title) {
            audioRef.current.play();

            return () => {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            };
        }
    }, [toast]);

    if (!toast.title) {
        return null;
    }

    return (
        <main className="toast-container" role="alert">
            <span className="toast-title">{toast.title}</span>
            <span className="toast-description">{toast.desc}</span>
        </main>
    );
};

export default Toaster;
