import { useAppContext } from "@/context";
import { useCotisation, useMembers } from "@/hooks";
import { Modal } from "antd";
import { useMemo } from "react";

const MemberFees = () => {
    const { showFees, setShowFees } = useAppContext();
    const { cotisations } = useCotisation();
    const { members } = useMembers();
    const member = useMemo(
        () => members?.find((item) => item?.id == showFees?.member),
        [members, showFees?.member],
    );
    const fees = useMemo(
        () => cotisations?.find((item) => item?.member_id == member?.id),
        [member?.id, cotisations],
    );

    return (
        <Modal
            destroyOnClose
            open
            footer={false}
            onCancel={() => {
                setShowFees({ member: null, now: false });
            }}
        >
            MemberFees
        </Modal>
    );
};

export default MemberFees;
