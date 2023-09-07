import { useAppContext } from "@/context";
import { activityList } from "@/data";
import { Popover, Tag } from "antd";
import { useRef } from "react";
import { CgDetailsMore } from "react-icons/cg";
import { CiTimer } from "react-icons/ci";
import { GiBackwardTime } from "react-icons/gi";
import ListeMember from "./ListeMember";

const ActivityDetails = () => {
    const item = activityList[0];
    const { setSavingFees, setAddingMember, setDeletingMember } =
        useAppContext();

    const outRef = useRef<HTMLSpanElement>(null);

    return (
        <div className="page">
            <h1 className="flex justify-between">
                <span className="font-bold text-xl uppercase">
                    {item.designation}
                </span>
                <span className="text-2xl" ref={outRef}>
                    <Popover
                        trigger={["click"]}
                        destroyTooltipOnHide
                        arrow={false}
                        content={() => (
                            <ul className="flex flex-col">
                                <li
                                    className="py-1 cursor-pointer"
                                    onClick={() =>
                                        setAddingMember({
                                            activity: item.id,
                                            now: true,
                                        })
                                    }
                                >
                                    Ajouter un membre
                                </li>
                                <li
                                    className="py-1 cursor-pointer"
                                    onClick={() =>
                                        setDeletingMember({
                                            activity: item.id,
                                            now: true,
                                        })
                                    }
                                >
                                    Supprimer un membre
                                </li>
                                <li
                                    className="py-1 cursor-pointer"
                                    onClick={() =>
                                        setSavingFees({
                                            activity: item.id,
                                            now: true,
                                        })
                                    }
                                >
                                    Enregistrer une contisation
                                </li>
                            </ul>
                        )}
                    >
                        <CgDetailsMore />
                    </Popover>
                </span>
            </h1>
            <div className="p-4 bg-neutral-200/50 rounded-lg my-4">
                <p className="flex gap-4 items-center my-2">
                    <span className="text-2xl text-blue-700">
                        <GiBackwardTime />
                    </span>
                    <Tag className="text-base" color="blue">
                        {new Date(item.start).toLocaleDateString()}
                    </Tag>
                    <span className="text-base">-</span>
                    <Tag className="text-base" color="blue">
                        {new Date(item.end).toLocaleDateString()}
                    </Tag>
                </p>

                <p className="my-2 text-base flex gap-4 items-center">
                    <span className="text-2xl text-orange-700">
                        <CiTimer />
                    </span>
                    <Tag className="text-base" color="orange">
                        {item.cycle}
                    </Tag>
                </p>
            </div>

            <h2 className="font-bold my-1">Description</h2>
            <p>{item.description}</p>

            <h2 className="font-bold my-1">Membres</h2>
            <ListeMember />
        </div>
    );
};

export default ActivityDetails;
