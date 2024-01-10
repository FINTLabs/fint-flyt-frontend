import {Tooltip} from "@mui/material";
import {IIntegration} from "../features/integration/types/Integration";
import {MOCK_INTEGRATION} from "../__tests__/mock/integration";

export const renderCellWithTooltip = (content: string) => (
    <Tooltip title={content}>
        <span>{content}</span>
    </Tooltip>
);

export function getSourceApplicationDisplayName(id: number): string {
    if (id === 1) return 'ACOS';
    if (id === 2) return 'eGrunnerverv';
    if (id === 3) return 'Regionalforvaltning'
    else return "ukjent";
}

export function getDestinationDisplayName(id: string): string {
    if (id === 'fylkesrad') return 'Fylkesråd';
    else return "ukjent";
}

export function getStateDisplayName(id: string): string {
    if (id === 'ACTIVE') return 'Aktiv';
    if (id === 'DEACTIVATED') return 'Deaktivert';
    else return "ukjent";
}

export const isKeyOfIntegration = (key: string): key is keyof IIntegration => {
    return Object.keys(MOCK_INTEGRATION).includes(key);
};

export const comparator = (a: IIntegration, b: IIntegration, orderBy: string) => {
    if (isKeyOfIntegration(orderBy)) {
        const aValue = a[orderBy];
        const bValue = b[orderBy];

        if (bValue === undefined || aValue === undefined) {
            return -1;
        }

        if (bValue < aValue) {
            return -1;
        }
        if (bValue > aValue) {
            return 1;
        }
        return 0;
    } else {
        return -1;
    }

};

export interface Page<T> {
    content: T[]
    empty?: boolean
    first?: boolean
    last?: boolean
    number?: number
    numberOfElements?: number
    pageable?: { offset: number, pageNumber: number, pageSize: number, paged: boolean, sort: { empty: boolean, sorted: boolean, unsorted: boolean }, empty: boolean, sorted: boolean, unsorted: boolean, unpaged: boolean }
    size?: number
    sort?: { empty: boolean, sorted: boolean, unsorted: boolean }
    totalElements?: number
    totalPages?: number
}