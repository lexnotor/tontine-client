import { useAppContext } from "@/context";
import { Modal } from "antd";
import React from "react";

const AddMember = () => {
    const { setAddingMember } = useAppContext();

    const submit: React.FormEventHandler = (e) => {
        e.preventDefault();
        setAddingMember({ activity: null, now: false });
    };
    return (
        <Modal
            destroyOnClose
            closable={false}
            open
            cancelText="Annuler"
            okText="Enregistrer"
            okType="default"
            onCancel={() => {
                setAddingMember({ activity: null, now: false });
            }}
            onOk={submit}
        >
            <form onSubmit={submit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="last">Nom</label>
                    <input
                        type="text"
                        name="last"
                        id="last"
                        autoFocus
                        className="border px-4 py-1 rounded-lg"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="first">Prenom</label>
                    <input
                        type="text"
                        name="first"
                        id="first"
                        className="border px-4 py-1 rounded-lg"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="phone">Télephone</label>
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        className="border px-4 py-1 rounded-lg"
                    />
                </div>
            </form>
        </Modal>
    );
};

export default AddMember;
