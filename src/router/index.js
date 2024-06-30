import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BagUser from '../views/UserBag.vue'
import TasksList from '../views/TasksList.vue'
import UserDetails from '../views/UserDetails.vue'
import AboutTask from '../views/vaiserOmodal.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/bag',
            name: 'bag',
            component: BagUser
        },
        {
            path: '/all-tasks',
            name: 'tasks',
            component: TasksList
        },
        {
            path: '/user-details',
            name: 'user',
            component: UserDetails
        },
        {
            path: '/about-task',
            name: 'AboutTask',
            component: AboutTask
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue')
        }
    ]
})

export default router
