import React, { createContext, useContext, useState } from "react";
import { GlobalContextType, ModalAction_A, ModalAction_B } from "./type";

const StateContext = createContext<GlobalContextType>({});

const GlobalContextProvider = ({
    children,
}: {
    children?: React.ReactNode;
}) => {
    const [savingFees, setSavingFees] = useState<ModalAction_A>(null);
    const [addingMember, setAddingMember] = useState<ModalAction_A>(null);
    const [deletingMember, setDeletingMember] = useState<ModalAction_A>(null);
    const [creatingActivity, setCreatingActivity] =
        useState<ModalAction_A>(null);
    const [showFees, setShowFees] = useState<ModalAction_B>(null);

    return (
        <StateContext.Provider
            value={{
                savingFees,
                setSavingFees,
                addingMember,
                setAddingMember,
                deletingMember,
                setDeletingMember,
                creatingActivity,
                setCreatingActivity,
                showFees,
                setShowFees,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

const useAppContext = () => useContext(StateContext);

export default GlobalContextProvider;

export { StateContext, useAppContext };
