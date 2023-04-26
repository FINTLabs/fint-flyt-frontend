export function toRecord(data: any): Record<string, string> {
    let record: Record<string, string> = {};
    data.map((convert: any) => {
        record[convert.from] = convert.to;
    })
    return record;
}