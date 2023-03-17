import {ClassNameMap} from "@mui/styles";
import * as React from "react";
import {ReactElement, useState} from "react";
import ObjectMappingComponent, {NestedElementTemplate} from "./ObjectMappingComponent";
import {ICollectionTemplate, IElementTemplate, IObjectTemplate, IValueTemplate} from "../../types/FormTemplate";
import {range} from "lodash";
import {NestedElementsCallbacks} from "../../types/NestedElementCallbacks";
import ValueCollectionMappingComponent from "./ValueCollectionMappingComponent";
import ObjectCollectionMappingComponent from "./ObjectCollectionMappingComponent";
import ColumnElementComponent from "./ColumnElementComponent";

interface Props {
    classes: ClassNameMap
    rootObjectTemplate: IElementTemplate<IObjectTemplate>
}

const ConfigurationMappingComponent: React.FunctionComponent<Props> = (props: Props) => {

    type ColumnElement = {
        reactElement: ReactElement,
        path: string[],
        title: string,
        nestedColumnElementsPerOrder: Map<string, ColumnElement>
    }

    function createRootElement(): ColumnElement {
        const newColumnElementNestedColumnElementsPerOrder: Map<string, ColumnElement> = new Map<string, ColumnElement>();
        return {
            path: [],
            title: props.rootObjectTemplate.elementConfig.displayName,
            reactElement:
                <ObjectMappingComponent
                    classes={props.classes}
                    absoluteKey={props.rootObjectTemplate.elementConfig.key}
                    template={props.rootObjectTemplate.template}
                    nestedElementCallbacks={
                        createNestedElementsCallbacks(
                            [props.rootObjectTemplate.elementConfig.displayName],
                            newColumnElementNestedColumnElementsPerOrder
                        )
                    }
                />,
            nestedColumnElementsPerOrder: newColumnElementNestedColumnElementsPerOrder
        }
    }

    const rootElement = createRootElement();
    const [displayRootElement, setDisplayRootElement] = useState<ColumnElement>(rootElement);

    function createNewColumnElement(
        path: string[],
        displayName: string,
        reactElementCreator: (newColumnElementNestedColumnElementsPerOrder: Map<string, ColumnElement>) => ReactElement
    ): ColumnElement {
        const newColumnElementNestedColumnElementsPerOrder: Map<string, ColumnElement> = new Map<string, ColumnElement>();
        return {
            path: path,
            title: displayName,
            reactElement: reactElementCreator(newColumnElementNestedColumnElementsPerOrder),
            nestedColumnElementsPerOrder: newColumnElementNestedColumnElementsPerOrder
        }
    }

    function orderToString(order: number[]): string {
        return order.join(".")
    }

    function createNestedElementsCallbacks(displayPath: string[], nestedColumnElementsPerOrder: Map<string, ColumnElement>): NestedElementsCallbacks {
        return {
            onNestedObjectOpen:
                (template: NestedElementTemplate<IObjectTemplate>) => {
                    nestedColumnElementsPerOrder.set(
                        orderToString(template.order),
                        createNewColumnElement(
                            [...displayPath, ...template.displayPath],
                            template.displayName,
                            (newColumnElementNestedColumnElementsPerOrder: Map<string, ColumnElement>) =>
                                <ObjectMappingComponent
                                    classes={props.classes}
                                    absoluteKey={template.absoluteKey}
                                    template={template.template}
                                    nestedElementCallbacks={
                                        createNestedElementsCallbacks([...displayPath, ...template.displayPath, template.displayName], newColumnElementNestedColumnElementsPerOrder)
                                    }
                                />
                        )
                    )
                    setDisplayRootElement({...rootElement});
                },
            onNestedObjectCollectionOpen:
                (template: NestedElementTemplate<ICollectionTemplate<IObjectTemplate>>) => {
                    nestedColumnElementsPerOrder.set(
                        orderToString(template.order),
                        createNewColumnElement(
                            [...displayPath, ...template.displayPath],
                            template.displayName,
                            (newColumnElementNestedColumnElementsPerOrder: Map<string, ColumnElement>) =>
                                <ObjectCollectionMappingComponent
                                    classes={props.classes}
                                    absoluteKey={template.absoluteKey}
                                    nestedElementCallbacks={
                                        createNestedElementsCallbacks([...displayPath, ...template.displayPath, template.displayName], newColumnElementNestedColumnElementsPerOrder)
                                    }
                                    elementTemplate={template.template.elementTemplate}
                                />
                        )
                    )
                    setDisplayRootElement({...rootElement});
                },
            onNestedValueCollectionOpen:
                (template: NestedElementTemplate<ICollectionTemplate<IValueTemplate>>) => {
                    nestedColumnElementsPerOrder.set(
                        orderToString(template.order),
                        createNewColumnElement(
                            [...displayPath, ...template.displayPath],
                            template.displayName,
                            () =>
                                <ValueCollectionMappingComponent
                                    classes={props.classes}
                                    absoluteKey={template.absoluteKey}
                                    elementTemplate={template.template.elementTemplate}
                                />
                        )
                    )
                    setDisplayRootElement({...rootElement});
                },
            onNestedElementClose: (order: number[]) => {
                nestedColumnElementsPerOrder.delete(orderToString(order))
                setDisplayRootElement({...rootElement});
            },
            onAllNestedElementsClose: (parentOrder: number[]) => {
                const parentOrderString = orderToString(parentOrder);
                const nestedElementsToCloseKeys: string[] = Array.from(nestedColumnElementsPerOrder.keys())
                    .filter(key => key.startsWith(parentOrderString))
                nestedElementsToCloseKeys.forEach(key => {
                    nestedColumnElementsPerOrder.delete(key)
                })
                setDisplayRootElement({...rootElement});
            }
        }
    }

    function getElementsByColumn(columnElement: ColumnElement): Omit<ColumnElement, 'nestedColumnElementsPerOrder'>[][] {
        return [
            [columnElement],
            ...Array.from(columnElement.nestedColumnElementsPerOrder.entries())
                .sort(([key1], [key2]) => key1.localeCompare(key2, undefined, {numeric: true}))
                .map(([order, nestedColumnElement]) => getElementsByColumn(nestedColumnElement))
                .reduce((combinedChildColumns: Omit<ColumnElement, 'nestedColumnElementsPerOrder'>[][], childColumns: Omit<ColumnElement, 'nestedColumnElementsPerOrder'>[][]) => {
                    range(0, childColumns.length)
                        .forEach((columnIndex: number) => {
                            if (!combinedChildColumns[columnIndex]) {
                                combinedChildColumns[columnIndex] = []
                            }
                            combinedChildColumns[columnIndex] = combinedChildColumns[columnIndex].concat(childColumns[columnIndex])
                        })
                    return combinedChildColumns;
                }, [])
        ]
    }

    return (
        <>
            {getElementsByColumn(displayRootElement).map((column: Omit<ColumnElement, 'nestedColumnElementsPerOrder'>[], index) =>
                <>
                    <div id={'column-' + index} key={'column-' + index}
                         className={props.classes.column}>
                        {
                            column
                                .map((element, elementIndex) =>
                                    <ColumnElementComponent
                                        classes={props.classes}
                                        index={elementIndex}
                                        path={element.path}
                                        title={element.title}
                                        content={element.reactElement}
                                    />
                                )
                        }
                    </div>
                </>
            )}
        </>
    )
}

export default ConfigurationMappingComponent;
