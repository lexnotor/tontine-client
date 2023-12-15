import axios from "axios";
import { AddMemberPayload } from "./type";
import { memberUrl } from "./constante";

const getAllMember = async (token: string) => {
    try {
        const res = await axios.get(memberUrl.getAll, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data.data;
    } catch (error) {
        throw new Error("UNABLE_TO_FETCH_MEMBERS");
    }
};

const getMemberMyActivity = async (activityId: string, token: string) => {
    try {
        const res = await axios.get(memberUrl.getAllByActivity(activityId), {
            headers: { Authorization: `Bearer ${token}` },
        });

        return res.data;
    } catch (error) {
        throw new Error("FAIL_TO_FETCH_MEMBERS_ACTIVITY");
    }
};

const addMember = async (payload: AddMemberPayload, token: string) => {
    const { name, phone, postname, status, activity_id } = payload;

    try {
        const res = await axios.post(
            memberUrl.addMember,
            { name, phone, postname, status, activity_id },
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );

        return res.data;
    } catch (error) {
        throw new Error("FAIL_TO_CREATE_MEMBER");
    }
};

const deleteMember = async (memberId: string, token: string) => {
    try {
        const res = await axios.delete(memberUrl.deleteOne(memberId), {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        throw new Error("FAIL_TO_DELETE_MEMBER");
    }
};

const updateOne = async (
    memberId: string,
    payload: Partial<AddMemberPayload>,
    token: string,
) => {
    const { name, phone, postname, status } = payload;

    try {
        const res = await axios.patch(
            memberUrl.updateOne(memberId),
            {
                name,
                phone,
                postname,
                status,
            },
            { headers: { Authorization: `Bearer ${token}` } },
        );

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
