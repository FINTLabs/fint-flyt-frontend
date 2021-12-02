import * as React from "react";
import {useForm} from "react-hook-form";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {Box, Theme, Typography} from "@mui/material";
import {createStyles, makeStyles} from "@mui/styles";
import IFormData from "./types/Form/FormData";
import IntegrationRepository from "./repository/IntegrationRepository";
import {defaultValues} from "./util/DefaultValues";
import {toIntegrationConfiguration} from "./util/ToIntegrationConfiguration";
import AccordionForm from "./components/AccordionForm";
import {ACCORDION_FORM, IAccordion} from "./types/Accordion";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            width: theme.spacing(120)
        },
        formControl: {
            width: theme.spacing(80)
        },
        accordion: {
            marginBottom: theme.spacing(2)
        },
        button: {
            marginRight: theme.spacing(1)
        },
        submitButton: {
            backgroundColor: theme.palette.primary.dark,
            border: 'none',
            color: 'white',
            padding: theme.spacing(2),
            cursor: 'pointer'
        }
    })
);

const accordionList: IAccordion[] = [
    {summary: "Integrasjonslogikk", accordionForm: ACCORDION_FORM.CASE_INFORMATION, defaultExpanded: true},
    {summary: "Sakspost", accordionForm: ACCORDION_FORM.CASE_FORM, defaultExpanded: false},
    {summary: "Journalpost", accordionForm: ACCORDION_FORM.RECORD_FORM, defaultExpanded: false},
    {summary: "Dokument- og objektbeskrivelse", accordionForm: ACCORDION_FORM.DOCUMENT_FORM, defaultExpanded: false},
    {summary: "Avsender", accordionForm: ACCORDION_FORM.APPLICANT_FORM, defaultExpanded: false}
]

const IntegrationConfigurationForm: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const classes = useStyles();
    const {handleSubmit, watch, setValue, formState: {}} = useForm<IFormData>({
        defaultValues: defaultValues
    });

    const createNewConfiguration = (data: any) => {
        IntegrationRepository.create(data)
            .then(response => {
                console.log('created new configuraton', data);
            })
            .catch((e: Error) => {
                console.log('errror creating new', e);
            });
    }

    const updateConfiguration = (data: any, id: any) =>{
        IntegrationRepository.update(id, data)
            .then(response => {
                console.log('updated configuration', id);
            })
            .catch((e: Error) => {
                console.log('errror updating',e);
            })
    }

    const onSubmit = handleSubmit((data: IFormData) => {
        const integrationConfiguration = toIntegrationConfiguration(data);

        if(data.id) {
            updateConfiguration(integrationConfiguration, data.id);
        } else {
            createNewConfiguration(integrationConfiguration);
        }
    });

    return (
        <Box display="flex" position="relative" width={1} height={1}>
            <Box>
                <Typography variant={"h5"} sx={{mb: 2}}>Integrasjonskonfigurasjon</Typography>
                <form className={classes.form} onSubmit={onSubmit}>
                    {accordionList.map((accordion, index) => {
                        return (
                            <AccordionForm
                                key={index}
                                style={classes}
                                summary={accordion.summary}
                                accordionForm={accordion.accordionForm}
                                defaultExpanded={accordion.defaultExpanded}
                                watch={watch}
                                setValue={setValue}
                            />
                        )})}
                    <div>
                        <input type="submit" className={classes.submitButton}/>
                    </div>
                </form>
            </Box>
        </Box>
    );
}

export default withRouter(IntegrationConfigurationForm);
