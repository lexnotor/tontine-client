import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components";
import { GlobalContextProvider, RequestContextProvider } from "./context";
import ModalManager from "./modal/ModalManager";
import { Activity, Home, Login, Settings } from "./pages";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <RequestContextProvider>
                    <GlobalContextProvider>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/" element={<Layout />}>
                                <Route
                                    path="/activity"
                                    element={<Activity />}
                                />
                                <Route
                                    path="/settings"
                                    element={<Settings />}
                                />
                                <Route path="/" element={<Home />} />
                            </Route>

                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>

                        <ModalManager />
                    </GlobalContextProvider>
                </RequestContextProvider>
            </BrowserRouter>
        </>
    );
};

export default App;
