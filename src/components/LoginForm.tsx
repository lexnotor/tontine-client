import { FormEventHandler, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Checkbox from "./Checkbox";

const LoginForm = () => {
    // Account Verification
    const navigate = useNavigate();
    // Form data
    const [longSession, toggleLongSession] = useState(true);

    const emailRef = useRef<HTMLInputElement>(null);
    const secretRef = useRef<HTMLInputElement>(null);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const [email, secret] = [
            emailRef.current.value,
            secretRef.current.value,
        ];

        const payload = {
            username: email,
            secret,
        };
        navigate("/");
        return payload;
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={submit}>
            <div className="flex gap-4">
                <input
                    type="text"
                    placeholder="Votre email"
                    className="py-2 px-4 w-full border border-neutral-400 rounded-lg focus:outline-none"
                    ref={emailRef}
                />
            </div>
            <div className="flex gap-4">
                <input
                    type="password"
                    placeholder="Mot de passe"
                    className="py-2 px-4 w-full border border-neutral-400 rounded-lg focus:outline-none"
                    ref={secretRef}
                />
            </div>
            <div className="flex gap-4">
                <label
                    htmlFor="long_session"
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <Checkbox
                        toggler={() => toggleLongSession((old) => !old)}
                        isChecked={longSession}
                        id="long_session"
                    />
                    <span>Rester connecter</span>
                </label>
            </div>
            <div className="flex gap-4 flex-col">
                <button className="block py-2 px-4 text-center rounded-lg border bg-neutral-700 text-white font-semibold w-full">
                    <span>Se connecter</span>
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
