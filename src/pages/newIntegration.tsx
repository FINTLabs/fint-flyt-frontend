import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const NewIntegration: React.FunctionComponent<RouteComponentProps<any>> = () => {
    return (
        <div>
            <p>Ny integrasjon</p>
        </div>
    );
}

export default withRouter(NewIntegration);