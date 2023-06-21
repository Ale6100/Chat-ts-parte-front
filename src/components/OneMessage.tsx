import { useContext } from "react"
import { Message } from "../types"
import MsgCitado from "./MsgCitado"
import IconTrash from "./svg/IconTrash"
import IconPanelOptions from "./svg/IconPanelOptions"
import PanelOptions from "./PanelOptions"
import { GeneralContext } from "./GeneralContext"
import Swal from "sweetalert2"

const OneMessage = ({ msg }: { msg: Message }) => { // Estructura de cada mensaje
    const generalContext = useContext(GeneralContext);
    if (!generalContext) return <></>
    const { idPanelAbierto, setIdPanelAbierto, socket } = generalContext

    const toggleMenu = () => { // Abre o cierra el menú de opciones en cada mensaje
        if (idPanelAbierto === msg._id.valueOf()) {
            setIdPanelAbierto(null)

        } else {
            setIdPanelAbierto(msg._id.valueOf())
        }
    };

    const deleteMsg = () => {
        Swal.fire({ // Muestra una alerta pidiéndote contraseña | Lo más normal sería que en realidad cada usuario pueda eliminar su propio mensaje, pero como no tengo un sistema de logueo se me ocurrió hacerlo por contraseña. Lamentablemente esta contraseña sólo la tengo que saber yo para que nadie elimine maliciosamente
            title: "Eliminar mensaje",
            input: "password",
            text: "Debes ingresar una contraseña especial para eliminar mensajes",
            allowOutsideClick: false,
            allowEscapeKey: false,
            showCancelButton: true,
            cancelButtonText: "Cancelar",
        }).then( async result => {        
            if (result.isConfirmed) {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/eliminarMensaje?password=${result.value}`, {
                    method: "DELETE",
                    body: JSON.stringify({ id: msg._id }),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`
                    }
                }).then(res => res.json())
    
                if (res.status === "error") {
                    Swal.fire({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 4000,
                        title: `${res.message ?? "Error, intente de nuevo más tarde"}`,
                        icon: "error"
                    })
                } else {
                    Swal.fire({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 4000,
                        title: `${res.message}`,
                        icon: "success"
                    })
    
                    socket?.emit("actualizar", { data: res.data }) 
                }
            }
        })
    }
    
    return (
        <>
        <MsgCitado respuestaGuardada={msg.respuestaGuardada}/>

        <div className="flex justify-between">
            <div>
                { msg.message ? <p className="breakWords">{msg.message}</p> : ""}
                { msg.image ? <img className="max-h-80 max-w-[75%]" src={msg.image} alt="Imagen enviada" /> : ""}
            </div>

            <div className="flex">
                <p className="flex items-center">{msg.hora}</p>
                
                <button onClick={deleteMsg} className="mx-1 my-auto w-min flex items-center hover:opacity-70"><IconTrash/></button>

                <button className="relative w-min my-auto flex items-center">
                    <IconPanelOptions onClick={toggleMenu}/>
                    <PanelOptions openPanel={idPanelAbierto === msg._id.valueOf()} msg={msg}/>
                </button>
            </div>
        </div>
        </>
    )
}

export default OneMessage
