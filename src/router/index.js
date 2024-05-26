import {
    createRouter,
    createWebHistory
} from 'vue-router';
import HomePage from '../components/HomePage.vue';
import SuccessPage from '../components/SuccessPage.vue';

const routes = [{
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/success',
        name: 'Success',
        component: SuccessPage
    }
];

const router = createRouter({
    history: createWebHistory('/'),
    routes
});

export default router;