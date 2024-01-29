import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/market',
  component: Layout,
  redirect: '/market/page',
  name: 'market',
  meta: {
    title: '行情',
    icon: 'heroicons-solid:menu-alt-3',
  },
  children: [{
    path: 'page',
    name: 'websocketTest',
    component: () => import('@/views/market/page.vue'),
    meta: {
      title: 'websocket测试',
    },
  }],
}

export default routes
