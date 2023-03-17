import {Theme} from '@mui/material';
import React from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {createStyles, makeStyles} from "@mui/styles";
import InstanceTable from "./components/InstanceTable";
import InstancePanel from "./components/InstancePanel";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            width: theme.spacing(120)
        },
        row: {
            display: 'flex'
        },
        dataGridBox: {
            height: theme.spacing(112),
            background: 'white',
            width: '100%'
        },
        dataPanelBox: {
            height: theme.spacing(112),
            background: 'white',
            width: '100%'
        }
    })
);
const InstanceOverview: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const classes = useStyles();
    const showPanel: boolean = !(/list/.test(window.location.pathname))

    return (
        <>
            {showPanel ?
                <InstancePanel
                    classes={classes}
                /> :
                <InstanceTable
                    classes={classes}
                />}
        </>
    );
}

export default withRouter(InstanceOverview);
