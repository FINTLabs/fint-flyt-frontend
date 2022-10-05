import {Theme} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {IEvent} from "../log/types/Event";
import EventRepository from "../log/repository/EventRepository";
import {addId} from "../util/JsonUtil";
import {createStyles, makeStyles} from "@mui/styles";
import InstanceTable from "./components/InstanceTable";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            width: theme.spacing(120)
        },
        row: {
            display: 'flex'
        },
        dataGridBox: {
            height: "900px",
            width: '100%'
        },
        dataPanelBox: {
            height: "500px",
            width: '100%'
        }
    })
);
const InstanceOverview: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const [instances, setInstances] = useState<IEvent[]>([]);
    const classes = useStyles();
    const showPanel: boolean = window.location.pathname === '/instance'

    useEffect(()=> {
        getAllEvents();
    }, []);


    const getAllEvents = () => {
        EventRepository.getEvents()
            .then((response) => {
                let data = response.data;
                if (data) {
                    data.forEach(addId(0, 'name'))
                    setInstances(data);
                }
            })
            .catch(e => console.error('Error: ', e))
    }

    return (
        <InstanceTable
            classes={classes}
            instances={instances}
        />
    );
}

    export default withRouter(InstanceOverview);
