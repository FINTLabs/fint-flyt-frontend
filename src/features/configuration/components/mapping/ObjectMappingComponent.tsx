import * as React from "react";
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
import HelpPopover from "../popover/HelpPopover";
import {Box} from "@mui/material";

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
                        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <ValueMappingComponent
                                classes={props.classes}
                                absoluteKey={props.absoluteKey + ".valueMappingPerKey." + template.elementConfig.key}
                                displayName={template.elementConfig.displayName}
                                template={template.template}
                            />
                            <HelpPopover popoverContent={template.elementConfig.description}/>
                        </Box>
                )}

                {props.template.selectableValueTemplates?.map(
                    (template: IElementTemplate<ISelectableValueTemplate>) =>
                        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <SelectableValueMappingComponent
                                classes={props.classes}
                                absoluteKey={props.absoluteKey + ".valueMappingPerKey." + template.elementConfig.key}
                                displayName={template.elementConfig.displayName}
                                template={template.template}
                            />
                            <HelpPopover popoverContent={template.elementConfig.description}/>
                        </Box>
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

                {props.template.objectCollectionTemplates?.map(
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
                )}

            </fieldset>
        </>
    )
}
export default ObjectMappingComponent;