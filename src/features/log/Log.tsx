import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {Typography} from "@mui/material";

const Log: React.FunctionComponent<RouteComponentProps<any>> = () => {
    return (
        <div>
            <Typography>Logg</Typography>
        </div>
    );
}

export default withRouter(Log);