import { useAppContext } from "@/context";
import { useToastContext } from "@/context/ToastContext";
import getCycleNumber from "@/functions/getCycleNumber";
import { useActivity, useCotisation, useMembers } from "@/hooks";
import { Popover, Tag } from "antd";
import { motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { CiTimer, CiUser } from "react-icons/ci";
import { GiBackwardTime } from "react-icons/gi";
import { LuMenu } from "react-icons/lu";
import { Link } from "react-router-dom";
import MemberCard from "./MemberCard";
import { generePdf } from "@/functions/printActivity";
import CotisationTable from "./CotisationTable";

const ActivityDetails = ({ activityId }: { activityId?: string }) => {
    const { setSavingFees, setAddingMember, setDeletingMember } =
        useAppContext();
    const { addToast } = useToastContext();

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

    const beneficiar = memberList.find(
        (item) => item?.status == "isBeneficiary",
    );

    const isActivityFinish = useMemo(
        () => new Date(currentActivity?.end) < new Date(),
        [currentActivity],
    );

    const printActivityDetail = () => {
        generePdf(currentActivity, cotisations, memberList);
        setIsMenuOpen(false);
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="page"
        >
            <h1 className="flex justify-between">
                <span className="">
                    <Link
                        to={"/activity"}
                        className="border border-slate-800 text-slate-800 rounded-lg  py-1 px-3 text-[85%]"
                    >
                        Return
                    </Link>
                </span>
                <span className=" text-xl">{currentActivity?.designation}</span>
                <span className="text-2xl" ref={outRef}>
                    <Popover
                        trigger={["click"]}
                        destroyTooltipOnHide
                        open={isMenuOpen}
                        onOpenChange={(visible) => setIsMenuOpen(visible)}
                        arrow={false}
                        content={() => (
                            <ul className="flex flex-col [&>li:hover]:bg-neutral-200 [&>li]:duration-500">
                                <li
                                    className={`py-1  ${
                                        isActivityFinish
                                            ? "text-neutral-300 cursor-not-allowed"
                                            : "cursor-pointer"
                                    }`}
                                    onClick={() => {
                                        !isActivityFinish
                                            ? setAddingMember({
                                                  activity: currentActivity?.id,
                                                  now: true,
                                              })
                                            : addToast({
                                                  content:
                                                      "L'activité est términé",
                                                  type: "ERROR",
                                              });
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    Ajouter un membre
                                </li>
                                <li
                                    className={`py-1  ${
                                        isActivityFinish
                                            ? "text-neutral-300 cursor-not-allowed"
                                            : "cursor-pointer"
                                    }`}
                                    onClick={() => {
                                        !isActivityFinish
                                            ? setDeletingMember({
                                                  activity: currentActivity?.id,
                                                  now: true,
                                              })
                                            : addToast({
                                                  content:
                                                      "L'activité est términé",
                                                  type: "ERROR",
                                              });
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    Supprimer un membre
                                </li>
                                <li
                                    className={`py-1  ${
                                        isActivityFinish
                                            ? "text-neutral-300 cursor-not-allowed"
                                            : "cursor-pointer"
                                    }`}
                                    onClick={() => {
                                        !isActivityFinish
                                            ? setSavingFees({
                                                  activity: currentActivity?.id,
                                                  now: true,
                                              })
                                            : addToast({
                                                  content:
                                                      "L'activité est términé",
                                                  type: "ERROR",
                                              });
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    Enregistrer une contisation
                                </li>
                                <li
                                    className={"py-1 cursor-pointer"}
                                    onClick={() => printActivityDetail()}
                                >
                                    Imprimer détails
                                </li>
                            </ul>
                        )}
                    >
                        <span>
                            <LuMenu />
                        </span>
                    </Popover>
                </span>
            </h1>
            <div className="p-4 bg-neutral-200/50 rounded-lg my-4 shadow-xl">
                <article className="flex gap-4 items-center my-2">
                    <span className="text-2xl text-blue-700">
                        <GiBackwardTime />
                    </span>
                    <Tag className="text-[85%]" color="blue">
                        <div className="flex gap-2">
                            <span>Début</span>
                            <span>
                                {new Date(
                                    currentActivity?.start,
                                ).toLocaleDateString()}
                            </span>
                        </div>
                    </Tag>
                    <span className="text-base">-</span>
                    <Tag className="text-[85%]" color="blue">
                        <div className="flex gap-2">
                            <span>Fin</span>
                            <span>
                                {new Date(
                                    currentActivity?.end,
                                ).toLocaleDateString()}
                            </span>
                        </div>
                    </Tag>
                </article>

                <article className="my-2 text-base flex gap-4 items-center">
                    <span className="text-xl text-blue-700">
                        <CiTimer />
                    </span>
                    <Tag className="text-[85%]" color="blue">
                        <div className="flex gap-2 items-center">
                            <span className="text-[85%]">
                                {currentActivity?.amount_to_give}{" "}
                                {currentActivity?.currency}
                            </span>
                            <span>{currentActivity?.cycle}</span>
                        </div>
                    </Tag>
                    {isActivityFinish ? (
                        <Tag className="text-[85%]" color="red">
                            Déjà terminer
                        </Tag>
                    ) : (
                        <Tag color="green">Activité en cours</Tag>
                    )}
                </article>

                <article className="my-2 text-base flex gap-4 items-center">
                    <span className="text-2xl text-green-700">
                        <CiUser />
                    </span>
                    <Tag className="text-[85%]" color="green">
                        <div className="flex gap-2 items-center">
                            <span className="text-[85%]">
                                {beneficiar
                                    ? `${beneficiar?.name} ${beneficiar?.postname}`
                                    : "Aucun beneficiére"}
                            </span>
                        </div>
                    </Tag>
                    {new Date(currentActivity?.end) < new Date() ? null : (
                        <Tag color="green">
                            {getCycleNumber(
                                currentActivity?.start,
                                currentActivity?.cycle,
                            )}
                            <sup>e</sup>
                            <span> Cycle</span>
                        </Tag>
                    )}
                </article>
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
                            allMember={memberList}
                        />
                    ))}
                </div>
            </section>

            <section className="py-4 my-4">
                <h2 className="font-bold my-4">Cotisations</h2>
                <div className="">
                    <CotisationTable
                        data={cotisations.filter(
                            (item) => item.activity_id == currentActivity.id,
                        )}
                        membres={memberList}
                        currentActivity={currentActivity}
                    />
                </div>
            </section>
        </motion.div>
    );
};

export default ActivityDetails;
