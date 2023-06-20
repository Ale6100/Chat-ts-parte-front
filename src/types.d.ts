export interface Message {
    user: string,
    message?: string, // No todos los mensajes tienen texto, imagen y cita, por eso algunas cosas son opcionales
    fecha: string,
    hora: string,
    image?: string,
    respuestaGuardada?: {
        authorCapturado: string,
        mensajeCapturado?: string,
        imagenCapturada?: string
        id?: string // Por ahora no lo uso, pero tengo planeado algo con el id
    },
    _id: ObjectId,
    timestamp: number
}
