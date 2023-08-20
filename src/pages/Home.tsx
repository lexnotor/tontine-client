import { activityList } from "@/data";

const Home = () => {
    return (
        <div className="page">
            <section className="flex flex-col gap-4">
                <div className="p-4 flex flex-col gap-4 border rounded-xl">
                    <span className="text-4xl font-bold">
                        {activityList.length}
                    </span>
                    <span className="text-neutral-700">Total Activités</span>
                </div>
                <div className="p-4 flex flex-col gap-4 border rounded-xl">
                    <span className="text-4xl font-bold">
                        {activityList.length}
                    </span>
                    <span className="text-neutral-700">Total Activités</span>
                </div>
                <div className="p-4 flex flex-col gap-4 border rounded-xl">
                    <span className="text-4xl font-bold">
                        {activityList.length}
                    </span>
                    <span className="text-neutral-700">Total Activités</span>
                </div>
            </section>
        </div>
    );
};

export default Home;
