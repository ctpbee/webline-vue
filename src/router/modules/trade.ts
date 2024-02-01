import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/trade',
  component: Layout,
  redirect: '/trade/page',
  name: 'trade',
  meta: {
    title: '交易',
    icon: 'heroicons-solid:arrow-trending-up',
  },
  children: [{
    path: 'page',
    name: 'trade',
    component: () => import('@/views/trade/page.vue'),
    meta: {
      sidebar: false,
    },
  }],
}

export default routes
