import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="w-full grid grid-cols-3 shadow-md text-center gap-4 border-none border-b border-black">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `border-0 border-b-2 duration-500 py-2 ${
                        isActive ? "border-black" : " border-transparent"
                    }`
                }
            >
                Dash
            </NavLink>
            <NavLink
                to="/activity"
                className={({ isActive }) =>
                    `border-0 border-b-2 duration-500 py-2 ${
                        isActive ? "border-black" : "border-transparent"
                    }`
                }
            >
                Activity
            </NavLink>
            <NavLink
                to="/settings"
                className={({ isActive }) =>
                    `border-0 border-b-2 duration-500 py-2 ${
                        isActive ? "border-black" : "border-transparent"
                    }`
                }
            >
                Setting
            </NavLink>
        </nav>
    );
};

export default NavBar;
