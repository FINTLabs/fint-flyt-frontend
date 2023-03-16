import * as React from "react";
import {useContext} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {Box, Checkbox, FormControlLabel, Typography} from "@mui/material";
import {ClassNameMap} from "@mui/styles";
import {useTranslation} from "react-i18next";
import {testObjectTemplateSak} from "../defaults/FormTemplates";
import ConfigurationMappingComponent from "./mapping/ConfigurationMappingComponent";
import HelpPopover from "./popover/HelpPopover";
import {ConfigurationContext} from "../../../context/configurationContext";


const Panel: React.FunctionComponent<any> = (props: { classes: ClassNameMap }) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.configuration'});
    const {completed, setCompleted, active, setActive} = useContext(ConfigurationContext)
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
                    <Box className={classes.formFooter}>
                        <button id="form-submit-btn" className={classes.submitButton} type="submit" onClick={onSubmit}>
                            {t("button.submit")}
                        </button>
                        <button id="form-cancel-btn" className={classes.submitButton} type="button"
                                onClick={() => {
                                    console.log('cancel')
                                }}
                        >{t("button.cancel")}
                        </button>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="form-complete"
                                    checked={completed}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setCompleted(event.target.checked)
                                    }}
                                    inputProps={{'aria-label': 'completed-checkbox'}}/>}
                            label={t('label.checkLabel') as string}/>
                        {completed && <FormControlLabel
                            control={
                                <Checkbox
                                    id="form-active"
                                    checked={active}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setActive(event.target.checked)
                                    }}
                                    inputProps={{'aria-label': 'active-checkbox'}}/>}
                            label={t('label.activeLabel') as string}/>}
                    </Box>
                </form>
            </FormProvider>
        </Box>
    );
}
export default Panel;