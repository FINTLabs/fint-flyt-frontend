import {ClassNameMap} from "@mui/styles";
import * as React from "react";
import {ReactElement, useState} from "react";
import ObjectMappingComponent, {OrderedElement} from "./ObjectMappingComponent";
import {ICollectionTemplate, IElementTemplate, IObjectTemplate} from "../../types/FormTemplate";
import NestedElementMappingComponent from "./NestedObjectMappingComponent";
import CollectionMappingComponent from "./CollectionMappingComponent";
import {range} from "lodash";

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

    function onOpenChild<T>(
        childColumnIndex: number,
        childOrder: string,
        childAbsoluteKey: string,
        childDisplayName: string,
        childElement: ReactElement
    ) {
        const child: OrderedElementWithAbsoluteKey = {
            order: childOrder,
            absoluteKey: childAbsoluteKey,
            element: childElement
        }
        _grid[childColumnIndex] = _grid[childColumnIndex]
            ? [..._grid[childColumnIndex], child]
            : [child];
        setGrid([..._grid.map(column => [...column])]);
    }

    function onChildClose(
        childColumnIndex: number,
        childAbsoluteKey: string
    ) {
        _grid = range(0, _grid.length)
            .map(columnIndex => {
                    if (columnIndex < childColumnIndex) {
                        return grid[columnIndex];
                    } else if (columnIndex === childColumnIndex) {
                        return _grid[columnIndex].filter(orderedElementWithAbsoluteKey =>
                            orderedElementWithAbsoluteKey.absoluteKey !== (childAbsoluteKey)
                        );
                    } else {
                        return _grid[columnIndex].filter(orderedElementWithAbsoluteKey =>
                            !orderedElementWithAbsoluteKey.absoluteKey.startsWith(childAbsoluteKey + ".")
                        );
                    }
                }
            )
            .filter(column => column.length > 0)
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

    function createNestedElementButton<T>(
        columnIndex: number,
        nestedOrder: string,
        absoluteKeyPrefix: string,
        template: IElementTemplate<T>,
        mapToReactElement: (
            columnIndex: number,
            order: string,
            displayName: string,
            absoluteKeyPrefix: string,
            template: T,
        ) => ReactElement
    ): OrderedElement {
        const absoluteKey = absoluteKeyPrefix + template.elementConfig.key
        return {
            order: nestedOrder,
            element: <NestedElementMappingComponent
                classes={props.classes}
                displayName={template.elementConfig.displayName}
                onChildOpen={() => {
                    onOpenChild(
                        columnIndex,
                        nestedOrder,
                        absoluteKey,
                        template.elementConfig.displayName,
                        mapToReactElement(
                            columnIndex,
                            nestedOrder,
                            absoluteKey,
                            template.elementConfig.displayName,
                            template.template
                        )
                    )
                }}
                onChildClose={() => {
                    onChildClose(
                        columnIndex,
                        absoluteKey
                    )
                }}
            />
        }
    }

    function createObjectMappingComponent(
        childColumnIndex: number,
        childOrder: string,
        childAbsoluteKey: string,
        childDisplayName: string,
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
                        .map(template => createNestedElementButton(
                            childColumnIndex + 1,
                            childOrder + template.order,
                            childAbsoluteKey + ".objectMappingPerKey.",
                            template,
                            createObjectMappingComponent
                        ))
                    : [],
                ...childTemplate.objectCollectionTemplates
                    ? childTemplate.objectCollectionTemplates
                        .map(template => createNestedElementButton(
                            childColumnIndex + 1,
                            childOrder + template.order,
                            childAbsoluteKey + ".objectCollectionMappingPerKey.",
                            template,
                            createObjectCollectionMappingComponent
                        ))
                    : []
            ]}
        />
    }

    return (
        <>
            {grid.map((column, index) =>
                <div id={'fieldset-column-' + index} className={props.classes.fieldSetContainer}>
                    {column
                        .sort((a: OrderedElementWithAbsoluteKey, b: OrderedElementWithAbsoluteKey) =>
                            (a.order + a.absoluteKey).localeCompare(b.order + b.absoluteKey)
                        )
                        .map(orderedElementWithAbsoluteKey => orderedElementWithAbsoluteKey.element)
                    }
                </div>
            )}
        </>
    )
}
export default ConfigurationMappingComponent;