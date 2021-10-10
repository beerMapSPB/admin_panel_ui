export default [
  {
    path: '/',
    component: () => import('/~/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('/~/views/dashboard/DashboardView.vue')
      },
      {
        path: 'places',
        name: 'places',
        component: () => import('/~/views/places/PlacesListView.vue')
      }
    ]
  }
]
