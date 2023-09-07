import axios from "axios";
import { AddMemberPayload } from "./type";
import { memberUrl } from "./constante";

const getAllMember = async () => {
    try {
        const res = await axios.get(memberUrl.getAll, {
            headers: { Authorization: "" },
        });
        return res.data;
    } catch (error) {
        throw new Error("UNABLE_TO_FETCH_MEMBERS");
    }
};

const getMemberMyActivity = async (activityId: string) => {
    try {
        const res = await axios.get(memberUrl.getAllByActivity(activityId));

        return res.data;
    } catch (error) {
        throw new Error("FAIL_TO_FETCH_MEMBERS_ACTIVITY");
    }
};

const addMember = async (payload: AddMemberPayload) => {
    const { name, phone, postname, status } = payload;

    try {
        const res = await axios.post(
            memberUrl.addMember,
            { name, phone, postname, status },
            {
                headers: { Authorization: "" },
            },
        );

        return res.data;
    } catch (error) {
        throw new Error("FAIL_TO_CREATE_MEMBER");
    }
};

const deleteMember = async (memberId: string) => {
    try {
        const res = await axios.delete(memberUrl.deleteOne(memberId), {
            headers: { Authorization: "" },
        });
        return res.data;
    } catch (error) {
        throw new Error("FAIL_TO_DELETE_MEMBER");
    }
};

const updateOne = async (
    memberId: string,
    payload: Partial<AddMemberPayload>,
) => {
    const { name, phone, postname, status } = payload;

    try {
        const res = await axios.put(memberUrl.updateOne(memberId), {
            name,
            phone,
            postname,
            status,
        });

        return res.data;
    } catch (error) {
        throw new Error("FAIL_TO_UPDATE_MEMBER");
    }
};

export {
    addMember,
    deleteMember,
    getAllMember,
    updateOne,
    getMemberMyActivity,
};
