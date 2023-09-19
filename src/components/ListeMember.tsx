import { MemberType } from "@/context/type";
import { Table } from "antd";

const ListeMember = ({ data = [] }: { data?: MemberType[] }) => {
    return (
        <>
            <Table
                dataSource={data}
                columns={[
                    { title: "Nom", dataIndex: "name" },
                    { title: "Prenom", dataIndex: "postname" },
                    {
                        title: "Next",
                        dataIndex: "next",
                        render: () => new Date().toDateString(),
                    },
                    { title: "Phone", dataIndex: "phone" },
                ]}
                components={{
                    header: {
                        cell: ({ children, ...rest }: any) => (
                            <td
                                {...rest}
                                className="p-2 !bg-white !font-medium"
                            >
                                {children}
                            </td>
                        ),
                        row: ({ children }: any) => <tr>{children}</tr>,
                    },
                }}
                scroll={{ x: "max-content" }}
                pagination={false}
                rowKey={(record) => record.id}
            />
        </>
    );
};

export default ListeMember;
