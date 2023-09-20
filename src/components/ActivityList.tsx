import { useAppContext } from "@/context";
import { ActivityType } from "@/context/type";
import { Popover } from "antd";
import { CgDetailsMore } from "react-icons/cg";
import { Link } from "react-router-dom";

const ActivityList = ({ data }: { data: ActivityType[] }) => {
    const { setCreatingActivity } = useAppContext();

    return (
        <div className="page">
            <h1 className="text-xl flex justify-between mb-4">
                <span>Mes Activités</span>
                <span className="text-2xl">
                    <Popover
                        trigger={["click"]}
                        destroyTooltipOnHide
                        arrow={false}
                        content={() => (
                            <ul className="flex flex-col">
                                <li
                                    className="py-1 cursor-pointer"
                                    onClick={() =>
                                        setCreatingActivity({
                                            now: true,
                                            activity: null,
                                        })
                                    }
                                >
                                    Créer une activité
                                </li>
                            </ul>
                        )}
                    >
                        <CgDetailsMore />
                    </Popover>
                </span>
            </h1>
            <ul className="flex flex-col gap-1">
                {data.map((item) => (
                    <Link
                        key={item.id}
                        to={`?do=one&id=${item.id}`}
                        className="py-3 px-4 shadow-lg text-stone-600 rounded-lg flex gap-4 items-center"
                    >
                        <span className="rounded-full w-12 h-12 bg-stone-600 flex items-center justify-center text-2xl uppercase text-neutral-200">
                            {item.members}
                        </span>
                        <p className="flex flex-col">
                            <span>{item.designation}</span>
                            <span className="italic text-[85%] text-neutral-600">
                                {item.description?.slice(0, 40)} ...
                            </span>
                        </p>

                        <span className="ml-auto py-1 px-2 text-[85%] border border-blue-800 rounded-lg text-blue-800">
                            Voir plus
                        </span>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default ActivityList;
