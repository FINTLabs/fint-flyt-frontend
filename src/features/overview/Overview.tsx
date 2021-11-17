import {Box, Theme, Typography} from '@mui/material';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {createStyles, makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    }));

const Overview: React.FunctionComponent<RouteComponentProps<any>> = () => {
    const classes = useStyles();

    return (
        <Box display="flex" position="relative" width={1} height={1}>
            <Typography>Oversikt</Typography>
        </Box>
    );
}

export default withRouter(Overview);