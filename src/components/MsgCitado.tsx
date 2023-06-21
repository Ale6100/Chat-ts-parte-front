import { Message } from "../types";

const MsgCitado = ( { respuestaGuardada }: { respuestaGuardada: Message["respuestaGuardada"] } ) => { // Componente correspondiente a un mensaje citado en el chat
    return (
        <>
        {respuestaGuardada?.authorCapturado && // Muestra el mensaje citado sólo si corresponde
            <div className="mt-1 border-black border p-1 rounded-sm bg-blue-300">
                <p className="font-medium">{respuestaGuardada.authorCapturado}</p>
                <div>
                    <p className="text-sm breakWords">{respuestaGuardada.mensajeCapturado}</p>
                    { respuestaGuardada.imagenCapturada && <img className="max-w-[50%] max-h-52" src={respuestaGuardada.imagenCapturada} alt="Imagen mensaje citado" /> }
                </div>
            </div>
        }
        </>
    )
}

export default MsgCitado
