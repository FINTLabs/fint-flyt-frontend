export default interface IRoute {
    exact: boolean;
    name: string;
    path: string;
    component: any; // eslint-disable-line
    icon?: string;
    inNavigationMenu?: boolean;
}