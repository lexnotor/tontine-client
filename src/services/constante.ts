// ------------ REQUEST BASE URL ----------
export const baseUrl = `${import.meta.env.BACKEND}/api/v1`;

// ------------ API URL HELPER ------------
export const authUrl = {
    login: `${baseUrl}/login`,
    signup: `${baseUrl}/register`,
    checkLogin: `${baseUrl}/`,
};

export const memberUrl = {
    addMember: `${baseUrl}/members`,
    getAll: `${baseUrl}/members`,
    getAllByActivity: (activityId: string) =>
        `${baseUrl}/members/${activityId}`,
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
