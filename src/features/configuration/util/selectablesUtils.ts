import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types/form';

import { AdapterResponse } from '../../../shared/api/ApiAdapterContext';
import useResourceRepository from '../../../shared/api/useResourceRepository';
import { IUrlBuilder } from '../types/FormTemplate';
import { ApiSelectableResource, ISelectable } from '../types/Selectable';
import { createSource, createValueRefPerAbsoluteKey, Source } from './urlUtils';

function toSortedSelectables(resources: ApiSelectableResource[]): ISelectable[] {
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

export const useSelectables = (
    control: Control,
    staticSelectables: ISelectable[] = [],
    sourceUrlBuilders: IUrlBuilder[] = [],
    absoluteKey: string
) => {
    const ResourceRepository = useResourceRepository();

    const [selectables, setSelectables] = useState<ISelectable[]>(staticSelectables);

    const valueRefPerAbsoluteKey: Record<string, string> = createValueRefPerAbsoluteKey(
        sourceUrlBuilders,
        absoluteKey
    );
    const absoluteKeys: string[] = Object.keys(valueRefPerAbsoluteKey);
    const watchedValues: any[] = useWatch({ control, name: absoluteKeys });

    const updateSelectables = useCallback(
        (
            staticSelectables: ISelectable[],
            sourceUrlBuilders: IUrlBuilder[],
            valuePerValueRef: Record<string, string>,
            setSelectables: Dispatch<SetStateAction<ISelectable[]>>
        ) => {
            const sources: Source[] = sourceUrlBuilders
                .map((urlBuilder) => createSource(urlBuilder, valuePerValueRef))
                .filter((source): source is Source => !!source);

            getSelectables(sources).then((result: ISelectable[]) => {
                setSelectables([...staticSelectables, ...result]);
            });
        },
        []
    );

    const getSelectables = useCallback(async (sources: Source[]): Promise<ISelectable[]> => {
        try {
            const selectablesPerSource: ISelectable[][] = await Promise.all(
                sources.map((source) =>
                    ResourceRepository.getSelectables('/' + source.url, source.config)
                        .then((response: AdapterResponse<ApiSelectableResource[]>) =>
                            response.data ? toSortedSelectables(response.data) : []
                        )
                        .catch(() => [])
                )
            );
            return selectablesPerSource
                .filter((selectables) => selectables && selectables.length > 0)
                .flat();
        } catch (err) {
            console.error(err);
            return [];
        }
    }, []);

    useEffect(() => {
        const valuePerValueRef: Record<string, any> = {};
        Array.from(Array(absoluteKeys.length).keys()).forEach(
            (i) => (valuePerValueRef[valueRefPerAbsoluteKey[absoluteKeys[i]]] = watchedValues[i])
        );
        updateSelectables(staticSelectables, sourceUrlBuilders, valuePerValueRef, setSelectables);
    }, [watchedValues]);
    return selectables;
};

export function sortAndHandleSelectables(
    selectables: ApiSelectableResource[] | undefined
): ISelectable[] {
    const sortedSelectable = selectables ? toSortedSelectables(selectables) : [];

    return sortedSelectable !== undefined
        ? sortedSelectable.filter((selectablesArray) => selectablesArray).flat()
        : [];
}
