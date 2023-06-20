import Contenedor from "./components/Contenedor";
import GeneralContextProvider from "./components/GeneralContext";
import Creditos from "./components/Creditos";

function App() {

    return (
        <GeneralContextProvider>
            <Contenedor/>
            <Creditos />
        </GeneralContextProvider>
    );
}

export default App;
