export function isEditable(type: string): boolean {
    switch (type) {
        case 'STRING':
        case 'INTEGER':
        case 'DOUBLE':
            return true
        default:
            return false
    }
}

export function getBackgroundColorByType(type: string): string {
    switch (type) {
        case 'METADATA' :
            return 'skyblue'
        case 'STRING':
        case 'INTEGER':
        case 'DOUBLE':
            return 'lightgray'
        case 'VALUE_CONVERTING':
            return 'lightgoldenrodyellow'
        default:
            return 'white'
    }
}
