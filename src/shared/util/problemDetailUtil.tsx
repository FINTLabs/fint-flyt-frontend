export function transformPath(path: string): string {
    return path
        .replace(/^mapping\./, '')
        .replace(/objectMappingPerKey\[(.*?)\]/g, '$1')
        .replace(/objectCollectionMappingPerKey\[(.*?)\]/g, '$1')
        .replace(/valueMappingPerKey\[(.*?)\]/g, '$1')
        .replace(/elementMappings\[(\d+)\]/g, '$1')
        .replace(/\.$/, '');
}

