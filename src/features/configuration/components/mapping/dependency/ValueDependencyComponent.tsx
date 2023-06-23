import * as React from "react";
import {IValueTemplate} from "../../../types/FormTemplate";
import {DependencyCallbacks} from "./DependantElement";

export type Props = {
    template: IValueTemplate,
    dependencyCallbacks: DependencyCallbacks
}

const ValueDependencyComponent: React.FunctionComponent<Props> = (props: Props) => {
    return <>
        {props.template.}
    </>
}
export default ValueDependencyComponent;