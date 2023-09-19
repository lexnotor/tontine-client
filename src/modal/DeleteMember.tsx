import { useAppContext } from "@/context";
import { useMembers } from "@/hooks";
import { Modal } from "antd";
import { useMemo, useRef } from "react";

const DeleteMember = () => {
    const { setDeletingMember, deletingMember } = useAppContext();
    const { deleteMember, members } = useMembers();

    const memberRef = useRef<HTMLSelectElement>();

    const submit: React.FormEventHandler = (e) => {
        e.preventDefault();

        deleteMember(memberRef.current.value);
        setDeletingMember({ activity: null, now: false });
    };

    const memberList = useMemo(() => {
        return members.filter(
            (item) => item.activity_id == deletingMember.activity,
        );
    }, [members, deletingMember]);

    return (
        <Modal
            destroyOnClose
            open
            cancelText="Annuler"
            okText="Supprimer"
            okType="danger"
            onCancel={() => {
                setDeletingMember({ activity: null, now: false });
            }}
            onOk={submit}
        >
            <form onSubmit={submit}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="last">Selectionner un membre :</label>
                    <select
                        ref={memberRef}
                        className="px-4 py-2 border bg-transparent rounded-lg"
                    >
                        {memberList.map((item) => (
                            <option
                                key={item.id}
                                value={item.id}
                                className="p-4 text-xs"
                            >
                                {item.name} {item.postname}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
        </Modal>
    );
};

export default DeleteMember;
