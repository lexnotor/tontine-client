import { ActivityDetails, ActivityList } from "@/components";
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
            return <ActivityDetails />;

        default:
            return <ActivityList data={activities} />;
    }
};

export default Activity;
