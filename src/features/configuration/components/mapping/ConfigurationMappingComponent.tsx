import {ClassNameMap} from "@mui/styles";
import * as React from "react";
import {ReactElement, useState} from "react";
import ObjectMappingComponent, {NestedElementTemplate} from "./ObjectMappingComponent";
import {ICollectionTemplate, IElementTemplate, IObjectTemplate, IValueTemplate} from "../../types/FormTemplate";
import {range} from "lodash";
import {NestedElementsCallbacks} from "../../types/NestedElementCallbacks";
import ValueCollectionMappingComponent from "./ValueCollectionMappingComponent";
import ObjectCollectionMappingComponent from "./ObjectCollectionMappingComponent";

interface Props {
    classes: ClassNameMap
    rootObjectTemplate: IElementTemplate<IObjectTemplate>
}

const ConfigurationMappingComponent: React.FunctionComponent<Props> = (props: Props) => {

    type ColumnElement = {
        reactElement: ReactElement,
        nestedColumnElementsPerOrder: Map<string, ColumnElement>
    }

    function createRootElement(): ColumnElement {
        const newColumnElementNestedColumnElementsPerOrder: Map<string, ColumnElement> = new Map<string, ColumnElement>();
        return {
            reactElement:
                <ObjectMappingComponent
                    classes={props.classes}
                    absoluteKey={props.rootObjectTemplate.elementConfig.key}
                    template={props.rootObjectTemplate.template}
                    nestedElementCallbacks={
                        createNestedElementsCallbacks(newColumnElementNestedColumnElementsPerOrder)
                    }
                />,
            nestedColumnElementsPerOrder: newColumnElementNestedColumnElementsPerOrder
        }
    }

    const rootElement = createRootElement();
    const [displayRootElement, setDisplayRootElement] = useState<ColumnElement>(rootElement);

    function createNewColumnElement(
        reactElementCreator: (newColumnElementNestedColumnElementsPerOrder: Map<string, ColumnElement>) => ReactElement
    ): ColumnElement {
        const newColumnElementNestedColumnElementsPerOrder: Map<string, ColumnElement> = new Map<string, ColumnElement>();
        return {
            reactElement: reactElementCreator(newColumnElementNestedColumnElementsPerOrder),
            nestedColumnElementsPerOrder: newColumnElementNestedColumnElementsPerOrder
        }
    }

    function orderToString(order: number[]): string {
        return order.join(".")
    }

    function createNestedElementsCallbacks(nestedColumnElementsPerOrder: Map<string, ColumnElement>): NestedElementsCallbacks {
        return {
            onNestedObjectOpen:
                (template: NestedElementTemplate<IObjectTemplate>) => {
                    nestedColumnElementsPerOrder.set(
                        orderToString(template.order),
                        createNewColumnElement(
                            (newColumnElementNestedColumnElementsPerOrder: Map<string, ColumnElement>) =>
                                <ObjectMappingComponent
                                    classes={props.classes}
                                    absoluteKey={template.absoluteKey}
                                    template={template.template}
                                    nestedElementCallbacks={
                                        createNestedElementsCallbacks(newColumnElementNestedColumnElementsPerOrder)
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
                            (newColumnElementNestedColumnElementsPerOrder: Map<string, ColumnElement>) =>
                                <ObjectCollectionMappingComponent
                                    classes={props.classes}
                                    absoluteKey={template.absoluteKey}
                                    nestedElementCallbacks={
                                        createNestedElementsCallbacks(newColumnElementNestedColumnElementsPerOrder)
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
                        createNewColumnElement(() =>
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

    function getElementsByColumn(columnElement: ColumnElement): ReactElement[][] {
        return [
            [columnElement.reactElement],
            ...Array.from(columnElement.nestedColumnElementsPerOrder.entries())
                .sort()
                .map(([order, nestedColumnElement]) => getElementsByColumn(nestedColumnElement))
                .reduce((combinedChildColumns: ReactElement[][], childColumns: ReactElement[][]) => {
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
            {getElementsByColumn(displayRootElement).map((column: ReactElement[]) =>
                <>
                    <fieldset className={props.classes.fieldSet}>
                        {
                            column
                                .map(element =>
                                    <div>
                                        <hr/>
                                        {element}
                                    </div>
                                )
                        }
                    </fieldset>
                    <hr/>
                    <hr/>
                    <hr/>
                </>
            )}
        </>
    )
}

export default ConfigurationMappingComponent;
