import { useMemberContext } from "@/context/MemberContext";
import { useEffect, useMemo } from "react";

const useMembers = () => {
    const {
        members,
        thread,
        getAllMembers,
        createMember,
        deleteMember,
        updateMember,
    } = useMemberContext();

    const isAllReadyFetch = useMemo(() => {
        return thread.some(
            (task) =>
                task.action == "SET_MEMBERS" &&
                (task.status == "LOADING" || task.status == "SUCCESS"),
        );
    }, [thread]);

    useEffect(() => {
        if (!isAllReadyFetch) getAllMembers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAllReadyFetch]);

    return {
        members,
        thread,
        getAllMembers,
        createMember,
        deleteMember,
        updateMember,
    };
};

export default useMembers;
