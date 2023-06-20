import { useEffect, useState, useContext } from "react"
import { GeneralContext } from "./GeneralContext";

import { JellyTriangle } from '@uiball/loaders'

const Loader = () => {
    const generalContext = useContext(GeneralContext);
    if (!generalContext) return <></>
    const { user } = generalContext

    const [ tolerance, setTolerance ] = useState(true)

    useEffect(() => {
        if (user) { // Si ya hay un usuario autenticado...
            const toleranceTime = setTimeout(() => { // Define siete segundos de tolerancia de espera hasta que lleguen los datos del backend. Si pasa ese tiempo, aparece un mensaje pidiendo disculpas
                setTolerance(false)
                console.log("Esto no");
                
            }, 7000);
            console.log("Esto se muestra");
            
            return () => clearTimeout(toleranceTime)
        }
    }, [user])

    return (
        <div className='fixed top-0 left-0 w-screen h-screen bg-slate-700 opacity-75 flex flex-col justify-center items-center'>
            {(user && !tolerance) && <p className='mb-5 font-bold text-center mt-5'>Disculpa la demora. El servidor gratuito donde está alojado el backend suele tener retrasos</p>}
            <JellyTriangle size={60} speed={1.75} color="black" />
        </div>
    )
}

export default Loader
