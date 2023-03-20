import {ClassNameMap} from "@mui/styles";
import * as React from "react";
import {useState} from "react";
import ObjectMappingComponent, {NestedElementTemplate, Props as ObjectMappingProps} from "./ObjectMappingComponent";
import {ICollectionTemplate, IElementTemplate, IObjectTemplate, IValueTemplate} from "../../types/FormTemplate";
import {ElementOrders, ElementTemplates, NestedElementsCallbacks} from "../../types/NestedElementCallbacks";
import ValueCollectionMappingComponent, {Props as ValueCollectionMappingProps} from "./ValueCollectionMappingComponent";
import ObjectCollectionMappingComponent, {
    Props as ObjectCollectionMappingProps
} from "./ObjectCollectionMappingComponent";
import ColumnElementComponent from "./ColumnElementComponent";
import {range} from "lodash";
import {useFormContext} from "react-hook-form";

interface Props {
    classes: ClassNameMap
    rootObjectTemplate: IElementTemplate<IObjectTemplate>
}

const ConfigurationMappingComponent: React.FunctionComponent<Props> = (props: Props) => {

    const {unregister} = useFormContext();

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
            nestedObjectsPerOrder: new Map<string, ColumnElement<Omit<ObjectMappingProps, 'openNestedElementsByOrder'>>>(),
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
            onElementsOpen: (elementTemplates: ElementTemplates) => {
                elementTemplates.objects?.forEach(
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
                    })
                elementTemplates.objectCollections?.forEach(
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
                    })
                elementTemplates.valueCollections?.forEach(
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

                    }
                )
                setDisplayRootElement({...rootElement});
            },

            onElementsClose: (elementOrders: ElementOrders) => {
                const keysToUnregister: string[] = [];
                elementOrders.objects?.forEach((order: string) => {
                    nestedColumnElements.nestedObjectsPerOrder.delete(order)
                })
                elementOrders.objectCollections?.forEach((order: string) => {
                    nestedColumnElements.nestedObjectCollectionsPerOrder.delete(order)
                })
                elementOrders.valueCollections?.forEach((order: string) => {
                    nestedColumnElements.nestedValueCollectionsPerOrder.delete(order)
                })
                setDisplayRootElement({...rootElement});
                if (keysToUnregister.length > 0) {
                    unregister(keysToUnregister);
                }
            },

            onAllNestedElementsClose: (parentOrder: string) => {
                getEntriesWithKeyStartingWith(nestedColumnElements.nestedObjectsPerOrder, parentOrder)
                    .forEach(([order, value]) => {
                            nestedColumnElements.nestedObjectsPerOrder.delete(order)
                        }
                    );
                getEntriesWithKeyStartingWith(nestedColumnElements.nestedObjectCollectionsPerOrder, parentOrder)
                    .forEach(([order, value]) => {
                            nestedColumnElements.nestedObjectCollectionsPerOrder.delete(order)
                        }
                    );
                getEntriesWithKeyStartingWith(nestedColumnElements.nestedValueCollectionsPerOrder, parentOrder)
                    .forEach(([order, value]) => {
                            nestedColumnElements.nestedValueCollectionsPerOrder.delete(order)
                        }
                    );
                setDisplayRootElement({...rootElement});
            }
        }
    }

    function getEntriesWithKeyStartingWith<T>(map: Map<string, T>, startingWith: string): [string, T][] {
        return Array.from(map.entries())
            .filter(([order]: [string, T]) => order.startsWith(startingWith))
    }

    function getElementsByColumn(columnElement: ColumnElement<Omit<ObjectMappingProps, 'openNestedElementsByOrder'>>): ColumnElements[] {
        const firstColumnElements: ColumnElements = createEmptyColumnElements();
        firstColumnElements.nestedObjectsPerOrder.set("0", columnElement)
        return [
            firstColumnElements,
            ...getNestedElementsByColumn(columnElement)
        ]
    }

    function getNestedElementsByColumn<T extends Omit<ObjectMappingProps, 'openNestedElementsByOrder'>
        | Omit<ObjectCollectionMappingProps, 'openNestedElementsByOrder'>
        | ValueCollectionMappingProps>
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
                                    (value, key) =>
                                        combinedChildColumns[columnIndex].nestedObjectsPerOrder.set(order + "." + key, value)
                                )
                                nestedElements[columnIndex].nestedObjectCollectionsPerOrder.forEach(
                                    (value, key) =>
                                        combinedChildColumns[columnIndex].nestedObjectCollectionsPerOrder.set(order + "." + key, value)
                                )
                                nestedElements[columnIndex].nestedValueCollectionsPerOrder.forEach(
                                    (value, key) =>
                                        combinedChildColumns[columnIndex].nestedValueCollectionsPerOrder.set(order + "." + key, value)
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
