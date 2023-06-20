import { Dispatch, createContext, useState } from "react";
import { io, Socket } from 'socket.io-client';
import { Message } from "../types";

interface PersonalContextValue {
    socket: Socket | undefined; // Medio raro hacer esto ya que siempre será válido, pero lo dejo por ahora
    user: string | undefined;
    setUser: Dispatch<React.SetStateAction<string | undefined>>;
    arrayMensajes: Message[] | null;
    setArrayMensajes: Dispatch<React.SetStateAction<Message[] | null>>;
    idPanelAbierto: string | null;
    setIdPanelAbierto: Dispatch<React.SetStateAction<string | null>>;
    infoMsgCitado: Message["respuestaGuardada"] | undefined;
    setInfoMsgCitado: Dispatch<React.SetStateAction<Message["respuestaGuardada"] | undefined>>;

}

export const GeneralContext = createContext<PersonalContextValue | undefined>(undefined);
interface GeneralContextProviderProps {
    children: React.ReactNode;
}

const socket = io('http://127.0.0.1:8080', { // Inicializamos socket del lado del cliente
    autoConnect: false
}); 

const GeneralContextProvider = ({ children }: GeneralContextProviderProps) => {
    const [ user, setUser ] = useState<string | undefined>(undefined)
    const [ arrayMensajes, setArrayMensajes ] = useState<Message[] | null>(null)
    const [ idPanelAbierto, setIdPanelAbierto ] = useState<string | null>(null)
    const [ infoMsgCitado, setInfoMsgCitado ] = useState<Message["respuestaGuardada"] | undefined>(undefined)

    const values = {
        socket,
        user,
        setUser,
        arrayMensajes,
        setArrayMensajes,
        idPanelAbierto,
        setIdPanelAbierto,
        infoMsgCitado,
        setInfoMsgCitado
    }

    return (
        <GeneralContext.Provider value={values}>
            {children}
        </GeneralContext.Provider>
    );
}

export default GeneralContextProvider;
