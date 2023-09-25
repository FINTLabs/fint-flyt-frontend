import {IEvent} from "../features/instanceOverview/types/Event";
import {IIntegrationMetadata} from "../features/configuration/types/Metadata/IntegrationMetadata";
import {addId} from "./JsonUtil";

export function processEvents (events: IEvent[], metadata: IIntegrationMetadata[]): IEvent[] {
    events.forEach(addId(0, 'name'));
    events.forEach((event: IEvent) => event.errors.forEach(addId(0, 'errorCode')));
    metadata.forEach((value) => {
        events.forEach((event) => {
            console.log(event, value)
            if (event.instanceFlowHeaders.sourceApplicationIntegrationId === value.sourceApplicationIntegrationId) {
                event.displayName = value.integrationDisplayName;
            }
        });
    });
    return events;
}
