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
        buttonContainer: {
            background: 'white',
            padding: theme.spacing(2),
            height: 'fit-content',
            position: 'sticky',
            bottom: theme.spacing(0),
            zIndex: 1,
            width: '100%'
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
        accordion: {
            marginBottom: theme.spacing(2),
            width: theme.spacing(100)
        },
        accordionSummary: {
            backgroundColor: theme.palette.primary.light,
        },
        formControl: {
            width: theme.spacing(70)
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