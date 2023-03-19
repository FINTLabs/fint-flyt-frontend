import {ClassNameMap} from "@mui/styles";
import * as React from "react";
import {useState} from "react";
import ObjectMappingComponent, {NestedElementTemplate, Props as ObjectMappingProps} from "./ObjectMappingComponent";
import {ICollectionTemplate, IElementTemplate, IObjectTemplate, IValueTemplate} from "../../types/FormTemplate";
import {NestedElementsCallbacks} from "../../types/NestedElementCallbacks";
import ValueCollectionMappingComponent, {Props as ValueCollectionMappingProps} from "./ValueCollectionMappingComponent";
import ObjectCollectionMappingComponent, {
    Props as ObjectCollectionMappingProps
} from "./ObjectCollectionMappingComponent";
import ColumnElementComponent from "./ColumnElementComponent";
import {range} from "lodash";

interface Props {
    classes: ClassNameMap
    rootObjectTemplate: IElementTemplate<IObjectTemplate>
}

const ConfigurationMappingComponent: React.FunctionComponent<Props> = (props: Props) => {

    type ColumnElement<T extends Omit<ObjectMappingProps, 'openNestedElementsByOrder'>
        | Omit<ObjectCollectionMappingProps, 'openNestedElementsByOrder'>
        | ValueCollectionMappingProps> = {
        path: string[],
        title: string,
        props: T,
        nestedColumnElements: ColumnElements
    }

    type ColumnElements = {
        nestedObjectsPerOrder: Map<string, ColumnElement<Omit<ObjectMappingProps, 'openNestedElementsByOrder'>>>
        nestedObjectCollectionsPerOrder: Map<string, ColumnElement<Omit<ObjectCollectionMappingProps, 'openNestedElementsByOrder'>>>
        nestedValueCollectionsPerOrder: Map<string, ColumnElement<ValueCollectionMappingProps>>
    }

    function createEmptyColumnElements(): ColumnElements {
        return {
            nestedObjectsPerOrder: new Map<string, ColumnElement<ObjectMappingProps>>(),
            nestedObjectCollectionsPerOrder: new Map<string, ColumnElement<Omit<ObjectCollectionMappingProps, 'openNestedElementsByOrder'>>>(),
            nestedValueCollectionsPerOrder: new Map<string, ColumnElement<ValueCollectionMappingProps>>()
        }
    }

    function createRootElement(): ColumnElement<Omit<ObjectMappingProps, 'openNestedElementsByOrder'>> {
        const nestedColumnElements = createEmptyColumnElements();
        return {
            path: [],
            title: props.rootObjectTemplate.elementConfig.displayName,
            props: {
                classes: props.classes,
                absoluteKey: props.rootObjectTemplate.elementConfig.key,
                template: props.rootObjectTemplate.template,
                nestedElementCallbacks: createNestedElementsCallbacks(
                    [props.rootObjectTemplate.elementConfig.displayName],
                    nestedColumnElements
                ),
            },
            nestedColumnElements: nestedColumnElements
        }
    }

    const rootElement = createRootElement();
    const [displayRootElement, setDisplayRootElement] = useState<ColumnElement<Omit<ObjectMappingProps, 'openNestedElementsByOrder'>>>(rootElement);

    function createNestedElementsCallbacks(displayPath: string[], nestedColumnElements: ColumnElements): NestedElementsCallbacks {
        return {
            onNestedObjectOpen:
                (template: NestedElementTemplate<IObjectTemplate>) => {
                    const newNestedColumnElements: ColumnElements = createEmptyColumnElements();
                    nestedColumnElements.nestedObjectsPerOrder.set(
                        template.order.toString(),
                        {
                            path: [...displayPath, ...template.displayPath],
                            title: template.displayName,
                            props: {
                                classes: props.classes,
                                absoluteKey: template.absoluteKey,
                                template: template.template,
                                nestedElementCallbacks: createNestedElementsCallbacks(
                                    [...displayPath, ...template.displayPath, template.displayName],
                                    newNestedColumnElements
                                )
                            },
                            nestedColumnElements: newNestedColumnElements
                        }
                    )
                    setDisplayRootElement({...rootElement});
                },
            onNestedObjectClose: (order: string) => {
                nestedColumnElements.nestedObjectsPerOrder.delete(order)
                setDisplayRootElement({...rootElement});
            },
            onNestedObjectCollectionOpen:
                (template: NestedElementTemplate<ICollectionTemplate<IObjectTemplate>>) => {
                    const newNestedColumnElements: ColumnElements = createEmptyColumnElements();

                    nestedColumnElements.nestedObjectCollectionsPerOrder.set(
                        template.order,
                        {
                            path: [...displayPath, ...template.displayPath],
                            title: template.displayName,
                            props: {
                                classes: props.classes,
                                absoluteKey: template.absoluteKey,
                                elementTemplate: template.template.elementTemplate,
                                nestedElementCallbacks: createNestedElementsCallbacks(
                                    [...displayPath, ...template.displayPath, template.displayName],
                                    newNestedColumnElements
                                )
                            },
                            nestedColumnElements: newNestedColumnElements
                        }
                    )
                    setDisplayRootElement({...rootElement});
                },
            onNestedObjectCollectionClose: (order: string) => {
                nestedColumnElements.nestedObjectCollectionsPerOrder.delete(order)
                setDisplayRootElement({...rootElement});
            },
            onNestedValueCollectionOpen:
                (template: NestedElementTemplate<ICollectionTemplate<IValueTemplate>>) => {
                    const newNestedColumnElements: ColumnElements = createEmptyColumnElements();
                    nestedColumnElements.nestedValueCollectionsPerOrder.set(
                        template.order,
                        {
                            path: [...displayPath, ...template.displayPath],
                            title: template.displayName,
                            props: {
                                classes: props.classes,
                                absoluteKey: template.absoluteKey,
                                elementTemplate: template.template.elementTemplate
                            },
                            nestedColumnElements: newNestedColumnElements
                        }
                    )
                    setDisplayRootElement({...rootElement});
                },
            onNestedValueCollectionClose: (order: string) => {
                nestedColumnElements.nestedValueCollectionsPerOrder.delete(order)
                setDisplayRootElement({...rootElement});
            },
            onAllNestedElementsClose: (parentOrder: string) => {
                getKeysStartingWith(nestedColumnElements.nestedObjectsPerOrder, parentOrder).forEach((key) => {
                        nestedColumnElements.nestedObjectsPerOrder.delete(key)
                    }
                );
                getKeysStartingWith(nestedColumnElements.nestedObjectCollectionsPerOrder, parentOrder).forEach((key) => {
                        nestedColumnElements.nestedObjectCollectionsPerOrder.delete(key)
                    }
                );
                getKeysStartingWith(nestedColumnElements.nestedValueCollectionsPerOrder, parentOrder).forEach((key) => {
                        nestedColumnElements.nestedValueCollectionsPerOrder.delete(key)
                    }
                );
                setDisplayRootElement({...rootElement});
            }
        }
    }

    function getKeysStartingWith(map: Map<string, any>, startingWith: string): string[] {
        return Array.from(map.keys())
            .filter((order: string) => order.startsWith(startingWith))
    }

    function getElementsByColumn(columnElement: ColumnElement<Omit<ObjectMappingProps, 'openNestedElementsByOrder'>>): ColumnElements[] {
        const firstColumnElements: ColumnElements = createEmptyColumnElements();
        firstColumnElements.nestedObjectsPerOrder.set("0", columnElement)
        return [
            firstColumnElements,
            ...getNestedElementsByColumn(columnElement)
        ]
    }

    function getNestedElementsByColumn<T extends Omit<ObjectMappingProps, 'openNestedElementsByOrder'> | Omit<ObjectCollectionMappingProps, 'openNestedElementsByOrder'> | ValueCollectionMappingProps>
    (columnElement: ColumnElement<T>): ColumnElements[] {
        return (columnElement.nestedColumnElements.nestedObjectsPerOrder.size === 0
            && columnElement.nestedColumnElements.nestedObjectCollectionsPerOrder.size === 0
            && columnElement.nestedColumnElements.nestedValueCollectionsPerOrder.size === 0)
            ? []
            : [
                columnElement.nestedColumnElements,
                ...[
                    ...Array.from(columnElement.nestedColumnElements.nestedObjectsPerOrder.entries()),
                    ...Array.from(columnElement.nestedColumnElements.nestedObjectCollectionsPerOrder.entries()),
                    ...Array.from(columnElement.nestedColumnElements.nestedValueCollectionsPerOrder.entries())
                ]
                    .reduce((combinedChildColumns: ColumnElements[], [order, columnElement]: [string, ColumnElement<any>]) => {
                        const nestedElements: ColumnElements[] = getNestedElementsByColumn(columnElement)
                        range(0, nestedElements.length)
                            .forEach((columnIndex: number) => {
                                if (!combinedChildColumns[columnIndex]) {
                                    combinedChildColumns[columnIndex] = createEmptyColumnElements()
                                }
                                nestedElements[columnIndex].nestedObjectsPerOrder.forEach(
                                    (value, key) => combinedChildColumns[columnIndex].nestedObjectsPerOrder.set(order + "." + key, value)
                                )
                                nestedElements[columnIndex].nestedObjectCollectionsPerOrder.forEach(
                                    (value, key) => combinedChildColumns[columnIndex].nestedObjectCollectionsPerOrder.set(order + "." + key, value)
                                )
                                nestedElements[columnIndex].nestedValueCollectionsPerOrder.forEach(
                                    (value, key) => combinedChildColumns[columnIndex].nestedValueCollectionsPerOrder.set(order + "." + key, value)
                                )
                            })
                        return combinedChildColumns;
                    }, [])
            ]
    }

    function getAllNestedElementsOrders(nestedElements: ColumnElements): Set<string> {
        return new Set([
            ...Array.from(nestedElements.nestedObjectsPerOrder.entries()),
            ...Array.from(nestedElements.nestedObjectCollectionsPerOrder.entries()),
            ...Array.from(nestedElements.nestedValueCollectionsPerOrder.entries())
        ].map(([order]) => {
            const orderSplit: string[] = order.split(".");
            return orderSplit[orderSplit.length - 1];
        }))
    }

    return (
        <>
            {getElementsByColumn(displayRootElement).map((column: ColumnElements, index) =>
                <>
                    <div id={'column-' + index} key={'column-' + index}
                         className={props.classes.column}>
                        {
                            [
                                ...Array.from(column.nestedObjectsPerOrder.entries())
                                    .map(([order, columnElement]) => {
                                            return <ColumnElementComponent
                                                classes={props.classes}
                                                index={index}
                                                order={order}
                                                path={columnElement.path}
                                                title={columnElement.title}
                                                content={<ObjectMappingComponent
                                                    {...columnElement.props}
                                                    openNestedElementsByOrder={getAllNestedElementsOrders(columnElement.nestedColumnElements)}
                                                />}
                                            />

                                        }
                                    ),
                                ...Array.from(column.nestedObjectCollectionsPerOrder.entries())
                                    .map(([order, columnElement]) => {
                                            return <ColumnElementComponent
                                                classes={props.classes}
                                                index={index}
                                                order={order}
                                                path={columnElement.path}
                                                title={columnElement.title}
                                                content={<ObjectCollectionMappingComponent
                                                    {...columnElement.props}
                                                    openNestedElementsByOrder={getAllNestedElementsOrders(columnElement.nestedColumnElements)}
                                                />}
                                            />
                                        }
                                    ),
                                ...Array.from(column.nestedValueCollectionsPerOrder.entries())
                                    .map(([order, columnElement]) => {
                                            return <ColumnElementComponent
                                                classes={props.classes}
                                                index={index}
                                                order={order}
                                                path={columnElement.path}
                                                title={columnElement.title}
                                                content={<ValueCollectionMappingComponent{...columnElement.props}/>}
                                            />
                                        }
                                    )
                            ].sort((a, b) =>
                                a.props.order.localeCompare(b.props.order, undefined, {numeric: true}))
                        }
                    </div>
                </>
            )}
        </>
    )
}

export default ConfigurationMappingComponent;
