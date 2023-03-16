import {ClassNameMap} from "@mui/styles";
import * as React from "react";
import {ReactElement, useState} from "react";
import ObjectMappingComponent, {NestedElementTemplate} from "./ObjectMappingComponent";
import {ICollectionTemplate, IElementTemplate, IObjectTemplate, IValueTemplate} from "../../types/FormTemplate";
import CollectionMappingComponent from "./CollectionMappingComponent";
import ValueMappingComponent from "./ValueMappingComponent";
import LifeCycleComponent from "./LifeCycleComponent";
import {range} from "lodash";
import {NestedElementsCallbacks} from "../../types/ElementComponentProps";

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
                    console.log("Open object mapping", template)
                    console.log("Root element before", rootElement);
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
                    console.log("Root element after", rootElement);
                },
            onNestedObjectCollectionOpen:
                (template: NestedElementTemplate<ICollectionTemplate<IObjectTemplate>>) => {
                    console.log("Open object collection mapping", template);
                    console.log("Root element before", rootElement);
                    nestedColumnElementsPerOrder.set(
                        orderToString(template.order),
                        createNewColumnElement(
                            (newColumnElementNestedColumnElementsPerOrder: Map<string, ColumnElement>) =>
                                <CollectionMappingComponent
                                    classes={props.classes}
                                    absoluteKey={template.absoluteKey}
                                    nestedElementCallbacks={
                                        createNestedElementsCallbacks(newColumnElementNestedColumnElementsPerOrder)
                                    }
                                    elementComponentCreator={(absoluteKey: string, nestedElementsCallbacks: NestedElementsCallbacks) =>
                                        <LifeCycleComponent
                                            onDestroy={() => newColumnElementNestedColumnElementsPerOrder.clear()}
                                            content={
                                                <ObjectMappingComponent
                                                    classes={props.classes}
                                                    absoluteKey={absoluteKey}
                                                    template={template.template.elementTemplate}
                                                    nestedElementCallbacks={nestedElementsCallbacks}
                                                />
                                            }
                                        />
                                    }
                                />
                        )
                    )
                    setDisplayRootElement({...rootElement});
                    console.log("Root element after", rootElement);
                },
            onNestedValueCollectionOpen:
                (template: NestedElementTemplate<ICollectionTemplate<IValueTemplate>>) => {
                    console.log("Open value collection mapping", template)
                    console.log("Root element before", rootElement);
                    nestedColumnElementsPerOrder.set(
                        orderToString(template.order),
                        createNewColumnElement(
                            (newColumnElementNestedColumnElementsPerOrder: Map<string, ColumnElement>) =>
                                <CollectionMappingComponent
                                    classes={props.classes}
                                    absoluteKey={template.absoluteKey}
                                    nestedElementCallbacks={createNestedElementsCallbacks(newColumnElementNestedColumnElementsPerOrder)} // TODO eivindmorch 16/03/2023 : Remove this from value collection
                                    elementComponentCreator={(absoluteKey: string, nestedElementsCallbacks: NestedElementsCallbacks) =>
                                        <ValueMappingComponent
                                            classes={props.classes}
                                            absoluteKey={absoluteKey}
                                            displayName={"" + absoluteKey}
                                            template={template.template.elementTemplate}
                                        />
                                    }
                                />
                        )
                    )
                    setDisplayRootElement({...rootElement});
                    console.log("Root element after", rootElement);
                },
            onNestedElementClose: (order: number[]) => {
                console.log("Remove element with order", order)
                console.log("Root element before", rootElement);
                nestedColumnElementsPerOrder.delete(orderToString(order))
                setDisplayRootElement({...rootElement});
                console.log("Root element after", rootElement);
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
            {console.log(displayRootElement)}
            {console.log(getElementsByColumn(displayRootElement))}
            {getElementsByColumn(displayRootElement).map((column: ReactElement[]) =>
                <>
                    <fieldset className={props.classes.fieldSet}>
                        {
                            column
                                .map(element =>
                                    <div>
                                        <hr/>
                                        {console.log(element.props.absoluteKey)}
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
