import { createWebHistory, createRouter } from "vue-router";
import About from './../components/AboutPage.vue';
import CustomerListing from './../components/CustomerListing.vue'
import CustomerCreateOrUpdate from './../components/CustomerCreateOrUpdate.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'home', component: CustomerListing },
        { path: '/create', name: 'create', component: CustomerCreateOrUpdate },
        { path: '/edit/:id', name: 'edit', component: CustomerCreateOrUpdate },
        { path: '/about', name: 'about', component: About },
    ]
});

export default router;