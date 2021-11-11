import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {Typography} from "@mui/material";

const NewIntegration: React.FunctionComponent<RouteComponentProps<any>> = () => {
    return (
        <div>
            <Typography>Ny integrasjon</Typography>
        </div>
    );
}

export default withRouter(NewIntegration);