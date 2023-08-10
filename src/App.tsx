import { ContextProvider } from "./context";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Activity, Home, Login } from "./pages";
import { Layout } from "./components";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <ContextProvider>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<Layout />}>
                            <Route path="/activity" element={<Activity />} />
                            <Route path="/" element={<Home />} />
                        </Route>

                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </ContextProvider>
            </BrowserRouter>
        </>
    );
};

export default App;
