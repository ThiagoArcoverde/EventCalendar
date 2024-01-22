import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import "../node_modules/bulma/css/bulma.css"

const routes = [
    {
        path: '/',
        name: 'Login',
        component: () => import('./views/LoginPage.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('./views/RegisterPage.vue')
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('./views/HomePage.vue')
    },
    {
        path:'/register/success',
        name:'RegisterSuccess',
        component: () => import('./views/RegisterSuccessPage.vue')
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('./views/ProfilePage.vue')
    },
    {
        path: '/profile/edit',
        name: 'EditProfile',
        component: () => import('./views/EditProfilePage.vue')
    },
    {
        path: '/profile/edit/success',
        name: 'EditProfileSuccess',
        component: () => import('./views/EditProfileSuccessPage.vue')
    },
    {
        path: '/profile/changePassword',
        name: 'ChangePassword',
        component: () => import('./views/ChangePasswordPage.vue')
    },
    {
        path: '/profile/changePassword/success',
        name: 'ChangePasswordSuccess',
        component: () => import('./views/ChangePasswordSuccessPage.vue')
    },
    {
        path: '/invite',
        name: 'Invite',
        component: () => import('./views/InvitePage.vue')
    },
    {
        path: '/invite/create',
        name: 'CreateInvite',
        component: () => import('./views/CreateInvitePage.vue')
    },
    {
        path: '/events',
        name: 'Events',
        component: () => import('./views/EventsPage.vue')
    },
    {
        path: '/events/create',
        name: 'CreateEvent',
        component: () => import('./views/CreateEventPage.vue')
    },
    {
        path: '/events/edit/:eventId',
        name: 'EditEvent',
        component: () => import('./views/EditEventPage.vue')
    },
    {
        path: '/calendar',
        name: 'Calendar',
        component: () => import('./views/CalendarPage.vue')
    }
]

const router = createRouter ({
    routes,
    history: createWebHistory()
})

createApp(App).use(router).mount('#app')
