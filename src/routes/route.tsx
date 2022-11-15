import {AVIA, INFO} from "./utils";
import Avia from "../Components/Avia";
import Info from "../Components/Info";

type RouteType = {
    path:string,
    component:JSX.Element
}

export const publicRoutes:RouteType[] = [{
    path:AVIA,
    component: <Avia />
},
    {
        path: INFO,
        component: <Info />
    }]