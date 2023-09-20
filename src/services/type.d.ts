export interface LoginPayload {
    email: string;
    password: string;
}

export interface SignupPayload {
    username: string;
    email: string;
    password: string;
}

export interface AddMemberPayload {
    name: string;
    postname: string;
    phone: string;
    activity_id: string;
    status: "isBeneficiary" | "isNoBeneficiary";
}

export interface CreateActivityPayload {
    designation: string;
    designation: string;
    start: string; // "15/08/2023"
    end: string;
    cycle: "parJour" | "parSemaine" | "parMois" | "parAnnee";
    amountToGive: number;
    status: string;
    members: 15;
    currency: "USD" | "FC";
}

export interface SaveCotisatioPayload {
    amount: number;
    activityId: string;
    memberId: string;
}
