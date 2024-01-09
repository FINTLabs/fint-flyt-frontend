import {IIntegration} from "../features/integration/types/Integration";
import {MOCK_INTEGRATION} from "../__tests__/mock/integration";

export const isKeyOfIntegration = (key: string): key is keyof IIntegration => {
    return Object.keys(MOCK_INTEGRATION).includes(key);
};

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
    }
    else {
        return -1;
    }

};