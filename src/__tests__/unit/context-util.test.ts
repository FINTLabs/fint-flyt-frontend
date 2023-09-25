import {processEvents} from "../../util/ContextUtil";
import {MOCK_EVENTS} from "../mock/events";
import {MOCK_INTEGRATION_METADATA} from "../mock/metadata";

const processedEvents = processEvents(MOCK_EVENTS, MOCK_INTEGRATION_METADATA);

describe('processEvents', () => {
    it('should add IDs to all events and set displayName when metadata matches', () => {
        expect(processedEvents[0].id).toEqual(0);
        expect(processedEvents[1].id).toEqual(1);

        expect(processedEvents[0].displayName).toEqual('Display Name 1');
        expect(processedEvents[1].displayName).toBeUndefined();
    });

    it('should add id to errors when present in event', () => {
        expect(processedEvents[0].errors).toBe(undefined)
        expect(processedEvents[1].errors[0].id).toEqual(0)
        expect(processedEvents[1].errors[0].errorCode).toEqual("FINT_FLYT_INSTANCE_GATEWAY_INSTANCE_REJECTED_ERROR")
    })
});