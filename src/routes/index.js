import Home from "@pages/Home";
import Login from "@pages/Login";
import sysRoute from "./sysRoute";
import billRoute from "./billRoute";
import investRoute from "./investRoute";

const loginPage = {
    path: "/login",
    component: Login,
    name: "登录",
};

const homePage = {
    path: "/home",
    component: Home,
    name: "首页",
    children:[billRoute,investRoute,sysRoute]
};
export default [loginPage,homePage]; // homeSingleRoute
