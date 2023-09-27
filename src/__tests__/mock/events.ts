import {IEvent} from "../../features/instanceOverview/types/Event";

export const MOCK_EVENTS: IEvent[] = [
    {
        name: 'Event 1',
        timeStamp: "2023-09-26T06:57:12.747Z",
        type: 'Type 1',
        errors: [],
        instanceFlowHeaders: {
            orgId: '52314',
            service: 'flyt-dispatch-service',
            archiveInstanceId: '5435',
            sourceApplicationId: '2',
            sourceApplicationIntegrationId: 'integrationId1',
            sourceApplicationInstanceId: '6564',
            correlationId: '54',
            instanceId: '2',
            configurationId: '3',
            caseId: '33',
            dispatchId: '213',
        },
    },
    {
        name: 'Event 2',
        timeStamp: "2023-09-26T06:57:12.747Z",
        type: 'Type 2',
        errors: [
            {
                errorCode: "FINT_FLYT_INSTANCE_GATEWAY_INSTANCE_REJECTED_ERROR",
                args: {
                    message: "error message'"
                }
            }
        ],
        instanceFlowHeaders: {
            orgId: '12345',
            service: 'flyt-dispatch-service',
            archiveInstanceId: '2345',
            sourceApplicationId: '2',
            sourceApplicationIntegrationId: 'sak',
            sourceApplicationInstanceId: '123',
            correlationId: '55',
            instanceId: '2',
            configurationId: '3',
            caseId: '33',
            dispatchId: '213',
        },
    },
];