import {BrowserRouter, Route, RouteComponentProps} from "react-router-dom"
import routes from "./Routes";
import React from "react";

const getBasename = (path: string) => path.substring(0, path.lastIndexOf('/'));

const Router: React.FunctionComponent = () => {
    return (
        <>
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
        </>
    );
}

export default Router;
