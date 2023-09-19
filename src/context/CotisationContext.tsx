import { useAuth } from "@/hooks";
import { cotisationService } from "@/services";
import { SaveCotisatioPayload } from "@/services/type";
import React, { createContext, useContext, useReducer } from "react";
import {
    CotisationContextType,
    CotisationType,
    CustomeAction,
    ThreadActionType,
    ThreadType,
} from "./type";

// ----------------- CONTEXT -----------------
const cotisationContext = createContext<CotisationContextType<AllType>>({});

type AllPayload = CotisationType | CotisationType[] | string;
type AllType =
    | "ADD_COTISATION"
    | "REMOVE_COTISATION"
    | "REPLACE_COTISATION"
    | "SET_COTISATIONS";

const CotisationContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const {
        auth: { token },
    } = useAuth();
    const [cotisations, cotisationsDisp] = useReducer(
        (
            state: CotisationType[],
            action: CustomeAction<AllPayload, AllType>,
        ) => {
            switch (action.type) {
                case "ADD_COTISATION":
                    return [...state, action.payload as CotisationType];

                case "REMOVE_COTISATION":
                    return state.filter(
                        (item) => item.id != (action.payload as string),
                    );

                case "REPLACE_COTISATION": {
                    const index = state.findIndex(
                        (item) =>
                            item.id == (action.payload as CotisationType).id,
                    );
                    if (index == -1)
                        return [action.payload as CotisationType, ...state];
                    else
                        return [
                            ...state.slice(0, index),
                            action.payload as CotisationType,
                            ...state.slice(index + 1),
                        ];
                }

                case "SET_COTISATIONS":
                    return action.payload as CotisationType[];

                default:
                    return state;
            }
        },
        [],
    );

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

    const getAllCotisations = () => {
        const id = crypto.randomUUID();
        setThread({ payload: { action: "SET_COTISATIONS", id }, type: "add" });
        cotisationService
            .getAllCotisation(token.token)
            .then((data) => {
                cotisationsDisp({ type: "SET_COTISATIONS", payload: data });
                setThread({
                    id,
                    type: "success",
                });
            })
            .catch((error) => {
                alert(error.message);
                setThread({
                    id,
                    type: "error",
                });
            });
    };

    const createCotisation = (payload: SaveCotisatioPayload) => {
        const id = crypto.randomUUID();
        setThread({ payload: { action: "ADD_COTISATION", id }, type: "add" });
        cotisationService
            .createCotisation(payload, token.token)
            .then(() => {
                // cotisationsDisp({ type: "ADD_COTISATION", payload: data });
                getAllCotisations();
                setThread({
                    id,
                    type: "success",
                });
            })
            .catch((error) => {
                alert(error.message);
                setThread({
                    id,
                    type: "error",
                });
            });
    };

    const updateCotisation = (
        cotisationId: string,
        payload: Partial<SaveCotisatioPayload>,
    ) => {
        const id = crypto.randomUUID();
        setThread({
            payload: { action: "REPLACE_COTISATION", id },
            type: "add",
        });
        cotisationService
            .updateCotisation(cotisationId, payload, token.token)
            .then((data) => {
                cotisationsDisp({ type: "REPLACE_COTISATION", payload: data });
                setThread({
                    id,
                    type: "success",
                });
            })
            .catch((error) => {
                alert(error.message);
                setThread({
                    id,
                    type: "error",
                });
            });
    };

    const deleteCotisation = (payload: string) => {
        const id = crypto.randomUUID();
        setThread({
            payload: { action: "REMOVE_COTISATION", id },
            type: "add",
        });
        cotisationService
            .deleteCotisation(payload, token.token)
            .then(() => {
                // cotisationsDisp({ type: "REMOVE_COTISATION", payload });
                getAllCotisations();
                setThread({
                    id,
                    type: "success",
                });
            })
            .catch((error) => {
                alert(error.message);
                setThread({
                    id,
                    type: "error",
                });
            });
    };
    return (
        <cotisationContext.Provider
            value={{
                cotisations,
                getAllCotisations,
                createCotisation,
                updateCotisation,
                deleteCotisation,
                thread,
            }}
        >
            {children}
        </cotisationContext.Provider>
    );
};

const useCotisationContext = () => useContext(cotisationContext);

export default CotisationContextProvider;
export { useCotisationContext };
