import { ActivityDetails, ActivityList, PageTransition } from "@/components";
import CheckingAuth from "@/components/CheckingAuth";
import { useActivity, useAuth } from "@/hooks";
import { useSearchParams } from "react-router-dom";

const Activity = () => {
    const [searchParam] = useSearchParams();
    const { authStatus } = useAuth();
    const { activities } = useActivity();

    if (authStatus == "LOOKING") return <CheckingAuth />;

    switch (searchParam.get("do")) {
        case "one":
            return (
                <PageTransition>
                    <ActivityDetails activityId={searchParam.get("id")} />
                </PageTransition>
            );

        default:
            return (
                <PageTransition>
                    <ActivityList data={activities} />
                </PageTransition>
            );
    }
};

export default Activity;
