import { useAuthContext } from "@/context";
import { useToastContext } from "@/context/ToastContext";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useAuth = () => {
    const { addToast } = useToastContext();

    const { auth, authStatus, login, logout, signup, thread } =
        useAuthContext();
    const navigateTo = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        if (authStatus == "DISCONNECTED" && pathname != "/login") {
            addToast({ content: authStatus, type: "ERROR" });
            navigateTo("/login");
        }
        if (pathname == "/login" && authStatus == "CONNECTED") navigateTo("/");
    }, [auth, authStatus, navigateTo, pathname, addToast]);

    return { auth, authStatus, login, logout, signup, thread };
};

export default useAuth;
