import { members } from "@/data";
import { Table } from "antd";

const ListeMember = () => {
    return (
        <>
            <Table
                dataSource={members}
                columns={[
                    { title: "Nom", dataIndex: "name" },
                    { title: "Prenom", dataIndex: "postname" },
                    {
                        title: "Next",
                        dataIndex: "next",
                        render: (text) => new Date(text).toDateString(),
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
            />
        </>
    );
};

export default ListeMember;
