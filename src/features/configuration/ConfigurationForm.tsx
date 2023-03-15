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
        },
        column: {
            flex: '50%',
            paddingLeft: theme.spacing(2)
        },
        panelContainer: {
            backgroundColor: 'white',
            padding: theme.spacing(2),
            border: 'solid 1px',
            borderColor: 'black',
            marginTop: theme.spacing(6),
            marginLeft: theme.spacing(8),
            borderRadius: '4px',
            height: 'fit-content',
            top: theme.spacing(16)
        },
        panel: {
            opacity: 0.99,
            padding: theme.spacing(2),
            height: 'fit-content',
            overflow: 'auto',
            maxHeight: theme.spacing(100)
        },
        valueMappingContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        label: {
            fontFamily: ["Nunito Sans", 'sans-serif'].join(','),
            fontSize: '16px'
        },
        select: {
            width: '350px',
            height: '30px',
            borderRadius: '4px',
            marginTop: '5px',
            marginBottom: '5px'
        },
        input: {
            width: '350px',
            borderRadius: '4px',
            marginTop: '5px',
            marginBottom: '5px',
            height: '24px'
        },
        title: {
            fontFamily: ["Nunito Sans", 'sans-serif'].join(','),
            fontSize: '20px',
            marginTop: '16px',
            marginLeft: '16px'
        },
        fieldSetContainer: {
            display: 'grid',
            backgroundColor: '#EBF4F5',
            border: '1px solid',
            borderRadius: '4px',
            height: 'fit-content',
            marginRight: '16px',
            "&:last-child": {
                marginRight: 0
            }
        },
        fieldSet: {
            display: 'grid',
            border: 'none',
        },
        list: {
            listStyle: 'none',
            padding: 'unset'
        },
        listItem: {
            border: 'solid 1px black',
            borderRadius: '4px',
            marginBottom: '8px'
        },
        button: {
            backgroundColor: theme.palette.primary.main,
            borderRadius: '5px',
            color: 'white',
            cursor: 'pointer',
            padding: '8px',
            fontSize: '16px',
            marginTop: '16px',
            marginLeft: '16px',
            width: 'fit-content'
        },
        submitButton: {
            backgroundColor: theme.palette.primary.main,
            borderRadius: '5px',
            color: 'white',
            cursor: 'pointer',
            padding: '8px',
            fontSize: '16px',
            marginTop: '16px',
            width: 'fit-content'
        }
    })
);

const ConfigurationForm: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const {sourceApplication} = useContext(SourceApplicationContext)
    const classes = useStyles();

    return (
        <DndProvider backend={HTML5Backend}>
            <Box display="flex" position="relative" width={1} height={1} sx={{border: 'none'}}>
                <MetadataPanel classes={classes}/>
                <Panel classes={classes}/>
            </Box>
        </DndProvider>
    );
}

export default withRouter(ConfigurationForm);