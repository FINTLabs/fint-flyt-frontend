import {Route, RouteComponentProps} from "react-router-dom"
import routes from "./Routes";
import React from "react";

const Router: React.FunctionComponent = () => {
    return (
            <>
                {routes.map((route, index) => {
                    return (
                        <Route
                            key={Math.random()}
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
            </>
    );
}

export default Router;
