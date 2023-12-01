import authority from "@/assets/authority.jpg";
import contact from "@/assets/contact.jpg";
import doctor from "@/assets/doctor.jpg";
import solo from "@/assets/solo.jpg";
import { PageTransition } from "@/components";
import CheckingAuth from "@/components/CheckingAuth";
import { useActivity, useAuth, useCotisation, useMembers } from "@/hooks";
import { Link } from "react-router-dom";

const Home = () => {
    const { authStatus } = useAuth();
    const { cotisations } = useCotisation();
    const { members } = useMembers();
    const { activities } = useActivity();

    if (authStatus == "LOOKING") return <CheckingAuth />;

    return (
        <PageTransition>
            <div className="page">
                <h2 className="text-4xl font-bold mb-8">Tontine App</h2>
                <section className="flex flex-col gap-4 ">
                    <div
                        style={{
                            backgroundImage: `url(${doctor})`,
                            backgroundPosition: "center",
                        }}
                        className="p-4 flex flex-col gap-4 rounded-xl shadow-lg"
                    >
                        <span className="text-4xl font-bold">
                            {cotisations.length}
                        </span>
                        <span className="text-black font-bold">
                            Total Cotisation
                        </span>
                    </div>
                    <div
                        style={{
                            backgroundImage: `url(${contact})`,
                            backgroundPosition: "center",
                        }}
                        className="p-4 flex flex-col gap-4 rounded-xl shadow-lg"
                    >
                        <span className="text-4xl font-bold">
                            {members.length}
                        </span>
                        <span className="text-black font-bold">
                            Total membres
                        </span>
                    </div>
                    <div
                        style={{
                            backgroundImage: `url(${solo})`,
                            backgroundPosition: "center",
                        }}
                        className="p-4 flex flex-col gap-4 rounded-xl shadow-lg"
                    >
                        <span className="text-4xl font-bold">
                            {activities.length}
                        </span>
                        <span className="text-black font-bold">
                            Total activité
                        </span>
                    </div>
                    <div
                        style={{
                            backgroundImage: `url(${authority})`,
                            backgroundPosition: "center",
                        }}
                        className="mt-4 p-4 flex flex-col gap-4 border rounded-xl text-white text-lg font-bold"
                    >
                        <Link to={"/activity"}>Voir mes activités</Link>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default Home;
