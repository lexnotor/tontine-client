import React from "react";
import { StateContext } from "./store";

const ContextProvider = ({ children }: { children?: React.ReactNode }) => {
    return <StateContext.Provider value={{}}>{children}</StateContext.Provider>;
};
export default ContextProvider;
