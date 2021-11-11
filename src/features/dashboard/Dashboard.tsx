import { Typography } from '@mui/material';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const Dashboard: React.FunctionComponent<RouteComponentProps<any>> = () => {

    return (
        <div>
            <Typography>Dashboard</Typography>
        </div>
    );
}

export default withRouter(Dashboard);