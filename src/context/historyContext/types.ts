import {IEvent} from "../../features/log/types/Event";

export type HistoryContextState = {
    events: IEvent[] | undefined,
    getEvents: () => void;
    latestInstances: IEvent[] | undefined,
    getLatestInstances: () => void;
    selectedInstances: IEvent[] | undefined,
    getSelectedInstances: (sourceApplicationId: string, instanceId: string) => void;
}

export const contextDefaultValues: HistoryContextState = {
    events: undefined,
    latestInstances: undefined,
    getEvents: () => {},
    getLatestInstances: () => {},
    selectedInstances: undefined,
    getSelectedInstances: (sourceApplicationId: string, instanceId: string) => {}
};
