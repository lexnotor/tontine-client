import { memberService } from "@/services";
import { AddMemberPayload } from "@/services/type";
import React, { createContext, useContext, useReducer } from "react";
import {
    CustomeAction,
    MemberContextType,
    MemberType,
    ThreadActionType,
    ThreadType,
} from "./type";

// ----------------- CONTEXT -----------------
const memberContext = createContext<MemberContextType>({});

type AllPayload = MemberType | MemberType[] | string;
type AllType =
    | "ADD_MEMBER"
    | "REMOVE_MEMBER"
    | "REPLACE_MEMBER"
    | "SET_MEMBERS";

// ----------------- PROVIDER -----------------
const MemberContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [members, membersDisp] = useReducer(
        (state: MemberType[], action: CustomeAction<AllPayload, AllType>) => {
            switch (action.type) {
                case "ADD_MEMBER":
                    return [...state, action.payload as MemberType];

                case "REMOVE_MEMBER":
                    return state.filter(
                        (item) => item.id != (action.payload as string),
                    );

                case "REPLACE_MEMBER": {
                    const index = state.findIndex(
                        (item) => item.id == (action.payload as MemberType).id,
                    );
                    if (index == -1)
                        return [action.payload as MemberType, ...state];
                    else
                        return [
                            ...state.slice(0, index),
                            action.payload as MemberType,
                            ...state.slice(index + 1),
                        ];
                }

                case "SET_MEMBERS":
                    return action.payload as MemberType[];

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

    const getAllMembers = () => {
        const id = crypto.randomUUID();
        setThread({ payload: { action: "SET_MEMBERS", id }, type: "add" });

        memberService
            .getAllMember()
            .then((data) => {
                membersDisp({ type: "SET_MEMBERS", payload: data });
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

    const createMember = (payload: AddMemberPayload) => {
        const id = crypto.randomUUID();
        setThread({ payload: { action: "SET_MEMBERS", id }, type: "add" });
        memberService
            .addMember(payload)
            .then((data) => {
                membersDisp({ type: "ADD_MEMBER", payload: data });
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

    const updateMember = (
        memberId: string,
        payload: Partial<AddMemberPayload>,
    ) => {
        const id = crypto.randomUUID();
        setThread({ payload: { action: "SET_MEMBERS", id }, type: "add" });
        memberService
            .updateOne(memberId, payload)
            .then((data) => {
                membersDisp({ type: "REPLACE_MEMBER", payload: data });
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

    const deleteMember = (payload: string) => {
        const id = crypto.randomUUID();
        setThread({ payload: { action: "SET_MEMBERS", id }, type: "add" });
        memberService
            .deleteMember(payload)
            .then(() => {
                membersDisp({ type: "REMOVE_MEMBER", payload });
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
        <memberContext.Provider
            value={{
                members,
                getAllMembers,
                createMember,
                updateMember,
                deleteMember,
                thread,
            }}
        >
            {children}
        </memberContext.Provider>
    );
};

// ----------------- HOOK -----------------
const useMemberContext = () => useContext(memberContext);

// ----------------- EXPORT -----------------

export default MemberContextProvider;
export { useMemberContext };