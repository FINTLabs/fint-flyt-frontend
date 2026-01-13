import { MOCK_EVENTS } from '../__tests__/mock/events';
import { IEventNew } from '../features/instances/types/Event';
import { IIntegration } from '../features/integration/types/Integration';
import { MOCK_INTEGRATION } from '../__tests__/mock/integration';
import { sourceApplications } from '../api/useSourceApplicationRepository';

export function getSourceApplicationDisplayNameById(id: string): string {
    const application = sourceApplications.find((application) => application.id.toString() === id);
    if (application) {
        return application.displayName;
    } else {
        return 'ukjent'
    }
}

export function getDestinationDisplayName(id: string): string {
    if (id === 'fylkesrad') return 'Arkivsystem';
    else return 'ukjent';
}

export function getStateDisplayName(id: string): string {
    if (id === 'ACTIVE') return 'Aktiv';
    if (id === 'DEACTIVATED') return 'Deaktivert';
    else return 'ukjent';
}

export const isKeyOfIntegration = (key: string): key is keyof IIntegration => {
    return Object.keys(MOCK_INTEGRATION).includes(key);
};

export const integrationComparator = (a: IIntegration, b: IIntegration, orderBy: string) => {
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

export const isKeyOfEvent = (key: string): key is keyof IEventNew => {
    return Object.keys(MOCK_EVENTS.content[0]).includes(key);
};

export const eventComparator = (a: IEventNew, b: IEventNew, orderBy: string) => {
    if (isKeyOfEvent(orderBy)) {
        const aValue = a[orderBy];
        const bValue = b[orderBy];

        if (!bValue || !aValue) {
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
