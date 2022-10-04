<template>
    <div>
        <component :is="currentView" />
    </div>
</template>

<script>
import CustomerListing from './components/CustomerListing.vue'
import CustomerCreateOrUpdate from './components/CustomerCreateOrUpdate.vue';
import About from './components/AboutPage.vue';

const routes = {
    '/': CustomerListing,
    '/create': CustomerCreateOrUpdate,
    '/edit/:id': CustomerCreateOrUpdate,
    '/about': About
}

export default {
    name: 'App',
    components: {
        CustomerListing
    },
    data() {
        return {
            currentPath: window.location.hash
        }
    },
    computed: {
        currentView() {
            console.log(routes)
            return routes[this.currentPath.slice(1) || '/']
        }
    },
    mounted() {
        window.addEventListener('hashchange', () => {
            this.currentPath = window.location.hash
        })
    }
}
</script>

<style>

</style>
