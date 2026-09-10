import { ReactElement } from 'react';

import { ICollectionTemplate, IObjectTemplate, IValueTemplate } from '../types/FormTemplate';
import {
    ColumnElement,
    NestedElementTemplate,
    SimplifiedColumnElement,
} from '../types/NestedElement';

export function openNestedColumnElement(
    displayPath: string[],
    nestedColumnElements: Record<string, ColumnElement>,
    template:
        | NestedElementTemplate<IObjectTemplate>
        | NestedElementTemplate<ICollectionTemplate<IObjectTemplate>>
        | NestedElementTemplate<ICollectionTemplate<IValueTemplate>>,
    createReactElement: (
        childDisplayPath: string[],
        newNestedColumnElements: Record<string, ColumnElement>
    ) => ReactElement<{ absoluteKey: string }>
): void {
    const newNestedColumnElements: Record<string, ColumnElement> = {};
    nestedColumnElements[template.order.toString()] = {
        path: [...displayPath, ...template.displayPath],
        title: template.displayName,
        reactElement: createReactElement(
            [...displayPath, ...template.displayPath, template.displayName],
            newNestedColumnElements
        ),
        nestedColumnElementPerOrder: newNestedColumnElements,
    };
}

export function findDeepestColumnIndex(columnElement: ColumnElement, depth = 0): number {
    if (!Object.keys(columnElement.nestedColumnElementPerOrder).length) {
        return depth;
    }

    return Math.max(
        ...Object.values(columnElement.nestedColumnElementPerOrder).map((nested) =>
            findDeepestColumnIndex(nested, depth + 1)
        )
    );
}

export function getEntriesWithKeyStartingWith<T>(
    record: Record<string, T>,
    startingWith: string
): [string, T][] {
    return Object.entries(record).filter(([order]: [string, T]) => order.startsWith(startingWith));
}

export function getElementsByColumn(columnElement: ColumnElement): SimplifiedColumnElement[][] {
    return [
        [columnElement],
        ...Object.entries(columnElement.nestedColumnElementPerOrder)
            .sort(([key1], [key2]) => key1.localeCompare(key2, undefined, { numeric: true }))
            .map(([, nestedColumnElement]) => getElementsByColumn(nestedColumnElement))
            .reduce(
                (
                    combinedChildColumns: SimplifiedColumnElement[][],
                    childColumns: SimplifiedColumnElement[][]
                ) => {
                    for (const [columnIndex, column] of childColumns.entries()) {
                        combinedChildColumns[columnIndex] ??= [];
                        combinedChildColumns[columnIndex].push(...column);
                    }
                    return combinedChildColumns;
                },
                []
            ),
    ];
}
