import * as React from "react";
import {ReactElement} from "react";
import {IElementTemplate, ISelectableValueTemplate, IValueTemplate} from "../../types/FormTemplate";
import {ElementComponentProps} from "../../types/ElementComponentProps";
import ValueMappingComponent from "./ValueMappingComponent";
import SelectableValueMappingComponent from "./SelectableValueMappingComponent";
import {ClassNameMap} from "@mui/styles";

interface Props extends Omit<ElementComponentProps, 'displayName'> {
    classes: ClassNameMap;
    absoluteKey: string;
    valueTemplates: IElementTemplate<IValueTemplate>[]
    selectableValueTemplates: IElementTemplate<ISelectableValueTemplate>[]
    nestedObjectButtons: OrderedElement[]
}

export type OrderedElement = {
    order: string
    element: ReactElement;
}

function toOrderedReactElements<T>(
    elementTemplates: IElementTemplate<T>[] = [],
    reactElementMappingFunction: (elementTemplate: IElementTemplate<T>, order: number) => ReactElement
): OrderedElement[] {
    return elementTemplates
        .map((template: IElementTemplate<T>) => ({
                order: "" + template.order,
                element: reactElementMappingFunction(template, template.order)
            })
        )
}

export function ascendingCompare<T extends OrderedElement>(a: T, b: T) {
    return a.order.localeCompare(b.order)
}

const ObjectMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <fieldset className={props.classes.fieldSet}>
                {[
                    ...toOrderedReactElements(
                        props.valueTemplates,
                        (template: IElementTemplate<IValueTemplate>) =>
                            <ValueMappingComponent
                                classes={props.classes}
                                absoluteKey={props.absoluteKey + ".valueMappingPerKey." + template.elementConfig.key}
                                displayName={template.elementConfig.displayName}
                                template={template.template}/>
                    ),
                    ...toOrderedReactElements(
                        props.selectableValueTemplates,
                        (template: IElementTemplate<ISelectableValueTemplate>) =>
                            <SelectableValueMappingComponent
                                classes={props.classes}
                                absoluteKey={props.absoluteKey + ".valueMappingPerKey." + template.elementConfig.key}
                                displayName={template.elementConfig.displayName}
                                template={template.template}/>
                    ),
                    ...props.nestedObjectButtons,
                    // ...toOrderedReactElements(
                    //     props.template.objectCollectionTemplates,
                    //     (template: IElementTemplate<ICollectionTemplate<IObjectTemplate>>) =>
                    //         <CollectionMappingComponent
                    //             classes={props.classes}
                    //             absoluteKey={props.absoluteKey + ".objectCollectionMappingPerKey." + template.elementConfig.key}
                    //             displayName={template.elementConfig.displayName}
                    //             elementComponentCreator={(absoluteKey: string, displayName: string) =>
                    //                 <ObjectMappingComponent
                    //                     classes={props.classes}
                    //                     absoluteKey={absoluteKey}
                    //                     displayName={displayName}
                    //                     template={template.template.elementTemplate}
                    //                 />
                    //             }
                    //         />
                    // ),
                    // ...toOrderedReactElements(
                    //     props.template.valueCollectionTemplates,
                    //     (template: IElementTemplate<ICollectionTemplate<IValueTemplate>>) =>
                    //         <CollectionMappingComponent
                    //             classes={props.classes}
                    //             absoluteKey={props.absoluteKey + ".valueCollectionMappingPerKey." + template.elementConfig.key}
                    //             displayName={template.elementConfig.displayName}
                    //             elementComponentCreator={(absoluteKey: string, displayName: string) =>
                    //                 <ValueMappingComponent
                    //                     classes={props.classes}
                    //                     absoluteKey={absoluteKey}
                    //                     displayName={displayName}
                    //                     template={template.template.elementTemplate}
                    //                 />
                    //             }
                    //         />
                    // )
                ]
                    .sort(ascendingCompare)
                    .map((orderedElement) => orderedElement.element)}
            </fieldset>
        </>
    )
}
export default ObjectMappingComponent;