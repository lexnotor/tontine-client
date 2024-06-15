import { AddMemberPayload, SaveCotisatioPayload } from "@/services/type";

export interface RequestContextType {}

export interface AuthContextType<AllType = any> {
    auth?: AuthType;
    authStatus?: "LOOKING" | "CONNECTED" | "DISCONNECTED";
    login?: (payload: LoginPayload) => Promise<void>;
    signup?: (payload: SignupPayload) => Promise<void>;
    logout?: () => void;
    thread?: ThreadType<AllType>[];
}

export interface ActivityContextType<AllType = any> {
    activities?: ActivityType[];
    getAllActivities?: () => Promise<void>;
    createActivity?: (payload: CreateActivityPayload) => Promise<void>;
    deleteActivity?: (payload: string) => Promise<void>;
    updateActivity?: (
        id: string,
        payload: Partial<CreateActivityPayload>,
    ) => Promise<void>;
    thread?: ThreadType<AllType>[];
}

export interface MemberContextType<AllType = any> {
    members?: MemberType[];
    getAllMembers?: () => Promise<void>;
    createMember?: (payload: AddMemberPayload) => Promise<void>;
    deleteMember?: (payload: string) => Promise<void>;
    updateMember?: (
        id: string,
        payload: Partial<AddMemberPayload>,
    ) => Promise<MemberType | void>;
    thread?: ThreadType<AllType>[];
}

export interface CotisationContextType<AllType = any> {
    cotisations?: CotisationType[];
    getAllCotisations?: () => Promise<void>;
    createCotisation?: (payload: SaveCotisatioPayload) => Promise<void>;
    deleteCotisation?: (payload: string) => Promise<void>;
    updateCotisation?: (
        id: string,
        payload: Partial<SaveCotisatioPayload>,
    ) => Promise<void>;
    thread?: ThreadType<AllType>[];
}

export interface ToastContextType<AllType = any> {
    toasts?: ToastType[];
    addToast?: (payload: Omit<ToastType, "id">) => void;
    removeToast?: (payload: string) => void;
    thread?: ThreadType<AllType>[];
}

export type CustomeAction<T = any, D = string> = {
    payload?: T;
    type: D;
};

export type ModalAction_A = { activity: string; now: boolean };
export type ModalAction_B = { member: string; now: boolean };

export interface GlobalContextType {
    addingMember?: ModalAction_A;
    setAddingMember?: React.Dispatch<React.SetStateAction<ModalAction_A>>;

    deletingMember?: ModalAction_A;
    setDeletingMember?: React.Dispatch<React.SetStateAction<ModalAction_A>>;

    savingFees?: ModalAction_A;
    setSavingFees?: React.Dispatch<React.SetStateAction<ModalAction_A>>;

    creatingActivity?: ModalAction_A;
    setCreatingActivity?: React.Dispatch<React.SetStateAction<ModalAction_A>>;

    showFees?: ModalAction_B;
    setShowFees?: React.Dispatch<React.SetStateAction<ModalAction_B>>;
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
    amount_to_give: number;
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
    created_at?: string;
    updated_at?: string;
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

export type ToastType = {
    id?: string;
    content: string;
    type: "ERROR" | "SUCCESS" | "LOADING";
};
