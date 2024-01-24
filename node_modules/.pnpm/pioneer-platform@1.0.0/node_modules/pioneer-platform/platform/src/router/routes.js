

const routes = [
  {
    path: '/',
    redirect: '/pioneer',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/settings',
        name: 'Settings',
        component: () => import('pages/Settings.vue'),
        props: true
      },
      {
        path: '/contacts',
        name: 'Contacts',
        component: () => import('pages/Contacts.vue'),
        props: true
      },
      {
        path: '/pioneer',
        name: 'Pioneer',
        component: () => import('pages/Pioneer.vue'),
        props: true
      },
      {
        path: '/keepkey',
        name: 'KeepKey',
        component: () => import('pages/KeepKey.vue'),
        props: true
      },
      {
        path: '/appStore',
        name: 'AppStore',
        component: () => import('pages/AppStore.vue')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
