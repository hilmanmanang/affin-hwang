<template>
    <div>
        <div class="h-[55px] bg-[#344953]">
            <div class="flex justify-end h-full items-center max-w-[1120px] xl:m-auto mr-20">
                <router-link to="/about" class="text-[#41B883] text-xl font-semibold">About</router-link>
            </div>
        </div>
        <div class="m-20 text-[#344953] max-w-[1120px] xl:mx-auto">
            <div class="text-2xl font-semibold mb-4">
                <span v-if="customerId">Edit Customer</span>
                <span v-if="!customerId">Create New Customer</span>
            </div>
            <div v-if="!loadData && !savingData" class="p-5 border border-[#41B883] mb-3 rounded-lg">
                <div class="flex flex-wrap">
                    <div class="w-full">
                        <label for="name_field">Full Name*</label>
                        <div class="mb-5">
                            <input class="mb-1" type="text" name="name_field" id="name_field" v-model="customer.name"
                                placeholder="Insert name">
                            <div class="text-red-500" v-if="noName">Full name is required</div>
                        </div>
                    </div>
                    <div class="md:w-1/2 w-full md:pr-2">
                        <label for="age_field">Age</label>
                        <input type="number" name="age_field" id="age_field" v-model="customer.age"
                            placeholder="Insert age">
                    </div>
                    <div class="md:w-1/2 w-full md:pl-2">
                        <label for="gender_field">Gender</label>
                        <select id="gender_field" name="gender_field" v-model="customer.gender">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div class="md:w-1/2 w-full md:pr-2">
                        <label for="contact_field">Contact Number</label>
                        <input type="text" name="contact_field" id="contact_field" v-model="customer.contactNo"
                            placeholder="Insert contact number">
                    </div>
                    <div class="md:w-1/2 w-full md:pl-2">
                        <label for="email_field">Email</label>
                        <input type="text" name="email_field" id="email_field" v-model="customer.email"
                            placeholder="Insert email">
                    </div>
                </div>
                <div v-on:click="createOrUpdateCustomer()" class="flex justify-end">
                    <div class="py-3 px-6 bg-[#41B883] text-xl font-semibold rounded-lg cursor-pointer">
                        Save
                    </div>
                </div>
            </div>
            <div v-if="loadData" class="mt-24 text-center">
                Loading Data...
            </div>
            <div v-if="savingData" class="mt-24 text-center">
                Saving Data...
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
            error: '',
            customer: {
                name: '',
                age: null,
                gender: 'Male',
                contactNo: '',
                email: ''
            },
            customerId: this.$route.params.id,
            loadData: false,
            savingData: false,
            noName: false
        }
    },
    created() {
        if (this.customerId) this.getCustomer();
    },
    methods: {
        async getCustomer() {
            this.loadData = true;
            const response = await customerService.getCustomer(this.customerId);
            if (response.status === 200) {
                this.customer = response.data;
                this.loadData = false;
            }
        },
        async createOrUpdateCustomer() {
            if (!this.customer.name) this.noName = true;
            else {
                this.savingData = true;
                if (this.customerId) {
                    const response = await customerService.updateCustomer(this.customer);
                    if (response.status === 200) this.$router.back()
                } else {
                    const response = await customerService.createCustomer(this.customer);
                    if (response.status === 201) this.$router.back()
                }
            }
        },
    }
}
</script>

<style>
label {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
}

input,
select {
    height: 40px;
    border: 1px solid grey;
    border-radius: 4px;
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
}
</style>