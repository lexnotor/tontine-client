import { Link } from "react-router-dom";

const Settings = () => {
    return (
        <div className="page">
            <ul className="flex flex-col">
                <Link to={"/login"}>
                    <li className="py-2">Deconnexion</li>
                </Link>
                <hr />
            </ul>
        </div>
    );
};

export default Settings;
