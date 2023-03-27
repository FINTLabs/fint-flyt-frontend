import * as React from "react";
import {Box, Typography} from "@mui/material";
import {ClassNameMap} from "@mui/styles";
import {useTranslation} from "react-i18next";
import {testObjectTemplateSak} from "../defaults/FormTemplates";
import ConfigurationMappingComponent from "./mapping/ConfigurationMappingComponent";
import HelpPopover from "./common/popover/HelpPopover";

export interface Props {
    classes: ClassNameMap
    onCollectionReferencesInEditContextChange: (collectionReferences: string[]) => void;
}

const OutgoingDataComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.configuration'});
    const classes = props.classes;

    return (
        <Box id="form-panel" className={classes.panelContainer}>
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