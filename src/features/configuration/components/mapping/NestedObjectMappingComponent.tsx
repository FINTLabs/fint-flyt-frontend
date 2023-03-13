import * as React from "react";
import {ReactElement} from "react";
import {
    ICollectionTemplate,
    IElementTemplate,
    IObjectTemplate,
    ISelectableValueTemplate,
    IValueTemplate
} from "../../types/FormTemplate";
import {ElementComponentProps} from "../../types/ElementComponentProps";
import ValueMappingComponent from "./ValueMappingComponent";
import SelectableValueMappingComponent from "./SelectableValueMappingComponent";
import CollectionMappingComponent from "./CollectionMappingComponent";

interface Props extends ElementComponentProps {
    template: IObjectTemplate
}

type OrderedElement = {
    order: number
    element: ReactElement;
}

function toOrderedReactElements<T>(
    elementTemplates: IElementTemplate<T>[] = [],
    reactElementMappingFunction: (elementTemplate: IElementTemplate<T>) => ReactElement
): OrderedElement[] {
    return elementTemplates
        .map((template: IElementTemplate<T>) => ({
                order: template.order,
                element: reactElementMappingFunction(template)
            })
        )
}

function ascendingCompare(a: OrderedElement, b: OrderedElement) {
    return a.order - b.order
}

// TODO eivindmorch 13/03/2023 : Recompares collection components on add and remove
const ObjectMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <div className={props.classes.title}>{props.displayName}</div>
            <fieldset className={props.classes.fieldSet}>
                {[
                    ...toOrderedReactElements(
                        props.template.valueTemplates,
                        (template: IElementTemplate<IValueTemplate>) => <ValueMappingComponent
                            classes={props.classes}
                            absoluteKey={props.absoluteKey + ".valueMappingPerKey." + template.elementConfig.key}
                            displayName={template.elementConfig.displayName}
                            template={template.template}/>
                    ),
                    ...toOrderedReactElements(
                        props.template.selectableValueTemplates,
                        (template: IElementTemplate<ISelectableValueTemplate>) => <SelectableValueMappingComponent
                            classes={props.classes}
                            absoluteKey={props.absoluteKey + ".valueMappingPerKey." + template.elementConfig.key}
                            displayName={template.elementConfig.displayName}
                            template={template.template}/>
                    ),
                    ...toOrderedReactElements(
                        props.template.objectTemplates,
                        (template: IElementTemplate<IObjectTemplate>) => <ObjectMappingComponent
                            classes={props.classes}
                            absoluteKey={props.absoluteKey + ".objectMappingPerKey." + template.elementConfig.key}
                            displayName={template.elementConfig.displayName}
                            template={template.template}/>
                    ),
                    ...toOrderedReactElements(
                        props.template.objectCollectionTemplates,
                        (template: IElementTemplate<ICollectionTemplate<IObjectTemplate>>) =>
                            <CollectionMappingComponent
                                classes={props.classes}
                                absoluteKey={props.absoluteKey + ".objectCollectionMappingPerKey." + template.elementConfig.key}
                                displayName={template.elementConfig.displayName}
                                elementComponentCreator={(absoluteKey: string, displayName: string) =>
                                    <ObjectMappingComponent
                                        classes={props.classes}
                                        absoluteKey={absoluteKey}
                                        displayName={displayName}
                                        template={template.template.elementTemplate}
                                    />
                                }
                            />
                    ),
                    ...toOrderedReactElements(
                        props.template.valueCollectionTemplates,
                        (template: IElementTemplate<ICollectionTemplate<IValueTemplate>>) =>
                            <CollectionMappingComponent
                                classes={props.classes}
                                absoluteKey={props.absoluteKey + ".valueCollectionMappingPerKey." + template.elementConfig.key}
                                displayName={template.elementConfig.displayName}
                                elementComponentCreator={(absoluteKey: string, displayName: string) =>
                                    <ValueMappingComponent
                                        classes={props.classes}
                                        absoluteKey={absoluteKey}
                                        displayName={displayName}
                                        template={template.template.elementTemplate}
                                    />
                                }
                            />
                    )
                ]
                    .sort(ascendingCompare)
                    .map((orderedElement) => orderedElement.element)}
            </fieldset>
        </>
    )
}
export default ObjectMappingComponent;