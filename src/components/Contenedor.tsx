import { GeneralContext } from './GeneralContext';
import { useContext, useEffect } from 'react';
import Swal from 'sweetalert2'
import Chat from './Chat';
import Loader from './Loader';
import { Message } from '../types';
import { esNumerico } from '../utils/utils';

const Contenedor = () => { // Componente inicial. Renderiza la alerta de inicio, el loading, y luego el chat
    const generalContext = useContext(GeneralContext);
    if (!generalContext) return <></>
    const { socket, user, setUser, arrayMensajes, setArrayMensajes } = generalContext

    useEffect(() => {
        Swal.fire({ // Muestra una alerta que te pide tu nombre
            title: "Identifícate",
            input: "text",
            text: "Por favor ingresa tu nombre de usuario",
            inputValidator: (value: string) => { // Valida que en el imput no coloquemos un string numérico o vacío
                value = value.trim()
                if (esNumerico(value)) return "¡Utiliza un nombre de usuario válido!"
                return null
            },
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result: { value?: string }) => {
            setUser(result.value)
            if (result.value && socket) {
                socket.connect() // Le pedimos que se conecte cuando el usuario ingresó un nombre válido
                socket.emit("autenticado", result.value)
                socket.on("mensajesPasados", (msgs: Message[]) => {
                    setArrayMensajes(msgs)
                })
            }
        })

        socket?.on("logs", (data: Message[]) => {
            setArrayMensajes(data)     
        })
    }, [])

    useEffect(() => {
        socket?.on("newUserConnected", (user_: string) => { // Muestra una pequeña alerta cuando un usuario nuevo se conecta, siempre y cuando el actual se haya identificado
            if (user) {
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 4000,
                    title: `${user_} se ha unido al chat`,
                    icon: "success"
                })
            }
        })
    }, [user])

    return (
        <div className='p-1 relative flex flex-col mx-auto max-w-6xl'>
            {
            user && socket && arrayMensajes !== null ?
            <>
            <h1 className='py-1 text-center font-semibold text-4xl'>Sala de chat</h1>
            <Chat user={user} socket={socket} arrayMensajes={arrayMensajes}/>
            </> : <Loader />
            }
        </div>
    )
}

export default Contenedor
