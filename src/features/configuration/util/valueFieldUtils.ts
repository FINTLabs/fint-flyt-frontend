const REFERENCE_TAG_REGEX = /\$vc\{\d+\}|\$icf\{\d+\}\{[^}]*\}|\$if\{[^}]*\}/g;

export function isReferenceTag(token: string): boolean {
    return (
        /^\$vc\{\d+\}$/.test(token) ||
        /^\$if\{[^}]*\}$/.test(token) ||
        /^\$icf\{\d+\}\{[^}]*\}$/.test(token)
    );
}

/**
 * Splits a mapping string into tokens.
 * Reference tags ($if, $vc, $icf) are always separate tokens.
 * Plain text (including spaces) stays as continuous text runs — not split into chips.
 */
export function mappingStringToValueArray(input: string): string[] {
    if (!input) {
        return [];
    }

    const result: string[] = [];
    let lastIndex = 0;

    for (const match of input.matchAll(REFERENCE_TAG_REGEX)) {
        const index = match.index ?? 0;
        if (index > lastIndex) {
            result.push(input.slice(lastIndex, index));
        }
        result.push(match[0]);
        lastIndex = index + match[0].length;
    }

    if (lastIndex < input.length) {
        result.push(input.slice(lastIndex));
    }

    return result;
}

export function valueArrayToMappingString(input: string[]): string {
    return input.join('');
}

export function getTagColor(tag: string, disabled?: boolean): string {
    if (tag.includes('$vc')) {
        return disabled ? '#E0E0E0' : '#E1BEE7';
    } else if (tag.includes('$if')) {
        return disabled ? '#eeeeee' : '#C8E6C9';
    } else if (tag.includes('$icf')) {
        return disabled ? '#eeeeee' : '#FFF9C4';
    } else {
        return 'white';
    }
}

export function getTagStyles(tag: string, disabled?: boolean): Record<string, string> {
    if (tag.includes('$vc')) {
        return {
            borderRadius: '3px',
            background: getTagColor(tag, disabled),
            color: disabled ? 'gray' : 'black',
        };
    } else if (tag.includes('$if')) {
        return {
            borderRadius: '3px',
            background: getTagColor(tag, disabled),
            color: disabled ? 'gray' : 'black',
        };
    } else if (tag.includes('$icf')) {
        return {
            borderRadius: '3px',
            background: getTagColor(tag, disabled),
            color: disabled ? 'gray' : 'black',
        };
    } else {
        return {
            borderRadius: '1px',
            borderColor: '#eeeeee',
            color: disabled ? 'gray' : 'black',
            background: getTagColor(tag, disabled),
        };
    }
}
