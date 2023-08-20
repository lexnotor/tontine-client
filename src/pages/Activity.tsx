import { ActivityDetails, ActivityList } from "@/components";
import { useSearchParams } from "react-router-dom";

const Activity = () => {
    const [searchParam] = useSearchParams();

    switch (searchParam.get("do")) {
        case "one":
            return <ActivityDetails />;

        default:
            return <ActivityList />;
    }
};

export default Activity;
