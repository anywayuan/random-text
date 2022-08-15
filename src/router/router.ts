import {createRouter, createWebHistory} from "vue-router";

const Home = () => import("@/views/home/index.vue");
const Fuck = () => import("@/views/fuck/index.vue");
const Login = () => import("@/views/login/index.vue");
const Test = () => import("@/views/test/index.vue");

const routes = [
  {path: "/", redirect: "/fuck"},
  {
    path: "/home",
    name: "首页",
    component: Home,
    meta: {index: 1},
  },
  {
    path: "/fuck",
    name: "关于",
    component: Fuck,
    meta: {index: 2},
  },
  {
    path: "/login",
    name: "登录",
    component: Login,
    meta: {index: 3},
  },
  {
    path: "/test",
    name: "测试",
    component: Test,
    meta: {index: 4},
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
