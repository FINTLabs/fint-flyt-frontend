import { recordOrEmpty } from '../../features/configuration/util/ObjectUtils';

const record: Record<string, string> = {
    link: 'system',
};

const recordWithNumber: Record<string, number> = {
    number1: 124,
};

const recordWithBoolean: Record<string, boolean> = {
    active: false,
};
const recordWithObject: Record<string, { prop: string }> = {
    anakin: { prop: 'lightsaber' },
};

const empty = undefined;
describe('It should return empty or record correctly', () => {
    test('It should return record on record', () => {
        const expectedRecord: Record<string, string> = { link: 'system' };
        expect(recordOrEmpty(record)).toEqual(expectedRecord);
    });

    test('It should return empty on no record', () => {
        const expectedRecord: Record<string, string> = {};
        expect(recordOrEmpty(empty)).toEqual(expectedRecord);
    });

    test('It should handle different types of record', () => {
        const expectedNumberRecord: Record<string, number> = { number1: 124 };
        const expectedBooleanRecord: Record<string, boolean> = { active: false };
        const expectedObjectRecord: Record<string, { prop: string }> = {
            anakin: { prop: 'lightsaber' },
        };
        expect(recordOrEmpty(recordWithNumber)).toEqual(expectedNumberRecord);
        expect(recordOrEmpty(recordWithBoolean)).toEqual(expectedBooleanRecord);
        expect(recordOrEmpty(recordWithObject)).toEqual(expectedObjectRecord);
    });
});
