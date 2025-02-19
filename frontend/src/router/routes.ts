import { RouteRecordRaw } from 'vue-router';
import ResearchProjectsPage from '@/pages/ResearchProjectsPage.vue';


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'about', component: () => import('pages/AboutPage.vue') },
      { path: 'the-red-sea', component: () => import('pages/TheRedSeaPage.vue') },
      { path: 'community', component: () => import('pages/CommunityPage.vue') },
      { path: 'research-projects', component: ResearchProjectsPage },
      { path: 'resources', component: () => import('pages/ResourcesPage.vue') },
      { path: 'contact-us', component: () => import('pages/ContactUsPage.vue') },
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
