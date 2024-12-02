import { Routes, Route, useNavigate } from "react-router-dom";
import routes from "./Routes";
import React from "react";
import IRoute from "./Route";

const Router: React.FunctionComponent = () => {
    return (
        <Routes>
            {routes.map((route: IRoute, index: number) => {
                const Component = route.component;
                return (
                    <Route
                        key={index}
                        path={route.path}
                        element={<Component id={route.name} />}
                    />
                );
            })}
        </Routes>
    );
};

export default Router;
