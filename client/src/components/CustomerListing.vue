<template>
    <div class="container">
        <a href="#/create">Create New</a>
        <h1>Create</h1>
        <label for="name_field">Name</label>
        <input type="text" name="name_field" id="name_field" v-model="customer.name" placeholder="Insert name">
        <br>
        <label for="age_field">Age</label>
        <input type="text" name="age_field" id="age_field" v-model="customer.age" placeholder="Insert age">
        <br>
        <button v-on:click="createCustomer()">Create Customer</button>
        <h1>User</h1>
        <div v-if="error">{{ error }}</div>
        <div v-for="customer in customers" v-bind:key="customer._id">
            {{ customer.name }}
            <button v-on:click="deleteCustomer(customer._id)">delete</button>
            <a :href="`#/edit/${customer._id}`">view</a>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
