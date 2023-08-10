import { ContextProvider } from "./context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <ContextProvider>
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </ContextProvider>
            </BrowserRouter>
        </>
    );
};

export default App;
