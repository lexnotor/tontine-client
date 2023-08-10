import { ContextProvider } from "./context";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Activity, Home, Login } from "./pages";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <ContextProvider>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/activity" element={<Activity />} />
                        <Route path="/" element={<Home />} />

                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </ContextProvider>
            </BrowserRouter>
        </>
    );
};

export default App;
