import { ActivityType, CotisationType, MemberType } from "@/context/type";
import { ColumnsType } from "antd/es/table";
import { useMemo } from "react";
import { CustomTable } from "./CustomTable";
import { generePdf } from "@/functions/printInvoice";

const CotisationTable = ({
    data = [],
    membres = [],
    currentActivity,
}: {
    data: CotisationType[];
    membres: MemberType[];
    currentActivity: ActivityType;
}) => {
    const columnConfig = useMemo<ColumnsType<CotisationType>>(
        () => [
            {
                title: "Membre",
                render: (_, record) => {
                    const membre = membres.find(
                        (item) => item.id == record.member_id,
                    );
                    return `${membre.name} ${membre.postname}`;
                },
            },
            {
                title: "Amount",
                dataIndex: "amount",
            },
            {
                title: "Date",
                dataIndex: "created_at",
                render: (date) => {
                    return new Date(date).toLocaleDateString();
                },
            },
            {
                title: "Action",
                render: (_, record) => {
                    return (
                        <div>
                            <button
                                className="py-1 px-2 bg-blue-600 rounded-md text-[85%] text-white"
                                onClick={() => {
                                    generePdf(
                                        currentActivity,
                                        record,
                                        membres.find(
                                            (item) =>
                                                item.id == record.member_id,
                                        ),
                                    );
                                }}
                            >
                                Imprimer
                            </button>
                        </div>
                    );
                },
            },
        ],
        [membres, currentActivity],
    );

    return (
        <CustomTable
            columns={columnConfig}
            dataSource={data}
            rowKey={(record) => record.id}
            pagination={{ pageSize: 20, hideOnSinglePage: true }}
        />
    );
};

export default CotisationTable;
