import { FormEvent, useContext, useState, ReactElement, useEffect, useRef } from "react";
import { GeneralContext } from "./GeneralContext";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import { Socket } from 'socket.io-client';
import { Message } from "../types";
import OneMessage from "./OneMessage";
import { convertToBase64 } from "../utils/utils";
import CitarAhora from "./CitarAhora";

const Chat = ({ user, socket, arrayMensajes }: { user: string, socket: Socket, arrayMensajes: Message[] }) => {
    const generalContext = useContext(GeneralContext);
    if (!generalContext) return <></>
    const { infoMsgCitado, setInfoMsgCitado } = generalContext

    const [ montado, setMontado ] = useState(false)
    const [ fileSelected, setFileSelected ] = useState(false)
    const [ arrayGlobosDeTexto, setArrayGlobosDeTexto ] = useState<ReactElement[]>([]) // Servirá para guardar los globos de texto

    const logsPanel = useRef<HTMLDivElement>(null);
    const contCita = useRef<HTMLDivElement>(null);

    useEffect(() => { // Establece cuando el componente se montó
        setMontado(true)
    }, [])

    useEffect(() =>{ // Se encarga de mantener organizados a todos los mensajes
        let arrayComponentesMensajesIndividuales: ReactElement[] = []
        let arrayGlobosDeTexto_local: ReactElement[] = []

        if (montado) {
            if (arrayMensajes.length === 0) {                    
                arrayGlobosDeTexto_local = [<p>No hay mensajes para mostrar</p>]
            }

            arrayMensajes.forEach((element, index) => {
                if (arrayMensajes.length === 1) { // Si sólo hay un mensaje para mostrar
                    arrayGlobosDeTexto_local = [
                        <>
                        <p className="pFecha">----- {element.fecha} -----</p>
                        
                        <div className={`globoTexto ${element.user === user ? "ml-auto": ""}`}>
                            <p className="user">{element.user}</p>
                            <div className="containerOneMessage">
                                <OneMessage msg={element}/>
                            </div>
                        </div>
                        </>
                    ]
                    
                } else {
                    const fechaActual = new Date(element.fecha.split('/').reverse().join('-')).getTime()
                    const fechaAnterior = new Date(arrayMensajes[index-1]?.fecha.split('/').reverse().join('-')).getTime() // Uso el signo de pregunta ya que en la primera iteración, data[index-1] no está definido, pero no importa ya que en ese momento no lo necesitamos

                    if (index === 0) { // Entra en este if si estamos en la primera iteración (correspondiente al primer mensaje)
                        arrayGlobosDeTexto_local = [<p className="pFecha">----- {element.fecha} -----</p>] // Al inicio siempre se mostrará la primera fecha
                        
                        arrayComponentesMensajesIndividuales = [<OneMessage msg={element}/>] // Guardamos el primer mensaje                     
                        
                    } else if (index !== arrayMensajes.length-1) { // Entra en este if si no estamos ni en la primera iteración (mensaje) ni en la última                        
                        if (arrayMensajes[index].user !== arrayMensajes[index-1].user) { // Cuando el mensaje actual y el anterior son de distinto usuario
                            arrayGlobosDeTexto_local = [...arrayGlobosDeTexto_local,
                                <div className={`globoTexto ${arrayMensajes[index-1].user === user ? "ml-auto": ""}`}>
                                    <p className="user">{arrayMensajes[index-1].user}</p>
                                    {
                                        arrayComponentesMensajesIndividuales.map((arrayMsgInd, index) => (
                                            <div className="containerOneMessage" key={index}>
                                                {arrayMsgInd}
                                            </div>
                                        ))
                                    }
                                </div>
                            ]
                            

                            if (fechaActual !== fechaAnterior) { // Si además hubo un cambio de fecha, muestra la actual, correspondiente a la fecha del mensaje enviado por el nuevo usuario                               
                                arrayGlobosDeTexto_local = [...arrayGlobosDeTexto_local, <p className="pFecha">----- {element.fecha} -----</p>]
                            }

                            arrayComponentesMensajesIndividuales = [<OneMessage msg={element}/>] // Se guarda únicamente el mensaje actual, correspondiente al nuevo usuario

                        } else { // Cuando el mensaje actual y el anterior son del mismo usuario                            
                            if (fechaActual !== fechaAnterior) { // Si hubo un cambio de fecha, ponemos el globo con los mensajes viejos acumulados y la fecha actual
                                arrayGlobosDeTexto_local = [...arrayGlobosDeTexto_local,
                                    <>
                                    <div className={`globoTexto ${arrayMensajes[index-1].user === user ? "ml-auto": ""}`}>
                                        <p className="user">{arrayMensajes[index-1].user}</p>
                                        {
                                            arrayComponentesMensajesIndividuales.map((arrayMsgInd, index) => (
                                                <div className="containerOneMessage" key={index}>
                                                    {arrayMsgInd}
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <p className="pFecha">----- {element.fecha} -----</p>
                                    </>
                                ]
    
                                arrayComponentesMensajesIndividuales = []
                            }
    
                            arrayComponentesMensajesIndividuales = [...arrayComponentesMensajesIndividuales, <OneMessage msg={element}/>]                            
                        }
                    
                    } else if (index === arrayMensajes.length-1) { // En la última iteración
                        if (arrayMensajes[index].user !== arrayMensajes[index-1].user) { // Cuando los últimos dos mensajes son de distinto usuario                            
                            // En un contenedor grande se visualizan todos los mensajes previos guardados, correspondiente al usuario anterior
                            arrayGlobosDeTexto_local = [...arrayGlobosDeTexto_local,
                            <div className={`globoTexto ${arrayMensajes[index-1].user === user ? "ml-auto": ""}`}>
                                <p className="user">{arrayMensajes[index-1].user}</p>
                                {
                                    arrayComponentesMensajesIndividuales.map((arrayMsgInd, index) => (
                                        <div className="containerOneMessage" key={index}>
                                            {arrayMsgInd}
                                        </div>
                                    ))
                                }
                            </div>
                            ]

                            if (fechaActual !== fechaAnterior) { // Si además hubo un cambio de fecha, muestra la actual, correspondiente a la fecha del mensaje enviado por el nuevo usuario
                                arrayGlobosDeTexto_local = [...arrayGlobosDeTexto_local, <p className="pFecha">----- {element.fecha} -----</p>]                                
                            }

                            // Se visualiza el último mensaje enviado, correspondiente al nuevo usuario
                            arrayGlobosDeTexto_local = [...arrayGlobosDeTexto_local,
                            <div className={`globoTexto ${element.user === user ? "ml-auto": ""}`}>
                                <p className="user">{element.user}</p>
                                <div className="containerOneMessage">
                                    <OneMessage msg={element}/>
                                </div>
                            </div>
                            ]

                        } else { // Cuando los últimos dos mensajes son del mismo usuario    
                            if (fechaActual !== fechaAnterior) { // Si hubo un cambio de fecha
                                arrayGlobosDeTexto_local = [...arrayGlobosDeTexto_local, 
                                    <>
                                    <div className={`globoTexto ${element.user === user ? "ml-auto": ""}`}>
                                        <p className="user">{element.user}</p>
                                        {
                                            arrayComponentesMensajesIndividuales.map((arrayMsgInd, index) => (
                                                <div className="containerOneMessage" key={index}>
                                                    {arrayMsgInd}
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <p className="pFecha">----- {element.fecha} -----</p>
                                    </>
                                ]

                                arrayComponentesMensajesIndividuales = []

                            }

                            arrayComponentesMensajesIndividuales = [...arrayComponentesMensajesIndividuales, <OneMessage msg={element}/>] // Guardo el último mensaje          
                            
                            arrayGlobosDeTexto_local = [...arrayGlobosDeTexto_local, 
                                <div className={`globoTexto ${element.user === user ? "ml-auto": ""}`}>
                                    <p className="user">{element.user}</p>
                                    {
                                        arrayComponentesMensajesIndividuales.map((arrayMsgInd, index) => (
                                            <div className="containerOneMessage" key={index}>
                                                {arrayMsgInd}
                                            </div>
                                        ))
                                    }
                                </div>
                            ]
                        }
                    }
                }
            })
            setArrayGlobosDeTexto(arrayGlobosDeTexto_local)
        }

    }, [montado, arrayMensajes])

    useEffect(() => { // Se encarga de scrollear hacia abajo siempre que haya un nuevo mensaje
        if (montado) {
            if (logsPanel.current) {
                const { scrollHeight } = logsPanel.current;
                logsPanel.current.scrollTo(0, scrollHeight);
            }
        }
    }, [arrayGlobosDeTexto])

    useEffect(() => {
        const classList = contCita.current?.classList

        if (montado) {
            if (classList) {
                if (infoMsgCitado?.authorCapturado) {
                    classList.remove("scale-0", "opacity-0")
                    classList.add("scale-1", "opacity-1")
                } else {
                    classList.remove("scale-1", "opacity-1")
                    classList.add("scale-0", "opacity-0")
                }
            }
        }

    }, [infoMsgCitado])

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const nameFile = e.currentTarget.files?.[0]?.name;
                
        if (nameFile) {
            setFileSelected(true)
            Toastify({
                text: `Seleccionaste el archivo ${nameFile}`,
                duration: 4000,
                close: true,
                gravity: "bottom",
                position: "left",
                stopOnFocus: true,
                style: {
                    border: "1px solid black",
                    borderRadius: "3px",
                    background: "linear-gradient(to right, rgba(0, 176, 155, 1), rgba(125, 175, 35, 0.9))",
                }
            }).showToast();
        } else {
            setFileSelected(false)
        }
    };

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget

        interface ObjInt {
            [key: string]: FormDataEntryValue
        }
    
        const formData = new FormData(form)
        const obj: ObjInt = {}
        formData.forEach((value, key) => obj[key] = value)
        
        const imageSize = (obj.imageForm as { size: number } ).size;
    
        if (imageSize >= 1000000) { // Si la imagen supera los 1MB, rechaza el mensaje (técnicamente debería considera el tamaño de la imagen más los otros datos, pero como pesan muy poco voy a hacer la vista gorda aunque no sea correcto. En el futuro cambiaré esto)
            return Toastify({
                text: "Por ahora el tamaño de la imagen no puede exceder 1MB",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #00b09b, rgb(125, 125, 61))",
                    border: "2px solid black",
                    borderRadius: "2px"
                }
            }).showToast();
        }
    
        let mensaje = ''
        if (typeof obj.mensaje === 'string') {
            mensaje = obj.mensaje.trim()
        }

        const file = obj.imageForm

        if (file instanceof File) {
            const fileBase64 = await convertToBase64(file) as string
            if (fileBase64 !== "No image") {
                obj.image = fileBase64
            }
        }

        if (mensaje.length > 0 || obj.image) { // Se ejecuta si el mensaje es un string no vacío o si se quiere enviar una imagen       
            const fecha = new Date().toLocaleDateString(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' }).replaceAll('-', '/') // Fecha y hora en la que se mandó el mensaje. El replace lo uso porque a algunos pocos usuarios les aparecen guiones en vez de barras laterales
            const hora = new Date().toLocaleTimeString()            

            const respuestaGuardada = {
                authorCapturado: infoMsgCitado?.authorCapturado,
                mensajeCapturado: infoMsgCitado?.mensajeCapturado,
                imagenCapturada: infoMsgCitado?.imagenCapturada,
                id: infoMsgCitado?.id
            }

            socket.emit("message", { user, message: mensaje, fecha, hora, image: obj.image, respuestaGuardada }) // Emito un evento personalizado "message". Envío el usuario, el mensaje, la fecha, la hora y la url de la imagen en caso de que haya enviados
        }
        
        setInfoMsgCitado(undefined)
        setFileSelected(false)
        form.reset()
    }

    return (
    <div className='bg-blue-500 p-3 flex flex-col'>
        <div className='chat mb-3 flex flex-col bg-white relative'>
            <div ref={logsPanel} className='p-1 flex-grow overflow-y-auto '>
                {
                arrayGlobosDeTexto.map((comp, i) => (
                    <div key={i}>
                        {comp}
                    </div>
                ))
                }
            </div>

            <div ref={contCita} className='origin-bottom transition-all scale-0 opacity-0 relative p-1 bg-blue-200 border-t border-black'> {/* Para citar mensajes */}
                <CitarAhora/>
            </div>
        </div>
        
        <form className='flex justify-between h-9' onSubmit={sendMessage}>
            <input type="text" name="mensaje" placeholder="Escribe tu mensaje..." autoComplete="off" className='w-full'/>

            <div className='flex items-center'>
                <div className={`mx-1 ${fileSelected ? "bg-blue-700" : ""} rounded-sm`}>
                    <label htmlFor="filePicker" className="w-7 h-7 cursor-pointer">
                        <svg className="w-7 h-7 mx-auto" viewBox="16 18 21 17">
                            <path d="M18.318 18.25 34.682 18.25C35.545 18.25 36.409 19.077 36.493 19.946L36.5 20.083 36.5 32.917C36.5 33.788 35.68 34.658 34.818 34.743L34.682 34.75 18.318 34.75C17.368 34.75 16.582 34.005 16.506 33.066L16.5 32.917 16.5 20.083C16.5 19.213 17.32 18.342 18.182 18.257L18.318 18.25 34.682 18.25ZM23.399 26.47 19.618 31.514C19.349 31.869 19.566 32.25 20.008 32.25L32.963 32.25C33.405 32.239 33.664 31.848 33.384 31.492L30.702 28.043C30.486 27.774 30.077 27.763 29.861 28.032L27.599 30.759 24.26 26.459C24.045 26.179 23.614 26.179 23.399 26.47ZM31.75 21.25C30.784 21.25 30 22.034 30 23 30 23.966 30.784 24.75 31.75 24.75 32.716 24.75 33.5 23.966 33.5 23 33.5 22.034 32.716 21.25 31.75 21.25Z" style={{ width: '100%', height: '100%' }} />
                        </svg>
                    </label>

                    <input onChange={handleFileSelect} id="filePicker" className="hidden" name="imageForm" type={"file"} accept="image/*" />
                </div>
                
                <button className='w-7 h-7' type="submit">
                    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24"><path fill="currentColor" d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path></svg>
                </button>
            </div>
        </form>
    </div>
    )
}

export default Chat
