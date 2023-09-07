import React, { createContext, useContext, useReducer } from "react";
import { CustomeAction, MemberContextType, MemberType } from "./type";
import { memberService } from "@/services";
import { AddMemberPayload } from "@/services/type";

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

    const getAllMembers = () => {
        memberService
            .getAllMember()
            .then((data) => membersDisp({ type: "SET_MEMBERS", payload: data }))
            .catch((error) => alert(error.message));
    };

    const createMember = (payload: AddMemberPayload) => {
        memberService
            .addMember(payload)
            .then((data) => membersDisp({ type: "ADD_MEMBER", payload: data }))
            .catch((error) => alert(error.message));
    };

    const updateMember = (id: string, payload: Partial<AddMemberPayload>) => {
        memberService
            .updateOne(id, payload)
            .then((data) =>
                membersDisp({ type: "REPLACE_MEMBER", payload: data }),
            )
            .catch((error) => alert(error.message));
    };

    const deleteMember = (payload: string) => {
        memberService
            .deleteMember(payload)
            .then(() => membersDisp({ type: "REMOVE_MEMBER", payload }))
            .catch((error) => alert(error.message));
    };

    return (
        <memberContext.Provider
            value={{
                members,
                getAllMembers,
                createMember,
                updateMember,
                deleteMember,
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
