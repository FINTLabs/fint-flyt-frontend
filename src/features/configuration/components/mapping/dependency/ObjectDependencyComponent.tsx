import * as React from "react";
import {IElementTemplate, IObjectTemplate, IValueTemplate} from "../../../types/FormTemplate";
import {createPrefixedObjectDependencyCallbacks, DependencyCallbacks} from "./DependantElement";
import ValueDependencyComponent from "./ValueDependencyComponent";

export type Props = {
    template: IObjectTemplate,
    dependencyCallbacks: DependencyCallbacks
}

const ObjectDependencyComponent: React.FunctionComponent<Props> = (props: Props) => {

    return <>
        {props.template.valueTemplates?.map((elementTemplate: IElementTemplate<IValueTemplate>) =>
            <ValueDependencyComponent
                template={elementTemplate.template}
                dependencyCallbacks={
                    // TODO eivindmorch 20/06/2023 : Dependencies er i elementConfig
                    createPrefixedValueDependencyCallbacks(
                        props.dependencyCallbacks,
                        elementTemplate
                    )
                }
            />
        )}
        {props.template.objectTemplates?.map((elementTemplate: IElementTemplate<IObjectTemplate>) =>
            <ObjectDependencyComponent
                template={elementTemplate.template}
                dependencyCallbacks={
                    createPrefixedObjectDependencyCallbacks(
                        props.dependencyCallbacks,
                        elementTemplate
                    )
                }
            />
        )}
    </>
}
export default ObjectDependencyComponent;