import React, { createContext, useContext, useReducer } from "react";
import { CotisationContextType, CotisationType, CustomeAction } from "./type";
import { cotisationService } from "@/services";
import { SaveCotisatioPayload } from "@/services/type";

// ----------------- CONTEXT -----------------
const cotisationContext = createContext<CotisationContextType>({});

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

    const getAllCotisations = () => {
        cotisationService
            .getAllCotisation()
            .then((data) =>
                cotisationsDisp({ type: "SET_COTISATIONS", payload: data }),
            )
            .catch((error) => alert(error.message));
    };

    const createCotisation = (payload: SaveCotisatioPayload) => {
        cotisationService
            .createCotisation(payload)
            .then((data) =>
                cotisationsDisp({ type: "ADD_COTISATION", payload: data }),
            )
            .catch((error) => alert(error.message));
    };

    const updateCotisation = (
        id: string,
        payload: Partial<SaveCotisatioPayload>,
    ) => {
        cotisationService
            .updateCotisation(id, payload)
            .then((data) =>
                cotisationsDisp({ type: "REPLACE_COTISATION", payload: data }),
            )
            .catch((error) => alert(error.message));
    };

    const deleteCotisation = (payload: string) => {
        cotisationService
            .deleteCotisation(payload)
            .then(() => cotisationsDisp({ type: "REMOVE_COTISATION", payload }))
            .catch((error) => alert(error.message));
    };
    return (
        <cotisationContext.Provider
            value={{
                cotisations,
                getAllCotisations,
                createCotisation,
                updateCotisation,
                deleteCotisation,
            }}
        >
            {children}
        </cotisationContext.Provider>
    );
};

const useCotisationContext = () => useContext(cotisationContext);

export default CotisationContextProvider;
export { useCotisationContext };
