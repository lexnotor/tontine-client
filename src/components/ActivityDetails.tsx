import { useAppContext } from "@/context";
import { useActivity, useCotisation, useMembers } from "@/hooks";
import { Popover, Tag } from "antd";
import { useMemo, useRef } from "react";
import { CgDetailsMore } from "react-icons/cg";
import { CiTimer } from "react-icons/ci";
import { GiBackwardTime } from "react-icons/gi";
import { Link } from "react-router-dom";
import MemberCard from "./MemberCard";

const ActivityDetails = ({ activityId }: { activityId?: string }) => {
    const { setSavingFees, setAddingMember, setDeletingMember } =
        useAppContext();

    const outRef = useRef<HTMLSpanElement>(null);

    const { members } = useMembers();
    const { activities } = useActivity();
    const { cotisations } = useCotisation();

    const memberList = useMemo(() => {
        return members.filter((item) => item.activity_id == activityId);
    }, [members, activityId]);

    const currentActivity = useMemo(() => {
        return activities.find((item) => item.id == activityId);
    }, [activities, activityId]);

    return (
        <div className="page">
            <h1 className="flex justify-between">
                <span className="">
                    <Link
                        to={"/activity"}
                        className="border border-slate-800 text-slate-800 rounded-lg  py-1 px-3 text-[85%]"
                    >
                        Return
                    </Link>
                </span>
                <span className=" text-xl uppercase">
                    {currentActivity?.designation}
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
                                            activity: currentActivity?.id,
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
                                            activity: currentActivity?.id,
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
                                            activity: currentActivity?.id,
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
            <div className="p-4 bg-neutral-200/50 rounded-lg my-4 shadow-xl">
                <p className="flex gap-4 items-center my-2">
                    <span className="text-2xl text-blue-700">
                        <GiBackwardTime />
                    </span>
                    <Tag className="text-[85%]" color="blue">
                        {new Date(currentActivity?.start).toLocaleDateString()}
                    </Tag>
                    <span className="text-base">-</span>
                    <Tag className="text-[85%]" color="blue">
                        {new Date(currentActivity?.end).toLocaleDateString()}
                    </Tag>
                </p>

                <p className="my-2 text-base flex gap-4 items-center">
                    <span className="text-2xl text-blue-700">
                        <CiTimer />
                    </span>
                    <Tag className="text-[85%]" color="blue">
                        {currentActivity?.cycle}
                    </Tag>
                </p>
            </div>

            <section className="p-4 bg-neutral-200/50 rounded-lg my-4 shadow-xl">
                <h2 className="font-bold my-1">Description</h2>
                <p>{currentActivity?.description}</p>
            </section>

            <section className="py-4 my-4">
                <h2 className="font-bold my-4">Membres</h2>
                <div className="grid grid-cols-2">
                    {memberList?.map((member) => (
                        <MemberCard
                            key={member?.id}
                            member={member}
                            cotisations={cotisations?.filter(
                                (item) => item.member_id == member.id,
                            )}
                            activity={currentActivity}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ActivityDetails;
