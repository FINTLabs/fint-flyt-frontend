import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const Dashboard: React.FunctionComponent<RouteComponentProps<any>> = () => {

    return (
        <div>
            <p>Dashboard</p>
        </div>
    );
}

export default withRouter(Dashboard);