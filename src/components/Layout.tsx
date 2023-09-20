import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { AnimatePresence } from "framer-motion";

const Layout = () => {
    return (
        <div className="layout flex flex-col">
            <header className="sticky top-0 bg-white">
                <NavBar />
            </header>
            <main>
                <AnimatePresence mode="wait">
                    <Outlet />
                </AnimatePresence>
            </main>
        </div>
    );
};

export default Layout;
