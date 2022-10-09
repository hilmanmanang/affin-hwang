<template>
    <div>
        <div class="h-[55px] bg-[#344953]">
            <div class="flex justify-end h-full items-center max-w-[1120px] xl:m-auto mr-20">
                <router-link to="/about" class="text-[#41B883] text-xl font-semibold">About</router-link>
            </div>
        </div>
        <div class="m-20 text-[#344953] max-w-[1120px] xl:mx-auto">
            <div class="text-2xl font-semibold mb-4">Customer List</div>
            <div class="flex justify-end">
                <router-link to="/create" class="py-3 px-6 bg-[#41B883] text-xl font-semibold rounded-lg">Create New Customer</router-link>
            </div>
            <div v-if="!loadData && !loadDelete" class="mt-4">
                <div v-if="customers.length > 0">
                    <div v-for="customer in customers" v-bind:key="customer._id" class="p-5 border border-[#41B883] mb-3 rounded-lg flex justify-between items-center">
                    <div class="text-lg">
                        <div>
                            <strong>Name: </strong>{{ customer.name }}
                        </div>
                        <div>
                            <strong>Age: </strong>{{ customer.age }}
                        </div>
                        <div>
                            <strong>Gender: </strong>{{ customer.gender || '-' }}
                        </div>
                        <div>
                            <strong>Contact Number: </strong>{{ customer.contactNo || '-' }}
                        </div>
                        <div>
                            <strong>Email: </strong>{{ customer.email || '-' }}
                        </div>
                    </div>
                    <div>
                        <span v-on:click="deleteCustomer(customer._id)" class="py-3 px-6 text-[#41B883] text-xl font-semibold rounded-lg border-[#41B883] border cursor-pointer">Delete</span>
                        <router-link :to="{ name: 'edit', params: { id: customer._id}}" class="py-3 px-6 text-[#41B883] text-xl font-semibold rounded-lg border-[#41B883] border ml-2">Edit</router-link>
                    </div>
                </div>
                </div>
                <div v-else class="mt-24 text-center">
                    Customer data is empty
                </div>
            </div>
            <div v-if="loadData" class="mt-24 text-center">
                Loading Data...
            </div>
            <div v-if="loadDelete" class="mt-24 text-center">
                Removing Customer Data...
            </div>
        </div>
    </div>
</template>

<script>
    import customerService from '../service/CustomerService.js';

    export default {
        data() {
            return {
                customers: [],
                customer: {
                    name: '',
                    age: null,
                    gender: '',
                    contactNo: '',
                    email: ''
                },
                loadData: true,
                loadDelete: false,
            }
        },
        async created() {
            this.getCustomer();
        },
        methods: {
            async getCustomer() {
                this.loadData = true;
                const response  = await customerService.getCustomers();
                if (response) {
                    this.customers = response.data;
                    this.loadData = false;
                }
            },
            async createCustomer() {
                const response = await customerService.createCustomer(this.customer);
                if (response.status === 201) this.getCustomer();
            },
            async deleteCustomer(id) {
                this.loadDelete = true;
                const response = await customerService.deleteCustomer(id);
                if (response.status === 200) {
                    this.loadDelete = false;
                    this.getCustomer();
                }
            },
            viewDetail(id) {
                this.$router.push({ path: `#/edit/${id}`, replace: true })
            }
        }
    }
</script>
