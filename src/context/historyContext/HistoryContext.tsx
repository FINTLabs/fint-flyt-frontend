import {IEvent} from "../../features/log/types/Event";
import {contextDefaultValues, HistoryContextState} from "./types";
import {createContext, FC, useState} from "react";
import EventRepository from "../../features/log/repository/EventRepository";
import {addId} from "../../features/util/JsonUtil";
import SourceApplicationRepository from "../../shared/repositories/SourceApplicationRepository";
import {IIntegrationMetadata} from "../../features/integration/types/IntegrationMetadata";

export const HistoryContext = createContext<HistoryContextState>(
    contextDefaultValues
);

const HistoryProvider: FC = ({children}) => {
    const [events, setEvents] = useState<IEvent[] | undefined>(contextDefaultValues.events);
    const [latestInstances, setLatestInstances] = useState<IEvent[] | undefined>(contextDefaultValues.latestInstances);
    const [selectedInstances, setSelectedInstances] = useState<IEvent[] | undefined>(contextDefaultValues.selectedInstances)

    const getEvents = (page: number, size: number, sortProperty: string, sortDirection: string) => {
        EventRepository.getEvents(page, size, sortProperty, sortDirection)
            .then((response) => {
                let data = response.data.content;
                if (data) {
                    data.forEach(addId(0, 'name'))
                    data.forEach((event: any) =>
                        event.errors.forEach(addId(0, 'errorCode'))
                    );
                    setEvents(data);
                }
            })
            .catch(e => {
                console.error('Error: ', e)
                setEvents([]);
            })
    }

    const getLatestInstances = (page: number, size: number, sortProperty: string, sortDirection: string) => {
        SourceApplicationRepository.getMetadata("1", true)
            .then((response) => {
                if(response.data) {
                    let metadata: IIntegrationMetadata[] = response.data;
                    EventRepository.getLatestEvents(page, size, sortProperty, sortDirection)
                        .then((response) => {
                            let events: IEvent[] = response.data.content;
                            if (events) {
                                events.forEach(addId(0, 'name'))
                                events.forEach((event: any) =>
                                    event.errors.forEach(addId(0, 'errorCode'))
                                );

                                metadata.forEach((value: IIntegrationMetadata) => {
                                    events.map((event: IEvent) => {
                                        if(event.instanceFlowHeaders.sourceApplicationIntegrationId === value.sourceApplicationIntegrationId) {
                                            event.displayName = value.integrationDisplayName
                                        }
                                    })
                                })
                                setLatestInstances(events);
                            }
                        })
                        .catch(e => {
                            console.error('Error: ', e)
                            setLatestInstances([]);
                        })
                }
            }).catch((e) => {
            console.error('Error: ', e)
        })
    }
    const getSelectedInstances = (page: number, size: number, sortProperty: string, sortDirection: string, sourceApplicationId: string, instanceId: string) => {
        SourceApplicationRepository.getMetadata("1", true)
            .then((response) => {
                if(response.data) {
                    let metadata: IIntegrationMetadata[] = response.data;
                    EventRepository.getEventsByInstanceId(page, size, sortProperty, sortDirection, sourceApplicationId, instanceId)
                        .then((response) => {
                            let events: IEvent[] = response.data.content;
                            if (events) {
                                events.forEach(addId(0, 'name'))
                                events.forEach((event: any) =>
                                    event.errors.forEach(addId(0, 'errorCode'))
                                );

                                metadata.forEach((value: IIntegrationMetadata) => {
                                    events.map((event: IEvent) => {
                                        if(event.instanceFlowHeaders.sourceApplicationIntegrationId === value.sourceApplicationIntegrationId) {
                                            event.displayName = value.integrationDisplayName
                                        }
                                    })
                                })
                                setSelectedInstances(events);
                            }
                        })
                        .catch(e => {
                            console.error('Error: ', e)
                            setSelectedInstances([]);
                        })
                }
            }).catch((e) => {
            console.error('Error: ', e)
        })
    }

    return (
        <HistoryContext.Provider
            value={{
                events,
                getEvents,
                latestInstances,
                getLatestInstances,
                selectedInstances,
                getSelectedInstances
            }}
        >
            {children}
        </HistoryContext.Provider>
    );
};

export default HistoryProvider;
