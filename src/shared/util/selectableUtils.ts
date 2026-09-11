import { ApiSelectableResource, ISelectable } from '../../features/configuration/types/Selectable';

export function sortSelectables(resources: ApiSelectableResource[] | undefined): ISelectable[] {
    if (!resources) return [];
    return [...resources]
        .sort((a, b) => (a.displayName < b.displayName ? -1 : 1))
        .map((resource) => {
            if (resource.name) {
                return {
                    displayName: `${resource.name}${resource.functionalId ? ` [${resource.functionalId}]` : ''}${resource.technicalId ? ` #${resource.technicalId}` : ''}`,
                    value: resource.id,
                };
            }
            return {
                displayName: resource.displayName,
                value: resource.id,
            };
        });
}
