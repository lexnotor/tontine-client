import { useMemberContext } from "@/context/MemberContext";

const useMembers = () => {
    const { members } = useMemberContext();

    return { members };
};

export default useMembers;
