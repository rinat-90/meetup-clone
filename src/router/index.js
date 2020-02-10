import Vue from 'vue'
import Router from 'vue-router'
import Home from "../Pages/Home";
import Meetups from '../Pages/Meetups'
import Meetup from '../Pages/Meetup'
import CreateMeetup from '../Pages/CreateMeetup'
import Profile from '../Pages/Profile'
import Signup from '../Pages/Signup'
import Signin from '../Pages/Signin'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path:'/meetups',
      name: 'Meetups',
      component: Meetups
    },
    {
      path:'/meetup/new',
      name: 'Create Meetup',
      component: CreateMeetup,
      beforeEnter: AuthGuard,
    },
    {
      path:'/meetups/:id',
      name: 'Meetup',
      props: true,
      component: Meetup
    },
    {
      path:'/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard,
    },
    {
      path:'/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path:'/signin',
      name: 'Signin',
      component: Signin
    }
  ]
})
