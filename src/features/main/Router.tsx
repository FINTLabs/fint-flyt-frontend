import {Route} from "react-router-dom"
import routes from "./Routes";
import React from "react";
import IRoute from "./Route";

const Router: React.FunctionComponent = () => {
    return (
        <>
            {routes.map((route: IRoute, index: number) => {
                return (
                    <Route
                        key={index}
                        exact={route.exact}
                        path={route.path}
                        component={route.component}
                    />
                );
            })}
        </>
    );
}

export default Router;
