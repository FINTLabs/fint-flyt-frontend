import {
    getDestinationDisplayName,
    getSourceApplicationDisplayNameById,
    getStateDisplayName,
    integrationComparator,
    isKeyOfEvent,
    isKeyOfIntegration,
} from '../../util/TableUtil';
import { IIntegration } from '../../features/integration/types/Integration';
import { MOCK_INTEGRATION, MOCK_INTEGRATION2, MOCK_INTEGRATION3 } from '../mock/integration';

describe('Testing table utils', () => {
    test('should return correct source appliction display name by id', () => {
        expect(getSourceApplicationDisplayNameById('3')).toEqual('Digisak');
        expect(getSourceApplicationDisplayNameById('99')).toEqual('ukjent');
    });

    test('Should return correct destination displayname by id', () => {
        expect(getDestinationDisplayName('fylkesrad')).toEqual('Arkivsystem');
        expect(getDestinationDisplayName('test')).toEqual('ukjent');
    });

    test('Should return correct state displayname by state', () => {
        expect(getStateDisplayName('ACTIVE')).toEqual('Aktiv');
        expect(getStateDisplayName('DEACTIVATED')).toEqual('Deaktivert');
        expect(getStateDisplayName('test')).toEqual('ukjent');
    });

    test('Should return true if key is key of integration', () => {
        expect(isKeyOfIntegration('id')).toBe(true);
        expect(isKeyOfIntegration('sourceApplicationId')).toBe(true);
        expect(isKeyOfIntegration('activeConfigurationVersion')).toBe(true);
        expect(isKeyOfIntegration('dispatched')).toBe(true);
        expect(isKeyOfIntegration('notKey')).toBe(false);
    });

    test('Should return true if key is key of event', () => {
        expect(isKeyOfEvent('sourceApplicationId')).toBe(true);
        expect(isKeyOfEvent('sourceApplicationIntegrationId')).toBe(true);
        expect(isKeyOfEvent('sourceApplicationInstanceId')).toBe(true);
        expect(isKeyOfEvent('integrationId')).toBe(true);
        expect(isKeyOfEvent('latestUpdate')).toBe(true);
        expect(isKeyOfEvent('status')).toBe(true);
        expect(isKeyOfEvent('intermediateStorageStatus')).toBe(true);
        expect(isKeyOfEvent('destinationId')).toBe(true);
        expect(isKeyOfEvent('displayName')).toBe(true);
        expect(isKeyOfEvent('latestDestinationId')).toBe(true);
        expect(isKeyOfEvent('latestInstanceId')).toBe(true);
        expect(isKeyOfEvent('notKey')).toBe(false);
    });

    test('Should compare and order integrations correctly', () => {
        const integrations: IIntegration[] = [
            MOCK_INTEGRATION,
            MOCK_INTEGRATION2,
            MOCK_INTEGRATION3,
        ];
        const sortedIntegrations = integrations.sort((a: IIntegration, b: IIntegration) => {
            return integrationComparator(a, b, 'state');
        });
        expect(sortedIntegrations).toStrictEqual([
            MOCK_INTEGRATION2,
            MOCK_INTEGRATION,
            MOCK_INTEGRATION3,
        ]);
    });

    // test('Should compare and order events correctly', () => {
    //     const events: IEventNew[] = [MOCK_EVENT, MOCK_EVENT2, MOCK_EVENT3];
    //     const sortedEvents = events.sort((a: IEvent, b: IEvent) => {
    //         return eventComparator(a, b, 'timestamp');
    //     });
    //     expect(sortedEvents).toStrictEqual([MOCK_EVENT2, MOCK_EVENT, MOCK_EVENT3]);
    // });
});
