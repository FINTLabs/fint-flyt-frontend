import {ISourceApplication} from "../../features/configuration/types/SourceApplication";
import {
    eventComparator,
    getDestinationDisplayName,
    getSourceApplicationDisplayNameById,
    getStateDisplayName, integrationComparator, isKeyOfEvent, isKeyOfIntegration
} from "../../util/TableUtil";
import {IIntegration} from "../../features/integration/types/Integration";
import {MOCK_INTEGRATION, MOCK_INTEGRATION2, MOCK_INTEGRATION3} from "../mock/integration";
import {IEvent} from "../../features/instances/types/Event";
import {MOCK_EVENTS} from "../mock/events";
import {MOCK_EVENT, MOCK_EVENT2, MOCK_EVENT3} from "../mock/event";
import integrations from "../../components/pages/Integrations";

const sourceApplications: ISourceApplication[] = [
    {displayName: 'Foo', id: 1, available: true},
    {displayName: 'Bar', id: 2, available: true},
    {displayName: 'Bubu', id: 3, available: true}
]

describe('Testing table utils', () => {
    test('should return correct source appliction display name by id', () => {
        expect(getSourceApplicationDisplayNameById(3, sourceApplications)).toEqual('Bubu')
        expect(getSourceApplicationDisplayNameById(4, sourceApplications)).toEqual('ukjent')
    })

    test('Should return correct destination displayname by id', () => {
        expect(getDestinationDisplayName('fylkesrad')).toEqual('Arkivsystem')
        expect(getDestinationDisplayName('test')).toEqual('ukjent')
    })

    test('Should return correct state displayname by state', () => {
        expect(getStateDisplayName('ACTIVE')).toEqual('Aktiv')
        expect(getStateDisplayName('DEACTIVATED')).toEqual('Deaktivert')
        expect(getStateDisplayName('test')).toEqual('ukjent')
    })

    test('Should return true if key is key of integration', () => {
        expect(isKeyOfIntegration('id')).toBe(true)
        expect(isKeyOfIntegration('sourceApplicationId')).toBe(true)
        expect(isKeyOfIntegration('activeConfigurationVersion')).toBe(true)
        expect(isKeyOfIntegration('dispatched')).toBe(true)
        expect(isKeyOfIntegration('notKey')).toBe(false)
    })

    test('Should return true if key is key of event', () => {
        expect(isKeyOfEvent('name')).toBe(true)
        expect(isKeyOfEvent('errors')).toBe(true)
        expect(isKeyOfEvent('displayName')).toBe(true)
        expect(isKeyOfEvent('instanceFlowHeaders')).toBe(true)
        expect(isKeyOfEvent('notKey')).toBe(false)
    })

    test('Should compare and order integrations correctly', () => {
        const integrations: IIntegration[] = [MOCK_INTEGRATION, MOCK_INTEGRATION2, MOCK_INTEGRATION3]
        const sortedIntegrations = integrations.sort((a: IIntegration, b: IIntegration) => {
            return integrationComparator(a, b, "state")
        })
        expect(sortedIntegrations).toStrictEqual([MOCK_INTEGRATION2, MOCK_INTEGRATION, MOCK_INTEGRATION3])
    })

    test('Should compare and order events correctly', () => {
        const events: IEvent[] = [MOCK_EVENT, MOCK_EVENT2, MOCK_EVENT3]
        const sortedEvents = events.sort((a: IEvent, b: IEvent) => {
            return eventComparator(a, b, "timestamp")
        })
        expect(sortedEvents).toStrictEqual([MOCK_EVENT2, MOCK_EVENT, MOCK_EVENT3])
    })
})

