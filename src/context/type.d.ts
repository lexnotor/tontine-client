import { AddMemberPayload, SaveCotisatioPayload } from "@/services/type";

export interface RequestContextType {}

export interface AuthContextType<AllType = any> {
    auth?: AuthType;
    authStatus?: "LOOKING" | "CONNECTED" | "DISCONNECTED";
    login?: (payload: LoginPayload) => void;
    signup?: (payload: SignupPayload) => void;
    logout?: () => void;
    thread?: ThreadType<AllType>[];
}

export interface ActivityContextType<AllType = any> {
    activities?: ActivityType[];
    getAllActivities?: () => void;
    createActivity?: (payload: CreateActivityPayload) => void;
    deleteActivity?: (payload: string) => void;
    updateActivity?: (
        id: string,
        payload: Partial<CreateActivityPayload>,
    ) => void;
    thread?: ThreadType<AllType>[];
}

export interface MemberContextType<AllType = any> {
    members?: MemberType[];
    getAllMembers?: () => void;
    createMember?: (payload: AddMemberPayload) => void;
    deleteMember?: (payload: string) => void;
    updateMember?: (id: string, payload: Partial<AddMemberPayload>) => void;
    thread?: ThreadType<AllType>[];
}

export interface CotisationContextType<AllType = any> {
    cotisations?: CotisationType[];
    getAllCotisations?: () => void;
    createCotisation?: (payload: SaveCotisatioPayload) => void;
    deleteCotisation?: (payload: string) => void;
    updateCotisation?: (
        id: string,
        payload: Partial<SaveCotisatioPayload>,
    ) => void;
    thread?: ThreadType<AllType>[];
}

export type CustomeAction<T = any, D = string> = {
    payload?: T;
    type: D;
};

export type ModalAction_A = { activity: string; now: boolean };

export interface GlobalContextType {
    addingMember?: ModalAction_A;
    setAddingMember?: React.Dispatch<React.SetStateAction<ModalAction_A>>;

    deletingMember?: ModalAction_A;
    setDeletingMember?: React.Dispatch<React.SetStateAction<ModalAction_A>>;

    savingFees?: ModalAction_A;
    setSavingFees?: React.Dispatch<React.SetStateAction<ModalAction_A>>;

    creatingActivity?: ModalAction_A;
    setCreatingActivity?: React.Dispatch<React.SetStateAction<ModalAction_A>>;
}

export interface AuthType {
    token?: {
        token: string;
        type: string;
        exprire_at: string;
    };
    email?: string;
    password?: string;
}
export interface ActivityType {
    id?: string;
    designation: string;
    description: string;
    start: string;
    end: string;
    cycle: "parJour" | "parSemaine" | "parMois" | "parAnnee";
    amountToGive: number;
    status: string;
    members: 15;
    currency: "USD" | "FC";
}

export interface MemberType {
    id: string;
    name: string;
    postname: string;
    phone: string;
    status: "isBeneficiary" | "isNoBeneficiary";
    activity_id: string;
}

export interface CotisationType {
    id: string;
    amount: number;
    activity_id: string;
    member_id: string;
}

export interface ThreadType<T = string> {
    id: string;
    status: "LOADING" | "SUCCESS" | "ERROR";
    action: T;
    payload?: any;
    message?: string;
}

export type ThreadActionType<T = string> =
    | {
          payload: {
              id: string;
              action: T;
          };
          type: "add";
      }
    | {
          id: string;
          type: "success" | "error";
      };
