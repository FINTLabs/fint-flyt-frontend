import {Box, Button, Card, CardActions, CardContent, CardMedia, Theme, Typography} from '@mui/material';
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
            Oversikt
        </Box>
    );
}

export default withRouter(Overview);