import { createContext, useContext } from "react";

const initialState = {};

const StateContext = createContext(initialState);

const useAppContext = () => useContext(StateContext);

export default useAppContext;
export { StateContext };
