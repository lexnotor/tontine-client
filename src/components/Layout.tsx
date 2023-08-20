import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
    return (
        <div className="layout flex flex-col">
            <header className="sticky top-0 bg-white">
                <NavBar />
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
