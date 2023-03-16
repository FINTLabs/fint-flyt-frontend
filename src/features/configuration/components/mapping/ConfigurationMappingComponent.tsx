import {ClassNameMap} from "@mui/styles";
import * as React from "react";
import {ReactElement, useState} from "react";
import ObjectMappingComponent, {OrderedObjectElement} from "./ObjectMappingComponent";
import {ICollectionTemplate, IElementTemplate, IObjectTemplate, IValueTemplate} from "../../types/FormTemplate";
import NestedElementMappingComponent from "./NestedObjectMappingComponent";
import CollectionMappingComponent from "./CollectionMappingComponent";
import {range} from "lodash";
import ValueMappingComponent from "./ValueMappingComponent";
import LifeCycleComponent from "./LifeCycleComponent";

interface Props {
    classes: ClassNameMap
    rootObjectTemplate: IElementTemplate<IObjectTemplate>
}

const ConfigurationMappingComponent: React.FunctionComponent<Props> = (props: Props) => {

    type ColumnElement = {
        columnIndex: number,
        columnOrder: number[],
        element: ReactElement;
    }

    type ColumnElementTemplate<T> = {
        columnIndex: number,
        columnOrder: number[],
        absoluteKey: string,
        displayName: string,
        template: T
    }

    let grid: ColumnElement[][] = [[{
        columnIndex: 0,
        columnOrder: [0],
        element: createObjectMappingComponent(
            {
                columnIndex: 0,
                columnOrder: [0],
                absoluteKey: props.rootObjectTemplate.elementConfig.key,
                displayName: props.rootObjectTemplate.elementConfig.displayName,
                template: props.rootObjectTemplate.template
            }
        ).element
    }]]

    const [displayGrid, setDisplayGrid] = useState<ColumnElement[][]>([...grid.map(column => [...column])]);

    function addElement<T>(element: ColumnElement) {
        console.log("Adding element: ", element)
        console.log("Grid before: ", grid)
        grid[element.columnIndex] = grid[element.columnIndex]
            ? [...grid[element.columnIndex], element]
            : [element];
        setDisplayGrid([...grid.map(column => [...column])]);
        console.log("Grid after: ", grid)
    }

    function removeElement(columnIndex: number, columnOrder: number[]) {
        console.log("Removing element with columnIndex=" + columnIndex + " and columnOrder=" + columnOrder)
        console.log("Grid before: ", grid)
        grid = range(0, grid.length)
            .map((i: number) => {
                    if (i < columnIndex) {
                        return grid[i];
                    } else if (i === columnIndex) {
                        return grid[i].filter((columnElement: ColumnElement) =>
                            !orderEquals(columnElement.columnOrder, columnOrder)
                        );
                    } else {
                        return grid[i].filter((columnElement: ColumnElement) =>
                            !orderStartsWith(columnElement.columnOrder, columnOrder)
                        );
                    }
                }
            )
            .filter(column => column && column.length > 0)
        setDisplayGrid([...grid.map(column => [...column])]);
        console.log("Grid after: ", grid)
    }

    function removeNestedElements(columnIndex: number, columnOrder: number[]) {
        console.log("Removing nested elements of element with columnIndex=" + columnIndex + " and columnOrder=" + columnOrder)
        console.log("Grid before: ", grid)
        grid = range(0, grid.length)
            .map((i: number) => {
                    if (i <= columnIndex) {
                        return grid[i];
                    } else {
                        return grid[i].filter((columnElement: ColumnElement) =>
                            !orderStartsWith(columnElement.columnOrder, columnOrder)
                        );
                    }
                }
            )
            .filter(column => column && column.length > 0)
        setDisplayGrid([...grid.map(column => [...column])]);
        console.log("Grid after: ", grid)
    }

    function createNestedElementButton<T>(
        buttonOrder: number,
        buttonDisplayName: string,
        nestedElementColumnIndex: number,
        nestedElementColumnOrder: number[],
        elementProvider: () => ColumnElement
    ): OrderedObjectElement {
        return {
            order: buttonOrder,
            element: <NestedElementMappingComponent
                key={buttonOrder}
                classes={props.classes}
                displayName={buttonDisplayName}
                onChildOpen={() => {
                    addElement(elementProvider())
                }}
                onChildClose={() => {
                    removeElement(nestedElementColumnIndex, nestedElementColumnOrder)
                }}
            />
        }
    }

    function createValueCollectionMappingComponent(
        columnElementTemplate: ColumnElementTemplate<ICollectionTemplate<IValueTemplate>>
    ): ColumnElement {
        return {
            columnIndex: columnElementTemplate.columnIndex,
            columnOrder: columnElementTemplate.columnOrder,
            element: <CollectionMappingComponent
                classes={props.classes}
                absoluteKey={columnElementTemplate.absoluteKey}
                elementComponentCreator={(collectionElementOrder: number[], absoluteKey: string) =>
                    <LifeCycleComponent
                        onDestroy={() => removeNestedElements(columnElementTemplate.columnIndex, columnElementTemplate.columnOrder)}
                        content={
                            <ValueMappingComponent
                                classes={props.classes}
                                absoluteKey={absoluteKey}
                                displayName={"" + collectionElementOrder}
                                template={columnElementTemplate.template.elementTemplate}
                            />
                        }/>
                }
            />
        }
    }

    function createObjectCollectionMappingComponent(
        columnElementTemplate: ColumnElementTemplate<ICollectionTemplate<IObjectTemplate>>
    ): ColumnElement {
        return {
            columnIndex: columnElementTemplate.columnIndex,
            columnOrder: columnElementTemplate.columnOrder,
            element: <CollectionMappingComponent
                classes={props.classes}
                absoluteKey={columnElementTemplate.absoluteKey}
                elementComponentCreator={(collectionElementOrder: number[], absoluteKey: string) =>
                    <LifeCycleComponent
                        onDestroy={() => removeNestedElements(columnElementTemplate.columnIndex, [...columnElementTemplate.columnOrder, ...collectionElementOrder])}
                        content={
                            createObjectMappingComponent(
                                {
                                    columnIndex: columnElementTemplate.columnIndex,
                                    columnOrder: [...columnElementTemplate.columnOrder, ...collectionElementOrder],
                                    absoluteKey: absoluteKey,
                                    displayName: "" + collectionElementOrder,
                                    template: columnElementTemplate.template.elementTemplate
                                }
                            ).element
                        }
                    />
                }
            />
        }
    }

    function createObjectMappingComponent(
        columnElementTemplate: ColumnElementTemplate<IObjectTemplate>
    ): ColumnElement {
        const absoluteKey: string = columnElementTemplate.absoluteKey;
        const template: IObjectTemplate = columnElementTemplate.template;
        const columnOrder: number[] = columnElementTemplate.columnOrder
        return {
            columnIndex: columnElementTemplate.columnIndex,
            columnOrder: columnElementTemplate.columnOrder,
            element: <ObjectMappingComponent
                classes={props.classes}
                absoluteKey={absoluteKey}
                valueTemplates={template.valueTemplates ? template.valueTemplates : []}
                selectableValueTemplates={template.selectableValueTemplates ? template.selectableValueTemplates : []}
                nestedObjectButtons={[
                    ...template.valueCollectionTemplates
                        ? template.valueCollectionTemplates
                            .map(template => createNestedElementButton(
                                template.order,
                                template.elementConfig.displayName,
                                columnElementTemplate.columnIndex + 1,
                                [...columnOrder, template.order],
                                () => createValueCollectionMappingComponent(
                                    {
                                        columnIndex: columnElementTemplate.columnIndex + 1,
                                        columnOrder: [...columnOrder, template.order],
                                        absoluteKey: absoluteKey + ".valueCollectionPerKey." + template.elementConfig.key,
                                        displayName: template.elementConfig.displayName,
                                        template: template.template
                                    }
                                )
                            ))
                        : [],
                    ...template.objectTemplates
                        ? template.objectTemplates
                            .map(template => createNestedElementButton(
                                template.order,
                                template.elementConfig.displayName,
                                columnElementTemplate.columnIndex + 1,
                                [...columnOrder, template.order],
                                () => createObjectMappingComponent(
                                    {
                                        columnIndex: columnElementTemplate.columnIndex + 1,
                                        columnOrder: [...columnOrder, template.order],
                                        absoluteKey: absoluteKey + ".objectMappingPerKey." + template.elementConfig.key,
                                        displayName: template.elementConfig.displayName,
                                        template: template.template
                                    }
                                )
                            ))
                        : [],
                    ...template.objectCollectionTemplates
                        ? template.objectCollectionTemplates
                            .map(template => createNestedElementButton(
                                template.order,
                                template.elementConfig.displayName,
                                columnElementTemplate.columnIndex + 1,
                                [...columnOrder, template.order],
                                () => createObjectCollectionMappingComponent(
                                    {
                                        columnIndex: columnElementTemplate.columnIndex + 1,
                                        columnOrder: [...columnOrder, template.order],
                                        absoluteKey: absoluteKey + ".objectCollectionMappingPerKey." + template.elementConfig.key,
                                        displayName: template.elementConfig.displayName,
                                        template: template.template
                                    }
                                )
                            ))
                        : []
                ]}
            />
        }
    }

    function compareColumnElements(columnElement1: ColumnElement, columnElement2: ColumnElement): number {
        return compareOrder(columnElement1.columnOrder, columnElement2.columnOrder);
    }

    function compareOrder(columnOrder1: number[], columnOrder2: number[]): number {
        for (let columnIndex = 0; columnIndex < Math.min(columnOrder1.length, columnOrder2.length); columnIndex++) {
            const compare = columnOrder1[columnIndex] - columnOrder2[columnIndex];
            if (compare !== 0) {
                return compare;
            }
        }
        return columnOrder1.length - columnOrder2.length
    }

    function orderEquals(columnOrder1: number[], columnOrder2: number[]) {
        return compareOrder(columnOrder1, columnOrder2) === 0;
    }

    function orderStartsWith(columnOrder: number[], columnOrderStart: number[]): boolean {
        return orderEquals(columnOrder.slice(0, columnOrderStart.length), columnOrderStart);
    }

    return (
        <>
            {displayGrid.map((column: ColumnElement[], index) =>
                <>
                    <div id={'column-' + index} key={'column-' + index}
                         className={props.classes.column}>
                        {
                            column
                                .sort(compareColumnElements)
                                .map((columnElement, columIndex) =>
                                    <div id={'column-item-' + columIndex} className={props.classes.columnItem}>
                                        {columnElement.columnOrder}
                                        {columnElement.element}
                                    </div>
                                )
                        }
                    </div>
                </>
            )}
        </>
    )
}
export default ConfigurationMappingComponent;

