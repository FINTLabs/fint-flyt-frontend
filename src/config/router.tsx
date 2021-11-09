import {Route, RouteComponentProps} from "react-router-dom"
import routes from "../util/routes";
import React from "react";

const Router: React.FunctionComponent = () => {
    return (
            <div>
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
            </div>
    );
}

export default Router;