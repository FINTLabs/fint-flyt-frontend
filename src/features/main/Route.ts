export default interface IRoute {
    exact: boolean;
    name: string;
    path: string;
    component: any;
    icon?: string;
    inNavigationMenu?: boolean;
}