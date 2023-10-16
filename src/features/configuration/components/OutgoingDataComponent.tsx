import * as React from "react";
import {Box, Typography} from "@mui/material";
import {ClassNameMap} from "@mui/styles";
import {useTranslation} from "react-i18next";
import {testObjectTemplateSak} from "../defaults/FormTemplates";
import ConfigurationMappingComponent from "./mapping/ConfigurationMappingComponent";
import HelpPopover from "./common/popover/HelpPopover";
import {Controller, useFormContext} from "react-hook-form";
import {ValueType} from "../types/Metadata/IntegrationMetadata";
import DynamicChipComponent2 from "./mapping/value/string/DynamicChipComponent2";

export interface Props {
    classes: ClassNameMap
    onCollectionReferencesInEditContextChange: (collectionReferences: string[]) => void;
}

const OutgoingDataComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.configuration'});
    const classes = props.classes;
    const {getValues, watch} = useFormContext();


    console.log(getValues(), watch())
    return (
        <Box id="outgoing-form-panel" className={classes.panelContainer}>

            <Controller
                name={"mappingString"}
                render={({field, fieldState}) =>
                    <DynamicChipComponent2 onChange={field.onChange} accept={[ValueType.STRING]} classes={classes}
                                           fieldState={fieldState} name={"dnd-felt-controlled"} value={field.value}/>
                }
            />
            {/*<DynamicChipComponent2 classes={classes} name={"dnd-felt"}/>*/}
            <Box className={props.classes.row}>
                <Typography variant={"h6"}>{t('formHeader')}</Typography>
                <HelpPopover popoverContent="Utgående data"/>
            </Box>
            <Box id="configuration-mapping-wrapper" sx={{display: 'flex'}}>
                <ConfigurationMappingComponent
                    classes={classes}
                    mappingTemplate={testObjectTemplateSak}
                    onCollectionReferencesInEditContextChange={(collectionReferences => {
                        props.onCollectionReferencesInEditContextChange(collectionReferences)
                    })}
                />
            </Box>
        </Box>
    );
}
export default OutgoingDataComponent;