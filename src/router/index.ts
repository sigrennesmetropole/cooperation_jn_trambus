import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/planning',
    name: 'planning',
    component: () => import('../views/PlanningView.vue'),
  },
  {
    path: '/line/:id',
    name: 'line',
    component: () => import('../views/LineView.vue'),
  },
  {
    path: '/line/:lineid/station/:id',
    name: 'station',
    component: () => import('../views/StationView.vue'),
  },
  {
    path: '/traveltimes',
    name: 'traveltimes',
    component: () => import('../views/TravelTimesView.vue'),
  },
  {
    path: '/legalnotice/:legallink',
    name: 'legalnotice',
    component: () => import('../views/LegalNoticeView.vue'),
  },
  {
    path: '/consultation',
    name: 'consultation',
    component: () => import('../views/ConsultationView.vue'),
  },
  // TODO: Create 404 route?
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  if (
    (from.name === null || from.name === undefined) &&
    to.name !== 'home' &&
    to.name !== '/'
  ) {
    next('/home')
  } else {
    next()
  }
})

export { routes }
export default router
