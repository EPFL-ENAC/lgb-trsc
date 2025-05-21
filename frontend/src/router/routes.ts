import { RouteRecordRaw } from 'vue-router';
import MapPage from 'pages/MapPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'about', component: () => import('pages/AboutPage.vue') },
      {
        path: 'the-red-sea',
        component: () => import('pages/TheRedSeaPage.vue'),
      },
      { path: 'community', component: () => import('pages/CommunityPage.vue') },
      {
        path: 'research-projects',
        component: () => import('pages/ResearchProjectsPage.vue'),
        children: [
          {
            name: '3d_mapping',
            path: '3d_mapping',
            component: () => import('pages/3dMappingPage.vue'),
          },
          {
            name: 'seascape_genomics',
            path: 'seascape_genomics',
            component: () => import('pages/SeascapeGenomicsPage.vue'),
          },
          {
            name: 'edna',
            path: 'edna',
            component: () => import('pages/EdnaPage.vue'),
          },
          {
            name: 'echinoderm_population_genetics',
            path: 'echinoderm_population_genetics',
            component: () =>
              import('pages/EchinodermPopulationGeneticsPage.vue'),
          },
          {
            name: 'marine_pollution',
            path: 'marine_pollution',
            component: () => import('pages/MarinePollutionPage.vue'),
          },
          {
            name: 'socio_economics',
            path: 'socio_economics',
            component: () => import('pages/SocioEconomicsPage.vue'),
          },
        ],
      },
      { path: 'map', name: 'map', component: MapPage },
      { path: 'resources', component: () => import('pages/ResourcesPage.vue') },
      {
        path: 'contact-us',
        component: () => import('pages/ContactUsPage.vue'),
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
