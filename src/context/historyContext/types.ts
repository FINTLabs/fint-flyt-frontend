import {IEvent} from "../../features/log/types/Event";

export type HistoryContextState = {
    events: IEvent[] | undefined,
    getEvents: (page: number, size: number, sortProperty: string, sortDirection: string) => void;
    latestInstances: IEvent[] | undefined,
    getLatestInstances: (page: number, size: number, sortProperty: string, sortDirection: string, sourceApplicationId: string) => void;
    selectedInstances: IEvent[] | undefined,
    getSelectedInstances: (page: number, size: number, sortProperty: string, sortDirection: string, sourceApplicationId: string, instanceId: string) => void;
}

export const contextDefaultValues: HistoryContextState = {
    events: undefined,
    latestInstances: undefined,
    getEvents: () => undefined,
    getLatestInstances: () => undefined,
    selectedInstances: undefined,
    getSelectedInstances: () => undefined
};
