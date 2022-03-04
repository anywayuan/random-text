import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

const Home = () => import("../views/home/index.vue");
const Fuck = () => import("../views/fuck/index.vue");

const routes = [
  { path: "/", redirect: "/fuck" },
  {
    path: "/home",
    name: "首页",
    component: Home,
    meta: { index: 1 },
  },
  {
    path: "/fuck",
    name: "关于",
    component: Fuck,
    meta: { index: 2 },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
