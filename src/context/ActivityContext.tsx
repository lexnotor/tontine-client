import { activityService } from "@/services";
import { CreateActivityPayload } from "@/services/type";
import React, { createContext, useContext, useReducer } from "react";
import { ActivityType, CustomeAction, ActivityContextType } from "./type";

// ------------- CONTEXT_CREATION -------------
const activityContext = createContext<ActivityContextType>({});
type AllPayload = ActivityType | ActivityType[] | string;
type AllType =
    | "ADD_ACTIVITY"
    | "REMOVE_ACTIVITY"
    | "REPLACE_ACTIVITY"
    | "SET_ACTIVITIES";

// ------------- CONTEXT PROVIDER -------------
const ActivityContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [activities, activitiesDisp] = useReducer(
        (state: ActivityType[], action: CustomeAction<AllPayload, AllType>) => {
            switch (action.type) {
                case "ADD_ACTIVITY":
                    return [...state, action.payload as ActivityType];

                case "REMOVE_ACTIVITY":
                    return state.filter(
                        (item) => item.id != (action.payload as string),
                    );

                case "REPLACE_ACTIVITY": {
                    const index = state.findIndex(
                        (item) =>
                            item.id == (action.payload as ActivityType).id,
                    );
                    if (index == -1)
                        return [action.payload as ActivityType, ...state];
                    else
                        return [
                            ...state.slice(0, index),
                            action.payload as ActivityType,
                            ...state.slice(index + 1),
                        ];
                }

                case "SET_ACTIVITIES":
                    return action.payload as ActivityType[];

                default:
                    return state;
            }
        },
        [],
    );

    const getAllActivities = () => {
        activityService
            .getAllActivities()
            .then((data) =>
                activitiesDisp({ type: "SET_ACTIVITIES", payload: data }),
            )
            .catch((error) => alert(error.message));
    };

    const createActivity = (payload: CreateActivityPayload) => {
        activityService
            .createActivity(payload)
            .then((data) =>
                activitiesDisp({ type: "ADD_ACTIVITY", payload: data }),
            )
            .catch((error) => alert(error.message));
    };

    const updateActivity = (
        id: string,
        payload: Partial<CreateActivityPayload>,
    ) => {
        activityService
            .updateActivity(id, payload)
            .then((data) =>
                activitiesDisp({ type: "REPLACE_ACTIVITY", payload: data }),
            )
            .catch((error) => alert(error.message));
    };

    const deleteActivity = (payload: string) => {
        activityService
            .deleteActivity(payload)
            .then(() => activitiesDisp({ type: "REMOVE_ACTIVITY", payload }))
            .catch((error) => alert(error.message));
    };

    return (
        <activityContext.Provider
            value={{
                activities,
                getAllActivities,
                createActivity,
                deleteActivity,
                updateActivity,
            }}
        >
            {children}
        </activityContext.Provider>
    );
};

// ------------- CONTEXT HOOK -------------
const useActivityContext = () => useContext(activityContext);

// ------------- EXPORTING -------------
export { useActivityContext };

export default ActivityContextProvider;
