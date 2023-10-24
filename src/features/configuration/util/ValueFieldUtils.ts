import {SystemStyleObject} from "@mui/system";

export function mappingStringToValueArray(input: string): string[] {
    const containsValueConverting: boolean = input.includes('$vc')

    if (input.includes(" ") && !containsValueConverting) {
        return input.split(/\s+/).filter((str) => str.length > 0);
    }
    if (containsValueConverting && !input.includes(" ")) {
        const stringWithSpace = input.replace(/(\$\w+\{\w+\})(\$\w+\{\w+\})/g, '$1 $2');
        return stringWithSpace.split(/\s+/).filter((str) => str.length > 0);
    } else {
        return input.split(',')
    }

}

export function valueArrayToMappingString(input: string[]): string {
    return input.join('');
}

export function getTagColor(tag: string): string {
    if (tag.includes('$vc')) {
        return '#F3E5F5'
    } else if (tag.includes('$if')) {
        return '#E0F7FA'
    } else if (tag.includes('$icf')) {
        return '#FFFDE7'
    } else {
        return 'white'
    }
}

export function getTagStyles(tag: string): SystemStyleObject {
    if (tag.includes('$vc')) {
        return {borderRadius: '3px', background: '#F3E5F5'}
    } else if (tag.includes('$if')) {
        return {borderRadius: '3px', background: '#E0F7FA'}
    } else if (tag.includes('$icf')) {
        return {borderRadius: '3px', background: '#FFFDE7'}
    } else {
        return {borderRadius: '3px', background: 'white', "& .MuiChip-label": {padding: 0.5}}
    }
}