import { useCallback, useEffect, useMemo, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types/form';

import { AdapterResponse } from '../../../shared/api/ApiAdapterContext';
import useResourceRepository from '../../../shared/api/useResourceRepository';
import { sortSelectables } from '../../../shared/util/selectableUtils';
import { ISelectablesSources } from '../types/FormTemplate';
import { ApiSelectableResource, ISelectable } from '../types/Selectable';
import { createSource, createValueRefPerAbsoluteKey, Source } from '../util/urlUtils';

const EMPTY_SELECTABLES: ISelectable[] = [];
const EMPTY_SOURCES: ISelectablesSources[] = [];

export const useSelectables = (
    control: Control,
    staticSelectables: ISelectable[] = EMPTY_SELECTABLES,
    selectablesSources: ISelectablesSources[] = EMPTY_SOURCES,
    absoluteKey: string
) => {
    const ResourceRepository = useResourceRepository();

    const [selectables, setSelectables] = useState<ISelectable[]>(staticSelectables);

    const valueRefPerAbsoluteKey = useMemo(
        () => createValueRefPerAbsoluteKey(selectablesSources, absoluteKey),
        [selectablesSources, absoluteKey]
    );
    const absoluteKeys = useMemo(
        () => Object.keys(valueRefPerAbsoluteKey),
        [valueRefPerAbsoluteKey]
    );
    const watchedValues = useWatch({
        control,
        name: absoluteKeys,
        disabled: absoluteKeys.length === 0,
    });
    const watchedValuesKey = JSON.stringify(watchedValues ?? null);

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
                return selectablesPerSource.filter((items) => items && items.length > 0).flat();
            } catch (err) {
                console.error(err);
                return [];
            }
        },
        [ResourceRepository]
    );

    useEffect(() => {
        const parsedWatchedValues: unknown[] = watchedValuesKey
            ? (JSON.parse(watchedValuesKey) as unknown[])
            : [];
        const valuePerValueRef: Record<string, unknown> = {};
        absoluteKeys.forEach((key, i) => {
            valuePerValueRef[valueRefPerAbsoluteKey[key]] = parsedWatchedValues?.[i];
        });

        const sources: Source[] = selectablesSources
            .map((selectableSource) =>
                createSource(selectableSource, valuePerValueRef as Record<string, string>)
            )
            .filter((source): source is Source => !!source);

        let cancelled = false;
        fetchSelectablesFromSources(sources).then((result: ISelectable[]) => {
            if (cancelled) {
                return;
            }
            const next = [...staticSelectables, ...result];
            setSelectables((current) =>
                current.length === next.length &&
                current.every((item, index) => item.value === next[index]?.value)
                    ? current
                    : next
            );
        });

        return () => {
            cancelled = true;
        };
    }, [
        watchedValuesKey,
        absoluteKeys,
        valueRefPerAbsoluteKey,
        selectablesSources,
        staticSelectables,
        fetchSelectablesFromSources,
    ]);

    return selectables;
};
