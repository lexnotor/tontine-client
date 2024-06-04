import React, {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
} from "react";
import {
    AuthContextType,
    AuthType,
    CustomeAction,
    ThreadActionType,
    ThreadType,
} from "./type";
import { LoginPayload, SignupPayload } from "@/services/type";
import { authService } from "@/services";
import { v4 as uuid_v4 } from "uuid";
import { useToastContext } from "./ToastContext";

const authContext = createContext<AuthContextType>({});
type AllPayload = AuthType;
type AllType = "SIGNUP" | "SIGNIN" | "LOGOUT" | "SET_AUTH";

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { addToast } = useToastContext();
    const [auth, authDispatch] = useReducer(
        (state: AuthType, action: CustomeAction<AllPayload, AllType>) => {
            switch (action.type) {
                case "SIGNUP":
                    localStorage.removeItem("auth_data");
                    return {};
                case "SIGNIN":
                    localStorage.setItem(
                        "auth_data",
                        JSON.stringify(action.payload),
                    );
                    return action.payload;
                case "LOGOUT":
                    localStorage.removeItem("auth_data");
                    return {};
                case "SET_AUTH":
                    localStorage.setItem(
                        "auth_data",
                        JSON.stringify(action.payload),
                    );
                    return action.payload;
                default:
                    return state;
            }
        },
        {},
    );
    const [authStatus, setAuthStatus] =
        useState<AuthContextType["authStatus"]>("LOOKING");

    const [thread, setThread] = useReducer(
        (state: ThreadType<AllType>[], action: ThreadActionType<AllType>) => {
            switch (action.type) {
                case "add": {
                    const add: ThreadType<AllType> = {
                        id: action.payload.id,
                        status: "LOADING",
                        action: action.payload.action,
                    };
                    return [add, ...state];
                }
                case "success": {
                    const success = state.find((task) => task.id == action.id);
                    success.status = "SUCCESS";
                    return state;
                }
                case "error": {
                    const error = state.find((task) => task.id == action.id);
                    error.status = "ERROR";
                    return state;
                }

                default:
                    return state;
            }
        },
        [],
    );

    const login = (payload: LoginPayload) => {
        const id = uuid_v4();
        setThread({ payload: { action: "SIGNIN", id }, type: "add" });
        authService
            .login(payload)
            .then((data) => {
                authDispatch({ type: "SIGNIN", payload: data });
                setAuthStatus("CONNECTED");
                setThread({
                    id,
                    type: "success",
                });
            })
            .catch((error) => {
                addToast({ content: error.message, type: "ERROR" });
                setThread({
                    id,
                    type: "error",
                });
            });
    };

    const signup = (payload: SignupPayload) => {
        const id = uuid_v4();
        setThread({ payload: { action: "SIGNUP", id }, type: "add" });
        authService
            .login(payload)
            .then(() => {
                authDispatch({ type: "SIGNUP" });
                setThread({
                    id,
                    type: "success",
                });
                login({ email: payload.email, password: payload.password });
            })
            .catch((error) => {
                addToast({ content: error.message, type: "ERROR" });
                setThread({
                    id,
                    type: "error",
                });
            });
    };

    const logout = () => {
        const id = uuid_v4();
        setThread({ payload: { action: "LOGOUT", id }, type: "add" });
        authDispatch({ type: "LOGOUT" });
        setAuthStatus("DISCONNECTED");
        setThread({
            id,
            type: "success",
        });
    };

    useEffect(() => {
        if (!auth?.token && authStatus == "LOOKING") {
            const auth_data = localStorage.getItem("auth_data");
            if (auth_data) {
                authDispatch({
                    type: "SET_AUTH",
                    payload: JSON.parse(auth_data),
                });
                setAuthStatus("CONNECTED");
            } else setAuthStatus("DISCONNECTED");
        }
    }, [auth, authStatus]);

    return (
        <authContext.Provider
            value={{ auth, login, signup, logout, thread, authStatus }}
        >
            {children}
        </authContext.Provider>
    );
};

const useAuthContext = () => useContext(authContext);

export { useAuthContext };
export default AuthContextProvider;
