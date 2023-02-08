import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../view/home.vue"),
  },
  {
    path: "/generateForm",
    name: "generateForm",
    component: () => import("../view/generateForm.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
