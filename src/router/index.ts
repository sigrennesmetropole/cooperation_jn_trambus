import { createRouter, createWebHistory } from 'vue-router'
import { _paq } from '@/matomo.js'

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
  // Redirect to home if accessed directly (beside legalnotice and home)
  if (
    (from.name === null || from.name === undefined) &&
    to.name !== 'home' &&
    to.name !== '/' &&
    to.name !== 'legalnotice'
  ) {
    next('/home')
  } else {
    next()
  }
})

router.afterEach(
  (
    // @ts-ignore
    to
  ) => {
    // Track the page view after navigation is confirmed
    _paq.push(['setCustomUrl', to.fullPath])
    _paq.push(['setDocumentTitle', to.meta.title || 'My New Title'])
    _paq.push(['trackPageView'])
  }
)

export { routes }
export default router
