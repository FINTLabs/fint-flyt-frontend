import React from "react";
import {RouteComponentProps} from "react-router-dom";

type Props = {
    id: string
}

export type RouteComponent = React.FunctionComponent<RouteComponentProps<Props>>;

export default interface IRoute {
    exact: boolean;
    name: string;
    path: string;
    component: React.FunctionComponent<RouteComponentProps<Props>>;
    icon?: string;
    inNavigationMenu?: boolean;
}