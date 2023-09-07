import axios from "axios";
import { SaveCotisatioPayload } from "./type";
import { cotisationUrl } from "./constante";

const createCotisation = async (payload: SaveCotisatioPayload) => {
    try {
        const res = await axios.post(cotisationUrl.saveCotisation, payload, {
            headers: { Authorization: "" },
        });
        return res.data;
    } catch (error) {
        throw new Error("UNABLE_TO_SAVE_COTISATION");
    }
};

const getAllCotisation = async () => {
    try {
        const res = await axios.get(cotisationUrl.getAll, {
            headers: { Authorization: "" },
        });
        return res.data;
    } catch (error) {
        throw new Error("UNABLE_TO_FETCH_COTISATION");
    }
};

const getCotisationByActivity = async (activityId: string) => {
    try {
        const res = await axios.get(
            cotisationUrl.getAllByActivity(activityId),
            {
                headers: { Authorization: "" },
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
) => {
    try {
        const res = await axios.put(
            cotisationUrl.updateCotisation(activityId),
            payload,
            {
                headers: { Authorization: "" },
            },
        );
        return res.data;
    } catch (error) {
        throw new Error("UNABLE_TO_UPDATE_COTISATIONS");
    }
};

const deleteCotisation = async (activityId: string) => {
    try {
        const res = await axios.delete(
            cotisationUrl.deleteCotisation(activityId),
            {
                headers: { Authorization: "" },
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
