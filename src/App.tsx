import { GlobalContextProvider } from "./context";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Activity, Home, Login, Settings } from "./pages";
import { Layout } from "./components";
import ModalManager from "./modal/ModalManager";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <GlobalContextProvider>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<Layout />}>
                            <Route path="/activity" element={<Activity />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/" element={<Home />} />
                        </Route>

                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                    <ModalManager />
                </GlobalContextProvider>
            </BrowserRouter>
        </>
    );
};

export default App;
