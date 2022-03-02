import {Breadcrumbs, Theme, Typography} from '@mui/material';
import React, {useContext, useEffect, useState} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {createStyles, makeStyles} from "@mui/styles";
import IntegrationRepository from "../integration/repository/IntegrationRepository";
import {IRow} from "./types/Row";
import IntegrationConfigurationDetails from "./components/IntegrationConfigurationDetails";
import IntegrationConfigurationTable from "./components/IntegrationConfigurationTable";
import {IntegrationContext} from "../../integrationContext";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            width: theme.spacing(120)
        },
        row: {
            display: 'flex'
        },
        dataGridBox: {
            height: "750px",
            width: '100%'
        }
    })
);

const Overview: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const classes = useStyles();
    const showDetails: boolean = window.location.pathname === '/overview/details'
    const [configurations, getConfigurations] = useState<IRow[]>([]);
    const {integration, setIntegration} = useContext(IntegrationContext)

    useEffect(()=> {
        getAllConfigurations();
        console.log(configurations)
    }, [])

    const getAllConfigurations = () => {
        IntegrationRepository.get()
            .then((response) => {
                console.log(response.data.content)
                const allConfigurations = response.data.content;
                getConfigurations(allConfigurations)

            })
            .catch(e => console.error('Error: ', e))
    }

    const resetConfiguration = () => {
        setIntegration({})
        getAllConfigurations();
    }

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography style={{cursor:'pointer'}} onClick={resetConfiguration}>Oversikt</Typography>
                <Typography>{integration.integrationId && showDetails ? 'Konfigurasjonsdetaljer' : ''}</Typography>
            </Breadcrumbs>
            {integration.integrationId && showDetails ?
                <IntegrationConfigurationDetails
                    reset={resetConfiguration}
                    initialConfiguration={integration}
                /> :
                <IntegrationConfigurationTable
                    classes={classes}
                    configurations={configurations}
                    setIntegration={setIntegration}
                />
            }
        </>
    );
}

export default withRouter(Overview);