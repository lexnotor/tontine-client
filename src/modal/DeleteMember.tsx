import { useAppContext } from "@/context";
import { members } from "@/data";
import { Modal } from "antd";

const DeleteMember = () => {
    const { setDeletingMember } = useAppContext();

    const submit: React.FormEventHandler = (e) => {
        e.preventDefault();
        setDeletingMember({ activity: null, now: false });
    };

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
                    <select className="px-4 py-2 border bg-transparent rounded-lg">
                        {members.map((item) => (
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
