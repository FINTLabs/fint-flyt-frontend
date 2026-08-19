import React, { Suspense } from "react";
import { Route,Routes } from "react-router";

import IRoute from "./Route";
import routes from "./Routes";

const Router: React.FunctionComponent = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
    );
};

export default Router;
