// ------------ REQUEST BASE URL ----------
export const baseUrl = `${import.meta.env.VITE_BACKEND_URL}`;

// ------------ API URL HELPER ------------
export const authUrl = {
    login: `${baseUrl}/api/v1/login`,
    signup: `${baseUrl}/api/v1/registers`,
    checkLogin: `${baseUrl}/`,
};

export const memberUrl = {
    addMember: `${baseUrl}/member`,
    getAll: `${baseUrl}/member`,
    getAllByActivity: (activityId: string) => `${baseUrl}/member/${activityId}`,
    deleteOne: (memberId: string) => `${baseUrl}/member/${memberId}`,
    updateOne: (memberId: string) => `${baseUrl}/member/${memberId}`,
};

export const activityUrl = {
    createActivity: `${baseUrl}/activity`,
    getAll: `${baseUrl}/activity`,
    deleteActivity: (activityId: string) => `${baseUrl}/activity/${activityId}`,
    updateActivity: (activityId: string) => `${baseUrl}/activity/${activityId}`,
};

export const cotisationUrl = {
    saveCotisation: `${baseUrl}/cotisation`,
    getAll: `${baseUrl}/cotisation`,
    getAllByActivity: (activityId: string) =>
        `${baseUrl}/cotisation/${activityId}`,
    deleteCotisation: (cotisationId: string) =>
        `${baseUrl}/cotisation/${cotisationId}`,
    updateCotisation: (cotisationId: string) =>
        `${baseUrl}/cotisation/${cotisationId}`,
};
