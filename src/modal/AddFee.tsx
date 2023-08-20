import { useAppContext } from "@/context";
import { members } from "@/data";
import { Modal } from "antd";
import React from "react";

const AddFee = () => {
    const { setSavingFees } = useAppContext();

    const submit: React.FormEventHandler = (e) => {
        e.preventDefault();
        setSavingFees({ activity: null, now: false });
    };

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
                <div className="flex flex-col gap-1">
                    <label htmlFor="first">Montant</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            name="first"
                            id="first"
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
