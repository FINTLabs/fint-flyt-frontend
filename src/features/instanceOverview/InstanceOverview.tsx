import {Theme} from '@mui/material';
import React from 'react';
import {RouteComponentProps} from 'react-router-dom';
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
            minHeight: theme.spacing(80),
            backgroundColor: 'white',
            border: '1px solid black',
            borderRadius: theme.spacing(0.5),
            padding: theme.spacing(2),
            width: '100%'
        },
        dataPanelBox: {
            height: theme.spacing(75),
            width: '100%',
            backgroundColor: 'white',
            marginRight: theme.spacing(1)
        }
    })
);

type Props = {
    id: string
}
const InstanceOverview: React.FunctionComponent<RouteComponentProps<Props>> = () => {
    const classes = useStyles();
    const showPanel = !(/list/.test(window.location.pathname))

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

export default InstanceOverview;
