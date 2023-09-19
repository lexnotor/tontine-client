import { useCotisationContext } from "@/context";
import { useEffect, useMemo } from "react";

const useCotisation = () => {
    const {
        thread,
        getAllCotisations,
        cotisations,
        createCotisation,
        deleteCotisation,
        updateCotisation,
    } = useCotisationContext();

    const isAllReadyFetch = useMemo(() => {
        return thread.some(
            (task) =>
                task.action == "SET_COTISATIONS" &&
                (task.status == "LOADING" || task.status == "SUCCESS"),
        );
    }, [thread]);

    useEffect(() => {
        if (!isAllReadyFetch) getAllCotisations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAllReadyFetch]);

    return {
        thread,
        getAllCotisations,
        cotisations,
        createCotisation,
        deleteCotisation,
        updateCotisation,
    };
};

export default useCotisation;
