import { useContext } from "react";
import IconClose from "./svg/IconClose"
import { GeneralContext } from "./GeneralContext";

const CitarAhora = () => { // Componente que se muestra cuando estás citando un mensaje
    const generalContext = useContext(GeneralContext);
    if (!generalContext) return <></>
    const { infoMsgCitado, setInfoMsgCitado } = generalContext

    const close = () => {
        setInfoMsgCitado(undefined)
    }

    if (!(infoMsgCitado?.authorCapturado)) return <></>

    return (
        <>
        <p className="user">{infoMsgCitado.authorCapturado}</p>

        <div className="flex justify-evenly">
            <p className="breakWords">{infoMsgCitado?.mensajeCapturado}</p>
            {infoMsgCitado.imagenCapturada && <img className="max-w-[75%] max-h-72 imgChatCitado" src={infoMsgCitado?.imagenCapturada} alt="Imagen citada" />}
        </div>

        <span onClick={close} className="absolute top-0 right-1 cursor-pointer">
            <IconClose />
        </span>
        </>
    )
}

export default CitarAhora
