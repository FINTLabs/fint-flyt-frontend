/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUrlBuilder } from "../types/FormTemplate";
import { AxiosResponse } from "axios";
import ResourceRepository from "../../../api/ResourceRepository";
import { ISelectable } from "../types/Selectable";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Control } from "react-hook-form/dist/types/form";
import { useWatch } from "react-hook-form";
import { createSource, createValueRefPerAbsoluteKey, Source } from "./UrlUtils";

export function SelectablesStatefulValue(
	control: Control,
	staticSelectables: ISelectable[] = [],
	sourceUrlBuilders: IUrlBuilder[] = [],
	absoluteKey: string
): ISelectable[] {
	const [selectables, setSelectables] =
		useState<ISelectable[]>(staticSelectables);
	const valueRefPerAbsoluteKey: Record<string, string> =
		createValueRefPerAbsoluteKey(sourceUrlBuilders, absoluteKey);
	const absoluteKeys: string[] = Object.keys(valueRefPerAbsoluteKey);
	const useWatchValues: any[] = useWatch({ control, name: absoluteKeys }); // eslint-disable-line

	useEffect(() => {
		const valuePerValueRef: Record<string, any> = {}; // eslint-disable-line
		Array.from(Array(absoluteKeys.length).keys()).forEach(
			(i) =>
				(valuePerValueRef[valueRefPerAbsoluteKey[absoluteKeys[i]]] =
					useWatchValues[i])
		);
		updateSelectables(
			staticSelectables,
			sourceUrlBuilders,
			valuePerValueRef,
			setSelectables
		);
	}, [useWatchValues]);
	return selectables;
}

function updateSelectables(
	staticSelectables: ISelectable[],
	sourceUrlBuilders: IUrlBuilder[],
	valuePerValueRef: Record<string, string>,
	setSelectables: Dispatch<SetStateAction<ISelectable[]>>
): void {
	const sources: Source[] = sourceUrlBuilders
		.map((urlBuilder) => createSource(urlBuilder, valuePerValueRef))
		.filter((source): source is Source => !!source);

	getSelectables(sources).then((result: ISelectable[]) => {
		setSelectables([...staticSelectables, ...result]);
	});
}

export default function getSelectables(
	sources: Source[]
): Promise<ISelectable[]> {
	return Promise.all(
		sources.map((source) =>
			ResourceRepository.getSelectables("/" + source.url, source.config).then<
				ISelectable[],
				ISelectable[]
			>(
				(response: AxiosResponse<ISelectable[]>): ISelectable[] =>
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
	)
		.then((selectablesForEachSourceArray: Awaited<ISelectable>[][]) => {
			return selectablesForEachSourceArray !== undefined
				? selectablesForEachSourceArray
						.filter((selectablesArray) => selectablesArray)
						.flat()
				: [];
		})
		.catch((err) => {
			console.error(err);
			return [];
		});
}
