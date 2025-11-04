/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUrlBuilder } from '../types/FormTemplate';
import useResourceRepository from '../../../api/useResourceRepository';
import { ISelectable } from '../types/Selectable';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { Control } from 'react-hook-form/dist/types/form';
import { useWatch } from 'react-hook-form';
import { createSource, createValueRefPerAbsoluteKey, Source } from './UrlUtils';
import { AdapterResponse } from '../../../context/ApiAdapterContext';

export const useSelectablesStatefulValue = (
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
    const useWatchValues: any[] = useWatch({ control, name: absoluteKeys });

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

    const getSelectables = useCallback(async (sources: Source[]) => {
        try {
            const selectablesForEachSourceArray = await Promise.all(
                sources.map((source) =>
                    ResourceRepository.getSelectables('/' + source.url, source.config).then<
                        ISelectable[],
                        ISelectable[]
                    >(
                        (response: AdapterResponse<ISelectable[]>): ISelectable[] =>
                            response.data
                                ? response.data
                                      .sort((a: ISelectable, b: ISelectable) =>
                                          a.displayName < b.displayName ? -1 : 1
                                      )
                                      .map((resource: any) => ({
                                          // eslint-disable-line
                                          displayName: resource.displayName,
                                          value: resource.id,
                                      }))
                                : [],
                        () => []
                    )
                )
            );
            return selectablesForEachSourceArray !== undefined
                ? selectablesForEachSourceArray
                      .filter((selectablesArray) => selectablesArray)
                      .flat()
                : [];
        } catch (err) {
            console.error(err);
            return [];
        }
    }, []);

    useEffect(() => {
        const valuePerValueRef: Record<string, any> = {};
        Array.from(Array(absoluteKeys.length).keys()).forEach(
            (i) => (valuePerValueRef[valueRefPerAbsoluteKey[absoluteKeys[i]]] = useWatchValues[i])
        );
        updateSelectables(staticSelectables, sourceUrlBuilders, valuePerValueRef, setSelectables);
    }, [useWatchValues]);
    return selectables;
};

export function sortAndHandleSelectables(selectables: ISelectable[] | undefined): ISelectable[] {
    const sortedSelectable = selectables
        ? selectables
              .sort((a: ISelectable, b: ISelectable) => (a.displayName < b.displayName ? -1 : 1))
              .map((resource: any) => ({
                  displayName: resource.displayName,
                  value: resource.id,
              }))
        : [];

    return sortedSelectable !== undefined
        ? sortedSelectable.filter((selectablesArray) => selectablesArray).flat()
        : [];
}
