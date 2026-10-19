import {
    getTagColor,
    getTagStyles,
    isReferenceTag,
    mappingStringToValueArray,
    valueArrayToMappingString,
} from '../../features/configuration/util/valueFieldUtils';

describe('testing value field utils', () => {
    it('should keep plain text as a single text token', () => {
        expect(mappingStringToValueArray('test mappingString')).toEqual(['test mappingString']);
        expect(mappingStringToValueArray('mappingString')).toEqual(['mappingString']);
        expect(mappingStringToValueArray('test mappingString with $if{tag}')).toEqual([
            'test mappingString with ',
            '$if{tag}',
        ]);
    });

    it('should return correct value array from mappingString', () => {
        expect(valueArrayToMappingString(['test mappingString'])).toEqual('test mappingString');
        expect(
            valueArrayToMappingString(['test mappingString with ', '$if{tag}'])
        ).toEqual('test mappingString with $if{tag}');
    });

    it('should handle mappingString with value converting', () => {
        expect(mappingStringToValueArray('$vc{1}$if{test}')).toEqual(['$vc{1}', '$if{test}']);
    });

    it('should keep adjacent reference tags as separate chips', () => {
        expect(mappingStringToValueArray('$if{a}$if{b}')).toEqual(['$if{a}', '$if{b}']);
        expect(mappingStringToValueArray('$icf{0}{navn}$if{bnr}')).toEqual([
            '$icf{0}{navn}',
            '$if{bnr}',
        ]);
        expect(mappingStringToValueArray('$vc{1}$icf{0}{navn}$if{bnr}')).toEqual([
            '$vc{1}',
            '$icf{0}{navn}',
            '$if{bnr}',
        ]);
    });

    it('should identify reference tags', () => {
        expect(isReferenceTag('$if{test}')).toBe(true);
        expect(isReferenceTag('$vc{1}')).toBe(true);
        expect(isReferenceTag('$icf{0}{navn}')).toBe(true);
        expect(isReferenceTag('plain text')).toBe(false);
        expect(isReferenceTag('$if{test}extra')).toBe(false);
    });

    it('should return correct color for tag', () => {
        expect(getTagColor('$if{test}', false)).toEqual('#C8E6C9');
        expect(getTagColor('$vc{1}', false)).toEqual('#E1BEE7');
        expect(getTagColor('$icf{0}{tag}', false)).toEqual('#FFF9C4');
        expect(getTagColor('$if{test}', true)).toEqual('#eeeeee');
        expect(getTagColor('$vc{1}', true)).toEqual('#E0E0E0');
        expect(getTagColor('$icf{0}{tag}', true)).toEqual('#eeeeee');
        expect(getTagColor('tag', false)).toEqual('white');
        expect(getTagColor('tag', true)).toEqual('white');
    });

    it('should get correct tag styles based on tag', () => {
        expect(getTagStyles('$if{test}', false)).toEqual({
            borderRadius: '3px',
            background: '#C8E6C9',
            color: 'black',
        });
        expect(getTagStyles('$vc{1}', false)).toEqual({
            borderRadius: '3px',
            background: '#E1BEE7',
            color: 'black',
        });
        expect(getTagStyles('$icf{0}{tag}', false)).toEqual({
            borderRadius: '3px',
            background: '#FFF9C4',
            color: 'black',
        });
        expect(getTagStyles('$if{test}', true)).toEqual({
            borderRadius: '3px',
            background: '#eeeeee',
            color: 'gray',
        });
        expect(getTagStyles('$vc{1}', true)).toEqual({
            borderRadius: '3px',
            background: '#E0E0E0',
            color: 'gray',
        });
        expect(getTagStyles('$icf{0}{tag}', true)).toEqual({
            borderRadius: '3px',
            background: '#eeeeee',
            color: 'gray',
        });
        expect(getTagStyles('tag', false)).toEqual({
            borderColor: '#eeeeee',
            borderRadius: '1px',
            color: 'black',
            background: 'white',
        });
        expect(getTagStyles('tag', true)).toEqual({
            borderColor: '#eeeeee',
            borderRadius: '1px',
            color: 'gray',
            background: 'white',
        });
    });
});
