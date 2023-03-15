import * as React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {Box, Typography} from "@mui/material";
import {ClassNameMap} from "@mui/styles";
import {useTranslation} from "react-i18next";
import {testObjectTemplateSak} from "../defaults/FormTemplates";
import ConfigurationMappingComponent from "./mapping/ConfigurationMappingComponent";
import HelpPopover from "./popover/HelpPopover";


const Panel: React.FunctionComponent<any> = (props: { classes: ClassNameMap }) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.configuration'});

    const classes = props.classes;
    const methods = useForm();
    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <Box id="form-panel" className={classes.panelContainer}>
            <Box className={props.classes.row}>
                <Typography variant={"h6"}>{t('formHeader')}</Typography>
                <HelpPopover popoverContent="Utgående data"/>
            </Box>
            <FormProvider {...methods} >
                <form id="react-hook-form" onSubmit={methods.handleSubmit(onSubmit)}>
                    <Box id="configuration-mapping-wrapper" sx={{display: 'flex'}}>
                        <ConfigurationMappingComponent
                            classes={classes}
                            rootObjectTemplate={testObjectTemplateSak}
                        />
                    </Box>
                    <button id="form-submit-btn" className={classes.submitButton} type="submit" onClick={onSubmit}>
                        {t("button.submit")}
                    </button>
                    <button id="form-cancel-btn" className={classes.submitButton} type="button"
                            onClick={() => {
                                console.log('cancel')
                            }}
                    >{t("button.cancel")}
                    </button>
                </form>
            </FormProvider>
        </Box>
    );
}
export default Panel;