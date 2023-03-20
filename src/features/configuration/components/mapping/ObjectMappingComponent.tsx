import * as React from "react";
import {memo, MutableRefObject, ReactElement, useEffect, useRef} from "react";
import {
    ICollectionTemplate,
    IDependency,
    IElementTemplate,
    IObjectTemplate,
    ISelectableValueTemplate,
    IValueTemplate
} from "../../types/FormTemplate";
import ValueMappingComponent from "./ValueMappingComponent";
import SelectableValueMappingComponent from "./SelectableValueMappingComponent";
import {ClassNameMap} from "@mui/styles";
import ToggleButtonComponent from "../common/ToggleButtonComponent";
import {NestedElementsCallbacks} from "../../types/NestedElementCallbacks";
import {DependencySatisfiedStatefulValue} from "../../util/DependencyUtils";
import {useFormContext} from "react-hook-form";

export interface Props {
    classes: ClassNameMap;
    absoluteKey: string;
    template: IObjectTemplate;
    nestedElementCallbacks: NestedElementsCallbacks,
    openNestedElementsByOrder: Set<string>
}

export type NestedElementTemplate<T> = {
    order: string;
    absoluteKey: string;
    displayPath: string[];
    displayName: string;
    template: T;
}

const ObjectMappingComponent: React.FunctionComponent<Props> = memo((props: Props) => {
    const {unregister} = useFormContext();
    const registeredElementsOrders: MutableRefObject<Set<number>> = useRef<Set<number>>(new Set());

    const absoluteKeysToUnregister: MutableRefObject<string[]> = useRef<string[]>([]);
    const objectsToCloseByOrder: MutableRefObject<number[]> = useRef<number[]>([]);
    const objectCollectionsToCloseByOrder: MutableRefObject<number[]> = useRef<number[]>([]);
    const valueCollectionsToCloseByOrder: MutableRefObject<number[]> = useRef<number[]>([]);

    const showDependencyValuePerOrder: Record<string, boolean> = {};
    [
        ...props.template.valueTemplates ? props.template.valueTemplates : [],
        ...props.template.selectableValueTemplates ? props.template.selectableValueTemplates : [],
        ...props.template.valueCollectionTemplates ? props.template.valueCollectionTemplates : [],
        ...props.template.objectTemplates ? props.template.objectTemplates : [],
        ...props.template.objectCollectionTemplates ? props.template.objectCollectionTemplates : [],
    ]
        .map((elementTemplate: IElementTemplate<any>) => [
            elementTemplate.order,
            elementTemplate.elementConfig.showDependency
        ])
        .filter((entry): entry is [number, IDependency] => !!entry[1])
        .forEach(([order, dependency]: [number, IDependency]) =>
            showDependencyValuePerOrder[order] = DependencySatisfiedStatefulValue(props.absoluteKey, dependency))

    function getValueMappingKey(template: IElementTemplate<IValueTemplate | ISelectableValueTemplate>): string {
        return props.absoluteKey + ".valueMappingPerKey." + template.elementConfig.key;
    }

    function getValueCollectionMappingKey(template: IElementTemplate<ICollectionTemplate<IValueTemplate>>): string {
        return props.absoluteKey + ".valueCollectionMappingPerKey." + template.elementConfig.key;
    }

    function getObjectMappingKey(template: IElementTemplate<IObjectTemplate>): string {
        return props.absoluteKey + ".objectMappingPerKey." + template.elementConfig.key;
    }

    function getObjectCollectionMappingKey(template: IElementTemplate<ICollectionTemplate<IObjectTemplate>>): string {
        return props.absoluteKey + ".objectCollectionMappingPerKey." + template.elementConfig.key;
    }

    function shouldShowElementWithOrder(order: number) {
        const showDependencyValue: boolean | undefined = showDependencyValuePerOrder[order.toString()]
        if (showDependencyValue === undefined || showDependencyValue) {
            return true;
        }
    }

    useEffect(() => {
        if (objectsToCloseByOrder.current.length > 0
            || valueCollectionsToCloseByOrder.current.length > 0
            || objectCollectionsToCloseByOrder.current.length > 0) {
            const objectsToCloseByOrderCopy = [...objectsToCloseByOrder.current]
            objectsToCloseByOrder.current = [];
            const objectCollectionsToCloseByOrderCopy = [...objectCollectionsToCloseByOrder.current]
            objectCollectionsToCloseByOrder.current = [];
            const valueCollectionsToCloseByOrderCopy = [...valueCollectionsToCloseByOrder.current]
            valueCollectionsToCloseByOrder.current = [];
            props.nestedElementCallbacks.onElementsClose(
                {
                    objects: objectsToCloseByOrderCopy.map((order: number) => {
                        return order.toString()
                    }),
                    objectCollections: objectCollectionsToCloseByOrderCopy.map((order: number) => {
                        return order.toString()
                    }),
                    valueCollections: valueCollectionsToCloseByOrderCopy.map((order: number) => {
                        return order.toString()
                    }),
                }
            )
        }
        if (absoluteKeysToUnregister.current.length > 0) {
            unregister([...absoluteKeysToUnregister.current]);
            absoluteKeysToUnregister.current = [];
        }
    })

    return (
        <>
            <fieldset className={props.classes.fieldSet}>
                {[
                    ...(props.template.valueTemplates ? props.template.valueTemplates : [])
                        .filter((template: IElementTemplate<IValueTemplate>) => {
                            if (shouldShowElementWithOrder(template.order)) {
                                return true;
                            }
                            if (registeredElementsOrders.current.has(template.order)) {
                                absoluteKeysToUnregister.current.push(getValueMappingKey(template))
                            }
                            return false;
                        })
                        .map<ReactElement<{ order: number }>>((template: IElementTemplate<IValueTemplate>) =>
                            <ValueMappingComponent
                                classes={props.classes}
                                order={template.order}
                                absoluteKey={getValueMappingKey(template)}
                                displayName={template.elementConfig.displayName}
                                description={template.elementConfig.description}
                                template={template.template}
                                disabled={template.elementConfig.enableDependency ? !DependencySatisfiedStatefulValue(props.absoluteKey, template.elementConfig.enableDependency) : undefined}
                            />
                        ),

                    ...(props.template.selectableValueTemplates ? props.template.selectableValueTemplates : [])
                        .filter((template: IElementTemplate<ISelectableValueTemplate>) => {
                            if (shouldShowElementWithOrder(template.order)) {
                                return true;
                            }
                            if (registeredElementsOrders.current.has(template.order)) {
                                absoluteKeysToUnregister.current.push(getValueMappingKey(template))
                            }
                            return false;
                        })
                        .map<ReactElement<{ order: number }>>((template: IElementTemplate<ISelectableValueTemplate>) =>
                            <SelectableValueMappingComponent
                                classes={props.classes}
                                order={template.order}
                                absoluteKey={getValueMappingKey(template)}
                                displayName={template.elementConfig.displayName}
                                description={template.elementConfig.description}
                                template={template.template}
                                disabled={template.elementConfig.enableDependency ? !DependencySatisfiedStatefulValue(props.absoluteKey, template.elementConfig.enableDependency) : undefined}
                            />
                        ),

                    ...(props.template.valueCollectionTemplates ? props.template.valueCollectionTemplates : [])
                        .filter((template: IElementTemplate<ICollectionTemplate<IValueTemplate>>) => {
                            if (shouldShowElementWithOrder(template.order)) {
                                return true;
                            }
                            if (props.openNestedElementsByOrder.has(template.order.toString())) {
                                valueCollectionsToCloseByOrder.current.push(template.order)
                            }
                            if (registeredElementsOrders.current.has(template.order)) {
                                absoluteKeysToUnregister.current.push(getValueCollectionMappingKey(template))
                            }
                            return false;
                        })
                        .map<ReactElement<{ order: number }>>((template: IElementTemplate<ICollectionTemplate<IValueTemplate>>) =>
                            <ToggleButtonComponent
                                classes={props.classes}
                                order={template.order}
                                displayName={template.elementConfig.displayName}
                                selected={props.openNestedElementsByOrder.has(template.order.toString())}
                                onSelected={() => {
                                    props.nestedElementCallbacks.onElementsOpen({
                                        valueCollections: [{
                                            order: template.order.toString(),
                                            absoluteKey: getValueCollectionMappingKey(template),
                                            displayPath: [],
                                            displayName: template.elementConfig.displayName,
                                            template: template.template
                                        }]
                                    });
                                }}
                                onUnselected={() => {
                                    props.nestedElementCallbacks.onElementsClose({valueCollections: [template.order.toString()]})
                                }}
                                disabled={template.elementConfig.enableDependency ? !DependencySatisfiedStatefulValue(props.absoluteKey, template.elementConfig.enableDependency) : undefined}
                            />
                        ),

                    ...(props.template.objectTemplates ? props.template.objectTemplates : [])
                        .filter((template: IElementTemplate<IObjectTemplate>) => {
                            if (shouldShowElementWithOrder(template.order)) {
                                return true;
                            }
                            if (props.openNestedElementsByOrder.has(template.order.toString())) {
                                objectsToCloseByOrder.current.push(template.order)
                            }
                            if (registeredElementsOrders.current.has(template.order)) {
                                absoluteKeysToUnregister.current.push(getObjectMappingKey(template))
                            }
                            return false;
                        })
                        .map<ReactElement<{ order: number }>>((template: IElementTemplate<IObjectTemplate>) =>
                            <ToggleButtonComponent
                                classes={props.classes}
                                order={template.order}
                                displayName={template.elementConfig.displayName}
                                selected={props.openNestedElementsByOrder.has(template.order.toString())}
                                onSelected={() => {
                                    props.nestedElementCallbacks.onElementsOpen({
                                        objects: [{
                                            order: template.order.toString(),
                                            absoluteKey: getObjectMappingKey(template),
                                            displayPath: [],
                                            displayName: template.elementConfig.displayName,
                                            template: template.template
                                        }]
                                    });
                                }}
                                onUnselected={() => {
                                    props.nestedElementCallbacks.onElementsClose({objects: [template.order.toString()]})
                                }}
                                disabled={template.elementConfig.enableDependency ? !DependencySatisfiedStatefulValue(props.absoluteKey, template.elementConfig.enableDependency) : undefined}
                            />
                        ),

                    ...(props.template.objectCollectionTemplates ? props.template.objectCollectionTemplates : [])
                        .filter((template: IElementTemplate<ICollectionTemplate<IObjectTemplate>>) => {
                            if (shouldShowElementWithOrder(template.order)) {
                                return true;
                            }
                            if (props.openNestedElementsByOrder.has(template.order.toString())) {
                                objectCollectionsToCloseByOrder.current.push(template.order)
                            }
                            if (registeredElementsOrders.current.has(template.order)) {
                                absoluteKeysToUnregister.current.push(getObjectCollectionMappingKey(template))
                            }
                            return false;
                        })
                        .map<ReactElement<{ order: number }>>((template: IElementTemplate<ICollectionTemplate<IObjectTemplate>>) =>
                            <ToggleButtonComponent
                                classes={props.classes}
                                order={template.order}
                                displayName={template.elementConfig.displayName}
                                selected={props.openNestedElementsByOrder.has(template.order.toString())}
                                onSelected={() => {
                                    props.nestedElementCallbacks.onElementsOpen({
                                        objectCollections: [{
                                            order: template.order.toString(),
                                            absoluteKey: getObjectCollectionMappingKey(template),
                                            displayPath: [],
                                            displayName: template.elementConfig.displayName,
                                            template: template.template
                                        }]
                                    });
                                }}
                                onUnselected={() => {
                                    props.nestedElementCallbacks.onElementsClose({objectCollections: [template.order.toString()]});
                                }}
                                disabled={template.elementConfig.enableDependency ? !DependencySatisfiedStatefulValue(props.absoluteKey, template.elementConfig.enableDependency) : undefined}
                            />
                        )
                ]
                    .map((reactElement: ReactElement<{ order: number }>) => {
                        registeredElementsOrders.current.clear();
                        registeredElementsOrders.current.add(reactElement.props.order);
                        return reactElement;
                    })
                    .sort((a: ReactElement<{ order: number }>, b: ReactElement<{ order: number }>) => a.props.order - b.props.order)}
            </fieldset>
        </>
    )
})
export default ObjectMappingComponent;