import * as React from "react";
import {IMappingTemplate, IObjectTemplate} from "../../../types/FormTemplate";

export type Props = {
    objectTemplate: IObjectTemplate, // TODO eivindmorch 21/06/2023 : Move to context?
    templatePath: string[],
    onChange: (value: boolean) => void
}



export function getConfigurationKeyLevel2(mappingTemplate: IMappingTemplate, templateReferencePath: string[]) {

}

const ConditionDependencyComponent: React.FunctionComponent<Props> = (props: Props) => {

    return <></>
}
export default ConditionDependencyComponent;