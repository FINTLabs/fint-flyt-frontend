import {processEvents} from "../../util/EventUtil";
import {MOCK_EVENTS} from "../mock/events";
import {MOCK_INTEGRATION_METADATA} from "../mock/metadata";

const processedEvents = processEvents(MOCK_EVENTS, MOCK_INTEGRATION_METADATA);

describe('processEvents', () => {
    it('should add IDs to all events and set displayName when metadata matches', () => {
        expect(processedEvents.content[0].id).toEqual(0);
        expect(processedEvents.content[1].id).toEqual(1);

        expect(processedEvents.content[0].displayName).toEqual('Display Name 1');
        expect(processedEvents.content[1].displayName).toBeUndefined();
    });

    it('should add id to errors when present in event', () => {
        expect(processedEvents.content[0].errors).toHaveLength(0)
        expect(processedEvents.content[1].errors[0].id).toEqual(0)
        expect(processedEvents.content[1].errors[0].errorCode).toEqual("FINT_FLYT_INSTANCE_GATEWAY_INSTANCE_REJECTED_ERROR")
    })
});