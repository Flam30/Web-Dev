import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Event from './views/Event.vue'
import Register from './views/Register.vue'
import Customers from './views/Customers.vue'
import Account from './views/Account.vue'
import Success from './views/Success.vue'
import CreateEvent from './views/CreateEvent.vue'
import OrganizerRegister from './views/OrganizerRegister.vue'
import OrganizerPage from './views/OrganizerPage.vue'

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
      component: Account,
      path: '/account/:username',
      props: true,
      name: 'Account'
    },
    {
      path: '/success/:ticketId',
      props: true,
      name: 'Success!',
      component: Success
    },
    {
      path: '/create-event',
      name: 'Create event',
      component: CreateEvent
    },
    {
      path: '/organizer-register',
      name: 'Organizer register',
      component: OrganizerRegister
    },
    {
      path: '/organizer/:id',
      props: true,
      name: 'Organizer',
      component: OrganizerPage
    }
  ]
})
