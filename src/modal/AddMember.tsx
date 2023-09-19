import { useAppContext } from "@/context";
import { useMembers } from "@/hooks";
import { Modal } from "antd";
import React, { useRef } from "react";

const AddMember = () => {
    const { setAddingMember, addingMember } = useAppContext();
    const { createMember } = useMembers();

    const nameRef = useRef<HTMLInputElement>();
    const lastnameRef = useRef<HTMLInputElement>();
    const phoneRef = useRef<HTMLInputElement>();

    const submit: React.FormEventHandler = (e) => {
        e.preventDefault();

        const payload: Parameters<typeof createMember>[number] = {
            activity_id: addingMember.activity,
            name: nameRef.current.value.trim(),
            phone: phoneRef.current.value.trim(),
            postname: lastnameRef.current.value.trim(),
            status: "isNoBeneficiary",
        };
        createMember(payload);
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
                        ref={nameRef}
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
                        ref={lastnameRef}
                        className="border px-4 py-1 rounded-lg"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="phone">Télephone</label>
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        ref={phoneRef}
                        className="border px-4 py-1 rounded-lg"
                    />
                </div>
            </form>
        </Modal>
    );
};

export default AddMember;
