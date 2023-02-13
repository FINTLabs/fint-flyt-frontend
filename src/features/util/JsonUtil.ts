export function addId(id: number, field: string) {
    return function iter(obj: any) {
        if (field in obj) {
            obj.id = id++;
        }
        Object.keys(obj).forEach(function (k) {
            Array.isArray(obj[k]) && obj[k].forEach(iter);
        });
    };
}

export function toTagValue(input: string): string {
    return '$if{' + input + '}';
}

export function flatten(data: any): any {
    // @ts-ignore
    const clone = ({ children, ...obj }) => obj;
    const flattenJson = (obj: any) =>
        obj.flatMap((el: any) =>
            el.children ? [clone(el), ...flattenJson(el.children)] : [el]
        )
    const parsedData = JSON.parse(JSON.stringify(data));

    return flattenJson(parsedData);
}
