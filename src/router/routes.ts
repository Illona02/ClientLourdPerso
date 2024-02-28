import { RouteRecordRaw } from 'vue-router';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    name: 'Login',
    path: '/Login',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/LoginView.vue') }],
  },
  {
    name: 'Admin',
    path: '/Admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/AdminView.vue') }],
  },
  {
    name: 'AjoutSalarie',
    path: '/AjoutSalarie',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ajout/AjoutSalarie.vue') },
    ],
  },
  {
    name: 'AjoutSite',
    path: '/AjoutSite',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ajout/AjoutSite.vue') },
    ],
  },
  {
    name: 'AjoutService',
    path: '/AjoutService',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ajout/AjoutService.vue') },
    ],
  },
  {
    name: 'ModifierSalarie',
    path: '/ModifierSalarie',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/modif/ModifierSalarie.vue') },
    ],
  },
  {
    name: 'ModifierSite',
    path: '/ModifierSite',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/modif/ModifierSite.vue') },
    ],
  },
  {
    name: 'ModifierService',
    path: '/ModifierService',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/modif/ModifierService.vue') },
    ],
  },
  {
    name: 'SupprimerService',
    path: '/SupprimerService',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/supp/SupprimerService.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
