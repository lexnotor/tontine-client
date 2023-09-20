import { transition } from "@/components";
import { useAuth } from "@/hooks";

const Settings = () => {
    const { logout } = useAuth();
    return (
        <div className="page">
            <ul className="flex flex-col">
                <li className="py-2" onClick={() => logout()}>
                    Deconnexion
                </li>

                <hr />
            </ul>
        </div>
    );
};

export default transition(Settings);
