import { useAuthContext } from "@/context";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useAuth = () => {
    const { auth, authStatus, login, logout, signup, thread } =
        useAuthContext();
    const navigateTo = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        if (authStatus == "DISCONNECTED" && pathname != "/login")
            navigateTo("/login");
        if (pathname == "/login" && authStatus == "CONNECTED") navigateTo("/");
    }, [auth, authStatus, navigateTo, pathname]);

    return { auth, authStatus, login, logout, signup, thread };
};

export default useAuth;
