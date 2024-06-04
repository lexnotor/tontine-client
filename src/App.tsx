import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components";
import { GlobalContextProvider, RequestContextProvider } from "./context";
import ModalManager from "./modal/ModalManager";
import { Activity, Home, Login, Settings } from "./pages";
import ToastContextProvider from "./context/ToastContext";
import ToastManager from "./components/ToastManager";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <ToastContextProvider>
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
                            <ToastManager />
                        </GlobalContextProvider>
                    </RequestContextProvider>
                </ToastContextProvider>
            </BrowserRouter>
        </>
    );
};

export default App;
