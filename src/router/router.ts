import {createRouter, createWebHistory} from "vue-router";

const Fuck = () => import("@/views/fuck/index.vue");

const routes = [
  {
    path: "/",
    name: "Fuck",
    component: Fuck,
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/"
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
