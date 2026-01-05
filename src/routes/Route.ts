import React from "react";

type Props = {
	id: string;
};


export type RouteComponent = React.FunctionComponent<Props>;

export default interface IRoute {
	exact: boolean;
	name: string;
	path: string;
	component: RouteComponent;
	inNavigationMenu?: boolean;
}
