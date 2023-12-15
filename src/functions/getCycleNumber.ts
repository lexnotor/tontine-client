import { ActivityType } from "@/context/type";
const day = 24 * 3600 * 1_000;
const detail_cycle: Record<ActivityType["cycle"], number> = {
    parAnnee: day * 365,
    parJour: day,
    parMois: day * 30,
    parSemaine: day * 7,
};

const getCycleNumber = (
    startDate: string,
    cycleType: ActivityType["cycle"],
) => {
    const start = new Date(startDate);
    const today = new Date();

    return Math.ceil(
        (today.getTime() - start.getTime()) / detail_cycle[cycleType],
    );
};

export default getCycleNumber;
