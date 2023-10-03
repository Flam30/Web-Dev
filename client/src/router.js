import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Event from './views/Event.vue'
import Register from './views/Register.vue'
import Customers from './views/Customers.vue'
import Account from './views/Account.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/event/:id',
      props: true,
      name: 'Event',
      component: Event
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/customers',
      name: 'Customers',
      component: Customers
    },
    {
      path: '/account/:username',
      props: true,
      name: 'Account',
      component: Account
    }
  ]
})
