export interface Property {
    order: number;
    key: string;
    source: string;
}

export interface PropertyString {
    value?: string;
    properties?: Property[]
}