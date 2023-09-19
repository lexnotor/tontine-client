import axios from "axios";
import { CreateActivityPayload } from "./type";
import { activityUrl } from "./constante";

const createActivity = async (
    payload: CreateActivityPayload,
    token: string,
) => {
    try {
        const res = await axios.post(activityUrl.createActivity, payload, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        throw new Error("UNABLE_TO_FETCH_ACTIVITIES");
    }
};

const getAllActivities = async (token: string) => {
    try {
        const res = await axios.get(activityUrl.getAll, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data.data;
    } catch (error) {
        throw new Error("UNABLE_TO_FETCH_ACTIVITIES");
    }
};

const updateActivity = async (
    activityId: string,
    payload: Partial<CreateActivityPayload>,
    token: string,
) => {
    try {
        const res = await axios.put(
            activityUrl.updateActivity(activityId),
            payload,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return res.data;
    } catch (error) {
        throw new Error("FAIL_TO_UPDATE_ACTIVIY");
    }
};

const deleteActivity = async (activityId: string, token: string) => {
    try {
        const res = await axios.delete(activityUrl.updateActivity(activityId), {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        throw new Error("FAIL_TO_UPDATE_ACTIVIY");
    }
};

export { createActivity, getAllActivities, updateActivity, deleteActivity };
