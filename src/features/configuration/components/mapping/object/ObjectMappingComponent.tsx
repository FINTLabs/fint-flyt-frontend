import * as React from "react";
import {MutableRefObject, ReactElement, useRef} from "react";
import {
    ICollectionTemplate,
    IDependency,
    IElementTemplate,
    IObjectTemplate,
    ISelectableValueTemplate,
    IValueTemplate
} from "../../../types/FormTemplate";
import ValueMappingComponent from "../value/ValueMappingComponent";
import SelectableValueMappingComponent from "../value/SelectableValueMappingComponent";
import {ClassNameMap} from "@mui/styles";
import ToggleButtonComponent from "../../common/ToggleButtonComponent";
import {NestedElementsCallbacks} from "../../../types/NestedElement";
import {DependencySatisfiedStatefulValue} from "../../../util/DependencyUtils";
import {useFormContext} from "react-hook-form";
import FieldsetElementComponent from "../../common/FieldsetElementComponent";

export interface Props {
    classes: ClassNameMap;
    absoluteKey: string;
    template: IObjectTemplate;
    nestedElementCallbacks: NestedElementsCallbacks
}

const ObjectMappingComponent: React.FunctionComponent<Props> = (props: Props) => {

    const {unregister, getValues} = useFormContext()

    const showDependencyValuePerOrder: MutableRefObject<Record<string, boolean>> = useRef<Record<string, boolean>>({});
    [
        ...props.template.valueTemplates ? props.template.valueTemplates : [],
        ...props.template.selectableValueTemplates ? props.template.selectableValueTemplates : [],
    ]
        .map((elementTemplate: IElementTemplate<IValueTemplate | ISelectableValueTemplate>) => [
            elementTemplate.order,
            getValueMappingKey(elementTemplate),
            elementTemplate.elementConfig.showDependency
        ])
        .filter((entry): entry is [number, string, IDependency] => !!entry[2])
        .forEach(([order, absoluteKey, dependency]: [number, string, IDependency]) => DependencySatisfiedStatefulValue(props.absoluteKey, dependency,
            (value) => {
                showDependencyValuePerOrder.current[order] = value;
                // TODO eivindmorch 27/03/2023 : Move to configurationMappingComponent to unregister not open object values
                if (!value && getValues(absoluteKey) !== undefined) {
                    unregister(absoluteKey)
                }
            })
        );
    [
        ...props.template.valueCollectionTemplates ? props.template.valueCollectionTemplates : [],
        ...props.template.objectTemplates ? props.template.objectTemplates : [],
        ...props.template.objectCollectionTemplates ? props.template.objectCollectionTemplates : [],
    ]
        .map((elementTemplate: IElementTemplate<IObjectTemplate | ICollectionTemplate<IObjectTemplate | IValueTemplate>>) => [
            elementTemplate.order,
            elementTemplate.elementConfig.showDependency
        ])
        .filter((entry): entry is [number, IDependency] => !!entry[1])
        .forEach(([order, dependency]: [number, IDependency]) => DependencySatisfiedStatefulValue(props.absoluteKey, dependency,
            (value) => {
                showDependencyValuePerOrder.current[order] = value;
                if (!value) {
                    props.nestedElementCallbacks.onElementsClose([order.toString()], true)
                }
            })
        );

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
        const showDependencyValue: boolean | undefined = showDependencyValuePerOrder.current[order.toString()]
        if (showDependencyValue === undefined || showDependencyValue) {
            return true;
        }
    }

    return <fieldset className={props.classes.fieldSet}>
        {[
            ...(props.template.valueTemplates ? props.template.valueTemplates : [])
                .filter((template: IElementTemplate<IValueTemplate>) => {
                    return shouldShowElementWithOrder(template.order)
                })
                .map<ReactElement<{ order: number }>>((template: IElementTemplate<IValueTemplate>, index) =>
                    <ValueMappingComponent
                        key={index}
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
                    return shouldShowElementWithOrder(template.order)
                })
                .map<ReactElement<{ order: number }>>((template: IElementTemplate<ISelectableValueTemplate>, index) =>
                    <SelectableValueMappingComponent
                        key={index}
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
                    return shouldShowElementWithOrder(template.order)
                })
                .map<ReactElement<{ order: number }>>((template: IElementTemplate<ICollectionTemplate<IValueTemplate>>, index) =>
                    <ToggleButtonComponent
                        key={index}
                        classes={props.classes}
                        order={template.order}
                        displayName={template.elementConfig.displayName}
                        onSelect={() => {
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
                        onUnselect={() => {
                            props.nestedElementCallbacks.onElementsClose([template.order.toString()])
                        }}
                        disabled={template.elementConfig.enableDependency ? !DependencySatisfiedStatefulValue(props.absoluteKey, template.elementConfig.enableDependency) : undefined}
                    />
                ),

            ...(props.template.objectTemplates ? props.template.objectTemplates : [])
                .filter((template: IElementTemplate<IObjectTemplate>) => {
                    return shouldShowElementWithOrder(template.order)
                })
                .map<ReactElement<{ order: number }>>((template: IElementTemplate<IObjectTemplate>, index) =>
                    <ToggleButtonComponent
                        key={index}
                        classes={props.classes}
                        order={template.order}
                        displayName={template.elementConfig.displayName}
                        onSelect={() => {
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
                        onUnselect={() => {
                            props.nestedElementCallbacks.onElementsClose([template.order.toString()])
                        }}
                        disabled={template.elementConfig.enableDependency ? !DependencySatisfiedStatefulValue(props.absoluteKey, template.elementConfig.enableDependency) : undefined}
                    />
                ),

            ...(props.template.objectCollectionTemplates ? props.template.objectCollectionTemplates : [])
                .filter((template: IElementTemplate<ICollectionTemplate<IObjectTemplate>>) => {
                    return shouldShowElementWithOrder(template.order);
                })
                .map<ReactElement<{ order: number }>>((template: IElementTemplate<ICollectionTemplate<IObjectTemplate>>, index) =>
                    <ToggleButtonComponent
                        key={index}
                        classes={props.classes}
                        order={template.order}
                        displayName={template.elementConfig.displayName}
                        onSelect={() => {
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
                        onUnselect={() => {
                            props.nestedElementCallbacks.onElementsClose([template.order.toString()]);
                        }}
                        disabled={template.elementConfig.enableDependency ? !DependencySatisfiedStatefulValue(props.absoluteKey, template.elementConfig.enableDependency) : undefined}
                    />
                )
        ].sort((a: ReactElement<{ order: number }>, b: ReactElement<{ order: number }>) => a.props.order - b.props.order)
            .map((reactElement: ReactElement, index: number) => <FieldsetElementComponent classes={props.classes}
                                                                                          key={index}
                                                                                          content={reactElement}/>)
        }
    </fieldset>
}
export default ObjectMappingComponent;