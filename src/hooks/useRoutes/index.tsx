import {HomeScreen} from "screens/home";

export const useRoutes = () => {
    const routes = [{
        name: 'Home',
        displayName: 'Página Inicial',
        icon: 'home',
        component: HomeScreen,
        hidden: false,
    }]

    return {routes}
}