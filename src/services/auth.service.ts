import axios from "axios";
import { LoginPayload, SignupPayload } from "./type";
import { authUrl } from "./constante";

const login = async (payload: LoginPayload) => {
    const { email, password } = payload;

    try {
        const res = await axios.post(authUrl.login, { email, password });
        return res.data;
    } catch (error) {
        throw new Error("EMAIL_OR_PASSWORD_WRONG");
    }
};

const signup = async (payload: SignupPayload) => {
    const { email, password, username } = payload;
    try {
        const res = await axios.post(authUrl.signup, {
            email,
            password,
            username,
        });
        return res.data;
    } catch (error) {
        throw new Error("UNABLE_TO_SIGNUP");
    }
};

export { login, signup };
