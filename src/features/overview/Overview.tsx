import {Theme} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {createStyles, makeStyles} from "@mui/styles";
import IntegrationRepository from "../integration/repository/IntegrationRepository";
import {IRow} from "./types/Row";
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

    return (
            <IntegrationConfigurationTable
                classes={classes}
                configurations={configurations}
            />
    );
}

export default withRouter(Overview);