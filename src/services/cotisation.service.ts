import axios from "axios";
import { SaveCotisatioPayload } from "./type";
import { cotisationUrl } from "./constante";

const createCotisation = async (
    payload: SaveCotisatioPayload,
    token: string,
) => {
    try {
        const res = await axios.post(cotisationUrl.saveCotisation, payload, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        throw new Error("UNABLE_TO_SAVE_COTISATION");
    }
};

const getAllCotisation = async (token: string) => {
    try {
        const res = await axios.get(cotisationUrl.getAll, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data.data;
    } catch (error) {
        throw new Error("UNABLE_TO_FETCH_COTISATION");
    }
};

const getCotisationByActivity = async (activityId: string, token: string) => {
    try {
        const res = await axios.get(
            cotisationUrl.getAllByActivity(activityId),
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return res.data;
    } catch (error) {
        throw new Error("UNABLE_TO_FETCH_COTISATIONS");
    }
};

const updateCotisation = async (
    activityId: string,
    payload: Partial<SaveCotisatioPayload>,
    token: string,
) => {
    try {
        const res = await axios.put(
            cotisationUrl.updateCotisation(activityId),
            payload,
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return res.data;
    } catch (error) {
        throw new Error("UNABLE_TO_UPDATE_COTISATIONS");
    }
};

const deleteCotisation = async (activityId: string, token: string) => {
    try {
        const res = await axios.delete(
            cotisationUrl.deleteCotisation(activityId),
            {
                headers: { Authorization: `Bearer ${token}` },
            },
        );
        return res.data;
    } catch (error) {
        throw new Error("UNABLE_TO_DELETE_COTISATIONS");
    }
};

export {
    createCotisation,
    getAllCotisation,
    getCotisationByActivity,
    updateCotisation,
    deleteCotisation,
};
