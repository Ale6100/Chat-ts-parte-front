import { useEffect, useRef, useContext } from "react";
import { Message } from "../types";
import { GeneralContext } from "./GeneralContext";

const PanelOptions = ({ openPanel, msg }: { openPanel: boolean, msg: Message }) => {
    const generalContext = useContext(GeneralContext);
    if (!generalContext) return <></>
    const { setIdPanelAbierto, setInfoMsgCitado } = generalContext
    
    const div = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const classList = div.current?.classList
        if (classList) {
            if (openPanel) {
                classList.remove("scale-0", "opacity-0")
                classList.add("scale-1", "opacity-1")            
            } else {
                classList.remove("scale-1", "opacity-1")
                classList.add("scale-0", "opacity-0")
            }
        }

    }, [openPanel])

    const clickCita = () => {
        const obj: Message["respuestaGuardada"]  = {
            authorCapturado: msg.user,
            mensajeCapturado: msg.message,
            imagenCapturada: msg.image,
            id: msg._id.valueOf()
        }

        setInfoMsgCitado(obj)
        setIdPanelAbierto(null)
    }

    return (
        <div ref={div} className="px-1 absolute top-0 right-5 origin-top-right transition-all scale-0 opacity-0 border-black bg-white border cursor-auto">
            <p onClick={clickCita} className="hover:bg-gray-300 px-1 cursor-pointer">Responder</p>
        </div>
    )
}

export default PanelOptions
