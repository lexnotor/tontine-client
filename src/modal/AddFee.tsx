import { useAppContext } from "@/context";
import { useCotisation, useMembers } from "@/hooks";
import { Modal } from "antd";
import React, { useMemo, useRef } from "react";

const AddFee = () => {
    const { setSavingFees, savingFees } = useAppContext();
    const { members } = useMembers();
    const { createCotisation } = useCotisation();

    const memberRef = useRef<HTMLSelectElement>();
    const amountRef = useRef<HTMLInputElement>();

    const submit: React.FormEventHandler = (e) => {
        e.preventDefault();
        const payload: Parameters<typeof createCotisation>[number] = {
            activityId: savingFees.activity,
            amount: +amountRef.current.value,
            memberId: memberRef.current.value,
        };
        createCotisation(payload);
        setSavingFees({ activity: null, now: false });

        return payload;
    };
    const memberList = useMemo(() => {
        return members.filter(
            (item) => item.activity_id == savingFees.activity,
        );
    }, [members, savingFees]);

    return (
        <Modal
            destroyOnClose
            open
            cancelText="Annuler"
            okText="Enregistrer"
            okType="default"
            onCancel={() => {
                setSavingFees({ activity: null, now: false });
            }}
            onOk={submit}
        >
            <form onSubmit={submit} className="flex flex-col gap-4">
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
                <div className="flex flex-col gap-1">
                    <label htmlFor="first">Montant</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            name="first"
                            id="first"
                            ref={amountRef}
                            className="w-[calc(100%-4rem)] border px-4 py-1 rounded-lg"
                        />
                        <select
                            name=""
                            id=""
                            className="w-[4rem] px-2 py-2 border bg-transparent rounded-lg"
                        >
                            <option value="usd">USD</option>
                            <option value="fc">FC</option>
                        </select>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default AddFee;
