import {Route, RouteComponentProps} from "react-router-dom"
import routes from "./Routes";
import React from "react";

const Router: React.FunctionComponent = () => {
    return (
        <>
            {routes.map((route, index) => {
                return (
                    <Route
                        key={index}
                        exact={route.exact}
                        path={route.path}
                        render={(props: RouteComponentProps) => (
                            <route.component
                                name={route.name}
                                {...props}
                            />
                        )}
                    />
                );
            })}
        </>
    );
}

export default Router;
