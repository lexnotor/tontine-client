import { PageTransition } from "@/components";
import { useAuth } from "@/hooks";

const Settings = () => {
    const { logout } = useAuth();
    return (
        <PageTransition>
            <div className="page">
                <ul className="flex flex-col">
                    <li className="py-2" onClick={() => logout()}>
                        Deconnexion
                    </li>

                    <hr />
                </ul>
            </div>
        </PageTransition>
    );
};

export default Settings;
