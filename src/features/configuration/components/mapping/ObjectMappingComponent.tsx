import * as React from "react";
import {ReactElement} from "react";
import {IElementTemplate, IObjectTemplate, ISelectableValueTemplate, IValueTemplate} from "../../types/FormTemplate";
import ValueMappingComponent from "./ValueMappingComponent";
import SelectableValueMappingComponent from "./SelectableValueMappingComponent";
import {ClassNameMap} from "@mui/styles";
import ToggleButtonComponent from "../common/ToggleButtonComponent";
import {NestedElementsCallbacks} from "../../types/ElementComponentProps";

interface Props {
    classes: ClassNameMap;
    absoluteKey: string;
    template: IObjectTemplate;
    nestedElementCallbacks: NestedElementsCallbacks
}

export type NestedElementTemplate<T> = {
    order: number[];
    absoluteKey: string;
    displayName: string;
    template: T;
}

export type OrderedObjectElement = {
    order: number[]
    element: ReactElement;
}

function toOrderedReactElements<T>(
    elementTemplates: IElementTemplate<T>[] = [],
    reactElementMappingFunction: (elementTemplate: IElementTemplate<T>, order: number) => ReactElement
): OrderedObjectElement[] {
    return elementTemplates
        .map((template: IElementTemplate<T>) => ({
                order: [template.order],
                element: reactElementMappingFunction(template, template.order)
            })
        )
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

const ObjectMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <fieldset className={props.classes.fieldSet}>
                {[
                    ...toOrderedReactElements(
                        props.template.valueTemplates,
                        (template: IElementTemplate<IValueTemplate>) =>
                            <ValueMappingComponent
                                classes={props.classes}
                                absoluteKey={props.absoluteKey + ".valueMappingPerKey." + template.elementConfig.key}
                                displayName={template.elementConfig.displayName}
                                template={template.template}/>
                    ),
                    ...toOrderedReactElements(
                        props.template.selectableValueTemplates,
                        (template: IElementTemplate<ISelectableValueTemplate>) =>
                            <SelectableValueMappingComponent
                                classes={props.classes}
                                absoluteKey={props.absoluteKey + ".valueMappingPerKey." + template.elementConfig.key}
                                displayName={template.elementConfig.displayName}
                                template={template.template}/>
                    ),
                    ...toOrderedReactElements(
                        props.template.valueCollectionTemplates,
                        (template) =>
                            <ToggleButtonComponent
                                classes={props.classes}
                                displayName={template.elementConfig.displayName}
                                onSelected={() => props.nestedElementCallbacks.onNestedValueCollectionOpen({
                                    order: [template.order],
                                    absoluteKey: props.absoluteKey + ".valueCollectionMappingPerKey." + template.elementConfig.key,
                                    displayName: template.elementConfig.displayName,
                                    template: template.template
                                })}
                                onUnselected={() => props.nestedElementCallbacks.onNestedElementClose([template.order])}
                            />
                    ),
                    ...toOrderedReactElements(
                        props.template.objectTemplates,
                        (template) =>
                            <ToggleButtonComponent
                                classes={props.classes}
                                displayName={template.elementConfig.displayName}
                                onSelected={() => props.nestedElementCallbacks.onNestedObjectOpen({
                                    order: [template.order],
                                    absoluteKey: props.absoluteKey + ".objectMappingPerKey." + template.elementConfig.key,
                                    displayName: template.elementConfig.displayName,
                                    template: template.template
                                })}
                                onUnselected={() => props.nestedElementCallbacks.onNestedElementClose([template.order])}
                            />
                    ),
                    ...toOrderedReactElements(
                        props.template.objectCollectionTemplates,
                        (template) =>
                            <ToggleButtonComponent
                                classes={props.classes}
                                displayName={template.elementConfig.displayName}
                                onSelected={() => props.nestedElementCallbacks.onNestedObjectCollectionOpen({
                                    order: [template.order],
                                    absoluteKey: props.absoluteKey + ".objectCollectionMappingPerKey." + template.elementConfig.key,
                                    displayName: template.elementConfig.displayName,
                                    template: template.template
                                })}
                                onUnselected={() => props.nestedElementCallbacks.onNestedElementClose([template.order])}
                            />
                    )
                ]
                    .sort((a, b) => compareOrder(a.order, b.order))
                    .map((orderedElement) => orderedElement.element)}
            </fieldset>
        </>
    )
}
export default ObjectMappingComponent;