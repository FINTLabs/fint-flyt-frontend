import * as React from "react";
import {
    IElementTemplate,
    IObjectTemplate,
    ISelectableValueTemplate,
    IValueTemplate
} from "../../types/NewForm/FormTemplate";
import {ElementComponentProps} from "../../types/ElementComponentProps";
import ValueMappingComponent from "./ValueMappingComponent";
import SelectableValueMappingComponent from "./SelectableValueMappingComponent";

interface Props extends ElementComponentProps {
    template: IObjectTemplate
}

const ObjectMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <>
            <div className={props.classes.title}>{props.displayName}</div>
            <fieldset className={props.classes.fieldSet}>

                {props.template.valueTemplates?.map(
                    (template: IElementTemplate<IValueTemplate>) =>
                        <ValueMappingComponent
                            classes={props.classes}
                            absoluteKey={props.absoluteKey + ".valueMappingPerKey." + template.elementConfig.key}
                            displayName={template.elementConfig.displayName}
                            template={template.template}
                        />
                )}

                {props.template.selectableValueTemplates?.map(
                    (template: IElementTemplate<ISelectableValueTemplate>) =>
                        <SelectableValueMappingComponent
                            classes={props.classes}
                            absoluteKey={props.absoluteKey + ".valueMappingPerKey." + template.elementConfig.key}
                            displayName={template.elementConfig.displayName}
                            template={template.template}
                        />
                )}

                {props.template.objectTemplates?.map(
                    (template: IElementTemplate<IObjectTemplate>) =>
                        <ObjectMappingComponent
                            classes={props.classes}
                            absoluteKey={props.absoluteKey + ".objectMappingPerKey." + template.elementConfig.key}
                            displayName={template.elementConfig.displayName}
                            template={template.template}
                        />
                )}

            </fieldset>
        </>
    )
}
export default ObjectMappingComponent;