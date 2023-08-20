import React, { useState } from "react";
import { ModalAction_A, StateContext } from "./store";

const GlobalContextProvider = ({
    children,
}: {
    children?: React.ReactNode;
}) => {
    const [savingFees, setSavingFees] = useState<ModalAction_A>(null);
    const [addingMember, setAddingMember] = useState<ModalAction_A>(null);
    const [deletingMember, setDeletingMember] = useState<ModalAction_A>(null);

    return (
        <StateContext.Provider
            value={{
                savingFees,
                setSavingFees,
                addingMember,
                setAddingMember,
                deletingMember,
                setDeletingMember,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};
export default GlobalContextProvider;
