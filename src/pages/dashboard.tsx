import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

const Dashboard: React.FunctionComponent<RouteComponentProps<any>> = props => {
    return (
        <div>
            <p>Dashboard test routing</p>
            <Link to="/new_integration">Gå til ny integrasjon</Link>
        </div>
    );
}

export default withRouter(Dashboard);