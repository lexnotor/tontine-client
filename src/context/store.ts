import React, { createContext, useContext } from "react";

export type ModalAction_A = { activity: string; now: boolean };
interface GlobalContextType {
    addingMember?: ModalAction_A;
    setAddingMember?: React.Dispatch<React.SetStateAction<ModalAction_A>>;

    deletingMember?: ModalAction_A;
    setDeletingMember?: React.Dispatch<React.SetStateAction<ModalAction_A>>;

    savingFees?: ModalAction_A;
    setSavingFees?: React.Dispatch<React.SetStateAction<ModalAction_A>>;
}

const StateContext = createContext<GlobalContextType>({});

const useAppContext = () => useContext(StateContext);

export default useAppContext;
export { StateContext };
