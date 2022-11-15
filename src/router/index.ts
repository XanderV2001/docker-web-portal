import { createRouter, createWebHistory, Router } from "vue-router";
import { isLoggedIn } from "../code/appwrite";

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      meta: {
        requiresAuth: true,
      },
      component: () => import("../pages/HomePage.vue"),
    },
  ],
});

router.beforeResolve(async (to) => {
  let loggedIn: boolean = await isLoggedIn();

  if (to.meta.requiresAuth && !loggedIn) {
    return false;
  }
});

export default router;
