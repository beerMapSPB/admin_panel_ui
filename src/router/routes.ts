import { RouteParams } from 'vue-router'

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
        name: 'places-list',
        component: () => import('/~/views/places/PlacesListView.vue')
      },
      {
        name: 'view-place',
        path: 'places/:id',
        props: ({ params }: { params: RouteParams }) => ({ id: params.id }),
        component: () => import('/~/views/places/SinglePlaceView.vue')
      },
      {
        name: 'create-place',
        path: 'places/new',
        component: () => import('/~/views/places/PlaceForm.vue')
      }
    ]
  }
]
