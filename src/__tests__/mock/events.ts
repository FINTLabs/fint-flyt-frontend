import { IEventNew } from '../../features/instances/types/Event';
import { Page } from '../../components/types/TableTypes';

export const MOCK_EVENTS: Page<IEventNew> = {
    content: [
        {
            sourceApplicationId: 2,
            sourceApplicationIntegrationId: 'integrationId1',
            sourceApplicationInstanceId: '6564',
            integrationId: 2,
            latestUpdate: '2023-09-26T06:57:12.747Z',
            status: 'ERROR',
            intermediateStorageStatus: 'REJECTED',
            destinationId: '213',
            displayName: 'test',
            destinationInstanceIds: '213',
            latestInstanceId: '2',
        },
        {
            sourceApplicationId: 2,
            sourceApplicationIntegrationId: 'sak',
            sourceApplicationInstanceId: '123',
            integrationId: 2,
            latestUpdate: '2023-09-26T06:57:12.747Z',
            status: 'ERROR',
            intermediateStorageStatus: 'REJECTED',
            destinationId: '213',
            destinationInstanceIds: '213',
            latestInstanceId: '2',
        },
    ],
};
