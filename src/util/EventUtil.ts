import {IEvent} from "../features/instances/types/Event";
import {IIntegrationMetadata} from "../features/configuration/types/Metadata/IntegrationMetadata";
import {addId} from "./JsonUtil";
import {Page} from "../features/instances/components/InstanceTable";

export function processEvents (events: Page<IEvent>, metadata: IIntegrationMetadata[]): Page<IEvent> {
    events.content.forEach(addId(0, 'name'));
    events.content.forEach((event: IEvent) => event.errors.forEach(addId(0, 'errorCode')));
    metadata.forEach((value) => {
        events.content.forEach((event) => {
            if (event.instanceFlowHeaders.sourceApplicationIntegrationId === value.sourceApplicationIntegrationId) {
                event.displayName = value.integrationDisplayName;
            }
        });
    });
    return events;
}
