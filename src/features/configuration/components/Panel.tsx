import * as React from "react";
import {FormProvider, useForm} from "react-hook-form";
import ObjectMappingComponent from "./mapping/ObjectMappingComponent";
import {testObjectTemplateSak} from "../defaults/FormTemplates";
import {Box, Theme} from "@mui/material";
import {createStyles, makeStyles} from "@mui/styles";

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
        },
        fieldSet: {
            display: 'grid',
            padding: '16px'
        },
        submitButton: {
            backgroundColor: theme.palette.primary.main,
            borderRadius: '5px',
            color: 'white',
            cursor: 'pointer',
            padding: '8px',
            fontSize: '16px',
            marginTop: '16px'
        }
    })
);

const Panel: React.FunctionComponent<any> = (props) => {
    const classes = useStyles();
    const methods = useForm();
    const onSubmit = (data: any) => {
        console.log(data);
    };
    return (
        <Box className={props.style.panelContainer}>
            <FormProvider {...methods} >
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <ObjectMappingComponent
                        classes={classes}
                        absoluteKey={testObjectTemplateSak.elementConfig.key}
                        displayName={testObjectTemplateSak.elementConfig.displayName}
                        template={testObjectTemplateSak.template}
                    />
                    <input type="submit" className={classes.submitButton}/>
                </form>
            </FormProvider>
        </Box>
    );
}
export default Panel;