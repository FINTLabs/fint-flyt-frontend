import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {Typography} from "@mui/material";

const Support: React.FunctionComponent<RouteComponentProps<any>> = () => {
    return (
        <div>
            <Typography>Opprett support sak</Typography>
        </div>
    );
}

export default withRouter(Support);