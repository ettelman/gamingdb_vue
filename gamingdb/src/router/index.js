import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/StartView.vue';
import GamesView from '../views/GamesView.vue';
import AddView from '../views/AddView.vue';
import SingleView from '../views/SingleView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: StartView
    }, {
      path: '/games',
      name: 'games',
      component: GamesView
  }, {
      path: '/add',
      name: 'add',
      component: AddView
  }, {
      path: '/single/:id',
      name: 'single',
      component: SingleView,
      props: true
  }

]
})

export default router
