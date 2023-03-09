import React, {useContext} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {SourceApplicationContext} from "../../context/sourceApplicationContext";
import Panel from "./components/Panel";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import MetadataPanel from "./components/MetadataPanel";
import {createStyles, makeStyles} from "@mui/styles";
import {Box, Theme} from "@mui/material";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            width: theme.spacing(100)
        },
        row: {
            display: 'flex',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            background: 'white'
        },
        column: {
            flex: '50%',
            paddingLeft: theme.spacing(2)
        },
        sourceApplicationFormContainer: {
            padding: theme.spacing(2),
            border: 'solid 1px',
            borderColor: 'black',
            marginTop: theme.spacing(6),
            marginLeft: theme.spacing(8),
            borderRadius: '4px',
            height: 'fit-content',
            top: theme.spacing(16)
        },
        sourceApplicationForm: {
            opacity: 0.99,
            padding: theme.spacing(2),
            height: 'fit-content',
            overflow: 'auto',
            maxHeight: theme.spacing(100)
        },
        submitButton: {
            backgroundColor: theme.palette.primary.dark,
            border: 'none',
            color: 'white',
            padding: theme.spacing(2),
            cursor: 'pointer'
        },
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
        }
    })
);

const ConfigurationFormWrapper: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const {sourceApplication} = useContext(SourceApplicationContext)
    const classes = useStyles();

    return (
        <DndProvider backend={HTML5Backend}>
            <Box display="flex" position="relative" width={1} height={1} style={{backgroundColor: 'white'}}>
                <MetadataPanel style={classes}/>
                <Panel style={classes}/>
            </Box>
        </DndProvider>
    );
}

export default withRouter(ConfigurationFormWrapper);