import {ClassNameMap} from "@mui/styles";
import * as React from "react";
import {ReactElement, useState} from "react";
import ObjectMappingComponent, {ascendingCompare, OrderedElement} from "./ObjectMappingComponent";
import {ICollectionTemplate, IElementTemplate, IObjectTemplate} from "../../types/FormTemplate";
import NestedElementMappingComponent from "./NestedObjectMappingComponent";
import CollectionMappingComponent from "./CollectionMappingComponent";

interface Props {
    classes: ClassNameMap
    rootObjectTemplate: IElementTemplate<IObjectTemplate>
}

const ConfigurationMappingComponent: React.FunctionComponent<Props> = (props: Props) => {

    type OrderedElementWithAbsoluteKey = OrderedElement & {
        absoluteKey: string
    }

    let _grid = [[{
        order: '0',
        absoluteKey: props.rootObjectTemplate.elementConfig.key,
        element: createObjectMappingComponent(
            0,
            '0',
            props.rootObjectTemplate.elementConfig.key,
            props.rootObjectTemplate.elementConfig.displayName,
            props.rootObjectTemplate.template
        )
    }]]

    const [grid, setGrid] = useState<OrderedElementWithAbsoluteKey[][]>([..._grid.map(column => [...column])]);

    function onOpenObjectCollectionMappingChild(
        childColumnIndex: number,
        childOrder: string,
        childAbsoluteKey: string,
        childDisplayName: string,
        childTemplate: ICollectionTemplate<IObjectTemplate>) {
        const child: OrderedElementWithAbsoluteKey = {
            order: childOrder,
            absoluteKey: childAbsoluteKey,
            element: createObjectCollectionMappingComponent(
                childColumnIndex,
                childOrder,
                childAbsoluteKey,
                childDisplayName,
                childTemplate
            )
        }
        addChild(childColumnIndex, child);
    }

    function onOpenObjectMappingChild(
        childColumnIndex: number,
        childOrder: string,
        childAbsoluteKey: string,
        childDisplayName: string,
        childTemplate: IObjectTemplate) {
        const child: OrderedElementWithAbsoluteKey = {
            order: childOrder,
            absoluteKey: childAbsoluteKey,
            element: createObjectMappingComponent(
                childColumnIndex,
                childOrder,
                childAbsoluteKey,
                childDisplayName,
                childTemplate
            )
        }
        addChild(childColumnIndex, child);
    }

    function addChild(childColumnIndex: number, child: OrderedElementWithAbsoluteKey) {
        console.log("add child:", childColumnIndex, child)
        console.log("old grid:", _grid)
        const newGrid = _grid.map(column => [...column]);
        const childColumn: OrderedElementWithAbsoluteKey[] = newGrid[childColumnIndex] ? newGrid[childColumnIndex] : []
        newGrid[childColumnIndex] = [...childColumn, child]
        console.log("new grid:", newGrid)
        _grid = [...newGrid.map(column => [...column])];
        setGrid([..._grid.map(column => [...column])]);
    }

    function createObjectCollectionMappingComponent(
        childColumnIndex: number,
        childOrder: string,
        childAbsoluteKey: string,
        childDisplayName: string,
        childTemplate: ICollectionTemplate<IObjectTemplate>
    ) {
        return <CollectionMappingComponent
            classes={props.classes}
            absoluteKey={childAbsoluteKey}
            elementComponentCreator={(absoluteKey, displayName) =>
                createObjectMappingComponent(
                    childColumnIndex,
                    childOrder,
                    absoluteKey,
                    displayName,
                    childTemplate.elementTemplate
                )
            }
        />
    }

    function createObjectMappingComponent(
        childColumnIndex: number,
        childOrder: string,
        childAbsoluteKey: string,
        childDisplayName: string, // TODO eivindmorch 13/03/2023 : Use
        childTemplate: IObjectTemplate
    ): ReactElement {
        return <ObjectMappingComponent
            classes={props.classes}
            absoluteKey={childAbsoluteKey}
            valueTemplates={childTemplate.valueTemplates ? childTemplate.valueTemplates : []}
            selectableValueTemplates={childTemplate.selectableValueTemplates ? childTemplate.selectableValueTemplates : []}
            nestedObjectButtons={[
                ...childTemplate.objectTemplates
                    ? childTemplate.objectTemplates
                        .map((objectTemplate: IElementTemplate<IObjectTemplate>) => {
                                return {
                                    order: childOrder,
                                    element: <NestedElementMappingComponent
                                        classes={props.classes}
                                        displayName={objectTemplate.elementConfig.displayName}
                                        onChildOpen={() => {
                                            onOpenObjectMappingChild(
                                                childColumnIndex + 1,
                                                childOrder + objectTemplate.order,
                                                childAbsoluteKey + ".objectMappingPerKey." + objectTemplate.elementConfig.key,
                                                objectTemplate.elementConfig.displayName,
                                                objectTemplate.template
                                            )
                                        }}
                                        onChildClose={() => {
                                            onChildClose(
                                                childColumnIndex + 1,
                                                childAbsoluteKey + ".objectMappingPerKey." + objectTemplate.elementConfig.key
                                            )
                                        }}
                                    />
                                }
                            }
                        ) : [],
                ...childTemplate.objectCollectionTemplates
                    ? childTemplate.objectCollectionTemplates
                        .map((objectCollectionTemplate: IElementTemplate<ICollectionTemplate<IObjectTemplate>>) => {
                            return {
                                order: childOrder,
                                element: <NestedElementMappingComponent
                                    classes={props.classes}
                                    displayName={objectCollectionTemplate.elementConfig.displayName}
                                    onChildOpen={() => {
                                        onOpenObjectCollectionMappingChild(
                                            childColumnIndex + 1,
                                            childOrder + objectCollectionTemplate.order,
                                            childAbsoluteKey + ".objectCollectionMappingPerKey." + objectCollectionTemplate.elementConfig.key,
                                            objectCollectionTemplate.elementConfig.displayName,
                                            objectCollectionTemplate.template
                                        )
                                    }}
                                    onChildClose={() => {
                                        onChildClose(
                                            childColumnIndex + 1,
                                            childAbsoluteKey + ".objectCollectionMappingPerKey." + objectCollectionTemplate.elementConfig.key
                                        )
                                    }}
                                />
                            }
                        })
                    : []
            ]}
        />
    }

    const range = (start: number, end: number) => Array.from({length: (end - start)}, (v, k) => k + start);


    function onChildClose(
        childColumnIndex: number,
        childAbsoluteKey: string
    ) {
        {
            console.log("close", childColumnIndex, childAbsoluteKey)
        }
        const newGrid: OrderedElementWithAbsoluteKey[][] = range(0, _grid.length)
            .map(index => {
                if (index < childColumnIndex) {
                    return _grid[index]
                } else {
                    return _grid[index]
                        .filter(orderedElementWithAbsoluteKey => orderedElementWithAbsoluteKey.absoluteKey !== childAbsoluteKey)
                }
            })
        _grid = [...newGrid.map(column => [...column])];
        setGrid([..._grid.map(column => [...column])]);
    }

    return (
        <>
            {console.log(_grid)}
            {grid.map(column =>
                <fieldset className={props.classes.fieldSet}>

                    {column
                        .sort(ascendingCompare)
                        .map(orderedElementWithAbsoluteKey => orderedElementWithAbsoluteKey.element)
                    }
                </fieldset>
            )}
        </>
    )
}
export default ConfigurationMappingComponent;