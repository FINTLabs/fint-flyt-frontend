import { IEventNew } from '../../features/instances/types/Event';

export const MOCK_EVENT: IEventNew = {
    sourceApplicationId: 2,
    sourceApplicationIntegrationId: 'sak',
    sourceApplicationInstanceId: '0118999881999119725-3',
    integrationId: 2,
    latestUpdate: '2023-09-26T06:57:12.747Z',
    status: 'FAILED',
    intermediateStorageStatus: 'STORED',
    destinationId: '2342',
    displayName: 'test',
    latestDestinationId: '2342',
    latestInstanceId: '2',
};

export const MOCK_EVENT2: IEventNew = {
    sourceApplicationId: 2,
    sourceApplicationIntegrationId: 'sak',
    sourceApplicationInstanceId: '23451',
    integrationId: 2,
    latestUpdate: '2023-10-26T06:57:12.747Z',
    status: 'FAILED',
    intermediateStorageStatus: 'STORED',
    destinationId: '3462',
    latestDestinationId: '3462',
    latestInstanceId: '2',
};

export const MOCK_EVENT3: IEventNew = {
    sourceApplicationId: 2,
    sourceApplicationIntegrationId: 'document',
    sourceApplicationInstanceId: 't342',
    integrationId: 2,
    latestUpdate: '2023-06-26T06:57:12.747Z',
    status: 'FAILED',
    intermediateStorageStatus: 'STORED',
    destinationId: '3567',
    latestDestinationId: '3567',
    latestInstanceId: '2',
};
