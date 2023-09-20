import { useAppContext } from "@/context";
import { useActivity } from "@/hooks";
import { Modal } from "antd";
import React, { useRef, useState } from "react";

const CreateActivity = () => {
    const { setCreatingActivity } = useAppContext();
    const { createActivity } = useActivity();

    const [, reload] = useState<any>(null);

    const formatDate = (date: Date | null, toDateTime = false) => {
        if (!date) return null;

        const time = `${date.getHours() < 10 ? "0" : ""}${date.getHours()}:${
            date.getMinutes() < 10 ? "0" : ""
        }${date.getMinutes()}:${
            date.getSeconds() < 10 ? "0" : ""
        }${date.getSeconds()}`;

        const day = `${date.getFullYear()}-${date.getMonth() < 10 ? "0" : ""}${
            date.getMonth() + 1
        }-${date.getDate() < 10 ? "0" : ""}${date.getDate()} `;

        if (toDateTime) {
            return `${day} ${time}`;
        } else return day;
    };
    const designationRef = useRef<HTMLInputElement>();
    const descriptionRef = useRef<HTMLTextAreaElement>();
    const startRef = useRef<HTMLInputElement>();
    const endRef = useRef<HTMLInputElement>();
    const cycleRef = useRef<HTMLSelectElement>();
    const amount_to_giveRef = useRef<HTMLInputElement>();
    const currencyRef = useRef<HTMLSelectElement>();

    const submit: React.FormEventHandler = (e) => {
        e.preventDefault();

        const payload: Parameters<typeof createActivity>[number] = {
            designation: designationRef.current.value,
            description: descriptionRef.current.value,
            start: formatDate(startRef.current.valueAsDate, true),
            end: formatDate(endRef.current.valueAsDate, true),
            cycle: cycleRef.current.value,
            amount_to_give: amount_to_giveRef.current.value,
            status: "inProgress",
            currency: currencyRef.current.value,
        };
        if (Object.values(payload).some((val) => !val))
            return alert("Tous les champs sont obligatoire");

        createActivity(payload);
        setCreatingActivity({ activity: null, now: false });
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
                setCreatingActivity({ activity: null, now: false });
            }}
            onOk={submit}
        >
            <form onSubmit={submit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="last">Designation *</label>
                    <input
                        type="text"
                        name="last"
                        id="last"
                        ref={designationRef}
                        autoFocus
                        className="border px-4 py-1 rounded-lg"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="first">Description *</label>
                    <textarea
                        name="description"
                        rows={3}
                        id="first"
                        ref={descriptionRef}
                        className="resize-none border px-4 py-1 rounded-lg"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    {/* <label htmlFor="phone">Durée</label> */}
                    <div className="flex gap-2 justify-between items-center">
                        Du :
                        <input
                            type="date"
                            name="phone"
                            id="start"
                            ref={startRef}
                            className="border px-4 py-1 rounded-lg"
                            max={formatDate(endRef.current?.valueAsDate)}
                            onChange={(e) => reload(e.target.valueAsDate)}
                        />
                        Au :
                        <input
                            type="date"
                            name="phone"
                            id="end"
                            ref={endRef}
                            className="border px-4 py-1 rounded-lg"
                            min={formatDate(startRef.current?.valueAsDate)}
                            onChange={(e) => reload(e.target.valueAsDate)}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="first">Cycle *</label>
                    <select
                        name="cycle"
                        id="cycle"
                        ref={cycleRef}
                        className="px-4 py-2 border bg-transparent rounded-lg"
                    >
                        <option value={"parMois"}>Par Mois</option>
                        <option value={"parJour"}>Chaque Jour</option>
                        <option value={"parSemaine"}>Chaque Semaine</option>
                        <option value={"parAnnee"}>Par Année</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="amount_to_give">
                        Cotisation par membre *
                    </label>
                    <div className="flex gap-2 items-center">
                        <input
                            type="input"
                            name="amount_to_give"
                            id="start"
                            ref={amount_to_giveRef}
                            className="border px-4 py-1 rounded-lg"
                            defaultValue={0}
                            placeholder="300"
                        />
                        <select
                            name=""
                            id=""
                            ref={currencyRef}
                            className="px-4 py-2 border bg-transparent rounded-lg"
                        >
                            <option value="USD">USD</option>
                            <option value="FC">CDF (FC)</option>
                        </select>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default CreateActivity;
