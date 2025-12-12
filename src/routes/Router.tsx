import { Routes, Route } from "react-router";
import routes from "./Routes";
import React, { Suspense } from "react";
import IRoute from "./Route";

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
