import {Box, Typography} from '@mui/material';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const Overview: React.FunctionComponent<RouteComponentProps<any>> = () => {
    return (
        <Box display="flex" position="relative" width={1} height={1}>
            <Typography>Oversikt</Typography>
        </Box>
    );
}

export default withRouter(Overview);