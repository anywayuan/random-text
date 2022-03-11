import {
  createRouter,
  createWebHistory,
} from "vue-router";

const Home = () => import("../views/home/index.vue");
const Fuck = () => import("../views/fuck/index.vue");
const user = () => import("../views/user/index.vue");

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
    path: "/user",
    name: "用户",
    component: user,
    meta: {index: 3}
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
