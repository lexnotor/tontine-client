import { ActivityType } from "@/context/type";
import { Popover } from "antd";
import { CgDetailsMore } from "react-icons/cg";
import { Link } from "react-router-dom";

const ActivityList = ({ data }: { data: ActivityType[] }) => {
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
                                    onClick={() => null}
                                >
                                    Ajouter un membre
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
                        className="py-3 px-4 bg-stone-600 text-white rounded-lg flex gap-4 items-center"
                    >
                        <span className="rounded-full w-12 h-12 bg-white flex items-center justify-center text-2xl uppercase text-black">
                            {item.members}
                        </span>
                        <p className="flex flex-col">
                            <span>{item.designation}</span>
                            <span>{item.designation}</span>
                        </p>

                        <span className="ml-auto">+</span>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default ActivityList;
