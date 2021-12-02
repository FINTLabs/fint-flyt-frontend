import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {Typography} from "@mui/material";
import Container from "../integration/components/dnd/Container";

const Support: React.FunctionComponent<RouteComponentProps<any>> = () => {
    return (
        <>
            <Typography>Opprett support sak</Typography>
            <Container/>
        </>
    );
}

export default withRouter(Support);