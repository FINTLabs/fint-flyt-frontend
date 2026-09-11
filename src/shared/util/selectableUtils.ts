import { ApiSelectableResource, ISelectable } from '../../features/configuration/types/Selectable';

function nameFieldExists(resource: ApiSelectableResource): boolean {
    return resource.name !== undefined;
}

function hasNonEmptyName(resource: ApiSelectableResource): boolean {
    return !!resource.name;
}

function toDisplayName(resource: ApiSelectableResource): string {
    if (!hasNonEmptyName(resource)) {
        return resource.displayName;
    }

    const functionalIdPart = resource.functionalId ? ` [${resource.functionalId}]` : '';
    const technicalIdPart = resource.technicalId ? ` #${resource.technicalId}` : '';
    return `${resource.name}${functionalIdPart}${technicalIdPart}`;
}

function compareByLabel(a: ApiSelectableResource, b: ApiSelectableResource): number {
    const aLabel = toDisplayName(a);
    const bLabel = toDisplayName(b);
    return aLabel < bLabel ? -1 : aLabel > bLabel ? 1 : 0;
}

export function sortSelectables(resources: ApiSelectableResource[] | undefined): ISelectable[] {
    if (!resources) return [];

    const sortByUserNameFirst = resources.some(nameFieldExists);

    return [...resources]
        .sort((a, b) => {
            if (sortByUserNameFirst && hasNonEmptyName(a) !== hasNonEmptyName(b)) {
                return hasNonEmptyName(a) ? -1 : 1;
            }
            return compareByLabel(a, b);
        })
        .map((resource) => ({
            displayName: toDisplayName(resource),
            value: resource.id,
        }));
}
