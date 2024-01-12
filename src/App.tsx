import Contenedor from "./components/Contenedor";
import GeneralContextProvider from "./components/GeneralContext";

function App() {

    return (
        <GeneralContextProvider>
            <Contenedor/>
            <a className='creditos fixed bottom-[1vw] right-[1vw] hover:font-semibold text-sm max-md:text-xs hover:scale-105 hover:translate-x-[-0.25vw] transition-all duration-100' href="https://www.linkedin.com/in/alejandro-portaluppi/" target="_blank" rel="noopener noreferrer">Desarrollado por Alejandro P</a>
        </GeneralContextProvider>
    );
}

export default App;
