import { ActivityType, CotisationType, MemberType } from "@/context/type";

const MemberCard = ({
    member,
    cotisations,
    activity,
}: {
    member: MemberType;
    cotisations: CotisationType[];
    activity: ActivityType;
}) => {
    return (
        <div className="shadow-lg py-4 px-2">
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
        </div>
    );
};

export default MemberCard;
