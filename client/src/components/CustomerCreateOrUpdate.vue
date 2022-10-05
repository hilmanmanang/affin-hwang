<template>
    <div>
        <h1 v-if="customerId">Update</h1>
        <h1 v-if="!customerId">Create</h1>
        <label for="name_field">Name</label>
        <input type="text" name="name_field" id="name_field" v-model="customer.name" placeholder="Insert name">
        <br>
        <label for="age_field">Age</label>
        <input type="text" name="age_field" id="age_field" v-model="customer.age" placeholder="Insert age">
        <br>
        <button v-on:click="createOrUpdateCustomer()">
            <span v-if="customerId">
                Update Customer
            </span>
            <span v-if="!customerId">
                Create Customer
            </span>
        </button>
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
            console.log(this.$route.params.id)
            return {
                customers: [],
                error: '',
                customer: {
                    id: '',
                    name: '',
                    age: null
                },
                customerId: this.$route.params.id
            }
        },
        created() {
            if (this.customerId) this.getCustomer();
        },
        methods: {
            async getCustomer() {
                const response = await customerService.getCustomer(this.customerId);
                console.log(response)
                if (response.status === 200) this.customer = response.data;
                console.log(this.customer)
            },
            async createOrUpdateCustomer() {
                console.log(this.customer)
                if (this.customerId) {
                    console.log(this.customer)
                    const response = await customerService.updateCustomer(this.customer);
                    if (response.status === 200) this.$router.back()
                } else {
                    const response = await customerService.createCustomer(this.customer);
                    if (response.status === 201) this.$router.back()
                }
            },
        }
    }
</script>