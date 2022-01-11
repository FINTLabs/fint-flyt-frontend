import {Breadcrumbs, Theme, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {createStyles, makeStyles} from "@mui/styles";
import IntegrationRepository from "../integration/repository/IntegrationRepository";
import {GridCellParams} from '@mui/x-data-grid';
import {IRow} from "./types/Row";
import IntegrationConfigurationDetails from "./components/IntegrationConfigurationDetails";
import IntegrationConfigurationTable from "./components/IntegrationConfigurationTable";


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
    const [configurations, getConfigurations] = useState<IRow[]>([]);
    const [selectedConfiguration, setSelectedConfiguration] = useState<GridCellParams>();

    useEffect(()=> {
        getAllConfigurations();
    }, [])

    const getAllConfigurations = () => {
        IntegrationRepository.get()
            .then((response) => {
                const allConfigurations = response.data.content;
                getConfigurations(allConfigurations)

            })
            .catch(e => console.error('Error: ', e))
    }

    function resetConfiguration() {
        setSelectedConfiguration(undefined)
        getAllConfigurations();
    }

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography style={{cursor:'pointer'}} onClick={resetConfiguration}>Oversikt</Typography>
                <Typography>{selectedConfiguration ? 'Konfigurasjonsdetaljer' : ''}</Typography>
            </Breadcrumbs>
            {selectedConfiguration ?
                <IntegrationConfigurationDetails
                    reset={resetConfiguration}
                    initialConfiguration={selectedConfiguration}
                /> :
                <IntegrationConfigurationTable
                    classes={classes}
                    configurations={configurations}
                    setSelectedConfiguration={setSelectedConfiguration}
                />
            }
        </>
    );
}

export default withRouter(Overview);