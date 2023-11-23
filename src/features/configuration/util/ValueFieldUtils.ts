import {SystemStyleObject} from "@mui/system";

export function mappingStringToValueArray(input: string): string[] {
    const containsValueConverting: boolean = input.includes('$vc')
    if (containsValueConverting) {
        const stringWithSpace = input.replace(/(?<=\})(?=\$)/g, ' ');
        const stringArray = stringWithSpace.split(/(\s+)/).filter(Boolean);
        return stringArray.filter(str => !(str === ' '))
    } else {
        return input.split(/(\s+)/).filter(Boolean);
    }

}

export function valueArrayToMappingString(input: string[]): string {
    return input.join('');
}

export function getTagColor(tag: string, disabled?: boolean): string {
    if (tag.includes('$vc')) {
        return disabled ? '#e0e0e0' : '#e1bee7'
    } else if (tag.includes('$if')) {
        return disabled ? '#eeeeee' :  '#C8E6C9'
    } else if (tag.includes('$icf')) {
        return disabled ? '#eeeeee' : '#fff9c4'
    } else {
        return 'white'
    }
}

export function getTagStyles(tag: string, disabled?: boolean): SystemStyleObject {
    if (tag.includes('$vc')) {
        return {borderRadius: '3px', background: getTagColor(tag, disabled), color: disabled ? 'gray' : 'black'}
    } else if (tag.includes('$if')) {
        return {borderRadius: '3px', background: getTagColor(tag, disabled), color: disabled ? 'gray' : 'black'}
    } else if (tag.includes('$icf')) {
        return {borderRadius: '3px', background: getTagColor(tag, disabled), color: disabled ? 'gray' : 'black'}
    } else {
        return {borderRadius: '1px', borderColor: '#eeeeee', background: getTagColor(tag, disabled), "& .MuiChip-label": {padding: 0.5}, color: disabled ? 'gray' : 'black'}
       // return {borderRadius: '3px', background: getTagColor(tag, disabled), "& .MuiChip-label": {padding: 0.5}}
    }
}