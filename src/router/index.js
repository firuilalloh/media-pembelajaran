import { createRouter, createWebHistory } from "vue-router";
import RegPage from "../views/RegPage.vue";
import SigninPage from "../views/SigninPage.vue";
import HomePage from "../views/HomePage.vue";
import ActivityPage from "../views/ActivityPage.vue";
import EduGamePage from "../views/EduGamePage.vue";
import FeedbackPage from "../views/FeedbackPage.vue";
import PracticePage from "../views/PracticePage.vue";

const routes = [
  {
    path: "/",
    name: "RegPage",
    component: RegPage,
  },
  {
    path: "/signin",
    name: "SigninPage",
    component: SigninPage,
  },
  {
    path: "/home",
    name: "MateriPage",
    component: HomePage,
  },
  {
    path: "/activity",
    name: "ActivityPage",
    component: ActivityPage,
  },
  {
    path: "/edugame",
    name: "EduGamePage",
    component: EduGamePage,
  },
  {
    path: "/feedback",
    name: "FeedbackPage",
    component: FeedbackPage,
  },
  {
    path: "/practice",
    name: "PracticePage",
    component: PracticePage,
  },
  {
    path: "/tujuan",
    name: "tujuan",
    component: () => import("../views/TujuanPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
