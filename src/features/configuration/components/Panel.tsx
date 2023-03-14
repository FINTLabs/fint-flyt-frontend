import * as React from "react";
import {FormProvider, useForm} from "react-hook-form";
import {Box, Theme} from "@mui/material";
import {createStyles, makeStyles} from "@mui/styles";
import {useTranslation} from "react-i18next";
import {testObjectTemplateSak} from "../defaults/FormTemplates";
import ConfigurationMappingComponent from "./mapping/ConfigurationMappingComponent";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        label: {
            fontFamily: ["Nunito Sans", 'sans-serif'].join(','),
            fontSize: '16px'
        },
        select: {
            width: '350px',
            height: '30px',
            borderRadius: '3px',
            margin: '5px'
        },
        input: {
            width: '350px',
            borderRadius: '3px',
            margin: '5px',
            height: '24px'
        },
        title: {
            fontFamily: ["Nunito Sans", 'sans-serif'].join(','),
            fontSize: '20px',
            marginTop: '16px'
        },
        fieldSet: {
            display: 'grid',
            border: 'none'
        },
        list: {
            listStyle: 'none',
            padding: 'unset'
        },
        listItem: {
            border: 'solid 1px black',
            padding: '16px',
            borderRadius: '4px',
            marginBottom: '8px'
        },
        button: {
            backgroundColor: theme.palette.primary.main,
            borderRadius: '5px',
            color: 'white',
            cursor: 'pointer',
            padding: '8px',
            fontSize: '16px',
            marginTop: '16px',
            width: 'fit-content'
        }
    })
);

const Panel: React.FunctionComponent<any> = (props) => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.configuration'});

    const style = props.style;
    const classes = useStyles();
    const methods = useForm();
    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <Box className={style.panelContainer}>
            <FormProvider {...methods} >
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <ConfigurationMappingComponent
                        classes={classes}
                        rootObjectTemplate={testObjectTemplateSak}
                    />
                    <button className={classes.button} type="submit" onClick={onSubmit}>
                        {t("button.submit")}
                    </button>
                </form>
            </FormProvider>
        </Box>
    );
}
export default Panel;