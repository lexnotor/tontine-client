import { useActivityContext } from "@/context";
import { useEffect, useMemo } from "react";

const useActivity = () => {
    const {
        activities,
        thread,
        getAllActivities,
        createActivity,
        deleteActivity,
        updateActivity,
    } = useActivityContext();

    const isAllReadyFetch = useMemo(() => {
        return thread.some(
            (task) =>
                task.action == "SET_ACTIVITIES" &&
                (task.status == "LOADING" || task.status == "SUCCESS"),
        );
    }, [thread]);

    useEffect(() => {
        if (!isAllReadyFetch) getAllActivities();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAllReadyFetch]);

    return {
        activities,
        thread,
        getAllActivities,
        createActivity,
        deleteActivity,
        updateActivity,
    };
};

export default useActivity;
