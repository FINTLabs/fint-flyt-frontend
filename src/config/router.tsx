import {BrowserRouter, Route, RouteComponentProps, Switch} from "react-router-dom"
import routes from "../util/routes";
import React from "react";

const Router: React.FunctionComponent<{}> = props => {

    return (
        <BrowserRouter>
            <Switch>
                {routes.map((route, index) => {
                    return (
                        <Route
                            key={index}
                            exact={route.exact}
                            path={route.path}
                            render={(props: RouteComponentProps<any>) => (
                                <route.component
                                    name={route.name}
                                    {...props}
                                    {...route.props}
                                />
                            )}
                        />
                    );
                })}
            </Switch>
        </BrowserRouter>
    );
}

export default Router;