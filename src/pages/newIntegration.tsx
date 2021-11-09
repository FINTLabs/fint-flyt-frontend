import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

const NewIntegration: React.FunctionComponent<RouteComponentProps<any>> = props => {
    return (
        <div>
            <p>Ny integrasjon</p>
            <Link to="/">Gå til Dashboard</Link>
        </div>
    );
}

export default withRouter(NewIntegration);