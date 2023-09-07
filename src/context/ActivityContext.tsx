import { activityService } from "@/services";
import { CreateActivityPayload } from "@/services/type";
import React, { createContext, useContext, useReducer } from "react";
import {
    ActivityType,
    CustomeAction,
    ActivityContextType,
    ThreadType,
    ThreadActionType,
} from "./type";

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

    const [thread, setThread] = useReducer(
        (state: ThreadType<AllType>[], action: ThreadActionType<AllType>) => {
            switch (action.type) {
                case "add": {
                    const add: ThreadType<AllType> = {
                        id: action.payload.id,
                        status: "LOADING",
                        action: action.payload.action,
                    };
                    return [add, ...state];
                }
                case "success": {
                    const success = state.find((task) => task.id == action.id);
                    success.status = "SUCCESS";
                    return state;
                }
                case "error": {
                    const error = state.find((task) => task.id == action.id);
                    error.status = "ERROR";
                    return state;
                }

                default:
                    return state;
            }
        },
        [],
    );

    const getAllActivities = () => {
        const id = crypto.randomUUID();
        setThread({ payload: { action: "SET_ACTIVITIES", id }, type: "add" });
        activityService
            .getAllActivities()
            .then((data) => {
                activitiesDisp({ type: "SET_ACTIVITIES", payload: data });
                setThread({
                    id,
                    type: "success",
                });
            })
            .catch((error) => {
                alert(error.message);
                setThread({
                    id,
                    type: "error",
                });
            });
    };

    const createActivity = (payload: CreateActivityPayload) => {
        const id = crypto.randomUUID();
        setThread({ payload: { action: "ADD_ACTIVITY", id }, type: "add" });
        activityService
            .createActivity(payload)
            .then((data) => {
                activitiesDisp({ type: "ADD_ACTIVITY", payload: data });
                setThread({
                    id,
                    type: "success",
                });
            })
            .catch((error) => {
                alert(error.message);
                setThread({
                    id,
                    type: "error",
                });
            });
    };

    const updateActivity = (
        activityId: string,
        payload: Partial<CreateActivityPayload>,
    ) => {
        const id = crypto.randomUUID();
        setThread({ payload: { action: "REPLACE_ACTIVITY", id }, type: "add" });
        activityService
            .updateActivity(activityId, payload)
            .then((data) => {
                activitiesDisp({ type: "REPLACE_ACTIVITY", payload: data });
                setThread({
                    id,
                    type: "success",
                });
            })
            .catch((error) => {
                alert(error.message);
                setThread({
                    id,
                    type: "error",
                });
            });
    };

    const deleteActivity = (payload: string) => {
        const id = crypto.randomUUID();
        setThread({ payload: { action: "REMOVE_ACTIVITY", id }, type: "add" });
        activityService
            .deleteActivity(payload)
            .then(() => {
                activitiesDisp({ type: "REMOVE_ACTIVITY", payload });
                setThread({
                    id,
                    type: "success",
                });
            })
            .catch((error) => {
                alert(error.message);
                setThread({
                    id,
                    type: "error",
                });
            });
    };

    return (
        <activityContext.Provider
            value={{
                activities,
                getAllActivities,
                createActivity,
                deleteActivity,
                updateActivity,
                thread,
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
