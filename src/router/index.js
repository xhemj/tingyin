import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/setting",
      name: "setting",
      component: () => import("../views/Setting.vue")
    },
    {
      path: "/practice",
      name: "practice",
      component: () => import("../views/Practice.vue")
    },
    {
      path: "/result",
      name: "result",
      component: () => import("../views/Result.vue")
    }
  ]
});

export default router;
