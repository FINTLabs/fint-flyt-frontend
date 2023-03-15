import * as React from "react";
import {ReactElement} from "react";
import {IElementTemplate, ISelectableValueTemplate, IValueTemplate} from "../../types/FormTemplate";
import {ElementComponentProps} from "../../types/ElementComponentProps";
import ValueMappingComponent from "./ValueMappingComponent";
import SelectableValueMappingComponent from "./SelectableValueMappingComponent";
import {ClassNameMap} from "@mui/styles";
import HelpPopover from "../popover/HelpPopover";
import {Box} from "@mui/material";

interface Props extends Omit<ElementComponentProps, 'displayName'> {
    classes: ClassNameMap;
    absoluteKey: string;
    valueTemplates: IElementTemplate<IValueTemplate>[]
    selectableValueTemplates: IElementTemplate<ISelectableValueTemplate>[]
    nestedObjectButtons: OrderedObjectElement[]
}

export type OrderedObjectElement = {
    order: number
    element: ReactElement;
}

function toOrderedReactElements<T>(
    elementTemplates: IElementTemplate<T>[] = [],
    reactElementMappingFunction: (elementTemplate: IElementTemplate<T>, order: number) => ReactElement
): OrderedObjectElement[] {
    return elementTemplates
        .map((template: IElementTemplate<T>) => ({
                order: template.order,
                element: reactElementMappingFunction(template, template.order)
            })
        )
}

export function ascendingCompare<T extends OrderedObjectElement>(a: T, b: T) {
    return a.order - b.order
}

const ObjectMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <fieldset className={props.classes.fieldSet}>
                {[
                    ...toOrderedReactElements(
                        props.valueTemplates,
                        (template: IElementTemplate<IValueTemplate>) =>
                            <div id={'value-mapping-wrapper-' + props.absoluteKey} className={props.classes.valueMappingContainer}>
                                <ValueMappingComponent
                                    classes={props.classes}
                                    absoluteKey={props.absoluteKey + ".valueMappingPerKey." + template.elementConfig.key}
                                    displayName={template.elementConfig.displayName}
                                    template={template.template}/>
                                <HelpPopover popoverContent={template.elementConfig.description}/>
                            </div>
                    ),
                    ...toOrderedReactElements(
                        props.selectableValueTemplates,
                        (template: IElementTemplate<ISelectableValueTemplate>) =>
                            <div id={'selectable-value-mapping-wrapper-' + props.absoluteKey} className={props.classes.valueMappingContainer}>
                                <SelectableValueMappingComponent
                                    classes={props.classes}
                                    absoluteKey={props.absoluteKey + ".valueMappingPerKey." + template.elementConfig.key}
                                    displayName={template.elementConfig.displayName}
                                    template={template.template}/>
                                <HelpPopover popoverContent={template.elementConfig.description}/>
                            </div>
                    ),
                    ...props.nestedObjectButtons,
                ]
                    .sort(ascendingCompare)
                    .map((orderedElement) => orderedElement.element)}
            </fieldset>
        </>
    )
}
export default ObjectMappingComponent;