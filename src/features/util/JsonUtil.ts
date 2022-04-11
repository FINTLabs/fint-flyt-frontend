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