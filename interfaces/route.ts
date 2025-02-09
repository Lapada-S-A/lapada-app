export interface Route {
  label: string;
  to: string;
  menu: boolean;
  icon?: string;
}

export type RoutesByUserType = {
    [key in UserTypes]: Route[];
};