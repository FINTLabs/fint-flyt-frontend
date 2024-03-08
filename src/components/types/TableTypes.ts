import {ISelect} from "../../features/configuration/types/Select";

export interface Page<T> {
    content: T[];
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number;
    numberOfElements?: number;
    pageable?: {
        offset: number;
        pageNumber: number;
        pageSize: number;
        paged: boolean;
        sort: { empty: boolean; sorted: boolean; unsorted: boolean };
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
        unpaged: boolean;
    };
    size?: number;
    sort?: { empty: boolean; sorted: boolean; unsorted: boolean };
    totalElements?: number;
    totalPages?: number;
}

export interface IAlertMessage {
    message: string
}

export interface ITableSelect extends ISelect {
    disabled?: boolean
}