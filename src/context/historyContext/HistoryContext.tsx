import {IEvent} from "../../features/instanceOverview/types/Event";
import {contextDefaultValues, HistoryContextState} from "./types";
import {createContext, FC, useState} from "react";
import SourceApplicationRepository from "../../shared/repositories/SourceApplicationRepository";
import {IIntegrationMetadata} from "../../features/configuration/types/Metadata/IntegrationMetadata";
import {addId} from "../../util/JsonUtil";
import EventRepository from "../../shared/repositories/EventRepository";
import {processEvents} from "../../util/ContextUtil";

export const HistoryContext = createContext<HistoryContextState>(
    contextDefaultValues
);

const HistoryProvider: FC = ({children}) => {
    const [events, setEvents] = useState<IEvent[] | undefined>(contextDefaultValues.events);
    const [latestInstances, setLatestInstances] = useState<IEvent[] | undefined>(contextDefaultValues.latestInstances);
    const [selectedInstances, setSelectedInstances] = useState<IEvent[] | undefined>(contextDefaultValues.selectedInstances)

    const getEvents = (page: number, size: number, sortProperty: string, sortDirection: string) => {
        setEvents([]);
        EventRepository.getEvents(page, size, sortProperty, sortDirection)
            .then((response) => {
                const data = response.data.content;
                if (data) {
                    data.forEach(addId(0, 'name'))
                    data.forEach((event: IEvent) =>
                        event.errors.forEach(addId(0, 'errorCode'))
                    );
                    setEvents(data);
                }
            })
            .catch(e => {
                console.error('Error: ', e)
            })
    }

    const getLatestInstances = async (page: number, size: number, sortProperty: string, sortDirection: string, sourceApplicationId: string) => {
        try {
            const metadataResponse = await SourceApplicationRepository.getMetadata(sourceApplicationId, true)
            const metadata: IIntegrationMetadata[] = metadataResponse.data;
            const eventResponse = await EventRepository.getLatestEvents(page, size, sortProperty, sortDirection)
            const events: IEvent[] = eventResponse.data.content;
            if (metadata && events) {
                const processedEvents = processEvents(events, metadata)
                setLatestInstances(processedEvents);
            }
        }
        catch (e) {
            setLatestInstances([]);
            console.error('Error: ', e);
        }
    }
    const getSelectedInstances = async (page: number, size: number, sortProperty: string, sortDirection: string, sourceApplicationId: string, instanceId: string) => {
        try {
            const metadataResponse = await SourceApplicationRepository.getMetadata(sourceApplicationId, true)
            const metadata: IIntegrationMetadata[] = metadataResponse.data;
            const eventResponse = await EventRepository.getEventsByInstanceId(page, size, sortProperty, sortDirection, sourceApplicationId, instanceId)
            const events: IEvent[] = eventResponse.data.content;
            if (events && metadata) {
                const processedEvents = processEvents(events, metadata)
                setSelectedInstances(processedEvents);
            }
        }
        catch (e) {
            setSelectedInstances([]);
            console.error('Error: ', e);
        }
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
