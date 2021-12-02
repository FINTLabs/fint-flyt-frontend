import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {Typography} from "@mui/material";

const Support: React.FunctionComponent<RouteComponentProps<any>> = () => {
    return (
        <>
            <Typography>Opprett support sak</Typography>
        </>
    );
}

export default withRouter(Support);