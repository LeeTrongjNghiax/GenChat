import { lazy } from "react";

const HomePage = lazy(() => import('./Home'));
const MainPage = lazy(() => import('./Main'));

export default [
    {
        path: '/', 
        exact: true, 
        public: true, 
        component: HomePage
    }, 
    {
        path: '/main', 
        exact: true, 
        public: true, 
        component: MainPage
    }, 
]