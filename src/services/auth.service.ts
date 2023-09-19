import axios, { AxiosResponse } from "axios";
import { LoginPayload, SignupPayload } from "./type";
import { authUrl } from "./constante";
import { AuthType } from "@/context/type";

const login = async (payload: LoginPayload) => {
    const { email, password } = payload;

    try {
        const res: AxiosResponse<AuthType> = await axios.post(authUrl.login, {
            email,
            password,
        });
        return res.data;
    } catch (error) {
        throw new Error("EMAIL_OR_PASSWORD_WRONG");
    }
};

const signup = async (payload: SignupPayload) => {
    const { email, password, username } = payload;
    try {
        await axios.post(authUrl.signup, {
            email,
            password,
            username,
        });
        return true;
    } catch (error) {
        throw new Error("UNABLE_TO_SIGNUP");
    }
};

export { login, signup };
