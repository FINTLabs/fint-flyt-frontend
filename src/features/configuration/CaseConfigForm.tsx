import * as React from "react";
import { RouteComponentProps, withRouter} from "react-router-dom";
import {
    Box,
    Theme,
} from "@mui/material";
import {createStyles, makeStyles} from "@mui/styles";

import MetadataPanel from "./components/MetadataPanel";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import {useTranslation} from "react-i18next";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        metadataPanelContainer: {
            marginTop: theme.spacing(6),
            marginRight: theme.spacing(4),
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4),
            paddingBottom: theme.spacing(4),
            paddingTop: theme.spacing(2),
            border: 'solid 1px',
            borderColor: 'black',
            borderRadius: '4px',
            height: 'fit-content',
            position: 'sticky',
            top: theme.spacing(16),
            backgroundColor: 'white'
        },
        panelContainer: {
            marginTop: theme.spacing(6),
            marginRight: theme.spacing(4),
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4),
            paddingBottom: theme.spacing(4),
            paddingTop: theme.spacing(2),
            border: 'solid 1px',
            borderColor: 'black',
            borderRadius: '4px',
            height: '100vh',
            width: '100vh',
            top: theme.spacing(16),
            backgroundColor: 'white'
        },
    }
));


const CaseConfigForm: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const {t} = useTranslation('translations', {keyPrefix: 'pages.configurationForm'});
    const classes = useStyles();

    return (
        <Box>
            <DndProvider backend={HTML5Backend}>
                    <Box display="flex" width={1} height={1} style={{backgroundColor: '#EBF4F5'}}>
                        <Box className={classes.metadataPanelContainer}>
                            <MetadataPanel style={classes} />
                        </Box>
                        <Box className={classes.panelContainer}>
                            Hello
                        </Box>
                    </Box>
            </DndProvider>
        </Box>
    );
}

export default withRouter(CaseConfigForm);
