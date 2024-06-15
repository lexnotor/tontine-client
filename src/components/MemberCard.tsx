import { useMemberContext } from "@/context";
import { ActivityType, CotisationType, MemberType } from "@/context/type";
import { Popover } from "antd";
import { useMemo, useState } from "react";
import { AiOutlineMore } from "react-icons/ai";

const MemberCard = ({
    member,
    cotisations,
    activity,
    allMember = [],
}: {
    member: MemberType;
    cotisations: CotisationType[];
    activity: ActivityType;
    allMember: MemberType[];
}) => {
    const [popOpened, tooglePop] = useState<boolean>(false);
    const { updateMember } = useMemberContext();
    const setBeneficiar = () => {
        Promise.all(
            allMember
                .filter((item) => item?.id != member?.id)
                .filter((item) => item?.status == "isBeneficiary")
                .map((item) => {
                    return updateMember(item?.id, {
                        status: "isNoBeneficiary",
                    });
                }),
        );
        updateMember(member?.id, { status: "isBeneficiary" });
        tooglePop(false);
    };

    const unSetBeneficiar = () => {
        updateMember(member?.id, { status: "isNoBeneficiary" });
    };

    const isBeneficiary = useMemo(
        () => member?.status == "isBeneficiary",
        [member],
    );

    const isActivityFinish = useMemo(
        () => new Date(activity?.end) < new Date(),
        [activity],
    );

    return (
        <div
            className={`shadow-lg py-4 px-2 rounded ${
                isBeneficiary ? "bg-blue-100/60 font-semibold" : ""
            }`}
        >
            <h4>
                {member?.name} {member?.postname}
            </h4>
            <p className="text-[85%] italic text-neutral-500">
                {member?.phone}
            </p>
            <p>{cotisations?.length} Cotisation(s)</p>
            <p>
                {cotisations?.reduce((prev, cur) => prev + cur.amount, 0)}{" "}
                {activity?.currency}
            </p>
            <p className="flex justify-end text-lg cursor-pointer">
                <Popover
                    arrow={false}
                    trigger={["click"]}
                    open={popOpened}
                    onOpenChange={(open) => tooglePop(open)}
                    content={
                        <ul>
                            <li
                                className={`py-1  ${
                                    isActivityFinish
                                        ? "text-neutral-300 cursor-not-allowed"
                                        : "cursor-pointer"
                                }`}
                                onClick={() =>
                                    !isActivityFinish &&
                                    (isBeneficiary
                                        ? unSetBeneficiar()
                                        : setBeneficiar())
                                }
                            >
                                {isBeneficiary
                                    ? "Revoquer bénéficier"
                                    : "Designer bénéficier"}
                            </li>
                        </ul>
                    }
                >
                    <span>
                        <AiOutlineMore />
                    </span>
                </Popover>
            </p>
        </div>
    );
};

export default MemberCard;
