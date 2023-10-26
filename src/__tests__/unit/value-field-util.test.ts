import {
    getTagColor,
    getTagStyles,
    mappingStringToValueArray,
    valueArrayToMappingString
} from "../../features/configuration/util/ValueFieldUtils";

describe('testing value field utils', () => {
    it('should return correct mappingString from value array', () => {
        expect(mappingStringToValueArray('test mappingString')).toEqual(['test', ' ', 'mappingString']);
        expect(mappingStringToValueArray('test mappingString with $if{tag}')).toEqual(['test', ' ', 'mappingString', ' ', 'with', ' ', '$if{tag}']);
        expect(mappingStringToValueArray('mappingString')).toEqual(['mappingString']);
    });

    it('should return correct value array from mappingString', () => {
        expect(valueArrayToMappingString(['test', ' ', 'mappingString'])).toEqual('test mappingString');
        expect(valueArrayToMappingString(['test', ' ', 'mappingString', ' ', 'with', ' ', '$if{tag}'])).toEqual('test mappingString with $if{tag}');
    });

    it('should handle mappingString with value converting', () => {
        expect(mappingStringToValueArray('$vc{1}$if{test}')).toEqual(['$vc{1}', '$if{test}'])
    });

    it('should return correct color for tag', () => {
        expect(getTagColor('$if{test}', false)).toEqual('#E0F7FA')
        expect(getTagColor('$vc{1}', false)).toEqual('#F3E5F5')
        expect(getTagColor('$icf{0}{tag}', false)).toEqual('#FFFDE7')
        expect(getTagColor('$if{test}', true)).toEqual('#eeeeee')
        expect(getTagColor('$vc{1}', true)).toEqual('#e0e0e0')
        expect(getTagColor('$icf{0}{tag}', true)).toEqual('#eeeeee')
        expect(getTagColor('tag', false)).toEqual('white')
        expect(getTagColor('tag', true)).toEqual('white')
    });

    it('should get correct tag styles based on tag', () => {
        expect(getTagStyles('$if{test}', false))
            .toEqual({borderRadius: '3px', background: '#E0F7FA'})
        expect(getTagStyles('$vc{1}', false))
            .toEqual({borderRadius: '3px', background: '#F3E5F5'})
        expect(getTagStyles('$icf{0}{tag}', false))
            .toEqual({borderRadius: '3px', background: '#FFFDE7'})
        expect(getTagStyles('$if{test}', true))
            .toEqual({borderRadius: '3px', background: '#eeeeee'})
        expect(getTagStyles('$vc{1}', true))
            .toEqual({borderRadius: '3px', background: '#e0e0e0'})
        expect(getTagStyles('$icf{0}{tag}', true))
            .toEqual({borderRadius: '3px', background: '#eeeeee'})
        expect(getTagStyles('tag', false))
            .toEqual({borderRadius: '3px', background: 'white', "& .MuiChip-label": {padding: 0.5}})
        expect(getTagStyles('tag', true))
            .toEqual({borderRadius: '3px', background: 'white', "& .MuiChip-label": {padding: 0.5}})
    })
})
