import React, { createContext, useContext, useReducer } from "react";
import { v4 as uuid_v4 } from "uuid";
import { CustomeAction, ToastContextType, ToastType } from "./type";

// ------------- CONTEXT_CREATION -------------
type AllPayload = ToastType | ToastType[] | string;
type AllType = "ADD_TOAST" | "REMOVE_TOAST";
const toastContext = createContext<ToastContextType<AllType>>({});

// ------------- CONTEXT PROVIDER -------------
const ToastContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [toasts, toastDispatch] = useReducer(
        (state: ToastType[], action: CustomeAction<AllPayload, AllType>) => {
            switch (action.type) {
                case "ADD_TOAST":
                    return [...state, action.payload as ToastType];

                case "REMOVE_TOAST":
                    return state.filter(
                        (item) => item.id != (action.payload as string),
                    );

                default:
                    return state;
            }
        },
        [],
    );

    const addToast = (payload: Omit<ToastType, "id">) => {
        const id = uuid_v4();
        toastDispatch({ type: "ADD_TOAST", payload: { ...payload, id } });
    };

    const removeToast = (payload: string) => {
        toastDispatch({ type: "REMOVE_TOAST", payload });
    };

    return (
        <toastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
        </toastContext.Provider>
    );
};

// ------------- CONTEXT HOOK -------------
const useToastContext = () => useContext(toastContext);

// ------------- EXPORTING -------------
export { useToastContext };

export default ToastContextProvider;
