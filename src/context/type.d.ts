import { AddMemberPayload, SaveCotisatioPayload } from "@/services/type";

export interface RequestContextType {}

export interface ActivityContextType {
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

export interface MemberContextType {
    members?: MemberType[];
    getAllMembers?: () => void;
    createMember?: (payload: AddMemberPayload) => void;
    deleteMember?: (payload: string) => void;
    updateMember?: (id: string, payload: Partial<AddMemberPayload>) => void;
    thread?: ThreadType<AllType>[];
}

export interface CotisationContextType {
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
}

export interface ActivityType {
    id?: string;
    designation: string;
    start: string;
    end: string;
    cycle: string;
    amountToGive: number;
    status: string;
    members: 15;
    currency: string;
}

export interface MemberType {
    id: string;
    name: string;
    postname: string;
    phone: string;
    status: "beneficiary";
}

export interface CotisationType {
    id: string;
    amount: number;
    activityId: string;
    memberId: string;
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
