import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    component: async (): Promise<typeof import('../pages/Home.vue')> => import(/* webpackChunkName: "home" */ '../pages/Home.vue'),
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: async (): Promise<typeof import('../pages/Auth/SignIn.vue')> => import(/* webpackChunkName: "signin" */ '../pages/Auth/SignIn.vue'),
  },
];

const router = new VueRouter({
  routes: routes,
});

export default router;
