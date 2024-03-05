import {IEvent} from "../../features/instances/types/Event";

export const MOCK_EVENT: IEvent = {
    name: 'mockevent1',
    timestamp: new Date("2023-09-26T06:57:12.747Z"),
    type: 'Type 1',
    displayName: 'test',
    errors: [
        {
            errorCode: "FINT_FLYT_INSTANCE_GATEWAY_INSTANCE_REJECTED_ERROR",
            args: {
                message: "error message'"
            }
        }
    ],
    instanceFlowHeaders: {
        orgId: '1',
        service: 'flyt-dispatch-service',
        archiveInstanceId: '2020/23',
        sourceApplicationId: '2',
        sourceApplicationIntegrationId: 'sak',
        sourceApplicationInstanceId: '0118999881999119725-3',
        correlationId: '423',
        instanceId: '2',
        configurationId: '6',
        caseId: 'null',
        dispatchId: '2342',
    },
};
export const MOCK_EVENT2: IEvent = {
    name: 'mockevent2',
    timestamp: new Date("2023-10-26T06:57:12.747Z"),
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
        orgId: '52342',
        service: 'flyt-dispatch-service',
        archiveInstanceId: '2345',
        sourceApplicationId: '2',
        sourceApplicationIntegrationId: 'sak',
        sourceApplicationInstanceId: '23451',
        correlationId: '7564',
        instanceId: '2',
        configurationId: '3456',
        caseId: '562',
        dispatchId: '3462',
    },
}

export const MOCK_EVENT3: IEvent = {
    name: 'mockevent3',
    timestamp: new Date("2023-06-26T06:57:12.747Z"),
    type: 'Type 3',
    errors: [],
    instanceFlowHeaders: {
        orgId: '4252',
        service: 'flyt-mapping-service',
        archiveInstanceId: '34',
        sourceApplicationId: '2',
        sourceApplicationIntegrationId: 'document',
        sourceApplicationInstanceId: 't342',
        correlationId: '4324',
        instanceId: '2',
        configurationId: '673',
        caseId: '342',
        dispatchId: '3567',
    },
}

