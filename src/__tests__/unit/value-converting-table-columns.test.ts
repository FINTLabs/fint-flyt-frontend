import { ValueConvertingFilters } from '../../features/valueConverting/tableToolbar/types';
import { getVisibleOptionalColumns } from '../../features/valueConverting/util/valueConvertingTableColumns';

const emptyFilters: ValueConvertingFilters = {
    displayName: null,
    sourceApplicationIds: [],
    toApplicationId: null,
    toTypeId: null,
    fromTypeId: null,
    createdFrom: null,
    createdTo: null,
    modifiedFrom: null,
    modifiedTo: null,
    sort: {
        orderBy: undefined,
        direction: undefined,
    },
};

describe('getVisibleOptionalColumns', () => {
    test('hides optional columns by default', () => {
        expect(getVisibleOptionalColumns(emptyFilters)).toEqual({
            createdAt: false,
            modifiedAt: false,
            toApplication: false,
        });
    });

    test('shows columns when sorted or filtered by related fields', () => {
        expect(
            getVisibleOptionalColumns({
                ...emptyFilters,
                sort: { orderBy: 'createdAt', direction: 'DESC' },
                modifiedFrom: new Date('2024-02-01'),
                toApplicationId: 'fylkesrad',
            })
        ).toEqual({
            createdAt: true,
            modifiedAt: true,
            toApplication: true,
        });
    });
});
