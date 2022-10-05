<template>
    <div class="container">
        <router-link to="/create">Create</router-link>
        <h1>User</h1>
        <div v-if="error">{{ error }}</div>
        <div v-for="customer in customers" v-bind:key="customer._id">
            {{ customer.name }} --- {{ customer.age }}
            <button v-on:click="deleteCustomer(customer._id)">delete</button>
            <router-link :to="{ name: 'edit', params: { id: customer._id}}">edit</router-link>
        </div>
    </div>
</template>

<script>
    import customerService from '../service/CustomerService.js';

    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        },
        data() {
            console.log('aasds')
            return {
                customers: [],
                error: '',
                customer: {
                    name: '',
                    age: null
                }
            }
        },
        async created() {
            this.getCustomer();
        },
        methods: {
            async getCustomer() {
                const response  = await customerService.getCustomers();
                this.customers = response.data;
            },
            async createCustomer() {
                console.log(this.customer)
                const response = await customerService.createCustomer(this.customer);
                if (response.status === 201) this.getCustomer();
            },
            async deleteCustomer(id) {
                const response = await customerService.deleteCustomer(id);
                if (response.status === 200) this.getCustomer();
            },
            viewDetail(id) {
                this.$router.push({ path: `#/edit/${id}`, replace: true })
            }
        }
    }
</script>

<style>

</style>
