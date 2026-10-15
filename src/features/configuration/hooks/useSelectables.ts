import { useCallback, useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types/form';

import { AdapterResponse } from '../../../shared/api/ApiAdapterContext';
import useResourceRepository from '../../../shared/api/useResourceRepository';
import { sortSelectables } from '../../../shared/util/selectableUtils';
import { ISelectablesSources } from '../types/FormTemplate';
import { ApiSelectableResource, ISelectable } from '../types/Selectable';
import { createSource, createValueRefPerAbsoluteKey, Source } from '../util/urlUtils';

export const useSelectables = (
    control: Control,
    staticSelectables: ISelectable[] = [],
    selectablesSources: ISelectablesSources[] = [],
    absoluteKey: string
) => {
    const ResourceRepository = useResourceRepository();

    const [selectables, setSelectables] = useState<ISelectable[]>(staticSelectables);

    const valueRefPerAbsoluteKey: Record<string, string> = createValueRefPerAbsoluteKey(
        selectablesSources,
        absoluteKey
    );
    const absoluteKeys: string[] = Object.keys(valueRefPerAbsoluteKey);
    const watchedValues: any[] = useWatch({ control, name: absoluteKeys });

    const fetchSelectablesFromSources = useCallback(
        async (sources: Source[]): Promise<ISelectable[]> => {
            try {
                const selectablesPerSource: ISelectable[][] = await Promise.all(
                    sources.map((source) =>
                        ResourceRepository.getSelectables('/' + source.url, source.config)
                            .then((response: AdapterResponse<ApiSelectableResource[]>) =>
                                sortSelectables(response.data)
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
        },
        []
    );

    useEffect(() => {
        const valuePerValueRef: Record<string, any> = {};
        absoluteKeys.forEach((key, i) => {
            valuePerValueRef[valueRefPerAbsoluteKey[key]] = watchedValues[i];
        });

        const sources: Source[] = selectablesSources
            .map((selectableSource) => createSource(selectableSource, valuePerValueRef))
            .filter((source): source is Source => !!source);

        fetchSelectablesFromSources(sources).then((result: ISelectable[]) => {
            setSelectables([...staticSelectables, ...result]);
        });
    }, [watchedValues]);

    return selectables;
};
